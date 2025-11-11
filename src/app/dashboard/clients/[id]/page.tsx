import { createClient } from '@/utils/supabase/server';

type ClientProfilePageProps = {
  params: {
    id: string;
  };
};

export default async function ClientProfilePage({ params }: ClientProfilePageProps) {
  const supabase = createClient();
  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !client) {
    return <p>Cliente não encontrado.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Perfil de {client.name}</h1>
      {/* O resto dos detalhes do perfil e a timeline de interações virão aqui */}
    </div>
  );
}
