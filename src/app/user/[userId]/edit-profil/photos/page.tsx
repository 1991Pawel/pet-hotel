import React from "react";
// import UserPhotoUpload from "@/app/components/UserPhotoUpload";
// import Image from "next/image";
// import { getAuthUserId } from "@/app/actions/authActions";
// import { getMemberByUserId } from "@/app/actions/memberActions";
// import styles from "./page.module.css";
// import { notFound } from "next/navigation";

export default async function PhotosPage() {
  // const userId = await getAuthUserId();
  // const member = await getMemberByUserId(userId);

  // if (!member) {
  //   return notFound();
  // }

  return (
    <div>
      PhotosPage
      <div>
        {/* {member.photos.map((photo) => (
          <Image
            key={photo.id}
            className={styles.image}
            alt={member.name}
            src={photo.url}
            width={300}
            height={300}
          />
        ))} */}
        {/* <UserPhotoUpload /> */}
      </div>
    </div>
  );
}
