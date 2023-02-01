import { RestaurantData } from '@/features/restaurants/types'

export const activities: RestaurantData[] = [
  {
    id: '1',
    user_id: '268119a3-cc69-4cff-b86d-35ee46ef43ad',
    discovered_at: new Date(2022, 9, 6),
    is_liked: false,
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 42.6485419,
        lng: 23.4086112,
      },
      viewport: {
        northeast: {
          lat: 42.6496963302915,
          lng: 23.4099625302915,
        },
        southwest: {
          lat: 42.6469983697085,
          lng: 23.4072645697085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: 'Alpino 1',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 1200,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104232757213504339043">Георги Георгиев</a>',
        ],
        photo_reference:
          'AW30NDxvKc7TyIy3HNSB341H37Ko8QCvgw0Y_Sce2VckopexysrHz3r-T-_1N7O_K3JE1vmPBpNqpG6cuiToXAxvVrFwFOJrWFq8V9mFrLOBcdEdUARdm6XRE2nNoZacyYjUdZr9VZwpsMtMVy0tSAzTavpDcZmoNNs7Az7sjEgyxjIKI8bT',
        width: 1920,
      },
    ],
    place_id: 'ChIJBTBBRKiaqkARRgOZXBkrduI',
    plus_code: {
      compound_code: 'JCX5+CC Sofia, Bulgaria',
      global_code: '8GJ5JCX5+CC',
    },
    rating: 1.4,
    reference: 'ChIJBTBBRKiaqkARRgOZXBkrduI',
    scope: 'GOOGLE',
    types: ['point_of_interest', 'establishment'],
    user_ratings_total: 10,
    vicinity: 'Жилищен комплекс Дружба 2 бл.322, Sofia',
  },
  {
    id: '2',
    user_id: '268119a3-cc69-4cff-b86d-35ee46ef43ad',
    discovered_at: new Date(2022, 12, 31),
    is_liked: false,
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 42.648469,
        lng: 23.40879,
      },
      viewport: {
        northeast: {
          lat: 42.6496604302915,
          lng: 23.4101408802915,
        },
        southwest: {
          lat: 42.64696246970851,
          lng: 23.40744291970849,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png',
    icon_background_color: '#4B96F3',
    icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet',
    name: 'Gifts for every occasion',
    opening_hours: {
      open_now: true,
    },
    place_id: 'ChIJO63ANvyGqkARJiAtX4Rrlc0',
    plus_code: {
      compound_code: 'JCX5+9G Sofia, Bulgaria',
      global_code: '8GJ5JCX5+9G',
    },
    rating: 3.3,
    reference: 'ChIJO63ANvyGqkARJiAtX4Rrlc0',
    scope: 'GOOGLE',
    types: ['store', 'point_of_interest', 'establishment'],
    user_ratings_total: 4,
    vicinity: 'кв. бл.304, вх. Г, ет.2, ап.1, ulitsa "Druzhba" 2, Sofia',
  },
  {
    id: '3',
    user_id: 'UuIbw4',
    discovered_at: new Date(2022, 10, 12),
    is_liked: true,
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 42.647803,
        lng: 23.4022668,
      },
      viewport: {
        northeast: {
          lat: 42.64915413029149,
          lng: 23.4035581802915,
        },
        southwest: {
          lat: 42.64645616970849,
          lng: 23.4008602197085,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Пица Лъчони - Дружба',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 638,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115425732225978179595">Пица Лъчони - Дружба</a>',
        ],
        photo_reference:
          'AW30NDyu5Qf2FS70VjKF3SatpZJf4sR-ybZq8hyFIJCgP600Tny6dd0yVpGXnALMMh5JUcGT5ut2c5rQ4UUqZlUN_E1b2vNlVEaO2SMuO3BHf_TbEN-1aIQsTyauDCcrOIuu5o7oBqmaHW8OJr047cEjMzN5Hx8SbEvC5O7KOzTDcPtD8rNX',
        width: 1132,
      },
    ],
    place_id: 'ChIJa4EHI_uGqkARpklBvYelCWE',
    plus_code: {
      compound_code: 'JCX2+4W Sofia, Bulgaria',
      global_code: '8GJ5JCX2+4W',
    },
    price_level: 2,
    rating: 4,
    reference: 'ChIJa4EHI_uGqkARpklBvYelCWE',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 1798,
    vicinity: 'Блок 287, Sofia',
  },
]
