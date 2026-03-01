import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AssetCard } from '@/components/AssetCard';
import { getAssets } from '@/lib/api';

export default async function NowPage() {
  const assets = await getAssets();
  const featuredAssets = assets.filter((a) => a.featured).slice(0, 3);
  const latestAssets = [...assets]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <section className="mb-24 pt-8 md:pt-16 relative">
        <div
          className="absolute top-0 right-0 w-full md:w-3/4 lg:w-2/3 h-full -z-10 opacity-30 pointer-events-none mix-blend-multiply"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 70%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 70%)',
          }}
        >
          <Image src="/jakarta-skyline.png" alt="Jakarta Skyline" fill className="object-cover object-right grayscale" priority />
        </div>

        <div className="relative z-10">
          <span className="block font-serif font-bold text-xlg md:text-xl text-orange mb-0">
            2026 Indonesia. A cautious economy. Decisions matter.
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-charcoal leading-[1.0] tracking-tight text-balance mb-6">
            Decision intelligence for land, infrastructure, and capital deployment.
          </h1>
          <p className="text-xl md:text-2xl text-charcoal/60 max-w-3xl text-pretty mb-10 leading-relaxed md:leading-relaxed">
            Kolabs.Design is an AI Think Tank building tools, cases, and research at the intersection of design, development, and generative AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-16">
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-sans rounded-none bg-primary text-white hover:bg-primary/90 transition-colors uppercase tracking-widest font-bold"
            >
              Explore Work
            </Link>
            <Link
              href="/collab"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-sm font-sans rounded-none text-primary bg-white hover:bg-soft-gray transition-colors uppercase tracking-widest font-bold"
            >
              Request a Briefing
            </Link>
          </div>

          <div className="py-8 border-y border-ink/20 bg-white/80 backdrop-blur-sm">
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-charcoal/70 mb-6">What you get in 30 days</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-ink/20">
              <div className="pr-0 sm:pr-8 pb-6 sm:pb-0">
                <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">Clarity</h3>
                <p className="text-sm font-sans text-charcoal/75 leading-relaxed">Decision map + assumption stress test</p>
              </div>
              <div className="px-0 sm:px-8 py-6 sm:py-0">
                <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">Options</h3>
                <p className="text-sm font-sans text-charcoal/75 leading-relaxed">Scenarios, trade-offs, and go/no-go paths</p>
              </div>
              <div className="pl-0 sm:pl-8 pt-6 sm:pt-0">
                <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">Confidence</h3>
                <p className="text-sm font-sans text-charcoal/75 leading-relaxed">Decision-ready outputs for boards and stakeholders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <div className="flex items-baseline justify-between mb-8 border-b border-ink/20 pb-4">
          <h2 className="text-3xl font-serif text-ink">Featured Releases</h2>
          <Link href="/work" className="text-sm font-sans font-medium text-primary hover:text-primary/80 flex items-center">
            View all <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-8 border-b border-ink/20 pb-4">
          <h2 className="text-3xl font-serif text-ink">Latest Updates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </section>
    </div>
  );
}
