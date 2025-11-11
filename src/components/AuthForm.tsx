'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabaseClient'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, router])

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="minimal"
      providers={[]}
      redirectTo="/"
    />
  )
}
