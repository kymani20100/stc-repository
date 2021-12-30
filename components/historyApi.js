const history = [
    {
      ticketID: "12345",
      From: 'Accra - Main',
      To: 'Cape Coast',
      booking_date: '8-Nov-2021',
      travel_date: '8-Nov-2021',
      depart_time: '12:00 PM',
      report_time: '12:00 PM',
      booked_tickets: 
          [
             {
                bookingID: 'GGG-STC-2134-54321',
                passName: 'Emmanuel Glimeti',
                seatNo: 21,
                Fare: 45,
                dfrom: 'Accra - Main',
               dto: 'Cape Coast'
             },
             {
                bookingID: 'GGG-STC-2834-54321',
                passName: 'Gloria Glimeti',
                seatNo: 28,
                Fare: 45,
                dfrom: 'Accra - Main',
                  dto: 'Cape Coast'
             },
             {
                bookingID: 'GGG-STC-1234-54321',
                passName: 'Patricia Glimeti',
                seatNo: 12,
                Fare: 45,
                dfrom: 'Accra - Main',
               dto: 'Cape Coast'
             }, 
          ]
      ,
      message: true,
    },
    {
        ticketID: "23456",
        From: 'Accra - Main',
        To: 'Cape Coast',
        booking_date: '8-Nov-2021',
        travel_date: '8-Nov-2021',
        depart_time: '12:00 PM',
        report_time: '12:00 PM',
        booked_tickets: 
            [
               {
                  bookingID: 'GGG-STC-2234-54321',
                  passName: 'Perpetual Dzangbo',
                  seatNo: 2,
                  Fare: 45,
                  dfrom: 'Accra - Main',
                  dto: 'Cape Coast'
               },
               {
                  bookingID: 'GGG-STC-1834-54321',
                  passName: 'Gloria Glimeti',
                  seatNo: 18,
                  Fare: 45,
                  dfrom: 'Accra - Main',
                  dto: 'Cape Coast'
               },
               {
                  bookingID: 'GGG-STC-3534-54321',
                  passName: 'Patricia Glimeti',
                  seatNo: 35,
                  Fare: 45,
                  dfrom: 'Accra - Main',
                  dto: 'Cape Coast'
               },
            ]
        ,
        message: true,
      },
  ];
  
  export default history;
  