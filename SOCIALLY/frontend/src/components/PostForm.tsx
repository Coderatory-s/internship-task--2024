// import { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { useMutation } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input"; // Shadcn UI components
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { Label } from "@/components/ui/label";
// import { FaImages } from "react-icons/fa";
// import { BiSolidVideos } from "react-icons/bi";
// import { IoDocumentsSharp } from "react-icons/io5";
// import { MdAudioFile } from "react-icons/md";
// import { jwtDecode } from "jwt-decode"; // Correct import

// type PostFormData = {
//   title: string;
//   text: string;
//   pollQuestion?: string;
//   pollOptions: string[];
//   images: FileList | null;
//   videos: FileList | null;
//   documents: FileList | null;
//   voice: FileList | null;
// };

// const PostForm = () => {
//   const [formData, setFormData] = useState<PostFormData>({
//     title: "",
//     text: "",
//     pollQuestion: "",
//     pollOptions: [""],
//     images: null,
//     videos: null,
//     documents: null,
//     voice: null,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [userInfo, setUserInfo] = useState<{
//     name: string;
//     avatar: string;
//   } | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded: any = jwtDecode(token); // Correct usage
//       setUserInfo({
//         name: decoded.name,
//         avatar: decoded.avatar,
//       });
//     }
//   }, []);

//   const { mutateAsync: createPost } = useMutation({
//     mutationFn: async (data: FormData) => {
//       const token = localStorage.getItem("token");

//       const response = await axios.post(
//         "http://localhost:3000/v1/posts",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     },
//     onError: (error: any) => {
//       console.error("Error creating post:", error);
//       toast.error("Failed to create post. Please try again.");
//     },
//     onSuccess: (data: any) => {
//       console.log("Post created successfully", data);
//       toast.success("Post created successfully!");
//       setIsSubmitting(false);
//     },
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files) {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: files,
//       }));
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handlePollOptionChange = (index: number, value: string) => {
//     const newPollOptions = [...formData.pollOptions];
//     newPollOptions[index] = value;
//     setFormData({ ...formData, pollOptions: newPollOptions });
//   };

//   const addPollOption = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       pollOptions: [...prevData.pollOptions, ""],
//     }));
//   };

//   const removePollOption = (index: number) => {
//     const newPollOptions = formData.pollOptions.filter((_, i) => i !== index);
//     setFormData({ ...formData, pollOptions: newPollOptions });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const formDataToSend = new FormData();
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("text", formData.text);

//     if (formData.pollQuestion && formData.pollOptions.length > 0) {
//       formDataToSend.append("pollQuestion", formData.pollQuestion);
//       formDataToSend.append(
//         "pollOptions",
//         JSON.stringify(formData.pollOptions)
//       );
//     }

//     // Append files to FormData
//     if (formData.images) {
//       Array.from(formData.images).forEach((file) => {
//         formDataToSend.append("images", file);
//       });
//     }

//     if (formData.videos) {
//       Array.from(formData.videos).forEach((file) => {
//         formDataToSend.append("videos", file);
//       });
//     }

//     if (formData.documents) {
//       Array.from(formData.documents).forEach((file) => {
//         formDataToSend.append("documents", file);
//       });
//     }

//     if (formData.voice) {
//       Array.from(formData.voice).forEach((file) => {
//         formDataToSend.append("voice", file);
//       });
//     }

//     // Add the user info (name and avatar) to the form data
//     if (userInfo) {
//       formDataToSend.append("userName", userInfo.name);
//       formDataToSend.append("userAvatar", userInfo.avatar);
//     }

//     try {
//       await createPost(formDataToSend);
//       setFormData({
//         title: "",
//         text: "",
//         pollQuestion: "",
//         pollOptions: [""],
//         images: null,
//         videos: null,
//         documents: null,
//         voice: null,
//       });
//     } catch (error) {
//       console.error("Error creating post", error);
//       toast.error("Failed to create post. Please try again.");
//     }
//   };

//   return (
//     <motion.form
//       onSubmit={handleSubmit}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="space-y-4 p-4 max-w-md mx-auto bg-white shadow-md rounded-md"
//     >
//       <h2 className="text-xl font-bold">Create Post</h2>

//       {/* Display user info */}
//       {userInfo && (
//         <div className="flex items-center space-x-2 mb-4">
//           <img
//             src={userInfo.avatar}
//             alt="User Avatar"
//             className="w-10 h-10 rounded-full"
//           />
//           <span className="font-medium">{userInfo.name}</span>
//         </div>
//       )}

//       {/* Form Fields */}
//       <Input
//         placeholder="Title"
//         type="text"
//         name="title"
//         value={formData.title}
//         onChange={handleInputChange}
//         required
//       />

//       <Textarea
//         placeholder="Description"
//         name="text"
//         value={formData.text}
//         onChange={handleInputChange}
//         required
//       />

//       {/* Poll Question */}
//       <div>
//         <Label>Poll Question</Label>
//         <Input
//           type="text"
//           name="pollQuestion"
//           value={formData.pollQuestion || ""}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Poll Options */}
//       {formData.pollOptions.map((option, index) => (
//         <div key={index} className="flex items-center space-x-2">
//           <Input
//             type="text"
//             value={option}
//             onChange={(e) => handlePollOptionChange(index, e.target.value)}
//           />
//           <Button onClick={() => removePollOption(index)} variant="outline">
//             Remove
//           </Button>
//         </div>
//       ))}
//       <Button
//         type="button"
//         onClick={addPollOption}
//         className="bg-green-600 text-white p-2"
//       >
//         Add Poll Option
//       </Button>

// {/* File Uploads */}
// <div className="flex items-center justify-around">
//   <Label
//     htmlFor="images"
//     className="flex flex-col p-2 hover:bg-gray-300 transition-all rounded-md cursor-pointer items-center justify-center"
//   >
//     <FaImages className="text-4xl p-[0.5]" />
//     Images
//   </Label>
//   <Input
//     id="images"
//     type="file"
//     name="images"
//     onChange={handleFileChange}
//     multiple
//     className="hidden"
//   />

//   {/* Other File Upload Buttons... */}
//   <Label
//     htmlFor="videos"
//     className="flex flex-col p-2 hover:bg-gray-300 transition-all rounded-md cursor-pointer  items-center justify-center"
//   >
//     <BiSolidVideos className="text-4xl p-[0.5] hover:bg-gray-300 transition-all rounded-md cursor-pointer " />
//     Videos
//   </Label>
//   <Input
//     id="videos"
//     type="file"
//     name="videos"
//     onChange={handleFileChange}
//     multiple
//     className="hidden"
//   />
//   <Label
//     htmlFor="documents"
//     className="flex flex-col items-center p-2 hover:bg-gray-300 transition-all rounded-md cursor-pointer  justify-center"
//   >
//     <IoDocumentsSharp className="text-4xl p-[0.5] hover:bg-gray-300 transition-all rounded-md cursor-pointer " />
//     Documents
//   </Label>
//   <Input
//     id="documents"
//     type="file"
//     name="documents"
//     onChange={handleFileChange}
//     multiple
//     className="hidden"
//   />
//   <Label
//     htmlFor="voices"
//     className="flex flex-col items-center p-2 hover:bg-gray-300 transition-all rounded-md cursor-pointer  justify-center"
//   >
//     <MdAudioFile className="text-4xl " />
//     Audios
//   </Label>
//   <Input
//     type="file"
//     id="voices"
//     name="voice"
//     onChange={handleFileChange}
//     className="hidden"
//   />
// </div>

//       <Button type="submit" disabled={isSubmitting} className="w-full">
//         {isSubmitting ? "Posting..." : "Create Post"}
//       </Button>
//       <ToastContainer />
//     </motion.form>
//   );
// };

// export default PostForm;
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Added useQueryClient
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input"; // Shadcn UI components
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { FaImages } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { IoDocumentsSharp } from "react-icons/io5";
import { MdAudioFile } from "react-icons/md";
import { jwtDecode } from "jwt-decode"; // Correct import
import { useRouter } from "next/router"; // Import useRouter from Next.js
import { MdDeleteForever } from "react-icons/md";

type PostFormData = {
  title: string;
  text: string;
  pollQuestion?: string;
  pollOptions: string[];
  images: FileList | null;
  videos: FileList | null;
  documents: FileList | null;
  voice: FileList | null;
};

const PostForm = ({ closeDialog }: { closeDialog: () => void }) => {
  // Assuming you pass closeDialog as a prop
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    text: "",
    pollQuestion: "",
    pollOptions: [""],
    images: null,
    videos: null,
    documents: null,
    voice: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    avatar: string;
  } | null>(null);

  const router = useRouter(); // Initialize useRouter
  const queryClient = useQueryClient(); // Access React Query's query client

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token); // Correct usage
      setUserInfo({
        name: decoded.name,
        avatar: decoded.avatar,
      });
    }
  }, []);

  const { mutateAsync: createPost } = useMutation({
    mutationFn: async (data: FormData) => {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/v1/posts",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onError: (error: any) => {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    },
    onSuccess: (data: any) => {
      console.log("Post created successfully", data);
      toast.success("Post created successfully!");
      setIsSubmitting(false);

      // Refetch posts to include the new one
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      }); // This will trigger a refetch for posts query

      // Close the dialog after the post is created
      closeDialog(); // Close dialog after the post is created
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files,
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newPollOptions = [...formData.pollOptions];
    newPollOptions[index] = value;
    setFormData({ ...formData, pollOptions: newPollOptions });
  };

  const addPollOption = () => {
    setFormData((prevData) => ({
      ...prevData,
      pollOptions: [...prevData.pollOptions, ""],
    }));
  };

  const removePollOption = (index: number) => {
    const newPollOptions = formData.pollOptions.filter((_, i) => i !== index);
    setFormData({ ...formData, pollOptions: newPollOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("text", formData.text);

    if (formData.pollQuestion && formData.pollOptions.length > 0) {
      formDataToSend.append("pollQuestion", formData.pollQuestion);
      formDataToSend.append(
        "pollOptions",
        JSON.stringify(formData.pollOptions)
      );
    }

    // Append files to FormData
    if (formData.images) {
      Array.from(formData.images).forEach((file) => {
        formDataToSend.append("images", file);
      });
    }

    if (formData.videos) {
      Array.from(formData.videos).forEach((file) => {
        formDataToSend.append("videos", file);
      });
    }

    if (formData.documents) {
      Array.from(formData.documents).forEach((file) => {
        formDataToSend.append("documents", file);
      });
    }

    if (formData.voice) {
      Array.from(formData.voice).forEach((file) => {
        formDataToSend.append("voice", file);
      });
    }

    // Add the user info (name and avatar) to the form data
    if (userInfo) {
      formDataToSend.append("userName", userInfo.name);
      formDataToSend.append("userAvatar", userInfo.avatar);
    }

    try {
      await createPost(formDataToSend);
      setFormData({
        title: "",
        text: "",
        pollQuestion: "",
        pollOptions: [""],
        images: null,
        videos: null,
        documents: null,
        voice: null,
      });
    } catch (error) {
      console.error("Error creating post", error);
      toast.error("Failed to create post. Please try again.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4 p-4 bg-white rounded-lg  border-2 shadow-md mx-auto"
    >
      <h2 className="text-xl font-bold">Create Post</h2>
      {/* Display user info
      {userInfo && (
        <div className="flex items-center space-x-2 mb-4">
          <img
            src={userInfo.avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">{userInfo.name}</span>
        </div>
      )} */}
      {/* Form Fields */}
      <div className="flex gap-x-1">
        <span className="text-red-600">*</span>
        <Input
          placeholder="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="flex gap-x-1">
        <span className="text-red-600">*</span>
        <Textarea
          placeholder="Description"
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          required
        />
      </div>
      {/* Poll Question */}
      <div className="flex gap-2">
        <Input
          placeholder="Poll Question (Optional)"
          type="text"
          name="pollQuestion"
          value={formData.pollQuestion || ""}
          onChange={handleInputChange}
        />
      </div>
      {/* Poll Options */}
      {formData.pollOptions.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            type="text"
            value={option}
            placeholder="Poll Option"
            onChange={(e) => handlePollOptionChange(index, e.target.value)}
          />
          <Button
            className="text-5xl"
            onClick={() => removePollOption(index)}
            variant="outline"
          >
            <MdDeleteForever />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={addPollOption}
        className="bg-green-600 text-white p-2"
      >
        Add Poll Option
      </Button>
      {/* File Upload
      <div className="flex">
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <Button variant="outline">
              <FaImages /> Upload Images
            </Button>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <label className="flex items-center space-x-2">
            <Button variant="outline">
              <BiSolidVideos /> Upload Videos
            </Button>
            <input
              type="file"
              name="videos"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <label className="flex items-center space-x-2">
            <Button variant="outline">
              <IoDocumentsSharp /> Upload Documents
            </Button>
            <input
              type="file"
              name="documents"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <label className="flex items-center space-x-2">
            <Button variant="outline">
              <MdAudioFile /> <br /> Upload Voice Files
            </Button>
            <input
              type="file"
              name="voice"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div> */}
      <p>
        You can upload upto <b>5 images</b>, <b>2 videos</b>, <b>3 documents</b>{" "}
        and <b>1 voice</b>. (<b>50MB file size limit</b> )
      </p>
      {/* File Uploads */}
      <div className="flex border-2 rounded-lg items-center justify-around">
        <Label
          htmlFor="images"
          className="flex flex-col p-2 hover:bg-gray-300 transition-all rounded-md cursor-pointer items-center justify-center"
        >
          <FaImages className="text-4xl p-[0.5]" />
          Images
        </Label>
        <Input
          id="images"
          type="file"
          name="images"
          onChange={handleFileChange}
          multiple
          className="hidden"
        />

        {/* Other File Upload Buttons... */}
        <Label
          htmlFor="videos"
          className="flex flex-col p-2 hover:bg-gray-300 transition-all rounded-md cursor-pointer  items-center justify-center"
        >
          <BiSolidVideos className="text-4xl p-[0.5] hover:bg-gray-300 transition-all rounded-md cursor-pointer " />
          Videos
        </Label>
        <Input
          id="videos"
          type="file"
          name="videos"
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
        <Label
          htmlFor="documents"
          className="flex flex-col items-center p-2 hover:bg-gray-300 transition-all rounded-md cursor-pointer  justify-center"
        >
          <IoDocumentsSharp className="text-4xl p-[0.5] hover:bg-gray-300 transition-all rounded-md cursor-pointer " />
          Documents
        </Label>
        <Input
          id="documents"
          type="file"
          name="documents"
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
        <Label
          htmlFor="voices"
          className="flex flex-col items-center p-2 hover:bg-gray-300 transition-all rounded-md cursor-pointer  justify-center"
        >
          <MdAudioFile className="text-4xl " />
          Audios
        </Label>
        <Input
          type="file"
          id="voices"
          name="voice"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-blue-500 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </Button>
      </div>
      <ToastContainer />
    </motion.form>
  );
};

export default PostForm;
