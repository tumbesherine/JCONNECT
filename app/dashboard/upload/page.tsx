'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function UploadPropertyPage() {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('guest_house');
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // Check session and role
  useEffect(() => {
    async function checkRole() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;

      const userId = data.session.user.id;
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      if (error || !userData) return;
      if (userData.role !== 'property_owner' && userData.role !== 'landlord') {
        alert('⚠️ You are not authorized to upload properties.');
        return;
      }

      setSession(data.session);
      setRole(userData.role);
    }

    checkRole();
  }, []);

  if (!session || !role) {
    return <div className="p-6">⚠️ Only property owners and landlords can upload properties.</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!title || !images.length) {
      alert('Please provide a title and at least one image.');
      return;
    }

    setUploading(true);
    try {
      // Upload images to Supabase Storage
      const uploadedUrls: string[] = [];
      for (const file of images) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('property-images')
          .upload(fileName, file);

        if (error) throw error;

        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-images/${fileName}`;
        uploadedUrls.push(url);
      }

      // Create property with API
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner_id: session.user.id,
          title,
          description,
          type,
          images: uploadedUrls,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      alert('Property uploaded successfully!');

      // Redirect based on type
      switch (type) {
        case 'guest_house':
          window.location.href = '/guest-house';
          break;
        case 'boarding_house':
          window.location.href = '/boarding-house';
          break;
        case 'apartment':
          window.location.href = '/apartments';
          break;
        default:
          window.location.href = '/';
      }

      setTitle('');
      setDescription('');
      setImages([]);
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Property</h2>

      <input
        type="text"
        placeholder="Property Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      >
        <option value="guest_house">Guest House</option>
        <option value="boarding_house">Boarding House</option>
        <option value="apartment">Apartment</option>
      </select>

      <input type="file" multiple onChange={handleFileChange} className="mb-2" />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {uploading ? 'Uploading...' : 'Upload Property'}
      </button>
    </div>
  );
}
