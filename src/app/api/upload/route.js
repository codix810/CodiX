'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('اختر ملفًا');

    setIsUploading(true);

    // إعدادات Cloudinary Upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // من إعدادات Cloudinary
    formData.append('folder', 'uploads'); // فولدر في Cloudinary

    const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await cloudinaryRes.json();

    if (!data.secure_url) {
      alert('فشل رفع الملف');
      setIsUploading(false);
      return;
    }

    // إرسال بيانات الملف للباك إند
    const body = {
      title,
      url: data.secure_url,
      public_id: data.public_id,
      type: file.type.split('/')[0], // image, video, pdf, ...
      sizeMB: (file.size / (1024 * 1024)).toFixed(2),
    };

    const res = await fetch('/api/files', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    alert(result.message);
    setIsUploading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Upload File</h1>
      <input
        type="text"
        placeholder="العنوان"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <br />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'جاري الرفع...' : 'رفع الملف'}
      </button>
    </div>
  );
}
