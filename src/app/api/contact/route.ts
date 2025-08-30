import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Contact from "../../../../models/Contact";

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { name, email, message, rating } = body;

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating is required and must be 1-5" }, { status: 400 });
  }

  try {
    const newContactX = await Contact.create({ name, email, message, rating });
    return NextResponse.json({ message: "تم حفظ البيانات بنجاح", data: newContactX });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "حدث خطأ في السيرفر" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const contactsX = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contactsX);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "حدث خطأ في السيرفر" }, { status: 500 });
  }
}
