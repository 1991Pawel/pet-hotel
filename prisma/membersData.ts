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
  {
    email: "petparadise@wp.pl",
    image: "https://api.dicebear.com/6.x/thumbs/svg?seed=PetParadise",
    name: "Pet Paradise",
    maxPricePerNight: 90,
    minPricePerNight: 40,
    description: "Raj dla zwierząt w Tatrach. 🐶<br>Wypoczynek i opieka.",
    AnimalType: ["DOG", "OTHER"],
    location: [
      {
        city: "Zakopane",
        street: "ul. Krupówki 33",
        postalCode: "34-500",
        latitude: 49.2992,
        longitude: 19.9496,
      },
    ],
    reviews: [
      {
        reviewerEmail: "pawel@wp.pl",
        reviewerName: "Paweł",
        content: "Przepiękne widoki i super obsługa!",
        rating: 5,
      },
    ],
  },
  {
    email: "animalhouse@wp.pl",
    image: "https://api.dicebear.com/6.x/thumbs/svg?seed=AnimalHouse",
    name: "Animal House",
    maxPricePerNight: 110,
    minPricePerNight: 55,
    description: "Hotel przyjazny wszystkim zwierzakom. 🐾",
    AnimalType: ["CAT", "DOG", "OTHER"],
    location: [
      {
        city: "Gdańsk",
        street: "ul. Długa 1",
        postalCode: "80-831",
        latitude: 54.352,
        longitude: 18.6466,
      },
    ],
    reviews: [],
  },
  {
    email: "puppypalace@wp.pl",
    image: "https://api.dicebear.com/6.x/thumbs/svg?seed=PuppyPalace",
    name: "Puppy Palace",
    maxPricePerNight: 130,
    minPricePerNight: 70,
    description: "Ekskluzywny hotel dla psów. 🐩",
    AnimalType: ["DOG"],
    location: [
      {
        city: "Łódź",
        street: "ul. Piotrkowska 100",
        postalCode: "90-001",
        latitude: 51.7592,
        longitude: 19.455,
      },
    ],
    reviews: [
      {
        reviewerEmail: "beata@wp.pl",
        reviewerName: "Beata",
        content: "Drogo, ale warto!",
        rating: 5,
      },
    ],
  },
  {
    email: "meowresort@wp.pl",
    image: "https://api.dicebear.com/6.x/thumbs/svg?seed=MeowResort",
    name: "Meow Resort",
    maxPricePerNight: 80,
    minPricePerNight: 45,
    description: "W pełni koci hotel. 🐱",
    AnimalType: ["CAT"],
    location: [
      {
        city: "Toruń",
        street: "ul. Kopernika 7",
        postalCode: "87-100",
        latitude: 53.0138,
        longitude: 18.5984,
      },
    ],
    reviews: [
      {
        reviewerEmail: "marta@wp.pl",
        reviewerName: "Marta",
        content: "Moja kotka była zachwycona.",
        rating: 4,
      },
    ],
  },
  {
    email: "tailstravel@wp.pl",
    image: "https://api.dicebear.com/6.x/thumbs/svg?seed=TailsTravel",
    name: "Tails Travel",
    maxPricePerNight: 100,
    minPricePerNight: 55,
    description: "Podróżuj bez stresu, my zajmiemy się Twoim pupilem.",
    AnimalType: ["DOG", "CAT"],
    location: [
      {
        city: "Lublin",
        street: "ul. Lipowa 2",
        postalCode: "20-400",
        latitude: 51.2465,
        longitude: 22.5684,
      },
    ],
    reviews: [],
  },
  {
    email: "citypet@wp.pl",
    image: "https://api.dicebear.com/6.x/thumbs/svg?seed=CityPet",
    name: "City Pet Hotel",
    maxPricePerNight: 95,
    minPricePerNight: 45,
    description: "Nowoczesny hotel w centrum. 🐾",
    AnimalType: ["DOG", "CAT"],
    location: [
      {
        city: "Rzeszów",
        street: "ul. Rejtana 10",
        postalCode: "35-001",
        latitude: 50.0412,
        longitude: 21.9991,
      },
    ],
    reviews: [],
  },
  {
    email: "greenpaws@wp.pl",
    image: "https://api.dicebear.com/6.x/thumbs/svg?seed=GreenPaws",
    name: "Green Paws",
    maxPricePerNight: 85,
    minPricePerNight: 40,
    description:
      "Ekologiczny hotel dla zwierząt. 🌿<br>W pełni naturalne środowisko.",
    AnimalType: ["DOG", "OTHER"],
    location: [
      {
        city: "Białystok",
        street: "ul. Lipowa 3",
        postalCode: "15-427",
        latitude: 53.1325,
        longitude: 23.1688,
      },
    ],
    reviews: [
      {
        reviewerEmail: "karol@wp.pl",
        reviewerName: "Karol",
        content: "Świetne miejsce! Mój pies był zachwycony spacerami po lesie.",
        rating: 5,
      },
      {
        reviewerEmail: "dorota@wp.pl",
        reviewerName: "Dorota",
        content: "Wszystko zgodnie z opisem.",
        rating: 4,
      },
    ],
  },
  {
    email: "luxpet@wp.pl",
    image: "https://api.dicebear.com/6.x/thumbs/svg?seed=LuxPet",
    name: "LuxPet Resort",
    maxPricePerNight: 150,
    minPricePerNight: 90,
    description:
      "Luksusowy hotel z opieką weterynaryjną 24/7. ✨<br>Dla najbardziej wymagających pupili.",
    AnimalType: ["DOG", "CAT", "OTHER"],
    location: [
      {
        city: "Sopot",
        street: "ul. Bohaterów Monte Cassino 10",
        postalCode: "81-759",
        latitude: 54.4416,
        longitude: 18.5601,
      },
    ],
    reviews: [
      {
        reviewerEmail: "alicja@wp.pl",
        reviewerName: "Alicja",
        content: "Prawdziwy luksus, moje psy były traktowane jak królowie!",
        rating: 5,
      },
    ],
  },
  {
    email: "petparadise@wp.pl",
    image: "https://api.dicebear.com/6.x/thumbs/svg?seed=PetParadise",
    name: "Pet Paradise",
    maxPricePerNight: 120,
    minPricePerNight: 70,
    description:
      "Raj dla pupili w spokojnej okolicy. 🌴<br>Zielony ogród i indywidualna opieka.",
    AnimalType: ["DOG", "CAT"],
    location: [
      {
        city: "Łódź",
        street: "ul. Piotrkowska 250",
        postalCode: "90-361",
        latitude: 51.7592,
        longitude: 19.455,
      },
    ],
    reviews: [
      {
        reviewerEmail: "grzegorz@wp.pl",
        reviewerName: "Grzegorz",
        content: "Mój kot wrócił zadowolony! Cisza, spokój, dobra opieka.",
        rating: 4,
      },
    ],
  },
  {
    email: "pawresort@wp.pl",
    image: "https://api.dicebear.com/6.x/thumbs/svg?seed=PawResort",
    name: "Paw Resort",
    maxPricePerNight: 110,
    minPricePerNight: 60,
    description:
      "Nowoczesny resort z przestrzenią do zabawy. 🏖️<br>Monitoring i codzienne raporty.",
    AnimalType: ["DOG"],
    location: [
      {
        city: "Poznań",
        street: "ul. Głogowska 15",
        postalCode: "60-101",
        latitude: 52.4064,
        longitude: 16.9252,
      },
    ],
    reviews: [
      {
        reviewerEmail: "weronika@wp.pl",
        reviewerName: "Weronika",
        content: "Świetna lokalizacja i profesjonalna obsługa!",
        rating: 5,
      },
      {
        reviewerEmail: "mateusz@wp.pl",
        reviewerName: "Mateusz",
        content: "Bardzo dobra jakość usług, ale mogłoby być taniej.",
        rating: 4,
      },
    ],
  },
];

export const petOwnersData = [
  {
    id: "petowner_test_1", // przykładowe stałe id do łatwego podłączenia
    email: "arek@wp.pl",
    name: "Arek",
    password: "password", // jeśli potrzebujesz, do zahashowania przy seedzie
  },
  {
    id: "petowner_test_2",
    email: "zosia@wp.pl",
    name: "Zosia",
    password: "password",
  },
  {
    id: "petowner_test_3",
    email: "pawel@wp.pl",
    name: "Paweł",
    password: "password",
  },
  {
    id: "petowner_test_4",
    email: "beata@wp.pl",
    name: "Beata",
    password: "password",
  },
];
