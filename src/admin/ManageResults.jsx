import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api'; // Use your configured API
import { FaTrash, FaPlus, FaTrophy, FaUpload, FaEdit, FaTimes } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';

const ManageResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State to track which result we are editing
  const [editingId, setEditingId] = useState(null);
  
  // Ref to clear file input manually
  const fileInputRef = useRef(null);
  
  // Form State matches your SuccessStory Schema
  const [formData, setFormData] = useState({
    studentName: '',
    examName: '',
    rank: '',
    category: 'Banking', // Default dropdown value
    year: new Date().getFullYear(),
    testimonial: ''
  });
  const [imageFile, setImageFile] = useState(null);

  // 1. Fetch Existing Results
  const fetchResults = async () => {
    try {
      console.log('🔄 Fetching results from /api/results...');
      const { data } = await api.get('/results');
      console.log('✅ Results loaded:', data);
      setResults(data);
    } catch (error) {
      console.error('❌ Error loading results:', error.response?.data || error.message || error);
      alert(`Failed to load results: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // 2. Handle Text Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Edit Click
  const handleEdit = (result) => {
    setEditingId(result._id);
    setFormData({
      studentName: result.studentName,
      examName: result.examName,
      rank: result.rank,
      category: result.category,
      year: result.year,
      testimonial: result.testimonial || ''
    });
    setImageFile(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel Edit
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      studentName: '',
      examName: '',
      rank: '',
      category: 'Banking',
      year: new Date().getFullYear(),
      testimonial: ''
    });
    setImageFile(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  // 3. Handle File Input with Compression
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      try {
        console.log('📸 Original file size:', (file.size / 1024).toFixed(2), 'KB');
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedBlob = await imageCompression(file, options);
        console.log('✅ Compressed file size:', (compressedBlob.size / 1024).toFixed(2), 'KB');
        
        const compressedFile = new File([compressedBlob], file.name, { 
          type: file.type,
          lastModified: Date.now()
        });
        setImageFile(compressedFile);
      } catch (error) {
        console.error('❌ Image compression failed:', error);
        setImageFile(file);
      }
    }
  };

  // 4. Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create FormData object to send text + image
    const data = new FormData();
    data.append('studentName', formData.studentName);
    data.append('examName', formData.examName);
    data.append('rank', formData.rank);
    data.append('category', formData.category);
    data.append('year', formData.year);
    data.append('testimonial', formData.testimonial);
    
    console.log('📤 Preparing to send form data:', {
      studentName: formData.studentName,
      examName: formData.examName,
      imageFile: imageFile ? `${imageFile.name} (${imageFile.size} bytes)` : 'NO IMAGE',
      imageFileType: imageFile?.type
    });
    
    if (imageFile) {
      console.log('✅ Adding image to FormData:', imageFile.name, imageFile.size, 'bytes');
      data.append('image', imageFile); // Must match backend upload.single('image')
    } else {
      console.warn('⚠️ No imageFile set - upload without image');
    }

    try {
      const config = {
        headers: { 
          "Content-Type": "multipart/form-data" 
        }
      };

      if (editingId) {
        console.log('🚀 Sending PUT request to /api/results/' + editingId);
        await api.put(`/results/${editingId}`, data, config);
        alert('Student updated successfully!');
      } else {
        console.log('🚀 Sending POST request to /api/results');
        await api.post('/results', data, config);
        alert('Student added to Hall of Fame!');
      }
      
      // Reset Form
      resetForm();
      
      // Refresh List
      fetchResults();
    } catch (error) {
      console.error('❌ Error:', error.response?.data || error.message || error);
      alert('Failed to save result. See console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Delete Result
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      try {
        await api.delete(`/results/${id}`);
        setResults(results.filter((res) => res._id !== id));
      } catch {
        alert('Error deleting result');
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaTrophy className="text-yellow-500"/> Manage Hall of Fame
        </h2>
        <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            Total Achievers: {results.length}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT: ADD NEW FORM --- */}
        <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <FaPlus className="text-brand-red"/> {editingId ? 'Edit Achiever' : 'Add New Achiever'}
                    </h3>
                    {editingId && (
                        <button onClick={resetForm} className="text-xs text-red-500 flex items-center gap-1 hover:underline">
                            <FaTimes /> Cancel
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Student Name</label>
                        <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required 
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-brand-red outline-none" placeholder="e.g. Rahul Sharma" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Exam</label>
                            <input type="text" name="examName" value={formData.examName} onChange={handleChange} required 
                                className="w-full border p-2 rounded" placeholder="e.g. SBI PO" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Rank/Status</label>
                            <input type="text" name="rank" value={formData.rank} onChange={handleChange} required 
                                className="w-full border p-2 rounded" placeholder="e.g. Selected" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                                <option value="Banking">Banking</option>
                                <option value="SSC">SSC</option>
                                <option value="State">State Exams</option>
                                <option value="Defence">Defence</option>
                                <option value="Teaching">Teaching</option>
                            </select>
                        </div>
                        <div>
                            <label          lkjhnj="text-xs font-bold text-gray-500 uppercase">Year</label>
                            <input type="number" name="year" value={formData.year} onChange={handleChange} required 
                                className="w-full border p-2 rounded" />
                        </div>
                    </div>
                    
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Photo</label>
                        <div className="border border-dashed border-gray-300 p-2 rounded flex items-center gap-2 cursor-pointer hover:bg-gray-50">
                            <FaUpload className="text-gray-400"/>
                            <input 
                              ref={fileInputRef}
                              type="file" 
                              onChange={handleFileChange} 
                              required={!editingId}
                              className="text-sm w-full" 
                            />
                        </div>
                        {editingId && <p className="text-xs text-gray-400 mt-1">Leave empty to keep existing photo</p>}
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Testimonial (Optional)</label>
                        <textarea name="testimonial" value={formData.testimonial} onChange={handleChange} 
                            className="w-full border p-2 rounded" rows="3" placeholder="What did they say?"></textarea>
                    </div>

                    <button type="submit" disabled={isSubmitting} 
                        className={`w-full py-3 rounded-lg font-bold text-white transition-all ${isSubmitting ? 'bg-gray-400' : (editingId ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg' : 'bg-brand-red hover:bg-red-700 shadow-md hover:shadow-lg')}`}>
                        {isSubmitting ? 'Processing...' : (editingId ? 'Update Achiever' : 'Add to Hall of Fame')}
                    </button>
                </form>
            </div>
        </div>

        {/* --- RIGHT: LIST OF RESULTS --- */}
        <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="font-bold text-lg mb-6">Current Achievers</h3>
                
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading list...</div>
                ) : results.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 border-2 border-dashed rounded-lg">
                        No students added yet. Use the form to add one!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((item) => (
                            <div key={item._id} className="flex items-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gray-50 group">
                                <img 
                                    src={item.imageUrl || "https://placehold.co/100"} 
                                    alt={item.studentName} 
                                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div className="ml-4 flex-grow">
                                    <h4 className="font-bold text-gray-900">{item.studentName}</h4>
                                    <p className="text-xs text-brand-red font-semibold">{item.examName} • {item.rank}</p>
                                    <p className="text-xs text-gray-500">{item.year} • {item.category}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleEdit(item)} 
                                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                                        title="Edit Result"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item._id)} 
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                        title="Delete Result"
                                    >
                                        <FaTrash />
                                    </button>
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

export default ManageResults;