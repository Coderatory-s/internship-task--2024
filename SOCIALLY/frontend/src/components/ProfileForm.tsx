import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const ProfileForm = ({ user, onUpdate }: any) => {
  const [updatedData, setUpdatedData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    avatar: user?.avatar || null,
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUpdatedData((prevData: any) => ({
      ...prevData,
      avatar: file || null,
    }));
  };

  return (
    <div className="w-full">
      <div>
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          value={updatedData.name}
          onChange={handleChange}
        />
      </div>
      <div className="my-2">
        <Label>Bio</Label>
        <Textarea name="bio" value={updatedData.bio} onChange={handleChange} />
      </div>
      <div className="my-2 ">
        <Label>Avatar</Label>
        <Input type="file" onChange={handleFileChange} />
      </div>
      <div className="my-2">
        <Label>Password (optional)</Label>
        <Input
          type="password"
          name="password"
          value={updatedData.password}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={() => onUpdate(updatedData)}
          className="bg-blue-600 text-white"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
