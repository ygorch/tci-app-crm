'use client';

import { createClient } from '@/lib/supabaseClient';
import { useState } from 'react';

export default function PublicClientForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const supabase = createClient();
    
    const { error } = await supabase
      .from('clients')
      .insert([
        { 
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          birthday: formData.get('birthday'),
          knowledge_level: formData.get('knowledge_level'),
          source_channel: 'Loja Física', // Automatically set the source
        },
      ]);

    if (error) {
      alert('Erro ao realizar o cadastro. Por favor, tente novamente. Mensagem: ' + error.message);
    } else {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800">Cadastro realizado com sucesso!</h2>
        <p className="mt-4 text-gray-700">
          Apresente o código abaixo no caixa para garantir seu desconto de 10% na próxima compra.
        </p>
        <div className="mt-6 p-4 bg-white border-2 border-dashed border-green-600 rounded-lg">
          <p className="text-3xl font-bold text-green-700 tracking-widest">CAFELOVER10</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Seu Nome Completo</label>
        <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Seu Melhor Email</label>
        <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">WhatsApp (opcional)</label>
        <input type="tel" name="phone" id="phone" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
       <div>
        <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">Data de Aniversário (opcional)</label>
        <input type="date" name="birthday" id="birthday" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>
      <div>
        <label htmlFor="knowledge_level" className="block text-sm font-medium text-gray-700">Como você se identifica no mundo do café?</label>
        <select name="knowledge_level" id="knowledge_level" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          <option value="Explorador/Amador/Iniciante">Sou um explorador, começando a jornada!</option>
          <option value="Coffee Lover">Sou um Coffee Lover, já aprecio um bom café especial.</option>
          <option value="Coffee Lover Pro">Sou um Coffee Lover Pro, entendo de métodos e grãos.</option>
          <option value="Barista">Sou um Barista, preparo cafés incríveis em casa.</option>
          <option value="Mestre Cafeeiro">Sou um Mestre Cafeeiro, respiro e vivo café.</option>
        </select>
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Quero meu desconto!
        </button>
      </div>
    </form>
  );
}
