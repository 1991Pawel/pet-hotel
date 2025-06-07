import { getHotelById } from "@/app/actions/hotelActions";
import { notFound } from "next/navigation";
import { getAuthUserId } from "@/app/actions/authActions";
import ReviewsList from "@/app/components/ReviewsList";
import { AnimalType } from "@prisma/client";

export default async function HotelId({
  params,
}: {
  params: Promise<{ hotelId: string }>;
}) {
  const { hotelId } = await params;
  if (!hotelId) {
    return notFound();
  }
  const loggedUserId = await getAuthUserId({ required: false });

  const { hotel } = await getHotelById(hotelId, loggedUserId);
  // const canAddReview = hotel?.canAddReview;

  if (!hotel) {
    return notFound();
  }

  const reviews = hotel.reviews;
  const reviewsCount = reviews.length;
  const averageRating = hotel.averageRating;
  const photos = hotel.photos;
  const description = hotel.descriptionHtml || "Brak opisu";
  const minPricePerNight = hotel.minPricePerNight;
  const maxPricePerNight = hotel.maxPricePerNight;
  const acceptedAnimals = hotel.acceptedAnimals;

  console.log("hotel", hotel);

  return (
    <div className="bg-[#fef7f3] min-h-screen p-6 flex justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-3 gap-6 p-4">
        {/* LEFT SIDE */}
        <div className="md:col-span-2">
          {/* PHOTOS */}
          <div className="grid mb-6">
            {photos.map((photo: { url: string }, index: number) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={photo?.url}
                alt={`Photo ${index + 1}`}
                className={`col-span-2 md:col-span-1 w-full h-54 object-cover rounded-xl ${
                  index === 0 ? "md:row-span-2" : ""
                }`}
              />
            ))}
          </div>

          {/* NAME & LOCATION */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold">{hotel.name}</h1>
            <p className="text-gray-600">
              {hotel.location.city} <br />
              {hotel.location.street} <br />
              {hotel.location.postalCode}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-red-500">★ {averageRating}</span>
              <span className="text-sm text-gray-500">{`(${reviewsCount})`}</span>
            </div>
          </div>

          {/* ABOUT */}
          <div>
            <h2 className="text-lg font-semibold mb-2">O mnie</h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              {description}
            </p>
          </div>
          <div>
            <ReviewsList reviews={reviews} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        {/* RIGHT SIDE */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm h-fit flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm text-gray-500 mb-1">Usługa</h3>
            <p className="text-lg font-semibold">Nocleg zwykły</p>

            {/* Cena min - max */}
            <p className="text-sm text-gray-400">
              Cena:{" "}
              {minPricePerNight && maxPricePerNight
                ? `${minPricePerNight} zł - ${maxPricePerNight} zł / noc`
                : "Brak danych"}
            </p>

            {/* Akceptowane zwierzęta */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-1">
                Akceptowane zwierzęta:
              </h4>
              <div className="flex flex-wrap gap-2">
                {acceptedAnimals && acceptedAnimals.length > 0 ? (
                  acceptedAnimals.map((animal: AnimalType) => (
                    <span
                      key={animal}
                      className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium"
                    >
                      {animal === "DOG"
                        ? "🐶 Pies"
                        : animal === "CAT"
                          ? "🐱 Kot"
                          : "🐾 Inne"}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">Brak danych</span>
                )}
              </div>
            </div>
          </div>

          <button className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-xl text-sm font-medium">
            ✉️ Wyślij wiadomość
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Skontaktuj się, aby zapytać o dostępność
          </p>
        </div>
      </div>
    </div>
  );
}
