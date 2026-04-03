import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import JoditEditor from 'jodit-react';
import { FaTrash, FaEdit, FaNewspaper, FaUpload, FaTimes } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';

const ManageCurrentAffairs = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const editor = useRef(null); // Reference for Jodit Editor
  
  // State to track if we are editing
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    headline: '',
    contentBody: '',
    category: 'National',
    tags: '',
    isSpotlight: 'false'
  });

  // Jodit Editor Configuration
  const editorConfig = {
    readonly: false,
    height: 400,
    placeholder: 'Write your current affairs update here...',

   
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: 'insert_as_html',
   
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'table', 'link', 'image', '|', // Includes the table tool
      'align', 'undo', 'redo', 'source'
    ]
  };

  // 1. Fetch News
  const fetchNews = async () => {
    try {
      console.log('🔄 Fetching news from /api/current-affairs...');
      const { data } = await api.get('/current-affairs');
      console.log('✅ News loaded:', data);
      setNewsList(data);
    } catch (error) {
      console.error('❌ Error loading news:', error.response?.data || error.message || error);
      alert(`Failed to load news: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // 2. Populate Form for Editing
  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      headline: item.headline,
      contentBody: item.contentBody,
      category: item.category,
      tags: item.tags ? item.tags.join(', ') : '',
      isSpotlight: item.isSpotlight ? 'true' : 'false'
    });
    // We scroll to top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Cancel Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ headline: '', contentBody: '', category: 'National', tags: '', isSpotlight: 'false' });
    setImageFile(null);
  };

  // 3.5. Handle File Change with Compression
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log('📁 File selected:', file ? `${file.name}, type: ${file.type}, size: ${(file.size / 1024).toFixed(2)} KB` : 'NO FILE');
    
    if (!file) {
      console.warn('⚠️ No file selected');
      return;
    }
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      console.error('❌ Invalid file type:', file.type);
      alert('Please select a valid image file (JPG, PNG, etc.)');
      return;
    }

    try {
      console.log('🔄 Starting image compression...');
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      console.log(`📸 Original image: ${(file.size / 1024).toFixed(2)} KB`);
      
      const compressedBlob = await imageCompression(file, options);
      console.log(`✅ Compressed image: ${(compressedBlob.size / 1024).toFixed(2)} KB`);
      
      // Convert Blob to File with proper metadata
      const compressedFile = new File([compressedBlob], file.name, { 
        type: file.type,
        lastModified: Date.now()
      });
      console.log(`✅ File created: ${compressedFile.name}, size: ${(compressedFile.size / 1024).toFixed(2)} KB`);
      
      setImageFile(compressedFile);
      console.log('✅ Image state updated successfully');
    } catch (error) {
      console.error('❌ Image compression error:', error);
      console.log('⚠️ Falling back to original file without compression');
      
      // Fallback: use original file if compression fails
      setImageFile(file);
      alert('Note: Using original image (compression failed, but proceeding with upload)');
    }
  };

  // 4. Submit Logic (Create OR Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('headline', formData.headline);
    data.append('contentBody', formData.contentBody);
    data.append('category', formData.category);
    data.append('tags', formData.tags);
    data.append('isSpotlight', formData.isSpotlight);
    
    const slug = formData.headline.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    data.append('slug', slug);
    
    console.log('📤 FormData being sent:');
    console.log('  - headline:', formData.headline);
    console.log('  - slug:', slug);
    console.log('  - category:', formData.category);
    console.log('  - tags:', formData.tags);
    console.log('  - isSpotlight:', formData.isSpotlight);
    console.log('  - imageFile:', imageFile ? `${imageFile.name} (${(imageFile.size / 1024).toFixed(2)} KB, type: ${imageFile.type})` : 'NO IMAGE');
    
    if (imageFile) {
      console.log('✅ Adding compressed image to FormData');
      data.append('image', imageFile);
    } else {
      console.warn('⚠️ WARNING: No image file selected!');
    }

    try {
      if (editingId) {
        // UPDATE EXISTING (PUT)
        console.log('🔄 Sending PUT request to /api/current-affairs/' + editingId);
        const response = await api.put(`/current-affairs/${editingId}`, data);
        console.log('✅ PUT response:', response.data);
        alert('News Updated Successfully!');
      } else {
        // CREATE NEW (POST)
        console.log('🚀 Sending POST request to /api/current-affairs');
        const response = await api.post('/current-affairs', data);
        console.log('✅ POST response:', response.data);
        alert('News Posted Successfully!');
      }

      handleCancelEdit(); // Reset form
      fetchNews(); // Refresh list
    } catch (error) {
      console.error('❌ Error during submission:');
      console.error('  - Status:', error.response?.status);
      console.error('  - Message:', error.response?.data?.message);
      console.error('  - Details:', error.response?.data?.details || error.response?.data);
      console.error('  - Full error:', error);
      alert(`Operation failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Delete Logic
  const handleDelete = async (id) => {
    if (window.confirm("Delete this news article?")) {
      try {
        await api.delete(`/current-affairs/${id}`);
        setNewsList(newsList.filter(n => n._id !== id));
      } catch (error) {
        console.error("Error deleting news:", error);
        alert("Failed to delete");
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaNewspaper className="text-blue-600"/> Manage Current Affairs
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* LEFT: Add/Edit Form */}
        <div className="lg:col-span-3">
            <div className={`bg-white p-6 rounded-xl shadow-lg border sticky top-4 ${editingId ? 'border-yellow-400 ring-2 ring-yellow-100' : 'border-gray-100'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">
                        {editingId ? 'Edit Article' : 'Post New Article'}
                    </h3>
                    {editingId && (
                        <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
                            <FaTimes/> Cancel
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Headline</label>
                        <input 
                            type="text" 
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                            value={formData.headline}
                            onChange={(e) => setFormData({...formData, headline: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                        <select 
                            className="w-full border p-2 rounded bg-white"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="National">National</option>
                            <option value="International">International</option>
                            <option value="Defence">Defence</option>
                            <option value="Sports">Sports</option>
                            <option value="Science">Science & Tech</option>
                            <option value="Economy">Economy</option>
                            <option value="Tech">Tech</option>
                            <option value="Awards">Awards</option>
                            <option value="Important Days">Important Days</option>
                            <option value="Obituary">Obituary</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Tags (Comma separated)</label>
                        <input 
                            type="text" 
                            className="w-full border p-2 rounded" 
                            placeholder="e.g. Budget, Finance"
                            value={formData.tags}
                            onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        />
                    </div>

                    {/* JODIT RICH TEXT EDITOR */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Content</label>
                        <JoditEditor
                            ref={editor}
                            value={formData.contentBody}
                            config={editorConfig}
                            onBlur={(newContent) => setFormData({...formData, contentBody: newContent})}
                            onChange={(newContent) => {}} // Dummy onChange to prevent re-rendering on every keystroke
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">
                            Image {editingId && '(Leave empty to keep existing)'} {imageFile && '✅'}
                        </label>
                        <div className="border border-dashed p-2 rounded flex items-center gap-2 hover:bg-gray-50 cursor-pointer bg-gray-50">
                            <FaUpload className="text-gray-400"/>
                            <div className="flex-1">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFileChange} 
                                    className="w-full text-sm cursor-pointer"
                                />
                                {imageFile && (
                                    <p className="text-xs text-green-600 mt-1">
                                        📁 {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <button disabled={isSubmitting} className={`w-full text-white font-bold py-3 rounded-lg transition disabled:bg-gray-400 ${editingId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                        {isSubmitting ? 'Saving...' : (editingId ? 'Update Article' : 'Publish News')}
                    </button>
                </form>
            </div>
        </div>

        {/* RIGHT: List of News */}
        <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Published Articles ({newsList.length})</h3>
                
                {loading ? <p>Loading...</p> : (
                    <div className="space-y-4">
                        {newsList.map(item => (
                            <div key={item._id} className={`flex flex-col sm:flex-row gap-4 p-4 border rounded-lg transition bg-gray-50 ${editingId === item._id ? 'border-yellow-400 ring-1 ring-yellow-200' : 'border-gray-100 hover:shadow-md'}`}>
                                <img 
                                    src={item.imageUrl || "https://placehold.co/100"} 
                                    alt="thumb" 
                                    className="w-full sm:w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex-grow overflow-hidden">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-900 line-clamp-2 pr-2">{item.headline}</h4>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button 
                                                onClick={() => handleEdit(item)} 
                                                className="text-blue-500 hover:text-blue-700 p-2 bg-blue-50 rounded hover:bg-blue-100 transition"
                                                title="Edit"
                                            >
                                                <FaEdit/>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(item._id)} 
                                                className="text-red-400 hover:text-red-600 p-2 bg-red-50 rounded hover:bg-red-100 transition"
                                                title="Delete"
                                            >
                                                <FaTrash/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-1">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                            {item.category}
                                        </span>
                                        {item.isSpotlight && (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Spotlight</span>
                                        )}
                                    </div>
                                    {/* Strip HTML tags for the preview text so it looks clean */}
                                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                        {item.contentBody?.replace(/<[^>]+>/g, '')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ManageCurrentAffairs;