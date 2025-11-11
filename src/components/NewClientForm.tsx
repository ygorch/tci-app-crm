'use client';

import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewClientForm() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('clients')
      .insert([
        { 
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          knowledge_level: formData.get('knowledge_level'),
        },
      ])
      .select();

    if (error) {
      alert('Erro ao cadastrar cliente: ' + error.message);
    } else {
      alert('Cliente cadastrado com sucesso!');
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
        <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
        <input type="tel" name="phone" id="phone" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
      <div>
        <label htmlFor="knowledge_level" className="block text-sm font-medium text-gray-700">Nível de Conhecimento</label>
        <select name="knowledge_level" id="knowledge_level" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          <option value="Explorador/Amador/Iniciante">Explorador/Amador/Iniciante</option>
          <option value="Coffee Lover">Coffee Lover</option>
          <option value="Coffee Lover Pro">Coffee Lover Pro</option>
          <option value="Barista">Barista</option>
          <option value="Mestre Cafeeiro">Mestre Cafeeiro</option>
        </select>
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Salvar Cliente
        </button>
      </div>
    </form>
  );
}
