'use client'

import { createClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const supabase = createClient()
  const router = useRouter()

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (isSignUp) {
      // Handle Sign Up
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(data.message || 'Cadastro enviado! Por favor, verifique seu e-mail para o link de confirmação.')
      } else {
        setError(data.error || 'Ocorreu um erro no cadastro.')
      }
    } else {
      // Handle Sign In
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return
      }

      // Check for approval status
      if (data.user?.user_metadata?.is_approved) {
        router.push('/dashboard')
      } else {
        // Sign out the user immediately if they are not approved
        await supabase.auth.signOut()
        setError('Sua conta ainda não foi aprovada por um administrador. Por favor, aguarde o e-mail de confirmação.')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex border-b">
        <button onClick={() => setIsSignUp(false)} className={`w-1/2 py-2 ${!isSignUp ? 'border-b-2 border-indigo-600 font-semibold text-indigo-600' : 'text-gray-500'}`}>
          Entrar
        </button>
        <button onClick={() => setIsSignUp(true)} className={`w-1/2 py-2 ${isSignUp ? 'border-b-2 border-indigo-600 font-semibold text-indigo-600' : 'text-gray-500'}`}>
          Cadastrar
        </button>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {isSignUp ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>

      {message && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md">{message}</p>}
      {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
    </div>
  )
}
