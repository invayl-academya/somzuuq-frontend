import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { APP_URL } from "@/redux/constants";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoading,
  setImageLoading,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {
    // console.log(event.target.files)
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handlDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];

    console.log("droppedFile", droppedFile);

    if (droppedFile) setImageFile(droppedFile);
  };

  function handleRemovePrevImg() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const uplaodImageToCloud = async () => {
    setImageLoading(true);
    const data = new FormData();

    data.append("image", imageFile);

    const res = await axios.post(`${APP_URL}/products/upload-image`, data);
    // console.log("data-imageUploa", res.data);
    if (res?.data?.result) {
      setUploadedImageUrl(res.data.result.url);
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uplaodImageToCloud();
  }, [imageFile]);
  return (
    <div className="w-full max-w-md mx-auto ">
      <Label className="text-lg font-semibold mb-2">Upload image</Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handlDrop}
        className="border-2 border-dashed rounded-xl p-4"
      >
        <Input
          id="image-upload"
          className="hidden"
          type="file"
          ref={inputRef}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 "
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or click to upload image</span>
          </Label>
        ) : imageLoading ? (
          <Skeleton className="w-8 h-8 bg-gray-200 w-full" />
        ) : (
          <div className="flex item-center justify-beteen ">
            <div className="flex items-center ">
              <FileIcon className="w-7 h-7 text-primary " />
              <p className="text-sm font-medium ">{imageFile.name}</p>
              <Button
                className="muted-muted-foreground hover:text-foreground"
                variant="ghost"
                size="icon"
                onClick={handleRemovePrevImg}
              >
                <XIcon className="w-4 h- 4 " />
                <span className="sr-only">remove file</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
