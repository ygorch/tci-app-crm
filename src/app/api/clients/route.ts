import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase/api';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  // It's a good practice to use a dedicated, long, random string for your API keys
  // rather than reusing the Supabase service key directly in headers.
  // For this example, we'll use the service key as the bearer token for simplicity.
  const apiKey = process.env.API_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (authHeader !== `Bearer ${apiKey}`) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data: clients, error } = await supabaseAdmin.from('clients').select('*');

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const apiKey = process.env.API_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (authHeader !== `Bearer ${apiKey}`) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const clientData = await request.json();
    const { data, error } = await supabaseAdmin
      .from('clients')
      .insert(clientData)
      .select()
      .single();

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 400, // Bad Request, likely invalid data
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse(JSON.stringify(data), {
      status: 201, // Created
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new NextResponse(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
