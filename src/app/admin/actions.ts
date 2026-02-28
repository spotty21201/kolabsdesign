'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdminUser, isAdminEmail } from '@/lib/admin';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { ensureSlug } from '@/lib/slug';
import { MOCK_ASSETS } from '@/data/mockData';

function parseTags(raw: FormDataEntryValue | null): string[] {
  if (!raw || typeof raw !== 'string') return [];
  return raw
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parseDateTimeLocal(raw: FormDataEntryValue | null): string {
  if (!raw || typeof raw !== 'string' || raw.trim() === '') {
    return new Date().toISOString();
  }

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}

async function uploadHeroImageIfProvided(file: File | null, slug: string): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const supabaseAdmin = createSupabaseAdminClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const filePath = `items/${Date.now()}-${slug}-${safeName}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from('asset-images')
    .upload(filePath, file, {
      upsert: false,
      contentType: file.type || 'application/octet-stream',
    });

  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  const { data } = supabaseAdmin.storage.from('asset-images').getPublicUrl(filePath);
  return data.publicUrl;
}

export async function signInAdminAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    redirect('/admin/login?error=missing_credentials');
  }

  if (!isAdminEmail(email)) {
    redirect('/admin/login?error=not_allowed');
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect('/admin/login?error=invalid_login');
  }

  redirect('/admin');
}

export async function signOutAdminAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

export async function createAssetAction(formData: FormData) {
  await requireAdminUser();

  const title = String(formData.get('title') ?? '').trim();
  const rawSlug = String(formData.get('slug') ?? '').trim();
  const slug = ensureSlug(rawSlug || title, title || 'asset');

  if (!title) {
    throw new Error('Title is required.');
  }

  const heroImageFile = formData.get('heroImageFile');
  const uploadedHeroImage = await uploadHeroImageIfProvided(
    heroImageFile instanceof File ? heroImageFile : null,
    slug
  );
  const manualHeroImage = String(formData.get('heroImage') ?? '').trim();
  const resolvedHeroImage = uploadedHeroImage ?? (manualHeroImage || null);

  const payload = {
    type: String(formData.get('type') ?? 'Tool'),
    title,
    slug,
    status: String(formData.get('status') ?? 'Experiment'),
    one_liner: String(formData.get('oneLiner') ?? ''),
    hero_image: resolvedHeroImage,
    tags: parseTags(formData.get('tags')),
    cta_type: String(formData.get('ctaType') ?? 'Read'),
    cta_url: String(formData.get('ctaUrl') ?? '#').trim() || '#',
    featured: formData.get('featured') === 'on',
    published: formData.get('published') === 'on',
    published_at: parseDateTimeLocal(formData.get('publishedAt')),
    proof_cue: String(formData.get('proofCue') ?? '').trim(),
    problem_md: String(formData.get('problem') ?? ''),
    solution_md: String(formData.get('solution') ?? ''),
    how_md: String(formData.get('how') ?? ''),
  };

  const supabaseAdmin = createSupabaseAdminClient();
  const { error } = await supabaseAdmin.from('items').insert(payload);

  if (error) {
    throw new Error(`Failed to create item: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateAssetAction(id: string, formData: FormData) {
  await requireAdminUser();

  const title = String(formData.get('title') ?? '').trim();
  const rawSlug = String(formData.get('slug') ?? '').trim();
  const slug = ensureSlug(rawSlug || title, title || 'asset');

  if (!title) {
    throw new Error('Title is required.');
  }

  const supabaseAdmin = createSupabaseAdminClient();

  const { data: existing, error: fetchError } = await supabaseAdmin
    .from('items')
    .select('hero_image')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle();

  if (fetchError) {
    throw new Error(`Failed to load existing item: ${fetchError.message}`);
  }

  const removeHeroImage = formData.get('removeHeroImage') === 'on';
  const heroImageFile = formData.get('heroImageFile');
  const uploadedHeroImage = await uploadHeroImageIfProvided(
    heroImageFile instanceof File ? heroImageFile : null,
    slug
  );

  const manualHeroImage = String(formData.get('heroImage') ?? '').trim();
  let heroImage = existing?.hero_image ?? null;

  if (removeHeroImage) {
    heroImage = null;
  } else if (uploadedHeroImage) {
    heroImage = uploadedHeroImage;
  } else if (manualHeroImage) {
    heroImage = manualHeroImage;
  }

  const payload = {
    type: String(formData.get('type') ?? 'Tool'),
    title,
    slug,
    status: String(formData.get('status') ?? 'Experiment'),
    one_liner: String(formData.get('oneLiner') ?? ''),
    hero_image: heroImage,
    tags: parseTags(formData.get('tags')),
    cta_type: String(formData.get('ctaType') ?? 'Read'),
    cta_url: String(formData.get('ctaUrl') ?? '#').trim() || '#',
    featured: formData.get('featured') === 'on',
    published: formData.get('published') === 'on',
    published_at: parseDateTimeLocal(formData.get('publishedAt')),
    proof_cue: String(formData.get('proofCue') ?? '').trim(),
    problem_md: String(formData.get('problem') ?? ''),
    solution_md: String(formData.get('solution') ?? ''),
    how_md: String(formData.get('how') ?? ''),
  };

  const { error } = await supabaseAdmin.from('items').update(payload).eq('id', id);

  if (error) {
    throw new Error(`Failed to update item: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath(`/work/${slug}`);
  revalidatePath('/admin');
  redirect('/admin');
}

export async function softDeleteAssetAction(id: string) {
  await requireAdminUser();

  const supabaseAdmin = createSupabaseAdminClient();
  const { error } = await supabaseAdmin
    .from('items')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .is('deleted_at', null);

  if (error) {
    throw new Error(`Failed to delete item: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function seedTemplateAssetsAction() {
  await requireAdminUser();

  const supabaseAdmin = createSupabaseAdminClient();
  const templatePayload = MOCK_ASSETS.map((item) => ({
    type: item.type,
    title: item.title,
    slug: item.slug,
    status: item.status,
    one_liner: item.oneLiner,
    hero_image: item.heroImage || null,
    tags: item.tags,
    cta_type: item.ctaType,
    cta_url: item.ctaUrl || '#',
    featured: item.featured,
    published: true,
    published_at: item.publishedAt,
    proof_cue: item.proofCue,
    problem_md: item.problem,
    solution_md: item.solution,
    how_md: item.how,
    decision_md: item.decision,
    inputs_md: item.inputs,
    output_md: item.output,
    confidence_md: item.confidence,
    impact_md: item.impact,
    deleted_at: null,
  }));

  const { error } = await supabaseAdmin
    .from('items')
    .upsert(templatePayload, { onConflict: 'slug' });

  if (error) {
    throw new Error(`Failed to seed template assets: ${error.message}`);
  }

  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath('/admin');
  redirect('/admin');
}
