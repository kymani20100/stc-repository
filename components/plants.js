const plants = [
    {
      id: 1,
      seatId: 1,
      name: 'Succulent Plant',
      price: '39.99',
      booked: true,
      isVisible: true,
      about:
        'Succulent Plantis one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
  
    {
      id: 2,
      seatId: 2,
      name: 'Dragon Plant',
      price: '29.99',
      booked: false,
      isVisible: true,
      about:
        'Dragon Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 3,
      seatId: 151,
      name: 'Ravenea Plant',
      price: '25.99',
      booked: false,
      isVisible: false,
      about:
        'Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
  
    {
      id: 4,
      seatId: 152,
      name: 'Potted Plant',
      price: '25.99',
      booked: true,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 5,
      seatId: 153,
      name: 'Ravenea Plant',
      price: '50.99',
      booked: true,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 6,
      seatId: 3,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 7,
      seatId: 4,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 8,
      seatId: 5,
      name: 'Dragon Plant',
      price: '29.99',
      booked: false,
      isVisible: true,
      about:
        'Dragon Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 9,
      seatId: 6,
      name: 'Ravenea Plant',
      price: '25.99',
      booked: false,
      isVisible: true,
      about:
        'Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
  
    {
      id: 10,
      seatId: 156,
      name: 'Potted Plant',
      price: '25.99',
      booked: true,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 11,
      seatId: 157,
      name: 'Ravenea Plant',
      price: '50.99',
      booked: true,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 12,
      seatId: 158,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 13,
      seatId: 7,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    }
    ,
  
    {
      id: 14,
      seatId: 8,
      name: 'Dragon Plant',
      price: '29.99',
      booked: false,
      isVisible: true,
      about:
        'Dragon Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 15,
      seatId: 9,
      name: 'Ravenea Plant',
      price: '25.99',
      booked: false,
      isVisible: true,
      about:
        'Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
  
    {
      id: 16,
      seatId: 10,
      name: 'Potted Plant',
      price: '25.99',
      booked: true,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 17,
      seatId: 161,
      name: 'Ravenea Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 18,
      seatId: 162,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 19,
      seatId: 163,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    }
    ,
  
    {
      id: 20,
      seatId: 11,
      name: 'Dragon Plant',
      price: '29.99',
      booked: false,
      isVisible: true,
      about:
        'Dragon Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 21,
      seatId: 12,
      name: 'Ravenea Plant',
      price: '25.99',
      booked: false,
      isVisible: true,
      about:
        'Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
  
    {
      id: 22,
      seatId: 13,
      name: 'Potted Plant',
      price: '25.99',
      booked: true,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 23,
      seatId: 14,
      name: 'Ravenea Plant',
      price: '50.99',
      booked: true,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 24,
      seatId: 164,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 25,
      seatId: 165,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    }
    ,
  
    {
      id: 26,
      seatId: 166,
      name: 'Dragon Plant',
      price: '29.99',
      booked: false,
      isVisible: false,
      about:
        'Dragon Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 27,
      seatId: 15,
      name: 'Ravenea Plant',
      price: '25.99',
      booked: false,
      isVisible: true,
      about:
        'Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
  
    {
      id: 28,
      seatId: 16,
      name: 'Potted Plant',
      price: '25.99',
      booked: true,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 29,
      seatId: 17,
      name: 'Ravenea Plant',
      price: '50.99',
      booked: true,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 30,
      seatId: 18,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 31,
      seatId: 168,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 32,
      seatId: 169,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,  
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 33,
      seatId: 170,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 34,
      seatId: 19,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 35,
      seatId: 20,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 36,
      seatId: 21,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 37,
      seatId: 22,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 38,
      seatId: 171,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 39,
      seatId: 172,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 40,
      seatId: 173,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 41,
      seatId: 174,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 42,
      seatId: 175,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 43,
      seatId: 23,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 44,
      seatId: 24,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 45,
      seatId: 181,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 46,
      seatId: 182,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 47,
      seatId: 183,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 48,
      seatId: 184,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 49,
      seatId: 185,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 50,
      seatId: 25,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 51,
      seatId: 26,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 52,
      seatId: 190,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 53,
      seatId: 191,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 54,
      seatId: 192,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 55,
      seatId: 27,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 56,
      seatId: 28,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 57,
      seatId: 29,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 58,
      seatId: 30,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 59,
      seatId: 195,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 60,
      seatId: 199,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 61,
      seatId: 200,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 62,
      seatId: 31,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 63,
      seatId: 32,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 64,
      seatId: 33,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 65,
      seatId: 34,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 66,
      seatId: 221,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 67,
      seatId: 222,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 68,
      seatId: 223,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 69,
      seatId: 35,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 70,
      seatId: 36,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 71,
      seatId: 37,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 72,
      seatId: 38,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 73,
      seatId: 230,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 74,
      seatId: 231,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 75,
      seatId: 232,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 76,
      seatId: 39,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 77,
      seatId: 40,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 78,
      seatId: 41,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 79,
      seatId: 42,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 80,
      seatId: 240,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 81,
      seatId: 241,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 82,
      seatId: 242,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: false,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 83,
      seatId: 43,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    },
    {
      id: 84,
      seatId: 44,
      name: 'Dragon Plant',
      price: '50.99',
      booked: false,
      isVisible: true,
      about:
        'Potted Plant Ravenea Plant one of the most popular and beautiful species that will produce clumpms. The storage of water often gives succulent plants a more swollen or fleshy appearance than other plants, a characteristic known as succulence.',
    }
  
  ];
  
  export default plants;
  