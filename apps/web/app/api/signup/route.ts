import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    // Validate the input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    // Call your backend API
    const apiResponse = await fetch('http://localhost:3002/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json(
        { error: errorData.message || 'Registration failed.' },
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();

    // Return the JWT token to the client
    return NextResponse.json({ token: data.token });
  } catch (error) {
    console.error('Error in /api/signup:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
