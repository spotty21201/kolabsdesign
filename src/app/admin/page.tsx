import React from 'react';
import Link from 'next/link';
import { requireAdminUser } from '@/lib/admin';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { seedTemplateAssetsAction, signOutAdminAction } from '@/app/admin/actions';

interface AdminItemRow {
  id: string;
  title: string;
  slug: string;
  type: string;
  status: string;
  published: boolean;
  featured: boolean;
  published_at: string | null;
  updated_at: string;
}

function formatDate(value: string | null) {
  if (!value) return 'Unscheduled';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unscheduled';
  return date.toLocaleDateString();
}

export default async function AdminPage() {
  const { user } = await requireAdminUser();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from('items')
    .select('id,title,slug,type,status,published,featured,published_at,updated_at')
    .is('deleted_at', null)
    .order('updated_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to load CMS items: ${error.message}`);
  }

  const rows = (data ?? []) as AdminItemRow[];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif text-charcoal">CMS</h1>
          <p className="text-charcoal/60">Signed in as {user.email}</p>
        </div>

        <div className="flex items-center gap-3">
          <form action={seedTemplateAssetsAction}>
            <button type="submit" className="px-4 py-2 border border-ink/20 text-xs font-bold uppercase tracking-widest text-charcoal">
              Seed Template Data
            </button>
          </form>
          <Link href="/admin/new" className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest">
            New Asset
          </Link>
          <form action={signOutAdminAction}>
            <button type="submit" className="px-4 py-2 border border-ink/20 text-xs font-bold uppercase tracking-widest text-charcoal">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto bg-white border border-ink/15">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b border-ink/10 bg-soft-gray/50">
            <tr className="text-left text-charcoal/60 uppercase tracking-widest text-[10px]">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Publish Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-charcoal/60" colSpan={7}>
                  No items yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-ink/10 last:border-b-0">
                  <td className="px-4 py-3">
                    <div className="font-medium text-charcoal">{row.title}</div>
                    <div className="text-charcoal/50 text-xs">/{row.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">{row.type}</td>
                  <td className="px-4 py-3 text-charcoal/70">{row.status}</td>
                  <td className="px-4 py-3 text-charcoal/70">{row.published ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 text-charcoal/70">{row.featured ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 text-charcoal/70">{formatDate(row.published_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/edit/${row.id}`} className="text-primary hover:text-primary/80">
                        Edit
                      </Link>
                      <Link href={`/work/${row.slug}?preview=1`} className="text-charcoal/60 hover:text-charcoal">
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
