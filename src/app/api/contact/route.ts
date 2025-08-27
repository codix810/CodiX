// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import { Contact } from '../../../../models/Contact';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newMessage = await Contact.create({ name, email, phone, message });
    return NextResponse.json({ success: true, data: newMessage });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const messages = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
