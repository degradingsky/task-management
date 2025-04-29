'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth0Client } from '../../lib/auth0';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const client = await getAuth0Client();
        await client.handleRedirectCallback();
        router.push('/');
      } catch (error) {
        console.error('Error handling callback:', error);
        // router.push('/error?message=Authentication failed');
      }
    };

    if (router) {
      handleCallback();
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing authentication...</h1>
        <p>Please wait while we log you in.</p>
      </div>
    </div>
  );
}