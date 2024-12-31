/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const key = 'anket';
const encodedKey = new TextEncoder().encode(key);
export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    console.error('Failed to verify session');
  }
}

export async function createSession(userToken: string) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userToken, expiresAt: expiresAt.getTime() / 1000 });

  (await cookies()).set({
    name: 'session',
    value: session,
    httpOnly: true,
    expires: expiresAt,
  });
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    ; (await cookies()).set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: 'lax',
      path: '/',
    })
}

export async function verifySession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) {
    console.log("No session found");
    return null;
  }

  const decryptedSession = await decrypt(session);
  return decryptedSession?.userToken;
}

export async function deleteSession() {
  (await cookies()).delete('session');
}