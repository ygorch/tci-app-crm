import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseAdmin } from '@/utils/supabase/api'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = 'beba@truecoffeeinc.com.br'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next

  if (!token_hash || !type) {
    redirectTo.pathname = '/auth/error'
    redirectTo.searchParams.set('error', 'Invalid confirmation link.')
    return NextResponse.redirect(redirectTo)
  }

  const { data: { user }, error } = await supabaseAdmin.auth.verifyOtp({
    type,
    token_hash,
  })

  if (error || !user) {
    redirectTo.pathname = '/auth/error'
    redirectTo.searchParams.set('error', 'Invalid or expired token.')
    return NextResponse.redirect(redirectTo)
  }

  // User's email is now confirmed. Send approval email to admin.
  const approveUrl = `${redirectTo.origin}/api/auth/approve?user_id=${user.id}&action=approve`
  const rejectUrl = `${redirectTo.origin}/api/auth/approve?user_id=${user.id}&action=reject`

  try {
    await resend.emails.send({
      from: 'noreply@truecoffeeinc.com.br',
      to: ADMIN_EMAIL,
      subject: 'Novo Usuário Aguardando Aprovação',
      html: `
        <p>Um novo usuário se cadastrou no Coffee CRM e está aguardando sua aprovação.</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p>
          <a href="${approveUrl}" style="padding: 10px; background-color: green; color: white; text-decoration: none; margin-right: 10px;">Aprovar Usuário</a>
          <a href="${rejectUrl}" style="padding: 10px; background-color: red; color: white; text-decoration: none;">Rejeitar Usuário</a>
        </p>
      `,
    })
  } catch (emailError) {
    // This is a critical error, as the user is now in a pending state without admin notification.
    // In a production app, you'd want to log this to a monitoring service.
    redirectTo.pathname = '/auth/error'
    redirectTo.searchParams.set('error', 'Could not notify administrator. Please contact support.')
    return NextResponse.redirect(redirectTo)
  }

  // Redirect the user to a page informing them to wait for approval
  redirectTo.pathname = '/auth/pending-approval'
  return NextResponse.redirect(redirectTo)
}
