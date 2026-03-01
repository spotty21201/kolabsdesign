import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
      { label: 'LinkedIn', href: '#' },
      { label: 'Publications', href: '#' },
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
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Hero Section */}
      <section className="mb-20 pt-8 md:pt-16">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-charcoal leading-[1.0] tracking-tight text-balance mb-6">
          Collab with Kolabs.
        </h1>
        <div className="max-w-3xl space-y-5 text-charcoal/65">
          <p className="text-xl md:text-2xl text-pretty leading-relaxed md:leading-relaxed">
            Kolabs.Design is an AI Think Tank building the decision intelligence layer for land, infrastructure, and capital deployment.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            We help developers, landowners, Danantara's SOEs companies and Indonesian conglomerate leadership move from ambiguity to board-ready direction through tools, scenarios, briefs, and repeatable playbooks that stand up to budgets, regulations, timelines, and stakeholders.
          </p>
        </div>
      </section>



      {/* People Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-serif text-ink mb-8 border-b border-ink/15 pb-4">
          People
        </h2>

        <div className="space-y-10">
          {people.map((person, index) => (
            <article
              key={person.name}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-ink/20 bg-white overflow-hidden"
            >
              <div
                className={`relative min-h-[320px] lg:min-h-[380px] p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-ink/15 bg-gradient-to-br ${person.accent} text-white ${
                  index % 2 === 1 ? 'lg:order-2 lg:border-r-0 lg:border-l' : ''
                }`}
              >
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '18px 18px' }} />
                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-white/70">
                      Portrait
                    </span>
                    <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-white/50">
                      Kolabs
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-6">
                    <div className="w-full max-w-[18rem]">
                      <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/15 bg-black/20 shadow-2xl">
                        <Image
                          src={person.imageSrc}
                          alt={person.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 18rem"
                          className="object-cover object-center grayscale"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                      </div>
                      <p className="mt-5 max-w-[14rem] text-sm leading-relaxed text-white/75">
                        A quiet, formal portrait treatment to keep the page grounded and institutional.
                      </p>
                    </div>
                    <div className="hidden md:block text-right">
                      <div className="text-6xl lg:text-7xl font-serif leading-none text-white/20">{`0${index + 1}`}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 md:p-8 lg:p-10 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="max-w-xl">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-1">{person.name}</h3>
                  <p className="text-sm text-primary mb-5 font-bold uppercase tracking-widest">{person.role}</p>
                  <div className="space-y-4 mb-7 text-sm md:text-base text-charcoal/70 leading-relaxed">
                    {person.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-7">
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
      <section id="contact" className="bg-soft-gray text-ink p-8 md:p-16 rounded-none border border-ink/15">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif text-ink leading-tight tracking-tight mb-6">
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
                <a href="mailto:hello@kolabs.design" className="font-serif text-2xl border-b border-orange text-ink hover:text-orange transition-colors">hello@kolabs.design</a>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 md:p-10 rounded-none border border-ink/20 flex flex-col h-full shadow-sm">
            <form className="space-y-6 flex flex-col flex-grow font-sans">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-ink/70 mb-2">Name / Org</label>
                <input type="text" className="w-full bg-transparent border-b border-ink/20 focus:border-orange text-ink py-2 outline-none text-sm transition-colors placeholder:text-ink/30" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-ink/70 mb-2">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-ink/20 focus:border-orange text-ink py-2 outline-none text-sm transition-colors placeholder:text-ink/30" placeholder="jane@example.com" />
              </div>
              <div className="flex-grow flex flex-col">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-ink/70 mb-2">Inquiry</label>
                <textarea className="w-full bg-transparent border-b border-ink/20 focus:border-orange text-ink py-2 outline-none text-sm resize-none transition-colors flex-grow min-h-[5rem] placeholder:text-ink/30" placeholder="Briefly outline the decision, asset, or constraint you need clarity on..."></textarea>
              </div>
              <button type="button" className="w-full py-4 bg-orange text-white text-xs font-bold uppercase tracking-widest hover:bg-orange/90 transition-colors mt-auto">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
