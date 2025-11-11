import NewClientForm from '@/components/NewClientForm';

export default function NewClientPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Adicionar Novo Cliente</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <NewClientForm />
      </div>
    </div>
  );
}
