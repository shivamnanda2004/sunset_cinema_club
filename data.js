const CITIES = ["Mumbai", "Bangalore", "Hyderabad", "Delhi NCR", "Pune"];

const EVENTS = [
  {
    id: "candlelight-jab-we-met",
    title: "Candlelight Cinema — Jab We Met",
    city: "Pune",
    venue: "The Bierhaus, Hinjawadi",
    date: "2026-08-22",
    time: "7:30 PM",
    price: "₹699",
    art: "art-1",
    tag: "Candlelight Cinema",
    synopsis: "A rom-com favourite under string lights, with candlelit tables and a full bar menu running through the screening."
  },
  {
    id: "gourmet-mood-for-love",
    title: "Gourmet Cinema — In the Mood for Love",
    city: "Mumbai",
    venue: "The Club, Andheri West",
    date: "2026-08-22",
    time: "8:00 PM",
    price: "₹899",
    art: "art-2",
    tag: "Gourmet Cinema",
    synopsis: "A slow, beautiful classic paired with a plated dinner service — arrive early, the kitchen opens an hour before showtime."
  },
  {
    id: "candlelight-hum-tum",
    title: "Candlelight Cinema — Hum Tum",
    city: "Bangalore",
    venue: "Maize & Malt, Whitefield",
    date: "2026-08-22",
    time: "7:00 PM",
    price: "₹649",
    art: "art-3",
    tag: "Candlelight Cinema",
    synopsis: "A cult Bollywood favourite on the lawn, best enjoyed with the venue's wood-fired pizza and a blanket for two."
  },
  {
    id: "rooftop-la-la-land",
    title: "Rooftop Cinema — La La Land",
    city: "Delhi NCR",
    venue: "Sky Lounge, Cyber Hub",
    date: "2026-08-29",
    time: "8:15 PM",
    price: "₹799",
    art: "art-4",
    tag: "Rooftop Cinema",
    synopsis: "A musical on a skyline rooftop — beanbags up front, standard seating behind, cocktails throughout."
  },
  {
    id: "drive-in-grand-budapest",
    title: "Drive-In — The Grand Budapest Hotel",
    city: "Hyderabad",
    venue: "Hitex Grounds",
    date: "2026-08-30",
    time: "7:45 PM",
    price: "₹1,199 / car",
    art: "art-1",
    tag: "Drive-In",
    synopsis: "Park up, tune your radio to the broadcast frequency, and settle in — concession trolleys do the rounds between reels."
  },
  {
    id: "amphitheatre-cinema-paradiso",
    title: "Amphitheatre Cinema — Cinema Paradiso",
    city: "Pune",
    venue: "Riverside Amphitheatre",
    date: "2026-09-05",
    time: "7:30 PM",
    price: "₹749",
    art: "art-2",
    tag: "Amphitheatre",
    synopsis: "A love letter to the movies, screened the way it deserves — tiered stone seating and a full-size outdoor screen."
  },
  {
    id: "beachfront-dil-chahta-hai",
    title: "Beachfront Cinema — Dil Chahta Hai",
    city: "Mumbai",
    venue: "Versova Beach Club",
    date: "2026-09-06",
    time: "7:00 PM",
    price: "₹849",
    art: "art-3",
    tag: "Beachfront",
    synopsis: "Sand underfoot, sea breeze, and a coming-of-age classic — doors open early for sunset drinks."
  },
  {
    id: "candlelight-dilwale",
    title: "Candlelight Cinema — Dilwale Dulhania Le Jayenge",
    city: "Delhi NCR",
    venue: "The Grammar Room, GK2",
    date: "2026-09-12",
    time: "7:30 PM",
    price: "₹699",
    art: "art-4",
    tag: "Candlelight Cinema",
    synopsis: "The one that never gets old — expect the crowd to know every line, and bring tissues for the mustard fields scene."
  }
];

const VENUE_TYPES = [
  {
    name: "Rooftop Bars",
    icon: "building",
    desc: "Skyline views, curated cocktail menus, and a screen that competes with the city lights — and wins."
  },
  {
    name: "Microbreweries",
    icon: "beer",
    desc: "Craft beer flights and a film list that leans cult classic, poured between reels."
  },
  {
    name: "Beachfront Clubs",
    icon: "wave",
    desc: "Screenings timed to the tide, with sand-friendly seating and sunset call times."
  },
  {
    name: "Amphitheatres",
    icon: "amphitheatre",
    desc: "Purpose-built tiered seating for the nights that call for scale — festivals, premieres, big-crowd classics."
  },
  {
    name: "Hotel Lawns",
    icon: "hotel",
    desc: "Manicured lawns, full-service catering, and easy parking — a favourite for private bookings."
  },
  {
    name: "Drive-In Lots",
    icon: "car",
    desc: "Your car, your rules — tune in on FM, crack the windows, and let the concession trolley find you."
  },
  {
    name: "Bars & Lounges",
    icon: "glass",
    desc: "Indoor-outdoor spaces with a late license, best for the after-work double feature crowd.",
  },
  {
    name: "Riverside Decks",
    icon: "wave",
    desc: "Water on one side, screen on the other — our quietest, most requested setting."
  }
];

const FAQS = [
  {
    q: "How do I find screenings in my city?",
    a: "Use the city selector in the top navigation, or open the Events page and filter by city. New screenings are added every week, so check back often."
  },
  {
    q: "What's included in the ticket price?",
    a: "Every ticket includes your seat and the screening itself. Food and drinks are usually available to order at the venue and are priced separately unless the event page says otherwise."
  },
  {
    q: "Can I bring my own seating or blankets?",
    a: "Most lawn and beachfront venues are fine with a blanket or low beach chair — check the specific event's details page, since rooftop and indoor-outdoor venues usually provide seating already."
  },
  {
    q: "What happens if it rains?",
    a: "Outdoor screenings are weather-dependent. If a show can't safely go ahead, we'll email registered guests with a reschedule date or a full refund — whichever you prefer."
  },
  {
    q: "Is there an age limit?",
    a: "It depends on the venue and the film's certification. Family-friendly screenings are marked clearly on the event page; late-night bar venues are 21+."
  },
  {
    q: "How far in advance should I book?",
    a: "Popular titles at smaller venues sell out within days. We'd suggest booking as soon as a screening is listed, especially for weekend dates."
  },
  {
    q: "Can I organise a private screening for my group?",
    a: "Yes — head to the Private Screening page to see available venues and packages, or send us your date and headcount and we'll put a proposal together."
  },
  {
    q: "Do gift cards expire?",
    a: "Gift cards are valid for 12 months from the date of purchase and can be used against any public screening on the site."
  }
];

const GALLERY_ITEMS = [
  { tag: "Rooftop · Mumbai", art: "art-1" },
  { tag: "Beachfront · Mumbai", art: "art-2" },
  { tag: "Amphitheatre · Pune", art: "art-3" },
  { tag: "Drive-In · Hyderabad", art: "art-4" },
  { tag: "Candlelight · Bangalore", art: "art-2" },
  { tag: "Brewery · Bangalore", art: "art-1" },
  { tag: "Hotel Lawn · Delhi NCR", art: "art-3" },
  { tag: "Riverside · Pune", art: "art-4" },
  { tag: "Rooftop · Delhi NCR", art: "art-2" },
  { tag: "Gourmet Cinema · Mumbai", art: "art-1" },
  { tag: "Beachfront · Mumbai", art: "art-3" },
  { tag: "Amphitheatre · Hyderabad", art: "art-4" }
];