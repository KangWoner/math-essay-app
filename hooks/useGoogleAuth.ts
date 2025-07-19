import { useEffect, useState } from 'react';

interface UseGoogleAuthResult {
  isGapiReady: boolean;
  isSignedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  authError: string | null;
}

const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
];

declare global {
  interface Window {
    gapi: any;
  }
}

export function useGoogleAuth(): UseGoogleAuthResult {
  const [isGapiReady, setIsGapiReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client:auth2', initClient);
    };
    script.onerror = () => setAuthError('gapi 로딩 실패');
    document.body.appendChild(script);
  }, []);

  const initClient = async () => {
    try {
      const clientId = (window as any).GOOGLE_CLIENT_ID || '';
      await window.gapi.client.init({
        apiKey: process.env.GEMINI_API_KEY,
        clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      setIsGapiReady(true);
      const authInstance = window.gapi.auth2.getAuthInstance();
      setIsSignedIn(authInstance.isSignedIn.get());
      authInstance.isSignedIn.listen(setIsSignedIn);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Google API 초기화 실패';
      setAuthError(msg);
    }
  };

  const signIn = async () => {
    const auth = window.gapi.auth2.getAuthInstance();
    await auth.signIn();
  };

  const signOut = async () => {
    const auth = window.gapi.auth2.getAuthInstance();
    await auth.signOut();
  };

  return { isGapiReady, isSignedIn, signIn, signOut, authError };
}
