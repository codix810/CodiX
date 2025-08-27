'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type MediaItem = {
  _id: string;
  name: string;
  description: string;
  images: { url: string }[];
  video?: { url: string };
  createdAt: string;
};

export default function ViewMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. جلب البيانات من API
  useEffect(() => {
    fetch('/api/media')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') setItems(data.data);
        else alert(data.message);
      })
      .catch(() => alert('فشل في جلب البيانات'))
      .finally(() => setLoading(false));
  }, []);

  // 2. حذف عنصر (كل الصور والفيديو)
  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد أنك عايز تمسح؟ هذا الإجراء لا يمكن التراجع عنه.')) return;

    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(data.error || 'فشل الحذف');
      }
    } catch {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  // 3. زر تعديل
  const goToEdit = (id: string) => router.push(`/dashboard/ViewMedia/${id}`);

  if (loading) return <p className="text-center py-10">⏳ جاري التحميل...</p>;
  if (!items.length) return <p className="text-center py-10">لا توجد عناصر لعرضها.</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <motion.div
          key={item._id}
          className="bg-white rounded shadow p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
          <p className="text-gray-700 mb-3">{item.description}</p>

          {/* عرض الصور */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {item.images.map((img, i) => (
              <img key={i} src={img.url} alt="media" className="w-full h-24 object-cover rounded" />
            ))}
          </div>

          {/* عرض الفيديو */}
          {item.video && (
            <video src={item.video.url} controls className="w-full mb-3 rounded" />
          )}

          <p className="text-xs text-gray-500 mb-3">
            أضيف بتاريخ: {new Date(item.createdAt).toLocaleString()}
          </p>

          <div className="flex justify-between gap-2">
            <button
              onClick={() => goToEdit(item._id)}
              className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition"
            >
              تعديل
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
            >
              حذف
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
