import { createClient } from '@/utils/supabase/server';
import ClientsTable from '@/components/ClientsTable';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: clients, error } = await supabase.from('clients').select('*');

  if (error) {
    console.error('Error fetching clients:', error);
    // Handle error state appropriately in a real app
    return <p>Error loading clients.</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Link href="/dashboard/clients/new">
          <span className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            Adicionar Cliente
          </span>
        </Link>
      </div>
      <ClientsTable clients={clients} />
    </div>
  );
}
