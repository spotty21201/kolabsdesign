import React from 'react';
import Link from 'next/link';
import { signInAdminAction } from '@/app/admin/actions';

function getErrorMessage(errorCode: string | undefined) {
  switch (errorCode) {
    case 'missing_credentials':
      return 'Email and password are required.';
    case 'not_allowed':
      return 'This account is not allowed to access the CMS.';
    case 'invalid_login':
      return 'Invalid login. Check your credentials.';
    default:
      return null;
  }
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const errorMessage = getErrorMessage(params.error);

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="text-4xl font-serif text-charcoal mb-2">CMS Login</h1>
      <p className="text-charcoal/60 mb-8">Restricted to approved admin accounts.</p>

      {errorMessage ? (
        <p className="mb-6 border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">{errorMessage}</p>
      ) : null}

      <form action={signInAdminAction} className="space-y-5 bg-white border border-ink/15 p-6">
        <label className="space-y-2 block">
          <span className="text-xs uppercase tracking-widest text-charcoal/50">Email</span>
          <input name="email" type="email" required className="w-full border border-ink/20 px-3 py-2" />
        </label>

        <label className="space-y-2 block">
          <span className="text-xs uppercase tracking-widest text-charcoal/50">Password</span>
          <input name="password" type="password" required className="w-full border border-ink/20 px-3 py-2" />
        </label>

        <button type="submit" className="w-full py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest">
          Sign in
        </button>
      </form>

      <Link href="/" className="inline-block mt-6 text-sm text-charcoal/60 hover:text-charcoal">
        Back to site
      </Link>
    </div>
  );
}
