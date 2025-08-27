import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { MediaItem } from "../../../../models/MediaItem";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, description, images, video } = await req.json();

    if (!name || !description) {
      return NextResponse.json(
        { status: "error", message: "الاسم والوصف مطلوبين" },
        { status: 400 }
      );
    }

    if (!images || images.length === 0) {
      return NextResponse.json(
        { status: "error", message: "يجب إضافة صورة واحدة على الأقل" },
        { status: 400 }
      );
    }

    if (images.length > 5) {
      return NextResponse.json(
        { status: "error", message: "مسموح بحد أقصى 5 صور فقط" },
        { status: 400 }
      );
    }

    const newItem = await MediaItem.create({
      name,
      description,
      images,
      video,
    });

    return NextResponse.json(
      {
        status: "success",
        message: "تمت الإضافة بنجاح ✅",
        data: newItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { status: "error", message: "حدث خطأ في السيرفر" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const items = await MediaItem.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { status: "success", data: items },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { status: "error", message: "فشل في جلب البيانات" },
      { status: 500 }
    );
  }
}
