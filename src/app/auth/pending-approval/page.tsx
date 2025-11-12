export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Quase lá!</h1>
        <p className="mt-4 text-gray-600">
          Obrigado por confirmar seu endereço de e-mail.
        </p>
        <p className="mt-2 text-gray-600">
          Sua conta agora está aguardando a aprovação de um administrador. Você receberá um e-mail final assim que sua conta for ativada.
        </p>
      </div>
    </div>
  );
}
