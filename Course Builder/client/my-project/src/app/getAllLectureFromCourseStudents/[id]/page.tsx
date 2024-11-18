'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { jwtDecode } from 'jwt-decode';

interface Lecture {
  _id: string;
  title: string;
  type: string;
  videoUrl?: string;
  articleContent?: string;
  textContent?: string;
}

const LecturesPage = () => {
  const { courseId } = useParams(); // Extract courseId from route params
  const router = useRouter();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [playingLectureId, setPlayingLectureId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const token = localStorage.getItem('token');
  let userId = null;

  // Decode the token if it exists
  if (token) {
    const decodedToken = jwtDecode(token) as { id: string };
    userId = decodedToken.id;
  }

  // Function to fetch lectures for the course
  const fetchLectures = async (userId: string, courseId: string) => {
    setLoading(true);
    setError('');
    try {
      if (!token) {
        throw new Error('User is not authenticated. Please log in.');
      }

      const response = await fetch(
        `http://localhost:3000/v1/users/${userId}/getCourses/${courseId}/lectures`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('You are not authorized to access this course.');
        }
        throw new Error('Failed to fetch lectures');
      }

      const data = await response.json();
      setLectures(data.lectures || []); // Assuming the backend sends a lectures key
    } catch (err: any) {
      setError(err.message || 'Error fetching lectures. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ensure userId and courseId are valid before fetching lectures
    if (userId && courseId) {
      fetchLectures(userId, Array.isArray(courseId) ? courseId[0] : courseId);
    } else {
      setError('User ID or Course ID is missing');
    }
  }, [userId, courseId]);

  // Handle video playback
  const handleVideoPlay = (lectureId: string) => {
    if (playingLectureId && playingLectureId !== lectureId) {
      const currentVideo = videoRefs.current[playingLectureId];
      if (currentVideo) currentVideo.pause();
    }
    setPlayingLectureId(lectureId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Lectures</h1>
          <Button
            className="bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            onClick={() => router.push(`/getSingleCourse/${courseId}`)}
          >
            Go Back
          </Button>
        </div>

        {loading ? (
          <div className="text-blue-500 text-center">Loading lectures...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="space-y-6">
            {lectures.length > 0 ? (
              lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="border p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition-all"
                >
                  <h3 className="font-bold text-xl text-gray-700 mb-3">{lecture.title}</h3>
                  {lecture.type === 'video' && lecture.videoUrl && (
                    <div className="mb-4">
                      <video
                        ref={(el: any) => (videoRefs.current[lecture._id] = el)}
                        controls
                        className="w-full max-w-[900px] h-[400px] rounded-lg mx-auto" // Adjusted video size
                        src={lecture.videoUrl}
                        onPlay={() => handleVideoPlay(lecture._id)}
                      />
                    </div>
                  )}

                  {lecture.type === 'article' && lecture.articleContent && (
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-800">Article Lecture</h4>
                      <a
                        href={lecture.articleContent}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        Read Article
                      </a>
                    </div>
                  )}

                  {lecture.type === 'text' && lecture.textContent && (
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-800">Text Lecture</h4>
                      <p className="text-gray-600">{lecture.textContent}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No lectures found for this course.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturesPage;
