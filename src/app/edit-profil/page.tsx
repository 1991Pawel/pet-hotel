
import { getAuthUserId ,getUserRole} from "@/app/actions/authActions";
import { notFound } from "next/navigation";
import EditHotelProfilForm from "@/app/components/EditHotelProfilForm";
import { getHotelById } from "../actions/hotelActions";
import { USER_TYPES } from "@/lib/constans";
export default async function EditProfilPage() {
    const userId = await getAuthUserId(
        { required: true }
    ); 
      if (!userId) {
    return notFound();
  }
    const userRole = await getUserRole(userId);
    const hotel = await getHotelById(userId);
    const hotelOwner = userRole.role === USER_TYPES.HOTEL_OWNER;
    const petOwner = userRole.role === USER_TYPES.PET_OWNER;



    
  return (
    <div>
      {hotelOwner && <>
        <EditHotelProfilForm hotel={hotel.hotel}/>
      </>}
      {petOwner && <>
        nothing to see here
      </>}

    </div>
  );
}
