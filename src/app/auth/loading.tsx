export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-700">Carregando...</h1>
        <p className="mt-4 text-gray-600">Por favor, aguarde um momento.</p>
      </div>
    </div>
  );
}
