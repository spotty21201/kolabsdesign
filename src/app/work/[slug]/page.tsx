import React from 'react';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { StatusChip } from '@/components/StatusChip';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Download } from 'lucide-react';
import { getAssetBySlug } from '@/lib/api';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';

export default async function AssetDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  let includeDrafts = false;
  if (query.preview === '1') {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    includeDrafts = Boolean(user && isAdminEmail(user.email));
  }

  const asset = await getAssetBySlug(slug, { includeDrafts });

  if (!asset) {
    notFound();
  }

  const hasHeroImage = asset.heroImage.trim().length > 0;
  const isPlaceholderCta = asset.ctaUrl.trim() === '#' || asset.ctaUrl.trim().length === 0;
  const resolvedCtaUrl = isPlaceholderCta ? '/collab' : asset.ctaUrl;
  const isExternalCta = /^https?:\/\//.test(resolvedCtaUrl);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back button */}
      <Link href="/work" className="inline-flex items-center text-sm font-medium text-charcoal/50 hover:text-charcoal mb-8 transition-colors">
        <ArrowLeft className="mr-2 w-4 h-4" />
        Back to Catalog
      </Link>

      {/* Header */}
      <header className="mb-16">
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-charcoal text-white">
            {asset.type}
          </span>
          <StatusChip status={asset.status} />
          {asset.tags.map(tag => (
            <span key={tag} className="text-xs font-mono uppercase tracking-wider text-charcoal/50 bg-soft-gray/80 px-2.5 py-1 rounded-full border border-border-gray">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-6 font-serif">
          {asset.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-charcoal/60 border-l-4 border-[#0055FF] pl-6 py-2">
          {asset.oneLiner}
        </p>
      </header>

      {/* Hero Image */}
      {hasHeroImage ? (
        <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-16 shadow-lg border border-border-gray">
          <img
            src={asset.heroImage}
            alt={asset.title}
            referrerPolicy="no-referrer"
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-16 shadow-lg border border-border-gray bg-soft-gray/30 flex items-center justify-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-charcoal) 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
          <div className="relative z-10 text-center px-6">
            <div className="font-mono text-xs uppercase tracking-widest text-charcoal/50 mb-2">{asset.type}</div>
            <div className="text-2xl md:text-3xl font-serif text-charcoal">{asset.title}</div>
          </div>
        </div>
      )}

      {/* 3-Block Content Model */}
      <div className="space-y-16">
        {asset.problem && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="text-lg font-bold text-charcoal uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gray-300 inline-block"></span>
                Problem
              </h2>
            </div>
            <div className="md:col-span-8">
              <ReactMarkdown 
                components={{
                  p: (props: any) => <p className="text-xl text-charcoal/80 leading-relaxed font-serif italic mb-4" {...props} />,
                  strong: (props: any) => <strong className="font-semibold text-charcoal" {...props} />,
                  ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2 text-xl text-charcoal/80 font-serif italic" {...props} />,
                  li: (props: any) => <li {...props} />
                }}
              >
                {asset.problem}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {asset.solution && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="text-lg font-bold text-charcoal uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gray-300 inline-block"></span>
                Solution
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="prose-like text-lg text-charcoal/80 leading-relaxed">
                <ReactMarkdown
                  components={{
                    p: (props: any) => <p className="mb-4" {...props} />,
                    strong: (props: any) => <strong className="font-semibold text-charcoal" {...props} />,
                    ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                    li: (props: any) => <li {...props} />
                  }}
                >
                  {asset.solution}
                </ReactMarkdown>
              </div>
            </div>
          </section>
        )}

        {asset.how && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="text-lg font-bold text-charcoal uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gray-300 inline-block"></span>
                How
              </h2>
            </div>
            <div className="md:col-span-8 bg-soft-gray/30 rounded-xl p-6 md:p-8 border border-border-gray">
              <div className="prose-like text-charcoal/70 leading-relaxed">
                <ReactMarkdown
                  components={{
                    p: (props: any) => <p className="mb-4" {...props} />,
                    strong: (props: any) => <strong className="font-semibold text-charcoal block mb-1 text-sm uppercase tracking-widest mt-6 first:mt-0" {...props} />,
                    ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
                    li: (props: any) => <li {...props} />
                  }}
                >
                  {asset.how}
                </ReactMarkdown>
              </div>
            </div>
          </section>
        )}
      </div>

      <hr className="my-16 border-border-gray" />

      {/* CTA Section */}
      <div className="flex justify-center">
        <a
          href={resolvedCtaUrl}
          target={isExternalCta ? '_blank' : undefined}
          rel={isExternalCta ? 'noopener noreferrer' : undefined}
          className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white bg-charcoal hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-1"
        >
          {asset.ctaType === 'Download' && <Download className="mr-3 w-5 h-5" />}
          {asset.ctaType === 'Try' && <ExternalLink className="mr-3 w-5 h-5" />}
          {asset.ctaType} This {asset.type}
        </a>
      </div>
    </article>
  );
}
