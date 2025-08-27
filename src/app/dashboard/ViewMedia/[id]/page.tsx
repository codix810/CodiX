'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

type MediaItem = {
  _id: string;
  name: string;
  description: string;
  images: { url: string; publicId: string }[];
  video?: { url: string; publicId: string };
};

export default function EditMediaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [item, setItem] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  // ✅ جلب البيانات القديمة
  useEffect(() => {
    if (!id) return;

    fetch(`/api/media/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setItem(data.data);
          setName(data.data.name);
          setDescription(data.data.description);
        } else {
          alert(data.message);
        }
      })
      .catch(() => alert('فشل تحميل البيانات'))
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ رفع على Cloudinary
  const uploadToCloudinary = async (file: File, folder: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_dashboard');
    formData.append('folder', folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'فشل رفع الملف');
    return { url: data.secure_url, publicId: data.public_id };
  };

  // ✅ حفظ التعديلات
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // صور جديدة
      let uploadedImages = item?.images || [];
      if (images.length > 0) {
        uploadedImages = [];
        for (const img of images) {
          const uploaded = await uploadToCloudinary(img, 'dashboard_images');
          uploadedImages.push(uploaded);
        }
      }

      // فيديو جديد
      let uploadedVideo = item?.video || null;
      if (video) {
        uploadedVideo = await uploadToCloudinary(video, 'dashboard_videos');
      }

      const res = await fetch(`/api/media/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          images: uploadedImages,
          video: uploadedVideo,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert('تم الحفظ بنجاح ✅');
        router.push('/dashboard/ViewMedia');
      } else {
        alert(result.error || 'فشل التحديث');
      }
    } catch (err) {
      alert('حدث خطأ أثناء الحفظ');
    }

    setSaving(false);
  };

  if (loading) return <p className="text-center py-10">⏳ جاري التحميل...</p>;
  if (!item) return <p className="text-center py-10">⚠️ لم يتم العثور على العنصر</p>;

  return (
    <main className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">✏️ تعديل العنصر</h1>

        <form onSubmit={handleSave} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-3"
            required
          />
          <textarea
            placeholder="Description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-3"
            required
          />

          {/* عرض الصور القديمة */}
          <div>
            <p className="font-medium mb-2">📷 الصور الحالية:</p>
            <div className="grid grid-cols-2 gap-2">
              {item.images.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt="old"
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* رفع صور جديدة */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length > 5) {
                alert('مسموح بحد أقصى 5 صور');
              } else {
                setImages(files);
              }
            }}
            className="w-full border rounded p-2"
          />

          {/* عرض الفيديو القديم */}
          {item.video && (
            <div>
              <p className="font-medium mb-2">🎥 الفيديو الحالي:</p>
              <video src={item.video.url} controls className="w-full mb-3 rounded" />
            </div>
          )}

          {/* رفع فيديو جديد */}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.[0] || null)}
            className="w-full border rounded p-2"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            disabled={saving}
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
        </form>
      </div>
    </main>
  );
}
