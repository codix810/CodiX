import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import { Contact } from '../../../../../models/Contact';

export async function DELETE(req, { params }) {
  await connectDB();

  const id = params.id;

  try {
    const deletedMessage = await Contact.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json({ success: false, message: 'لم يتم العثور على الرسالة' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'تم حذف الرسالة بنجاح' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'فشل في الحذف' }, { status: 500 });
  }
}
