import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { ContactForm } from '@/components/ContactForm';
import { JsonLd } from '@/components/JsonLd';
import { buildBreadcrumbJsonLd, buildCollabPersonJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Collab with Kolabs | Doddy Samiaji, Farid Ramdani, and strategic support',
  description:
    'Meet Doddy Samiaji and Farid Ramdani of Kolabs.Design, a decision intelligence think tank for land, real estate, infrastructure, and capital deployment in Indonesia.',
  path: '/collab',
});

const people = [
  {
    name: 'Doddy Samiaji',
    role: 'Founder & Principal, Decision Intelligence',
    bio: [
      'Doddy Samiaji leads Kolabs.Design, an AI Think Tank built for one thing: turning complex land and infrastructure questions into decisions leaders can defend.',
      'Trained within the University of Washington’s Design Machine Group, he treats AI and technology as discipline, not decoration. Kolabs ships decision assets, simulators, scenario frameworks, and executive briefs that surface trade-offs early, tighten assumptions, and move teams from maybe to go / no-go.',
      'Doddy’s direction is clear: build applied decision systems for land, infrastructure, and capital deployment, grounded in Indonesia’s realities, rigorous enough for global institutions, and publishable as research.',
    ],
    tags: ['Decision Intelligence', 'Land Strategy', 'Applied AI'],
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/doddysamiaji' },
      { label: 'Publications', href: 'https://medium.com/@doddysamiaji' },
    ],
    imageSrc: '/doddy.png',
    imageAlt: 'Portrait of Doddy Samiaji',
    accent: 'from-charcoal via-charcoal to-primary',
  },
  {
    name: 'Farid Ramdani',
    role: 'Partner, Strategy & Delivery',
    bio: [
      'Farid Ramdani is a partner at Kolabs.Design, responsible for turning Think Tank thinking into action that holds up in the room.',
      'Educated at Institut Teknologi Bandung (ITB), Farid is strongest where projects usually break: the translation layer between design intent, delivery reality, operational constraints, and executive decision-making.',
      'At Kolabs, Farid works close to clients and project teams to operationalize tools, structure workshops, and package decisions so they can move through stakeholders cleanly. AI stays quiet in the background; the output is what matters: clarity, alignment, and momentum.',
    ],
    tags: ['Strategy & Delivery', 'Stakeholder Alignment', 'Workshops'],
    links: [{ label: 'LinkedIn', href: '#' }],
    imageSrc: '/farid.png',
    imageAlt: 'Portrait of Farid Ramdani',
    accent: 'from-stone-700 via-charcoal to-orange',
  },
] as const;

export default function CollabPage() {
  const personSchema = buildCollabPersonJsonLd();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Collab', path: '/collab' },
        ])}
      />
      {personSchema.map((person) => (
        <JsonLd key={person.url} data={person} />
      ))}

      {/* Hero Section */}
      <section className="mb-10 pt-4 md:pt-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal leading-[1.05] tracking-tight text-balance mb-4">
          Collab with Kolabs.
        </h1>
        <div className="max-w-3xl space-y-5 text-charcoal/65">
          <p className="text-lg md:text-xl text-pretty leading-relaxed">
            Kolabs.Design is an AI Think Tank building the decision intelligence layer for land, real estate, infrastructure, and capital deployment.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            We help developers, landowners, Danantara&apos;s SOEs companies and Indonesian conglomerate leadership move from ambiguity to board-ready direction through tools, scenarios, briefs, and repeatable playbooks that stand up to budgets, regulations, timelines, and stakeholders.
          </p>
        </div>
      </section>



      {/* People Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif text-ink mb-4 border-b border-ink/15 pb-3">
          People
        </h2>

        <div className="space-y-8">
          {people.map((person, index) => (
            <article
              key={person.name}
              id={person.name === 'Doddy Samiaji' ? 'doddy-samiaji' : 'farid-ramdani'}
              className="border border-ink/20 bg-white overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Circular avatar — left for Doddy (even), right for Farid (odd) */}
                <div
                  className={`flex-shrink-0 flex items-center justify-center p-3 bg-soft-gray/40 border-b md:border-b-0 ${
                    index % 2 === 1
                      ? 'md:order-2 md:border-l border-ink/10'
                      : 'md:order-1 md:border-r border-ink/10'
                  }`}
                >
                  <div className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-ink/15 shadow-sm flex-shrink-0">
                    <Image
                      src={person.imageSrc}
                      alt={person.imageAlt}
                      fill
                      sizes="176px"
                      className="object-cover object-top grayscale"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Text content */}
                <div className={`flex-grow p-5 md:p-7 ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-1">{person.name}</h3>
                  <p className="text-sm text-primary mb-5 font-bold uppercase tracking-widest">{person.role}</p>
                  <div className="space-y-3 mb-6 text-sm md:text-base text-charcoal/70 leading-relaxed">
                    {person.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {person.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-sans uppercase tracking-widest text-charcoal/60 bg-soft-gray px-2 py-1 border border-ink/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {person.links.map((linkItem) => (
                      <Link
                        key={linkItem.label}
                        href={linkItem.href}
                        className="inline-flex items-center text-xs font-sans font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors"
                      >
                        {linkItem.label} <span className="ml-1 text-orange">&rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Conversion Section */}
      <section id="contact" className="bg-soft-gray text-ink p-6 md:p-10 rounded-none border border-ink/15">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-ink leading-tight tracking-tight mb-4">
              Engage with the Think Tank.
            </h2>
            <div className="font-sans text-ink/60 mb-12 text-base leading-relaxed max-w-md space-y-4">
              <p>We&apos;re one Zoom away.</p>
              <p>
                If you&apos;re facing a high-stakes land, infrastructure, or development decision,
                start here.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-orange mb-1 block">Direct Email</span>
                <a href="mailto:contact@kolabs.design" className="font-serif text-2xl border-b border-orange text-ink hover:text-orange transition-colors">contact@kolabs.design</a>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 md:p-7 rounded-none border border-ink/20 flex flex-col h-full shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
