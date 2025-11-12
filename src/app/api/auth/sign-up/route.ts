import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase/api';

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
        status: 'pending',
      },
    },
  });

  if (signUpError) {
    return new NextResponse(JSON.stringify({ error: signUpError.message }), { status: 400 });
  }
  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'User could not be created' }), { status: 500 });
  }

  return new NextResponse(JSON.stringify({ message: 'User created successfully. Awaiting admin approval.' }), { status: 201 });
}
