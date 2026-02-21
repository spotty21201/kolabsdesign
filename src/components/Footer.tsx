import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-ink/15 mt-24">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6 md:order-2">
            <Link href="/collab" className="text-charcoal/40 hover:text-charcoal/50">
              Contact
            </Link>
            <a href="#" className="text-charcoal/40 hover:text-charcoal/50">
              LinkedIn
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex gap-6 items-center border-t md:border-t-0 md:border-r border-ink/15 pt-6 md:pt-0 md:pr-6">
              <img src="/logo-aim.png" alt="AIM Logo" className="h-6 object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              <img src="/logo-hda.png" alt="HDA Logo" className="h-6 object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              <img src="/logo-kolabs.png" alt="Kolabs Logo" className="h-6 object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start">
              <p className="text-center md:text-left text-xs font-bold uppercase tracking-widest text-charcoal/40">
                The AIM + HDA + Kolabs Collective
              </p>
              <p className="text-center md:text-left text-sm text-charcoal/50">
                &copy; {new Date().getFullYear()} Kolabs.Design. Decision Intelligence Think Tank.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
