export const RESTAURANT_INFO = {
  name: 'CRAVE',
  brandSuffix: 'Craft Kitchen & Burger Bar',
  tagline: 'Crispy layers, bold flavors, and meals that actually hit different.',
  headlineLine1: 'SALAD LEFT',
  headlineLine2: 'THE CHAT',
  deliveryTime: '30 Min',
  deliverySubtitle: 'Super fast Delivery & Fresh Grill',
  organicBadge: '100% Natural Organic Ingredients',
  rating: '4.9',
  reviewsCount: '2,358 reviews',
  address: {
    street: '742 Broadway Ave',
    neighborhood: 'Downtown / SoHo',
    city: 'New York',
    state: 'NY',
    zip: '10003',
    fullFormatted: '742 Broadway Ave, Downtown, New York, NY 10003',
    googleMapsUrl: 'https://maps.google.com/?q=742+Broadway+New+York+NY+10003',
  },
  contact: {
    primaryPhone: '+1 (555) 839-2728',
    rawPhone: '+15558392728',
    whatsappNumber: '+15558392728',
    orderHotline: '+1 (555) 839-2729',
    rawOrderHotline: '+15558392729',
    email: 'order@cravekitchen.com',
  },
  social: {
    instagram: 'https://instagram.com',
    instagramHandle: '@crave.burgers',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
    uberEats: 'https://ubereats.com',
  },
  hours: [
    { days: 'Monday – Thursday', time: '11:00 AM – 11:00 PM', note: 'Lunch, Dinner & Late Delivery' },
    { days: 'Friday – Saturday', time: '11:00 AM – 1:00 AM', note: 'Late Night Sizzle & Shakes' },
    { days: 'Sunday', time: '11:30 AM – 10:30 PM', note: 'All-Day Craft Burgers & Wings' },
  ],
  stats: {
    burgersServed: '120,000+',
    deliverySpeed: '28 min avg',
    organicCertified: '100%',
    stars: '4.9 / 5.0',
  }
};

export function getLiveRestaurantStatus(): {
  isOpen: boolean;
  statusText: string;
  nextServiceText: string;
} {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentDecimalHour = hours + minutes / 60;

  // Open 11:00 to 23:00 or later
  if (currentDecimalHour >= 11.0 && currentDecimalHour <= 23.5) {
    return {
      isOpen: true,
      statusText: 'Open Now · Kitchen Sizzling',
      nextServiceText: 'Accepting orders until 11:30 PM',
    };
  } else {
    return {
      isOpen: false,
      statusText: 'Closed Currently',
      nextServiceText: 'Grill fires up at 11:00 AM',
    };
  }
}
