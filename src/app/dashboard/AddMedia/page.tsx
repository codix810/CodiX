'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type UploadedFile = {
  url: string;
  publicId: string;
};

export default function AddMediaPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ رفع الملفات على Cloudinary
  const uploadToCloudinary = async (file: File, folder: string): Promise<UploadedFile> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_dashboard'); // لازم يكون معمول في cloudinary
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ ارفع الصور
      const uploadedImages: UploadedFile[] = [];
      for (const img of images) {
        const uploaded = await uploadToCloudinary(img, 'dashboard_images');
        uploadedImages.push(uploaded);
      }

      // ✅ ارفع الفيديو لو موجود
      let uploadedVideo: UploadedFile | null = null;
      if (video) {
        uploadedVideo = await uploadToCloudinary(video, 'dashboard_videos');
      }

      // ✅ ابعت للـ API
      const res = await fetch('/api/media', {
        method: 'POST',
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
        alert(result.message);
        router.push('/dashboard/ViewMedia'); // غيرها لمسار صفحة العرض
      } else {
        alert(result.message || 'فشل الحفظ');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('حدث خطأ غير متوقع');
      }
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">📸 Add Media</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* صور */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length > 5) {
                alert('مسموح بحد أقصى 5 صور فقط');
                setImages(files.slice(0, 5));
              } else {
                setImages(files);
              }
            }}
            className="w-full border rounded p-2"
          />

          {/* ✅ Preview الصور */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          )}

          {/* فيديو (اختياري) */}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.[0] || null)}
            className="w-full border rounded p-2"
          />

          {/* ✅ Preview الفيديو */}
          {video && (
            <video
              src={URL.createObjectURL(video)}
              controls
              className="w-full rounded mt-2"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Save Media'}
          </button>
        </form>
      </div>
    </main>
  );
}
