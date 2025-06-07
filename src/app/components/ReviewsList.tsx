"use client";
import { useState } from "react";
import style from "./ReviewsList.module.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";
import { updateReview } from "../actions/reviewsActions";
import { useRouter } from "next/navigation";

type Review = {
  id: string;
  content: string;
  rating: number;
  isUserReview?: boolean;
  hotelOwnerId?: string;
};

type ModalState = {
  open: boolean;
  review: Review | null;
};

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    review: null,
  });
  const router = useRouter();
  const [editedReview, setEditedReview] = useState<string>(""); // Treść edytowanej opinii
  const [editedRating, setEditedRating] = useState<number>(5); // Edytowana ocena

  const handleReviewEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedReview(e.target.value); // Aktualizowanie opinii
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRating(Number(e.target.value)); // Aktualizowanie oceny
  };

  const handleSaveChanges = async () => {
    if (!modalState.review) return; // zabezpieczenie

    const result = await updateReview({
      content: editedReview,
      rating: editedRating,
      // hotelOwnerId: modalState.review.hotelOwnerId!,
      reviewId: modalState.review.id,
    });
    if (result.status === "error") {
      console.log(result.error);
      return;
    }
    if (result.status === "success") {
      router.refresh();
    }

    setModalState((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className={style.reviews}>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => {
          return (
            <div
              key={index}
              className={`${style.review} ${
                review.isUserReview ? style.myReview : ""
              }`}
            >
              {review.isUserReview && (
                <span className={style.myTag}>Twoja opinia ✏️</span>
              )}
              <p className={style.reviewContent}>{review.content}</p>
              <p className={style.reviewRating}>Ocena: {review.rating} / 5</p>
              {review.isUserReview && (
                <div className={style.actions}>
                  <button
                    onClick={() => {
                      setModalState((prev) => ({
                        ...prev,
                        open: true,
                        review: review,
                      }));
                      setEditedReview(review.content); // Ustawienie początkowej wartości edytowanej opinii
                      setEditedRating(review.rating); // Ustawienie początkowej wartości edytowanej oceny
                    }}
                    className={style.editBtn}
                  >
                    Edytuj
                  </button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className={style.noReviews}>Brak opinii na razie.</p>
      )}

      <Dialog
        open={modalState.open}
        onOpenChange={(open) => setModalState((prev) => ({ ...prev, open }))}
      >
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edytuj opinię</DialogTitle>
            <DialogDescription>
              <Label htmlFor="review" className="text-right">
                Opinia
              </Label>
              <Input
                id="review"
                value={editedReview} // Zmieniamy z defaultValue na value, aby było powiązane ze stanem
                onChange={handleReviewEdit}
                className="col-span-3"
              />
              <Label htmlFor="rating" className="text-right">
                Ocena
              </Label>
              <Input
                id="rating"
                type="number"
                value={editedRating}
                min={1}
                max={5}
                onChange={handleRatingChange}
                className="col-span-3"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleSaveChanges} type="button">
              Zapisz zmiany
            </Button>
            <Button
              onClick={() =>
                setModalState((prev) => ({ ...prev, open: false }))
              }
              type="button"
            >
              Anuluj
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
