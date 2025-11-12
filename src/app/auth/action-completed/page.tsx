'use client';

import { useSearchParams } from 'next/navigation';

export default function ActionCompletedPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
        {error ? (
          <>
            <h1 className="text-2xl font-bold text-red-700">Ocorreu um Erro</h1>
            <p className="mt-4 text-gray-600">{error}</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-green-700">Ação Concluída</h1>
            <p className="mt-4 text-gray-600">{message || 'A operação foi concluída com sucesso.'}</p>
          </>
        )}
      </div>
    </div>
  );
}
