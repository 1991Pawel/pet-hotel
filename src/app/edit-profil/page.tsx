
import { getAuthUserId ,getUserRole} from "@/app/actions/authActions";
import { notFound } from "next/navigation";
import UserEditForm from "@/app/components/UserEditForm";
import { getHotelById } from "../actions/hotelActions";
export default async function EditProfilPage() {
    const userId = await getAuthUserId(
        { required: true }
    ); 
      if (!userId) {
    return notFound();
  }
    const role = await getUserRole(userId);
    const hotel = await getHotelById(userId);

    console.log("hotel --", hotel);
    

  

  // const { userId } = await params;
  // if (!userId) {
  //   return notFound();
  // }
  // const loggedUserId = await getAuthUserId({ required: false });

  // const { hotel, canAddReview } = await getHotelById(userId, loggedUserId);

  

  

  return (
    <div>
     
      {userId}
      {role?.role}
     {JSON.stringify(hotel.hotel.location.city)}
    
    </div>
  );
}
