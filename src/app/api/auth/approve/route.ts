import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase/api';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');
  const action = searchParams.get('action');

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = '/auth/action-completed';

  if (!userId || !action || !['approve', 'reject'].includes(action)) {
    redirectTo.searchParams.set('error', 'Invalid action link.');
    return NextResponse.redirect(redirectTo);
  }

  // Get user details to notify them
  const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
  if (userError || !user) {
    redirectTo.searchParams.set('error', 'User not found.');
    return NextResponse.redirect(redirectTo);
  }

  if (action === 'approve') {
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { user_metadata: { ...user.user_metadata, is_approved: true } }
    );

    if (updateError) {
      redirectTo.searchParams.set('error', `Failed to approve user: ${updateError.message}`);
      return NextResponse.redirect(redirectTo);
    }

    // Optional: Send a "Welcome" email to the user
    await resend.emails.send({
        from: 'noreply@truecoffeeinc.com.br',
        to: user.email!,
        subject: 'Sua conta no Coffee CRM foi aprovada!',
        html: `<p>Boas notícias! Sua conta foi aprovada por um administrador. Agora você pode fazer login e acessar o dashboard.</p>`
    });

    redirectTo.searchParams.set('message', 'User approved successfully.');
    return NextResponse.redirect(redirectTo);

  } else if (action === 'reject') {
    // Notify the user first
    await resend.emails.send({
      from: 'noreply@truecoffeeinc.com.br',
      to: user.email!,
      subject: 'Atualização sobre sua conta no Coffee CRM',
      html: `<p>Olá, agradecemos seu interesse. No momento, não foi possível aprovar sua conta de acesso ao Coffee CRM.</p>`
    });

    // Then delete the user
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      redirectTo.searchParams.set('error', `Failed to reject user: ${deleteError.message}`);
      return NextResponse.redirect(redirectTo);
    }
    
    redirectTo.searchParams.set('message', 'User rejected and deleted successfully.');
    return NextResponse.redirect(redirectTo);
  }

  return NextResponse.redirect(redirectTo);
}
