"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ImageCrop from "./Crop";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null); // URL for video preview
  const [resolution, setResolution] = useState<string>(""); // Default resolution for videos
  const [format, setFormat] = useState<string>(""); // Default format for videos
  const [start, setStart] = useState<string>(""); // Optional start time for videos
  const [end, setEnd] = useState<string>(""); // Optional end time for videos
  const [width, setWidth] = useState<string>(""); // Optional resize for images
  const [compress, setCompress] = useState<any>(false); // Optional pages limit for documents
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Source for image cropping
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null); // Final cropped image
  const [uploading, setUploading] = useState<boolean>(false); // Uploading state

  const { toast } = useToast();
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Handle video preview
      if (selectedFile.type.startsWith("video/")) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setVideoPreviewUrl(previewUrl);
      } else {
        setVideoPreviewUrl(null);
      }

      // Handle image cropping
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => setImageSrc(reader.result as string);
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!file && !croppedImage) return;

    setUploading(true); // Start uploading

    const formData = new FormData();
    formData.append("file", croppedImage || file!); // Use cropped image if available

    // Add parameters based on file type
    if (file?.type.startsWith("video/")) {
      formData.append("resolution", resolution);
      formData.append("format", format);
      if (start) formData.append("start", start);
      if (end) formData.append("end", end);
    } else if (file?.type.startsWith("image/")) {
      if (width) formData.append("resize", width);
      formData.append("format", format); // Add format for image (jpg/png)
    } else if (file?.type.startsWith("application/")) {
      if (compress) formData.append("compress", compress); // Add page limit for document
      formData.append("format", format); // Add format for document (pdf, docx)
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/v1/media/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show success toast
      toast({
        title: "Upload Successful",
        description: "File uploaded successfully",
      });
      router.push("/"); // Redirect to home page after success
    } catch (error: any) {
      // Show error toast
      toast({
        title: "Upload Failed",
        description:
          "File upload failed: " +
          (error.response?.data?.message || error.message),
      });
    } finally {
      setUploading(false); // End uploading
    }
  };

  return (
    <div className="my-4 space-y-4">
      {/* File Input */}
      <Input
        type="file"
        onChange={handleFileChange}
        className="border-2 border-gray-300 p-2 rounded-md"
      />

      {/* Video Preview */}
      {videoPreviewUrl && (
        <div className="my-4">
          <video
            src={videoPreviewUrl}
            controls
            width="100%"
            style={{ maxWidth: "600px", maxHeight: "500px" }}
            className="rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Image Cropping */}
      {imageSrc && (
        <ImageCrop
          imageSrc={imageSrc}
          onCropDone={(croppedBlob) => {
            setCroppedImage(croppedBlob);
            setImageSrc(null); // Close cropper
          }}
        />
      )}

      {/* Dynamic options based on file type */}
      {file && file.type.startsWith("video/") && (
        <div className="space-y-2">
          <div>
            <label className="font-bold text-gray-700">Resolution</label>
            <Input
              type="text"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder="e.g. 240/360/480/720/1080/1440"
              className="border-2 border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label className="font-bold text-gray-700">Start Time (seconds)</label>
            <Input
              type="number"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              placeholder="e.g. 30"
              className="border-2 border-gray-300 p-2 rounded-md"
            />
          </div>
          <div>
            <label className="font-bold text-gray-700">End Time (seconds)</label>
            <Input
              type="number"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              placeholder="e.g. 60"
              className="border-2 border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>
      )}

      {/* Image specific options */}
      {file && file.type.startsWith("image/") && (
        <div className="space-y-2">
          <div>
            <label className="font-medium text-gray-700">Resolution (optional)</label>
            <Input
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="e.g. 800/1080/.."
              className="border-2 border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Format (optional)</label>
            <Input
              type="text"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              placeholder="e.g. jpeg/png/gif/webp"
              className="border-2 border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>
      )}

      {/* Document options */}
      {file && file.type.startsWith("application/") && (
        <div className="space-y-2">
          {/* Optional compression for documents */}
        </div>
      )}

      {/* Upload Button */}
      <Button
        onClick={handleUpload}
        className="bg-blue-500 text-white w-full mt-4"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};

export default FileUpload;
