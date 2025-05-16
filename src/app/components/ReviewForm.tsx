"use client";
import { useForm } from "react-hook-form";
import { reviewSchema, ReviewSchema } from "@/lib/schemas/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addReview } from "@/app/actions/reviewsActions";
import { useRouter, useParams } from "next/navigation";

export default function ReviewForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid },
    setValue, // Destructure setValue to use in number conversion
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  const router = useRouter();
  const params = useParams<{ userId: string }>();

  const onSubmit = async (data: ReviewSchema) => {
    const reviewData = {
      content: data.reviewText,
      rating: data.rating,
      hotelOwnerId: params.userId,
    };

    const result = await addReview(reviewData);


    if (result.status === "error") {
      alert(result.error);
    } else {
      reset();
      router.refresh();
    }
  };

  return (
    <div>
      <h1>Review Form</h1>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="reviewText">Review:</label>
          <textarea
            id="reviewText"
            {...register("reviewText")}
            placeholder="Write your review here"
            rows={4}
            cols={50}
          />
          {errors.reviewText && <p>{errors.reviewText.message}</p>}
        </div>

        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            {...register("rating", {
              setValueAs: (value) => parseInt(value), // Convert string to number
            })}
            placeholder="Rate from 1 to 5"
            min="1"
            max="5"
          />
          {errors.rating && <p>{errors.rating.message}</p>}
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
