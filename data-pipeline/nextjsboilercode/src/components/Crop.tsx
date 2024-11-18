import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import {getCroppedImg} from "@/utils/cropImage"; // Utility to handle cropping

const ImageCrop: React.FC<{ imageSrc: string; onCropDone: (croppedImage: Blob) => void }> = ({ imageSrc, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImage) onCropDone(croppedImage);
    }
  };

  return (
    <>
    <div className="relative h-[400px] w-[500px] ">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3} // Change aspect ratio if needed
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
      
    </div>
    <div className="controls mt-4">
        <label>Zoom:</label>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
      </div>
    <div className="flex justify-center mt-4">
    <Button onClick={handleCrop} className="bg-blue-500 text-white">
      Crop & Save
    </Button>
  </div>
  </>
  );
};

export default ImageCrop;
