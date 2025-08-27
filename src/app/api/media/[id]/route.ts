import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import { MediaItem } from '../../../../../models/MediaItem';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🗑️ DELETE: مسح عنصر بالكامل
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;

  try {
    await connectDB();
    const item = await MediaItem.findById(id);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // حذف الصور القديمة من Cloudinary
    if (item.images && item.images.length > 0) {
      for (const img of item.images) {
        if (img.publicId) await cloudinary.uploader.destroy(img.publicId);
      }
    }

    // حذف الفيديو من Cloudinary
    if (item.video?.publicId) {
      await cloudinary.uploader.destroy(item.video.publicId, { resource_type: 'video' });
    }

    // حذف من DB
    await MediaItem.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE Error:', err);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

// ✏️ PUT: تعديل عنصر
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;

  try {
    await connectDB();
    const { name, description, images, video } = await req.json();

    const item = await MediaItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // لو فيه صور جديدة اترفعت → امسح القديمة من Cloudinary
    if (images && images.length > 0) {
      for (const oldImg of item.images) {
        if (oldImg.publicId) await cloudinary.uploader.destroy(oldImg.publicId);
      }
      item.images = images; // حط الصور الجديدة
    }

    // لو فيه فيديو جديد → امسح القديم من Cloudinary
    if (video) {
      if (item.video?.publicId) {
        await cloudinary.uploader.destroy(item.video.publicId, { resource_type: 'video' });
      }
      item.video = video; // الفيديو الجديد
    }

    item.name = name || item.name;
    item.description = description || item.description;

    await item.save();

    return NextResponse.json({ success: true, data: item });
  } catch (err) {
    console.error('PUT Error:', err);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
// 📄 GET: جلب عنصر واحد بالتفصيل
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;

  try {
    await connectDB();
    const item = await MediaItem.findById(id);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'success', data: item });
  } catch (err) {
    console.error('GET Error:', err);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}
