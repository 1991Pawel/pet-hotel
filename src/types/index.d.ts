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

export type HotelCardProps = {
  hotel: {
    id: string;
    name: string | null;
    userId: string;
    rating?: number;
    averageRating: number | null;
    location: {
      city: string;
    } | null;
    photos: {
      url: string;
    }[];
  };
};
type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };

export type HotelFilters = {
  city: string;
  rating: number;
  minPrice: number;
  maxPrice: number;
  animalTypes: string[];
  searchQuery: string;
  page: number;
};
