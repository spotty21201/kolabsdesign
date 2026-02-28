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

          <div className="py-8 border-y border-ink/20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col">
                <span className="text-4xl font-serif text-charcoal mb-1">5B+</span>
                <span className="text-xs font-sans text-charcoal/50 uppercase tracking-widest border-t border-ink/10 pt-2 mt-1 inline-block">
                  AUM Optimized (USD)
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-serif text-charcoal mb-1">12</span>
                <span className="text-xs font-sans text-charcoal/50 uppercase tracking-widest border-t border-ink/10 pt-2 mt-1 inline-block">
                  Masterplans
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-serif text-charcoal mb-1">8</span>
                <span className="text-xs font-sans text-charcoal/50 uppercase tracking-widest border-t border-ink/10 pt-2 mt-1 inline-block">
                  Proprietary Tools
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-serif text-primary mb-1">Q2 2026</span>
                <span className="text-xs font-sans text-charcoal/50 uppercase tracking-widest border-t border-ink/10 pt-2 mt-1 inline-block">
                  Volume: Q2 2026
                </span>
              </div>
            </div>
            <p className="text-sm font-sans text-charcoal/60 mt-8 pt-6 border-t border-ink/10 lg:w-2/3">
              Published tools, briefs, and cases across land strategy, infrastructure planning, and capital readiness.
            </p>
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
