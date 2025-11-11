import PublicClientForm from '@/components/PublicClientForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Junte-se ao nosso clube!</h1>
          <p className="mt-2 text-gray-600">
            Cadastre-se para receber novidades, promoções exclusivas e ganhe 10% de desconto na sua próxima compra na loja!
          </p>
        </div>
        <PublicClientForm />
      </div>
    </div>
  );
}
