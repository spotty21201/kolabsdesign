import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-ink/15 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <img
            src="/logo-kolabs.png"
            alt="Kolabs.Design logo"
            className="h-auto w-28 object-contain opacity-35 [filter:brightness(0)_saturate(100%)]"
          />
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs font-bold uppercase tracking-widest text-charcoal/40">
              The AIM + HDA + Kolabs Collective
            </p>
            <p className="text-sm text-charcoal/50">
              &copy; {new Date().getFullYear()} Kolabs.Design. Decision Intelligence Think Tank.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
