import { z } from "zod";

export const reviewSchema = z.object({
  reviewText: z
    .string()
    .min(10, "Review must be at least 10 characters long")
    .max(500, "Review must be no longer than 500 characters"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
