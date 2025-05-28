'use server';
import { fetchAPI } from '../../utils/api'
import { cookies } from 'next/headers';


type SignInState = {
  success: boolean;
  user?: { id: string; email: string; role: string };
  error?: string | null;
};

export async function signInAction(prevState: SignInState, formData: FormData): Promise<SignInState> {
  try {
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    const data = await fetchAPI('/auth/signin', 'POST', { email, password });
    const cookieStore = await cookies();
    cookieStore.set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: 'strict',
    });
    return { success: true, user: { id: data.user._id, email: data.user.email, role: data.user.role } };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
    return { success: false, error: errorMessage };
  }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
  return { success: true };
}
