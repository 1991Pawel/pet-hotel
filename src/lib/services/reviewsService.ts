
export function hasUserAlreadyReviewed(hotelReviews: ReviewWithRelations[], userId: string) {
  return !hotelReviews.some((review) => review.petOwner.user.id === userId);
}
export function addUserReviewFlagToReviews(
  hotelReviews: ReviewWithRelations[],
  loggedUserId?: string
) {
  return hotelReviews.map((review) => ({
    ...review,
    isUserReview: loggedUserId
      ? review.petOwner?.user?.id === loggedUserId
      : false,
  }));
}

export const hotelOwnersWithAvg = (hotelOwners) => {


 

  const hotelsWithAvg = hotelOwners.map((hotel) => {
    const reviews = hotel.reviews;
    const ratings = reviews.map((review: ReviewWithRelations) => review.rating);
    const avgRating =
      ratings.length > 0
        ? Math.floor(ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length)
        : null;
    return {
      ...hotel,
      reviewsCount: reviews.length,
      averageRating: avgRating,
    };
  }
  );

  return hotelsWithAvg;
     
  
  
};
