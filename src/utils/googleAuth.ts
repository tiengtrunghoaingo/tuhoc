/**
 * Google & Gmail Authentication Utilities for Tiếng Trung Hoài Ngô
 * Supports Google Identity Services (GSI), Google UserInfo OAuth API,
 * and robust Gmail verification.
 */

import { UserProfile } from '../types';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (notification?: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
          disableAutoSelect: () => void;
        };
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (tokenResponse: any) => void;
            error_callback?: (error: any) => void;
          }) => {
            requestAccessToken: (overrideConfig?: any) => void;
          };
        };
      };
    };
  }
}

export interface GoogleAuthResult {
  email: string;
  name: string;
  avatar?: string;
  googleId: string;
  emailVerified: boolean;
}

// Master Admin Email for secret system elevation
export const MASTER_ADMIN_EMAIL = 'canhln1224@gmail.com';

/**
 * Validate email format with standard RFC 5322 regex
 */
export function isValidEmailFormat(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim());
}

/**
 * Check if the email address is a Gmail address
 */
export function isGmailAddress(email: string): boolean {
  if (!isValidEmailFormat(email)) return false;
  const domain = email.trim().split('@')[1]?.toLowerCase();
  return domain === 'gmail.com' || domain === 'googlemail.com';
}

/**
 * Parse a JWT token from Google Identity credential
 */
export function parseJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to parse JWT:', e);
    return null;
  }
}

/**
 * Trigger Real Google Sign-In flow
 * Uses Google Identity Services (GSI) OAuth 2.0 Token Client or fallback Google authentication
 */
export async function triggerGoogleSignIn(): Promise<GoogleAuthResult> {
  const googleClientId =
    ((import.meta as any).env?.VITE_GOOGLE_CLIENT_ID as string) ||
    '1084224792612-4o4g8bkv4i72aee6fgl49a8r2q893qsm.apps.googleusercontent.com'; // Standard Public Client ID if available

  return new Promise((resolve, reject) => {
    // Check if window.google is loaded
    if (window.google?.accounts?.oauth2 && googleClientId) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'email profile openid',
          callback: async (response: any) => {
            if (response.error) {
              reject(new Error(response.error_description || response.error));
              return;
            }

            try {
              // Fetch real user info from Google's standard UserInfo API
              const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                  Authorization: `Bearer ${response.access_token}`,
                },
              });

              if (!res.ok) {
                throw new Error('Không thể tải thông tin từ Google');
              }

              const userInfo = await res.json();
              if (!userInfo.email) {
                throw new Error('Không tìm thấy địa chỉ email trong tài khoản Google');
              }

              resolve({
                email: userInfo.email.toLowerCase(),
                name: userInfo.name || userInfo.email.split('@')[0],
                avatar: userInfo.picture,
                googleId: userInfo.sub,
                emailVerified: Boolean(userInfo.email_verified),
              });
            } catch (err: any) {
              reject(err);
            }
          },
          error_callback: (err: any) => {
            reject(new Error(err?.message || 'Đăng nhập Google bị hủy hoặc thất bại'));
          },
        });

        client.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (err) {
        console.warn('Google GSI init failed, using fallback:', err);
      }
    }

    // Fallback if GSI script is blocked by browser privacy or client_id is in local preview sandbox
    // Emulate real Google account connection prompt
    reject(new Error('GOOGLE_GSI_NOT_AVAILABLE'));
  });
}

/**
 * Build a UserProfile from authenticated Google or Email credentials
 */
export function buildUserProfile(
  email: string,
  name?: string,
  avatar?: string,
  provider: 'google' | 'facebook' | 'email' = 'google'
): UserProfile {
  const cleanEmail = email.trim().toLowerCase();
  const isAdmin = cleanEmail === MASTER_ADMIN_EMAIL.toLowerCase();

  return {
    id: isAdmin ? 'ADMIN-001' : `u_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: isAdmin
      ? 'Cảnh LN (Quản Trị Viên)'
      : name?.trim() || cleanEmail.split('@')[0] || 'Học viên Hoài Ngô',
    email: cleanEmail,
    avatar:
      avatar ||
      (isAdmin
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        : `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanEmail}`),
    provider,
    isVip: true,
    joinedDate: isAdmin ? '2026-05-01' : new Date().toLocaleDateString('vi-VN'),
  };
}
