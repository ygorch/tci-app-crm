import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase/api';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const origin = request.headers.get('origin');

  if (!email || !password) {
    return new NextResponse(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
  }

  // Step 1: Create the user in Supabase Auth.
  const { data: { user }, error: signUpError } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      data: {
        is_approved: false, // Set default approval status
      },
    },
  });

  if (signUpError) {
    return new NextResponse(JSON.stringify({ error: signUpError.message }), { status: 400 });
  }
  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'User could not be created' }), { status: 500 });
  }

  // Step 2: Generate the email confirmation link.
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'signup',
    email: user.email!,
    password: password,
  });

  if (linkError) {
    await supabaseAdmin.auth.admin.deleteUser(user.id);
    return new NextResponse(JSON.stringify({ error: `Could not generate confirmation link: ${linkError.message}` }), { status: 500 });
  }

  // Step 3: Send the confirmation email to the user.
  const confirmationUrl = `${origin}/api/auth/confirm?token=${linkData.properties.hashed_token}&type=signup&next=/auth/pending-approval`;

  try {
    await resend.emails.send({
      from: 'noreply@truecoffeeinc.com.br',
      to: user.email!,
      subject: 'Confirme seu cadastro no Coffee CRM',
      html: `<p>Bem-vindo! Para continuar, por favor, confirme seu endereço de e-mail clicando no link a seguir: <a href="${confirmationUrl}">Confirmar E-mail</a></p>`,
    });
  } catch (emailError) {
    // If the email fails to send, delete the user to allow them to retry.
    await supabaseAdmin.auth.admin.deleteUser(user.id);
    return new NextResponse(JSON.stringify({ error: 'Could not send confirmation email' }), { status: 500 });
  }

  return new NextResponse(JSON.stringify({ message: 'User created. Please check your email for a confirmation link.' }), { status: 201 });
}
