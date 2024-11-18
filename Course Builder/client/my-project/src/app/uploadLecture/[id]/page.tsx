'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { jwtDecode } from 'jwt-decode';
import Navbar from '@/app/components/navbar';

const UploadLecture = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [title, setTitle] = useState('');
  const [type, setType] = useState('video');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [articleContent, setArticleContent] = useState('');
  const [textContent, setTextContent] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<{ id: string }>(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error('Error decoding token:', error);
        alert('Failed to decode authentication token.');
      }
    } else {
      alert('Authentication token not found. Please log in.');
      router.push('/login');
    }
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !courseId) {
      alert('User ID or Course ID is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('courseId', courseId as string);

    if (type === 'video' && videoFile) {
      formData.append('videoUrl', videoFile);
    } else if (type === 'article') {
      formData.append('articleContent', articleContent);
    } else if (type === 'text') {
      formData.append('textContent', textContent);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/v1/users/${userId}/getCourses/${courseId}/lectures`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Lecture created successfully!');
      router.push(`/getSingleCourse/${courseId}`);
    } catch (error) {
      console.error('Error creating lecture:', error);
      alert('Failed to create lecture. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 py-12 px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Create a Lecture</h2>
          <Button
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
            onClick={() => router.push(`/getSingleCourse/${courseId}`)}
          >
            Back
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter lecture title"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="text">Text</option>
            </select>
          </div>

          {type === 'video' && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload Video:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
                accept="video/*"
                required
              />
            </div>
          )}

          {type === 'article' && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Article Content:</label>
              <textarea
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter article content here"
                rows={5}
              />
            </div>
          )}

          {type === 'text' && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Text Content:</label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter text content here"
                rows={5}
              />
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-bold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              Create Lecture
            </Button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default UploadLecture;
