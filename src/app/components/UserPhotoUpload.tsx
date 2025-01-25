"use client";
import {
  CloudinaryUploadWidgetResults,
  CldUploadButton,
} from "next-cloudinary";
import { addImage } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
export default function UserPhotoUpload() {
  const router = useRouter();
  const onAddPhoto = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === "object") {
      await addImage(result.info.secure_url, result.info.public_id);
      router.refresh();
    } else {
      console.error("Error uploading image");
    }
  };
  return (
    <div>
      <h1>Dodaj zdjęcie</h1>
      <CldUploadButton
        options={{
          maxFiles: 1,
          maxFileSize: 1000000,
        }}
        signatureEndpoint={"/api/sign-image"}
        onSuccess={onAddPhoto}
        uploadPreset={process.env.UPLOAD_PRESET_NAME}
      >
        Dodaj
      </CldUploadButton>
    </div>
  );
}
