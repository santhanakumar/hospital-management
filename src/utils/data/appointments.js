const appointments = [
  {
    id: 1,
    ID: "ADY12004",
    name: "Hari Haran",
    age: 27,
    ageType: "Y",
    gender: "male",
    appointmentDate: "27-02-2020",
    amount: 230,
    discount: 50,
    total: 180,
    payments: [
      {
        id: 1,
        date: "02-03-2020",
        amount: 25,
        type: "CARD",
      },
      {
        id: 2,
        date: "01-03-2020",
        amount: 105,
        type: "CASH",
      },
    ],
  },
  {
    id: 2,
    ID: "ADY12024",
    name: "Shiva Shankar",
    age: 25,
    ageType: "Y",
    gender: "male",
    appointmentDate: "28-02-2020",
    amount: 500,
    discount: 0,
    total: 500,
    payments: [
      {
        id: 1,
        date: "02-03-2020",
        amount: 100,
        type: "CARD",
      },
    ],
  },
];

export default appointments;
