'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get('type'); // or check for `success=true` etc.

    if (type === 'success') {
      window.opener?.postMessage('payment_success', '*');
      window.close();
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-semibold">Processing payment...</p>
    </div>
  );
}