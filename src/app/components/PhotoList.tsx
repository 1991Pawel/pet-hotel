"use client";
import { deleteImage, setMainImage } from "@/app/actions/userActions";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Photo = {
  id: string;
  url: string;
  isMain: boolean;
};

export default function PhotoList({ photos }: { photos: Photo[] }) {
  const router = useRouter();
  const handleDelete = async (photoId: string) => {
    try {
      await deleteImage(photoId);
      router.refresh();
    } catch (error) {
      alert("Nie udało się usunąć zdjęcia");
      console.error(error);
    }
  };

  const handleSetMainPhoto = async (photoId: string) => {
    try {
      await setMainImage(photoId);
      router.refresh();
    } catch (error) {
      alert("Nie udało się ustawić zdjęcia jako główne");
      console.error(error);
    }
  };

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id}>
          {photo.isMain ? (
            <span>❤️</span>
          ) : (
            <button onClick={() => handleSetMainPhoto(photo.id)}>Główne</button>
          )}

          <Image
            alt="Zdjęcie użytkownika"
            src={photo.url}
            width={300}
            height={300}
          />
          <button onClick={() => handleDelete(photo.id)}>{"Usuń"}</button>
        </div>
      ))}
    </div>
  );
}
