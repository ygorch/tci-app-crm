import { createClient } from '@/utils/supabase/server'
import SignOutButton from '@/components/SignOutButton'

export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Coffee CRM</h1>
        {user ? (
          <>
            <p className="mt-4 text-lg">Bem-vindo, {user.email}!</p>
            <SignOutButton />
          </>
        ) : (
          <p className="mt-4 text-lg">Faça login para continuar.</p>
        )}
      </div>
    </main>
  );
}
