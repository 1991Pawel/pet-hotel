export function hasUserAlreadyReviewed(hotelReviews: any[], userId: string) {
  return !hotelReviews.some((review) => review.petOwner.user.id === userId);
}
export function addUserReviewFlagToReviews(
  hotelReviews: any[],
  loggedUserId?: string
) {
  return hotelReviews.map((review) => ({
    ...review,
    isUserReview: loggedUserId
      ? review.petOwner?.user?.id === loggedUserId
      : false,
  }));
}
