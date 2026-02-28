import React from 'react';
import Link from 'next/link';

export interface AssetFormValues {
  type: string;
  title: string;
  slug: string;
  status: string;
  oneLiner: string;
  heroImage: string;
  tags: string;
  ctaType: string;
  ctaUrl: string;
  featured: boolean;
  published: boolean;
  publishedAt: string;
  proofCue: string;
  problem: string;
  solution: string;
  how: string;
}

const TYPES = ['Tool', 'Case', 'Brief', 'Research'];
const STATUSES = ['Experiment', 'Method', 'Proven'];
const CTA_TYPES = ['Try', 'Read', 'Download', 'Request'];

interface AssetFormProps {
  title: string;
  description: string;
  submitLabel: string;
  action: (formData: FormData) => void | Promise<void>;
  initialValues: AssetFormValues;
  showRemoveHeroImage?: boolean;
}

function renderSelectOptions(options: string[]) {
  return options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
}

export function AssetForm({
  title,
  description,
  submitLabel,
  action,
  initialValues,
  showRemoveHeroImage = false,
}: AssetFormProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-charcoal mb-2">{title}</h1>
        <p className="text-charcoal/60">{description}</p>
      </div>

      <form action={action} className="space-y-8 bg-white border border-ink/15 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">Type</span>
            <select name="type" defaultValue={initialValues.type} className="w-full border border-ink/20 px-3 py-2 bg-white">
              {renderSelectOptions(TYPES)}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">Status</span>
            <select name="status" defaultValue={initialValues.status} className="w-full border border-ink/20 px-3 py-2 bg-white">
              {renderSelectOptions(STATUSES)}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="space-y-2 md:col-span-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">Title</span>
            <input name="title" required defaultValue={initialValues.title} className="w-full border border-ink/20 px-3 py-2" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">Slug</span>
            <input name="slug" defaultValue={initialValues.slug} className="w-full border border-ink/20 px-3 py-2" placeholder="auto-generated if empty" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">One-liner</span>
            <input name="oneLiner" defaultValue={initialValues.oneLiner} className="w-full border border-ink/20 px-3 py-2" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">Proof cue</span>
            <input name="proofCue" defaultValue={initialValues.proofCue} className="w-full border border-ink/20 px-3 py-2" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">CTA Type</span>
            <select name="ctaType" defaultValue={initialValues.ctaType} className="w-full border border-ink/20 px-3 py-2 bg-white">
              {renderSelectOptions(CTA_TYPES)}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">CTA URL</span>
            <input name="ctaUrl" defaultValue={initialValues.ctaUrl} className="w-full border border-ink/20 px-3 py-2" placeholder="/collab or https://..." />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">Tags (comma-separated)</span>
            <input name="tags" defaultValue={initialValues.tags} className="w-full border border-ink/20 px-3 py-2" placeholder="land, infra, capital" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="space-y-2 md:col-span-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">Hero image URL</span>
            <input name="heroImage" defaultValue={initialValues.heroImage} className="w-full border border-ink/20 px-3 py-2" placeholder="https://..." />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">Upload hero image</span>
            <input name="heroImageFile" type="file" accept="image/*" className="w-full border border-ink/20 px-3 py-2" />
          </label>

          {showRemoveHeroImage ? (
            <label className="inline-flex items-center gap-2 text-sm text-charcoal/70">
              <input name="removeHeroImage" type="checkbox" className="h-4 w-4" />
              Remove current hero image
            </label>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <label className="inline-flex items-center gap-2 text-sm text-charcoal/70">
            <input name="featured" type="checkbox" defaultChecked={initialValues.featured} className="h-4 w-4" />
            Featured
          </label>

          <label className="inline-flex items-center gap-2 text-sm text-charcoal/70">
            <input name="published" type="checkbox" defaultChecked={initialValues.published} className="h-4 w-4" />
            Published
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">Publish date</span>
            <input
              name="publishedAt"
              type="datetime-local"
              defaultValue={initialValues.publishedAt}
              className="w-full border border-ink/20 px-3 py-2"
            />
          </label>
        </div>

        <div className="space-y-6">
          <label className="space-y-2 block">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">Problem (Markdown)</span>
            <p className="text-xs text-charcoal/50 mb-2">What&apos;s at stake and why it matters.</p>
            <textarea name="problem" defaultValue={initialValues.problem} rows={4} className="w-full border border-ink/20 px-3 py-2" />
          </label>

          <label className="space-y-2 block">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">Solution (Markdown)</span>
            <p className="text-xs text-charcoal/50 mb-2">What Kolabs built and what it enables (include results if available).</p>
            <textarea name="solution" defaultValue={initialValues.solution} rows={4} className="w-full border border-ink/20 px-3 py-2" />
          </label>

          <label className="space-y-2 block">
            <span className="text-xs uppercase tracking-widest text-charcoal/50">How (Markdown)</span>
            <p className="text-xs text-charcoal/50 mb-2">Plain-language inputs + outputs.</p>
            <textarea name="how" defaultValue={initialValues.how} rows={4} className="w-full border border-ink/20 px-3 py-2" />
          </label>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-ink/15">
          <Link href="/admin" className="text-sm text-charcoal/60 hover:text-charcoal">
            Cancel
          </Link>
          <button type="submit" className="px-6 py-2 bg-primary text-white text-sm uppercase tracking-widest font-bold">
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
