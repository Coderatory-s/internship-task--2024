"use client";
import React from "react";
import useSWR from "swr";
import axios from "axios";
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust the import path
import { Alert, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

interface MediaFile {
  _id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  s3Url: string;
}

// Fetch function using axios
const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

const FileList: React.FC = () => {
  // Use SWR hook to fetch data
  const { data, error, isLoading, mutate } = useSWR("http://localhost:3000/v1/media", fetcher);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/v1/media/${id}`);
      // Optimistically update the cache
      mutate((prevData: MediaFile[]) => prevData.filter((file) => file._id !== id), false);
    } catch (error) {
      console.error("Failed to delete media file", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (error)
    return (
      <Alert variant="destructive">
        <AlertTitle>{`Failed to fetch media files: ${error.message}`}</AlertTitle>
      </Alert>
    );

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Uploaded Files</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((file: MediaFile) => (
            <li
              key={file._id}
              className="flex flex-col justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-semibold">{file.filename}</p>
                <p className="text-sm text-gray-600">
                  Size: {file.fileSize} bytes
                </p>
                <Link
                  href={file.s3Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDelete(file._id)}
                className="mt-2 w-20"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FileList;
