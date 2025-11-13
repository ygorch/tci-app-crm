'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-700">Erro de Autenticação</h1>
        <p className="mt-4 text-gray-600">
          {error || 'Ocorreu um erro inesperado. Por favor, tente novamente.'}
        </p>
        <Link href="/login" className="mt-6 inline-block text-indigo-600 hover:text-indigo-800">
          Voltar para o Login
        </Link>
      </div>
    </div>
  );
}
