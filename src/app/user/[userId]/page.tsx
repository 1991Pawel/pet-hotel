import { getHotelById } from "@/app/actions/hotelActions";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReviewForm from "@/app/components/ReviewForm";
import { getAuthUserId } from "@/app/actions/authActions";

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
  const loggedUserId = await getAuthUserId();

  // console.log(loggedUserId, "loggedUserId");
  const { hotel, canAddReview } = await getHotelById(userId);

  if (!hotel) {
    return notFound();
  }
  console.log(hotel, "hotel");
  return (
    <div>
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
        {/* Reviews Section */}
        <div className={style.reviews}>
          <h3>Opinie gości</h3>
          {hotel.reviews && hotel.reviews.length > 0 ? (
            hotel.reviews.map((review, index) => (
              <div key={index} className={style.review}>
                {review.petOwner.user.id === loggedUserId &&
                  "moja opinia można edytować"}
                <p className={style.reviewContent}>{review.content}</p>
                <p className={style.reviewRating}>Ocena: {review.rating} / 5</p>
              </div>
            ))
          ) : (
            <p className={style.noReviews}>Brak opinii na razie.</p>
          )}
        </div>
        {canAddReview && <ReviewForm />}
      </div>
    </div>
  );
}
