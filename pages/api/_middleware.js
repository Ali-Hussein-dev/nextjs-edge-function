import { NextResponse } from 'next/server';
import { Magic } from '@magic-sdk/admin';

export let mAdmin;

const MAGIC_SECRET_KEY = 'secret'; // process.env.NEXT_PUBLIC_MAGIC_SECRET_KEY;

if (!MAGIC_SECRET_KEY) throw Error('MAGIC_SECRET_KEY is undefined');

if (!mAdmin) {
  mAdmin = new Magic(MAGIC_SECRET_KEY);
}

export const middleware = (req) => {
  const isAuthenticated = req.cookies.isAuthenticated;
  const pageName = req.page.name;
  const country = req.geo?.country;
  console.info('pages:mw ------->', { isAuthenticated, pageName, country });

  if (isAuthenticated && (pageName === '/auth' || pageName === '/')) {
    return NextResponse.redirect('/clients/account');
  }
  return NextResponse.next();
};
