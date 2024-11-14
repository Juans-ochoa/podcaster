import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { ThumbnailProps } from "@/types";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useMutation } from "convex/react";
import { Loader } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";

const GenerateThumbnail = (props: ThumbnailProps) => {
  const {
    image: { imageUrl },
    setImage,
  } = props;

  const { toast } = useToast();

  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getImageUrl = useMutation(api.podcasts.getUrl);

  const generateImageUrl = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setImage((prevState) => ({ ...prevState, imageUrl: "" }));

    try {
      const file = new File([blob], fileName, { type: "image/png" });

      const uploaded = await startUpload([file]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const storageId = (uploaded[0].response as any).storageId;

      const imageUrl = await getImageUrl({ storageId });

      setImage((pevState) => ({
        ...pevState,
        imageStorageId: storageId,
        imageUrl: imageUrl!,
      }));

      toast({
        title: "Thumbnail generated successfully",
      });
    } catch (error) {
      toast({ title: "Error generating thumbnail", variant: "destructive" });
      console.log(error);
    } finally {
      setIsImageLoading(false);
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { files } = e.target;
    if (!files) return;

    try {
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      generateImageUrl(blob, `thumbnail-${Date.now()}`);
    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading image", variant: "destructive" });
    }
  };

  return (
    <>
      <div className="image_div" onClick={() => imageRef?.current?.click()}>
        <Input
          type="file"
          className="hidden"
          ref={imageRef}
          onChange={(e) => uploadImage(e)}
        />
        {!isImageLoading ? (
          <Image
            src="/icons/upload-image.svg"
            width={40}
            height={40}
            alt="upload"
          />
        ) : (
          <div className="text-16 flex-center font-medium text-white-1">
            Uploading
            <Loader size={20} className="animate-spin ml-2" />
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-12 font-bold text-orange-1">Click to upload</h2>
          <p className="text-12 font-normal text-gray-1">
            SVG, PNG, JPG, or GIF (max. 1080x1080px)
          </p>
        </div>
      </div>
      {imageUrl && (
        <div className="flex-center w-full">
          <Image
            src={imageUrl}
            width={200}
            height={200}
            className="mt-5"
            alt="thumbnail"
          />
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;
