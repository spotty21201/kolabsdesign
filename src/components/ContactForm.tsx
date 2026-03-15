'use client';

import React from 'react';

export function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const inquiry = (form.elements.namedItem('inquiry') as HTMLTextAreaElement)?.value || '';
    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body = encodeURIComponent(`Name / Org: ${name}\nEmail: ${email}\n\nInquiry:\n${inquiry}`);
    window.location.href = `mailto:contact@kolabs.design?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-grow font-sans">
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-ink/70 mb-2">Name / Org</label>
        <input
          name="name"
          type="text"
          className="w-full bg-transparent border-b border-ink/20 focus:border-orange text-ink py-2 outline-none text-sm transition-colors placeholder:text-ink/30"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest text-ink/70 mb-2">Email</label>
        <input
          name="email"
          type="email"
          className="w-full bg-transparent border-b border-ink/20 focus:border-orange text-ink py-2 outline-none text-sm transition-colors placeholder:text-ink/30"
          placeholder="jane@example.com"
        />
      </div>
      <div className="flex-grow flex flex-col">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-ink/70 mb-2">Inquiry</label>
        <textarea
          name="inquiry"
          className="w-full bg-transparent border-b border-ink/20 focus:border-orange text-ink py-2 outline-none text-sm resize-none transition-colors flex-grow min-h-[5rem] placeholder:text-ink/30"
          placeholder="Briefly outline the decision, asset, or constraint you need clarity on..."
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-orange text-white text-xs font-bold uppercase tracking-widest hover:bg-orange/90 transition-colors mt-auto"
      >
        Submit Inquiry
      </button>
    </form>
  );
}
