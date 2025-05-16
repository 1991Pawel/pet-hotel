import { getHotelById } from "@/app/actions/hotelActions";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReviewForm from "@/app/components/ReviewForm";
import { getAuthUserId } from "@/app/actions/authActions";
import ReviewsList from "@/app/components/ReviewsList";

export default async function UsersId({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const { userId } = await params;
  if (!userId) {
    return notFound();
  }
  const loggedUserId = await getAuthUserId({ required: false });

  const { hotel, canAddReview } = await getHotelById(userId, loggedUserId);

  if (!hotel) {
    return notFound();
  }

  return (
    <div>
      test
      <div className={style.user}>
        <h2 className={style.userName}>{hotel.name}</h2>
        <li>
          <Link className={style.link} href={`/user/${userId}/chat`}>
            Czat
          </Link>
        </li>
        {hotel.photos[0]?.url && (
          <Image
            className={style.image}
            alt={hotel.name || "Hotel Piesek"}
            src={hotel.photos[0].url}
            width={100}
            height={100}
          />
        )}
        <ReviewsList reviews={hotel.reviews} />
        {canAddReview && <ReviewForm />}
      </div>
    </div>
  );
}
