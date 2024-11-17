import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CustomFileSlider = ({ postContent }: { postContent: any }) => {
  // State to track the currently active file index
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  // Combine all content types (images, videos, documents, etc.)
  const allFiles = [
    ...(postContent.images || []),
    ...(postContent.videos || []),
    ...(postContent.documents || []),
    ...(postContent.voice ? [postContent.voice] : []),
    ...(postContent.poll ? [postContent.poll] : []),
  ];

  // Function to render the current file based on the activeFileIndex
  const renderCurrentFile = () => {
    const currentFile = allFiles[activeFileIndex];

    // Render images
    if (postContent.images?.includes(currentFile)) {
      return (
        <img
          src={currentFile}
          alt="Post image"
          className="w-full h-[500px] object-contain"
        />
      );
    }

    // Render videos
    if (postContent.videos?.includes(currentFile)) {
      return (
        <video controls src={currentFile} className="mb-2 w-full h-[500px]" />
      );
    }

    // Render documents
    if (postContent.documents?.includes(currentFile)) {
      return (
        <div className="flex items-center justify-center ">
          <Link
            href={currentFile}
            target="_blank"
            className="text-blue-600 bg-white p-2 rounded-full underline"
          >
            View Document
          </Link>
        </div>
      );
    }

    // Render voice
    if (postContent.voice === currentFile) {
      return (
        <div className="flex items-center justify-center ">
          <audio controls src={currentFile} />
        </div>
      );
    }

    // Render poll
    if (postContent.poll === currentFile) {
      return (
        <main className="flex items-center justify-center h-full ">
          <div className="my-4 text-center bg-blue-300  rounded-lg border-black">
            <h4>{postContent.poll.question}</h4>
            {postContent.poll.options?.map((option: string, index: number) => (
              <div
                key={index}
                className=" flex gap-2 items-center justify-center"
              >
                <input name="poll" type="radio" value={option} />
                <label htmlFor="poll">{option}</label>
              </div>
            ))}
          </div>
        </main>
      );
    }
  };

  return (
    <div className="my-4">
      {/* Render the currently selected file */}
      <div className="w-full h-[500px] mb-4">{renderCurrentFile()}</div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-2">
        {allFiles.map((_, index) => (
          <Button
            key={index}
            variant={"destructive"}
            className={`w-[1px] h-[1px] rounded-full ${
              index === activeFileIndex ? "bg-blue-600" : "bg-gray-400"
            }`}
            onClick={() => setActiveFileIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
