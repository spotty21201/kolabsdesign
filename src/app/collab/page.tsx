import React from 'react';

export default function CollabPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Hero Section */}
      <section className="mb-20 pt-8 md:pt-16">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-charcoal leading-[1.0] tracking-tight text-balance mb-6">
          Collab with Kolabs.
        </h1>
        <p className="text-xl md:text-2xl text-charcoal/60 max-w-3xl text-pretty mb-10 leading-relaxed md:leading-relaxed">
          The decision intelligence layer for land, infrastructure, and capital deployment. We partner with SOE leadership, master developers, and landholders.
        </p>
      </section>



      {/* People Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-serif text-ink mb-8 border-b border-ink/15 pb-4">
          People
        </h2>
        
        <div className="space-y-8">
          {/* Doddy */}
          <div className="bg-white p-6 md:p-8 flex flex-col md:flex-row gap-8 border border-ink/20 rounded-none">
            <div className="flex-grow">
              <h3 className="text-3xl font-serif font-bold text-charcoal mb-1">Doddy</h3>
              <p className="text-sm text-primary mb-4 font-bold uppercase tracking-widest">Founder & Lead Strategist</p>
              <p className="text-charcoal/70 mb-6 leading-relaxed text-sm">
                Driving the architectural and strategic vision. Bridging the gap between computational models and executive decision-making in urban and infrastructure contexts.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] font-sans uppercase tracking-widest text-charcoal/60 bg-soft-gray px-2 py-1 border border-ink/5">Architecture</span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-charcoal/60 bg-soft-gray px-2 py-1 border border-ink/5">AI Strategy</span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-charcoal/60 bg-soft-gray px-2 py-1 border border-ink/5">Urban Economics</span>
              </div>
              <div className="flex gap-6">
                <a href="#" className="inline-flex items-center text-xs font-sans font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors">
                  LinkedIn <span className="ml-1 text-orange">&rarr;</span>
                </a>
                <a href="#" className="inline-flex items-center text-xs font-sans font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors">
                  Publications <span className="ml-1 text-orange">&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Farid */}
          <div className="bg-white p-6 md:p-8 flex flex-col md:flex-row gap-8 border border-ink/20 rounded-none">
            <div className="flex-grow">
              <h3 className="text-3xl font-serif font-bold text-charcoal mb-1">Farid</h3>
              <p className="text-sm text-primary mb-4 font-bold uppercase tracking-widest">Technical Lead</p>
              <p className="text-charcoal/70 mb-6 leading-relaxed text-sm">
                Architecting the data pipelines and computational models that power our decision tools, ensuring robust validation and performance.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[10px] font-sans uppercase tracking-widest text-charcoal/60 bg-soft-gray px-2 py-1 border border-ink/5">Data Engineering</span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-charcoal/60 bg-soft-gray px-2 py-1 border border-ink/5">Full-Stack</span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-charcoal/60 bg-soft-gray px-2 py-1 border border-ink/5">Model Validation</span>
              </div>
              <div className="flex gap-6">
                <a href="#" className="inline-flex items-center text-xs font-sans font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-colors">
                  LinkedIn <span className="ml-1 text-orange">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Section */}
      <section id="contact" className="bg-soft-gray text-ink p-8 md:p-16 rounded-none border border-ink/15">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif text-ink leading-tight tracking-tight mb-6">
              Engage with the Think Tank.
            </h2>
            <p className="font-sans text-ink/60 mb-8 text-base leading-relaxed max-w-md">
              Book a briefing using the Calendly link below, or send us an email directly to discuss how our tools can model outcomes for your next acquisition or masterplan.
            </p>
            
            <div className="mb-10 font-sans">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/50 mb-3 block">How to engage</span>
              <ul className="space-y-2 text-sm text-ink/70">
                <li className="flex items-center gap-2.5"><span className="w-1 h-1 bg-orange rounded-full"></span> Briefing (60 min)</li>
                <li className="flex items-center gap-2.5"><span className="w-1 h-1 bg-ink/30 rounded-full"></span> Pilot / Prototype</li>
                <li className="flex items-center gap-2.5"><span className="w-1 h-1 bg-ink/30 rounded-full"></span> Partnership</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-orange mb-1 block">Direct Email</span>
                <a href="mailto:hello@kolabs.design" className="font-serif text-2xl border-b border-orange text-ink hover:text-orange transition-colors">hello@kolabs.design</a>
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-orange mb-1 block">Schedule</span>
                <a href="#" className="font-serif text-2xl border-b border-orange text-ink hover:text-orange transition-colors">Calendly / 60 Min Briefing</a>
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
                <textarea className="w-full bg-transparent border-b border-ink/20 focus:border-orange text-ink py-2 outline-none text-sm resize-none transition-colors flex-grow min-h-[5rem] placeholder:text-ink/30" placeholder="Briefly describe your focus..."></textarea>
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
