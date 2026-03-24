import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { toast } from 'sonner';
import { Delete } from '@mui/icons-material';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await api.get('/gallery');
      setImages(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      toast.error('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  // Handle upload
  // Handle delete
  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await api.delete(`/gallery/${imageId}`);
      setImages(images.filter(img => img.id !== imageId));
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one file.');
      return;
    }

    setUploading(true);
    let successCount = 0;

    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          const uploadResponse = await api.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          const newImg = await api.post('/gallery/upload', { image_url: uploadResponse.url });
          setImages(prev => [newImg, ...prev]);
          successCount++;
        } catch (err) {
          console.error(`Failed to upload ${file.name}:`, err);
          toast.error(`Failed to upload ${file.name}`);
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully uploaded ${successCount} image(s)!`);
        setSelectedFiles([]);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-8">
      <header className="mb-8 animate__animated animate__fadeIn">
        <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
        <p className="text-gray-400 mt-2">
          Upload and manage church gallery images here.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-r from-[#CE1F2F] to-[#541616] rounded-xl p-6 shadow-lg animate__animated animate__fadeInUp">
          <h2 className="text-lg font-semibold">Total Images</h2>
          <p className="text-3xl font-bold mt-2">{images.length}</p>
        </div>
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 shadow-lg animate__animated animate__fadeInUp">
          <h2 className="text-lg font-semibold">Status</h2>
          <p className="text-3xl font-bold mt-2">{loading ? 'Loading...' : 'Synced'}</p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="bg-gray-900 rounded-xl p-6 shadow-lg animate__animated animate__fadeInUp">
        <h2 className="text-2xl font-semibold mb-4">Upload New Image</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a82031]"
              id="gallery-input"
            />
            {selectedFiles.length > 0 && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">
                {selectedFiles.length} files selected
              </span>
            )}
          </div>
          <button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              uploading || selectedFiles.length === 0
                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-[#CE1F2F] to-[#541616] hover:opacity-90 active:scale-95'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload All'}
          </button>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Gallery Feed</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-gray-800 aspect-square rounded-lg overflow-hidden group relative animate__animated animate__fadeIn"
              >
                <img 
                  src={img.image_url.startsWith('http') ? img.image_url : `http://localhost:8000${img.image_url}`} 
                  alt="Gallery" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                   <button 
                     onClick={() => handleDelete(img.id)}
                     className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all transform hover:scale-110 flex items-center gap-1 shadow-lg"
                   >
                     <Delete className="text-sm" />
                     Delete
                   </button>
                </div>
              </div>
            ))}
            {images.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-12">No images in gallery yet.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Gallery;