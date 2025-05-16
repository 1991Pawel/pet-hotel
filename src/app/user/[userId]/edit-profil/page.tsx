import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import {getHotelById} from "@/app/actions/hotelActions";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import UserEditForm from "@/app/components/UserEditForm";
import UserPhotoUpload from "@/app/components/UserPhotoUpload";
import Map from "@/app/components/Map";
import PhotoList from "@/app/components/PhotoList";

export default async function UsersId() {
 


  // if (!hotel) {
  //   return notFound();
  // }
  return (
    <div>
      <div className={styles.user}>
        Edycja Hotelu
      


        <UserPhotoUpload />

        {/* <UserEditForm member={member} /> */}
        {/* <Map location={member.location} /> */}
      </div>
    </div>
  );
}
