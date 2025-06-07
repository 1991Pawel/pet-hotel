import { AnimalType } from "@prisma/client";
type MessageDto = {
  id: string;
  text: string;
  created: string;
  dateRead: string | null;
  senderId?: string;
  senderName?: string;
  senderImage?: string | null;
  recipientId?: string;
  recipientName?: string;
  recipientImage?: string | null;
};

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
  select: {
    id: true;
    text: true;
    created: true;
    dateRead: true;
    sender: {
      select: { userId; name; image };
    };
    recipient: {
      select: { userId; name; image };
    };
  };
}>;

type ReviewWithRelations = Prisma.ReviewGetPayload<{
  include: {
    petOwner: {
      include: {
        user: true;
      };
    };
  };
}>;

type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };

export type HotelFilters = {
  city: string;
  rating: number;
  minPrice: number;
  maxPrice: number;
  animalTypes: AnimalType[];
  searchQuery: string;
  page: number;
};

export interface Hotel {
  id: string;
  name: string | null;
  userId: string;
  averageRating: number | null;
  rating?: number;
  location: {
    city: string;
  } | null;
  photos: {
    id: string;
    url: string;
    publicId?: string | null;
    isMain?: boolean;
  }[];
  reviews?: {
    rating: number;
  }[];
}

export type HotelWithReviews = Prisma.HotelOwnerGetPayload<{
  include: {
    reviews: {
      select: { rating: true };
    };
    photos: true;
    location: {
      select: { city: true };
    };
  };
}>;

export type HotelWithAverage = HotelWithReviews & {
  averageRating: number | null;
  reviewsCount: number;
};

export type HotelCardProps = {
  hotel: Pick<
    HotelWithAverage,
    "id" | "name" | "userId" | "averageRating" | "location" | "photos"
  >;
};

export type HotelPhoto = {
  id: string;
  url: string;
  publicId?: string | null;
  isMain?: boolean;
};
