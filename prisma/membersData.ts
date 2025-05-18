export const membersData = [
  {
    email: "test@wp.pl",
    image: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    name: "Hotel Testowy",
    maxPricePerNight: 100,
    minPricePerNight: 50,
    description:
      "Nowoczesny hotel w centrum Warszawy. 🐾<br>Duży wybieg dla psów.",
    AnimalType: ["DOG", "CAT"],
    location: [
      {
        city: "Warszawa",
        street: "ul. Marszałkowska 1",
        postalCode: "00-001",
        latitude: 52.2297,
        longitude: 21.0122,
      },
    ],
    reviews: [
      {
        reviewerEmail: "arek@wp.pl",
        reviewerName: "Arek",
        content: "Super hotel! Polecam!",
        rating: 5,
      },
      {
        reviewerEmail: "zosia@wp.pl",
        reviewerName: "Zosia",
        content: "Czysto i przyjemnie.",
        rating: 4,
      },
    ],
  },
  {
    email: "sunrise@wp.pl",
    maxPricePerNight: 100,
    minPricePerNight: 50,
    AnimalType: ["DOG"],
    description:
      "Kameralny hotel w sercu Wrocławia. 🐱<br>Idealny dla kotów i małych zwierząt.",
    image:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/85/85396ee4274f5755b0b453d77fa110336cce37ad_full.jpg",
    name: "Hotel Sunrise",
    location: [
      {
        city: "Kraków",
        street: "ul. Floriańska 12",
        postalCode: "31-019",
        latitude: 50.0647,
        longitude: 19.945,
      },
    ],
    reviews: [
      {
        reviewerEmail: "bartek@wp.pl",
        reviewerName: "Bartek",
        content: "Bardzo dobra lokalizacja i obsługa.",
        rating: 5,
      },
      {
        reviewerEmail: "ania@wp.pl",
        reviewerName: "Ania",
        content: "Pokoje mogłyby być czystsze.",
        rating: 3,
      },
    ],
  },
  {
    email: "cozystay@wp.pl",
    image:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/20/200b6fb83907ac0a4e08f0cbbd8f61634f325794_full.jpg",
    name: "Cozy Stay",
    AnimalType: ["CAT", "OTHER"],
    maxPricePerNight: 100,
    minPricePerNight: 50,
    description:
      "Kameralny hotel w sercu Wrocławia. 🐱<br>Idealny dla kotów i małych zwierząt.",
    location: [
      {
        city: "Wrocław",
        street: "ul. Świdnicka 5",
        postalCode: "50-066",
        latitude: 51.1079,
        longitude: 17.0385,
      },
    ],
    reviews: [
      {
        reviewerEmail: "kasia@wp.pl",
        reviewerName: "Kasia",
        content: "Miłe miejsce na weekend.",
        rating: 4,
      },
      {
        reviewerEmail: "janek@wp.pl",
        reviewerName: "Janek",
        content: "Dobre śniadania, ale cienkie ściany.",
        rating: 3,
      },
      {
        reviewerEmail: "ola@wp.pl",
        reviewerName: "Ola",
        content: "Wszystko super, wrócę tu na pewno!",
        rating: 5,
      },
    ],
  },
];
