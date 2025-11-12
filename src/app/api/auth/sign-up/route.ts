import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase/api';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new NextResponse(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
  }

  // Step 1: Create the user in Supabase Auth but do not confirm their email yet.
  const { data: { user }, error: signUpError } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      // Store the initial approval status in the user's metadata
      data: {
        is_approved: false,
      },
    },
  });

  if (signUpError) {
    return new NextResponse(JSON.stringify({ error: signUpError.message }), { status: 400 });
  }
  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'User could not be created' }), { status: 500 });
  }

  // Step 2: Send the email confirmation link using Resend
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'signup', // Use the 'signup' link type for new user email verification
    email: user.email!,
  });

  if (linkError) {
    // In a real app, you might want to delete the user here to allow them to retry.
    return new NextResponse(JSON.stringify({ error: 'Could not generate confirmation link' }), { status: 500 });
  }

  // The linkData contains a hashed token and other properties.
  // We need to construct the verification URL manually for our custom flow.
  const confirmationUrl = `${request.headers.get('origin')}/api/auth/confirm?token_hash=${linkData.properties.hashed_token}&type=signup&next=/auth/confirmed`;

  try {
    await resend.emails.send({
      from: 'noreply@truecoffeeinc.com.br',
      to: user.email!,
      subject: 'Confirme seu cadastro no Coffee CRM',
      html: `<p>Bem-vindo! Por favor, confirme seu endereço de e-mail clicando no link a seguir: <a href="${confirmationUrl}">Confirmar E-mail</a></p>`,
    });
  } catch (emailError) {
    // Again, consider user deletion for retryability
    return new NextResponse(JSON.stringify({ error: 'Could not send confirmation email' }), { status: 500 });
  }

  return new NextResponse(JSON.stringify({ message: 'User created. Please check your email for a confirmation link.' }), { status: 201 });
}
