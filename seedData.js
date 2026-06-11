// Default GK / GS Quizzes Seed Data
window.DEFAULT_QUIZZES = [
  {
    id: "indian-polity-basic",
    title: "Indian Polity & Constitution",
    category: "Polity",
    description: "Test your knowledge on the Constitution of India, fundamental rights, and the structure of governance.",
    questions: [
      {
        id: 1,
        question: "Who is known as the Father of the Indian Constitution?",
        options: [
          "Mahatma Gandhi",
          "Dr. B.R. Ambedkar",
          "Jawaharlal Nehru",
          "Dr. Rajendra Prasad"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What is the minimum age required to become the President of India?",
        options: [
          "25 years",
          "30 years",
          "35 years",
          "40 years"
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "Under which Article of the Constitution can the President declare a National Emergency?",
        options: [
          "Article 352",
          "Article 356",
          "Article 360",
          "Article 370"
        ],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "The concept of 'Fundamental Duties' in the Indian Constitution was borrowed from which country?",
        options: [
          "United States of America",
          "United Kingdom",
          "USSR (now Russia)",
          "Australia"
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "How many schedules are there in the Constitution of India currently?",
        options: [
          "8 Schedules",
          "10 Schedules",
          "12 Schedules",
          "15 Schedules"
        ],
        correctAnswer: 2
      },
     {
        id: 6,
        question: "which article give indian freedom to host flage at public place ?",
        options: [
          "article 19",
          "article 10",
          "article 12 ",
          "article 15 "
        ],
        correctAnswer: 1
      },
  {
    id: "world-geography-basic",
    title: "World Geography Essentials",
    category: "Geography",
    description: "Explore the continents, oceans, landmarks, and rivers that shape our planet.",
    questions: [
      {
        id: 1,
        question: "Which is the largest ocean on Earth?",
        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean"
        ],
        correctAnswer: 3
      },
      {
        id: 2,
        question: "The Suez Canal connects which two bodies of water?",
        options: [
          "Mediterranean Sea and Red Sea",
          "Baltic Sea and North Sea",
          "Caribbean Sea and Pacific Ocean",
          "Red Sea and Arabian Sea"
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "Which country is known as the 'Land of the Rising Sun'?",
        options: [
          "China",
          "Japan",
          "South Korea",
          "Thailand"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is the capital city of Australia?",
        options: [
          "Sydney",
          "Melbourne",
          "Canberra",
          "Brisbane"
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "Which is the longest river in the world?",
        options: [
          "Amazon River",
          "Nile River",
          "Yangtze River",
          "Mississippi River"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "general-science-basic",
    title: "General Science & Technology",
    category: "Science",
    description: "A quick quiz on physics, biology, and chemistry essentials.",
    questions: [
      {
        id: 1,
        question: "Which organ in the human body is primarily responsible for filtering blood?",
        options: [
          "Heart",
          "Lungs",
          "Kidneys",
          "Liver"
        ],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "What is the escape velocity from the Earth's surface?",
        options: [
          "11.2 km/s",
          "7.8 km/s",
          "9.8 km/s",
          "5.0 km/s"
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "Which gas is most abundant in the Earth's atmosphere?",
        options: [
          "Oxygen",
          "Nitrogen",
          "Carbon Dioxide",
          "Argon"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is the chemical symbol for Gold?",
        options: [
          "Ag",
          "Fe",
          "Au",
          "Gd"
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "Sound waves travel fastest in which of the following media?",
        options: [
          "Vacuum",
          "Air",
          "Water",
          "Steel"
        ],
        correctAnswer: 3
      }
    ]
  },
  {
    id: "indian-history-basic",
    title: "Indian History & Heritage",
    category: "History",
    description: "Test your knowledge on ancient dynasties, the Mughal era, and the freedom struggle.",
    questions: [
      {
        id: 1,
        question: "The Indus Valley Civilization flourished during which period?",
        options: [
          "Paleolithic Age",
          "Neolithic Age",
          "Bronze Age",
          "Iron Age"
        ],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "Who was the founder of the Maurya Empire?",
        options: [
          "Chandragupta Maurya",
          "Ashoka the Great",
          "Samudragupta",
          "Harsha Vardhana"
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "Who was the Mughal Emperor when the English East India Company obtained the royal trade charter?",
        options: [
          "Akbar",
          "Jahangir",
          "Shah Jahan",
          "Aurangzeb"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "The Quit India Movement was launched by Mahatma Gandhi in which year?",
        options: [
          "1930",
          "1940",
          "1942",
          "1947"
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "Who wrote the famous Sanskrit play 'Abhijnanasakuntalam'?",
        options: [
          "Kalidasa",
          "Tulsidas",
          "Valmiki",
          "Banabhatta"
        ],
        correctAnswer: 0
      }
    ]
  }
      { id: "Current Affairs",
    title: "Current Affairs",
    category: "Current Affairs",
    description: "Explore the world.",
       // GK GS Quiz on Geographical Indications (GI Tags) 
const giQuizData = [
  {
    id: 1,
    question: "Which famous 'Prasad' from Ayodhya (Uttar Pradesh) recently received the GI tag?",
    options: ["Tirupati Laddu", "Mahaprasad", "Hanuman Garhi Besan Laddoo", "Mathura Peda"],
    answer: "Hanuman Garhi Besan Laddoo",
    state: "Uttar Pradesh"
  },
  {
    id: 2,
    question: "'Banaras Tabla' and 'Banaras Shehnai' were recently granted GI tags. Which state do they belong to?",
    options: ["Madhya Pradesh", "Uttar Pradesh", "Bihar", "West Bengal"],
    answer: "Uttar Pradesh",
    state: "Uttar Pradesh"
  },
  {
    id: 3,
    question: "Which unique craft from Mathura known for paper-cutting art received a GI tag?",
    options: ["Sanjhi Craft", "Madhubani Painting", "Warli Painting", "Pattachitra"],
    answer: "Sanjhi Craft",
    state: "Uttar Pradesh"
  },
  {
    id: 4,
    question: "'Ramban Anardana' (dried pomegranate seeds) has been granted a GI tag. It belongs to:",
    options: ["Himachal Pradesh", "Uttarakhand", "Jammu & Kashmir", "Ladakh"],
    answer: "Jammu & Kashmir",
    state: "Jammu & Kashmir"
  },
  {
    id: 5,
    question: "The 'Kathiya Gehu' (Wheat) known for its farming in the Bundelkhand region belongs to which state?",
    options: ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh"],
    answer: "Uttar Pradesh",
    state: "Uttar Pradesh"
  },
  {
    id: 6,
    question: "'Pilibhit Bansuri' (Flute) famous for its melody and craftsmanship is a GI product of:",
    options: ["Uttar Pradesh", "Assam", "Odisha", "Gujarat"],
    answer: "Uttar Pradesh",
    state: "Uttar Pradesh"
  },
  {
    id: 7,
    question: "'Tirangi Barfi' is a famous sweet delicacy from which city that recently got a GI tag?",
    options: ["Lucknow", "Varanasi (Kashi)", "Agra", "Kanpur"],
    answer: "Varanasi (Kashi)",
    state: "Uttar Pradesh"
  },
  {
    id: 8,
    question: "Which craft from Bareilly involving gold and silver thread embroidery received the GI tag?",
    options: ["Chikankari", "Zari Zardoji", "Phulkari", "Kantha"],
    answer: "Zari Zardoji",
    state: "Uttar Pradesh"
  },
  {
    id: 9,
    question: "'Tharu Embroidery' done by the Tharu community belongs to:",
    options: ["Jharkhand", "Chhattisgarh", "Uttar Pradesh", "Bihar"],
    answer: "Uttar Pradesh",
    state: "Uttar Pradesh"
  },
  {
    id: 10,
    question: "'Mushqbudji Rice' an aromatic rice variety is a GI product of:",
    options: ["Kashmir", "Punjab", "Assam", "Kerala"],
    answer: "Kashmir",
    state: "Jammu & Kashmir"
  },
  {
    id: 11,
    question: "'Similipal Kai Chutney' made from red weaver ants is a unique GI product from:",
    options: ["Jharkhand", "Odisha", "Chhattisgarh", "West Bengal"],
    answer: "Odisha",
    state: "Odisha"
  },
  {
    id: 12,
    question: "'Kalo Nunia Rice' often called the 'Prince of Rice' belongs to:",
    options: ["West Bengal", "Bangladesh", "Assam", "Tripura"],
    answer: "West Bengal",
    state: "West Bengal"
  },
  {
    id: 13,
    question: "'Lanjia Saura Painting' a tribal art form found on mud walls belongs to:",
    options: ["Odisha", "Maharashtra", "Gujarat", "Madhya Pradesh"],
    answer: "Odisha",
    state: "Odisha"
  },
  {
    id: 14,
    question: "'Majuli Mask' a traditional craft used in theatrical performances is from:",
    options: ["Manipur", "Assam", "Nagaland", "Mizoram"],
    answer: "Assam",
    state: "Assam"
  },
  {
    id: 15,
    question: "'Risa' a handwoven cloth used as a female upper garment is a GI product of:",
    options: ["Tripura", "Meghalaya", "Sikkim", "Arunachal Pradesh"],
    answer: "Tripura",
    state: "Tripura"
  },
  {
    id: 16,
    question: "'Wancho Wooden Craft' featuring tobacco pipes and drinking mugs belongs to:",
    options: ["Nagaland", "Arunachal Pradesh", "Mizoram", "Manipur"],
    answer: "Arunachal Pradesh",
    state: "Arunachal Pradesh"
  },
  {
    id: 17,
    question: "'Tangail Saree' famous for its weaving style recently got a GI tag for which state?",
    options: ["West Bengal", "Odisha", "Assam", "Bihar"],
    answer: "West Bengal",
    state: "West Bengal"
  },
  {
    id: 18,
    question: "'Dhenkanal Magji' a sweet made from buffalo milk cheese is from:",
    options: ["West Bengal", "Odisha", "Jharkhand", "Bihar"],
    answer: "Odisha",
    state: "Odisha"
  },
  {
    id: 19,
    question: "'Adi Kekir' is a variety of ______ from Arunachal Pradesh.",
    options: ["Chilli", "Turmeric", "Ginger", "Garlic"],
    answer: "Ginger",
    state: "Arunachal Pradesh"
  },
  {
    id: 20,
    question: "'Sundarban Honey' collected by the Mouli community is a GI product of:",
    options: ["Odisha", "West Bengal", "Andhra Pradesh", "Tamil Nadu"],
    answer: "West Bengal",
    state: "West Bengal"
  },
  {
    id: 21,
    question: "'Dungaria Kondh Embroidered Shawl' is a tribal handicraft from:",
    options: ["Odisha", "Jharkhand", "Chhattisgarh", "Telangana"],
    answer: "Odisha",
    state: "Odisha"
  },
  {
    id: 22,
    question: "'Pachra-Rignai' is a traditional dress that received a GI tag from:",
    options: ["Manipur", "Tripura", "Assam", "Sikkim"],
    answer: "Tripura",
    state: "Tripura"
  },
  {
    id: 23,
    question: "'Bodo Eri Silk' known as the fabric of peace (Ahimsa Silk) is from:",
    options: ["Assam", "Bihar", "Meghalaya", "Nagaland"],
    answer: "Assam",
    state: "Assam"
  },
  {
    id: 24,
    question: "'Khajuri Guda' (Date Palm Jaggery) is a natural sweetener from:",
    options: ["West Bengal", "Odisha", "Bihar", "Jharkhand"],
    answer: "Odisha",
    state: "Odisha"
  },
  {
    id: 25,
    question: "'Nayagarh Kanteimundi Brinjal' known for its prickly thorns and taste is from:",
    options: ["West Bengal", "Odisha", "Andhra Pradesh", "Tamil Nadu"],
    answer: "Odisha",
    state: "Odisha"
  },
  {
    id: 26,
    question: "'Kachchhi Kharek' the indigenous date variety of Kutch belongs to:",
    options: ["Rajasthan", "Gujarat", "Maharashtra", "Punjab"],
    answer: "Gujarat",
    state: "Gujarat"
  },
  {
    id: 27,
    question: "'Kannadippaya' (Mirror Mat) a bamboo craft is the first tribal GI from:",
    options: ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh"],
    answer: "Kerala",
    state: "Kerala"
  },
  {
    id: 28,
    question: "'Warangal Chapata Chilli' known for its tomato-like shape and low pungency is from:",
    options: ["Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu"],
    answer: "Telangana",
    state: "Telangana"
  },
  {
    id: 29,
    question: "'Kutch Ajrakh' a traditional block printing craft belongs to:",
    options: ["Rajasthan", "Gujarat", "Madhya Pradesh", "Punjab"],
    answer: "Gujarat",
    state: "Gujarat"
  },
  {
    id: 30,
    question: "'Marayoor Jaggery' known for its high sweetness and lack of impurities is from:",
    options: ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"],
    answer: "Kerala",
    state: "Kerala"
  },
  {
    id: 31,
    question: "'Cashew' from which region of Goa recently received a GI tag?",
    options: ["Panaji", "Bardez", "Goa (General)", "Salcete"],
    answer: "Goa (General)",
    state: "Goa"
  },
  {
    id: 32,
    question: "'Juhu Salt' was mentioned in news but which Maharashtra fruit is famous for its GI tag?",
    options: ["Nagpur Orange", "Nashik Grapes", "Alphonso Mango", "All of the above"],
    answer: "All of the above",
    state: "Maharashtra"
  },
  {
    id: 33,
    question: "'Sangli Raisins' are a GI tagged agricultural product from:",
    options: ["Karnataka", "Maharashtra", "Gujarat", "Madhya Pradesh"],
    answer: "Maharashtra",
    state: "Maharashtra"
  },
  {
    id: 34,
    question: "'Bangarpet Panipuri' (GI Applicant) is a famous street food from:",
    options: ["Karnataka", "Tamil Nadu", "Maharashtra", "Andhra Pradesh"],
    answer: "Karnataka",
    state: "Karnataka"
  },
  {
    id: 35,
    question: "'Attappady Aattukombu Avara' (Beans) is a tribal agricultural product from:",
    options: ["Tamil Nadu", "Kerala", "Karnataka", "Telangana"],
    answer: "Kerala",
    state: "Kerala"
  },
  {
    id: 36,
    question: "'Matabari Peda' a sweet offering to the Goddess is a GI product of:",
    options: ["Assam", "West Bengal", "Tripura", "Odisha"],
    answer: "Tripura",
    state: "Tripura"
  },
  {
    id: 37,
    question: "'Majuli Manuscript Painting' illustrates stories from which epics?",
    options: ["Ramayana & Mahabharata", "Bible", "Quran", "Jataka Tales"],
    answer: "Ramayana & Mahabharata",
    state: "Assam"
  },
  {
    id: 38,
    question: "'Bodo Dokhona' is a traditional attire worn by women of which community?",
    options: ["Khasi", "Garo", "Bodo", "Mizo"],
    answer: "Bodo",
    state: "Assam"
  },
  {
    id: 39,
    question: "'Koraput Kalajeera Rice' is often referred to by what nickname due to its quality?",
    options: ["King of Rice", "Prince of Rice", "Gold of Rice", "Black Pearl"],
    answer: "Prince of Rice",
    state: "Odisha"
  },
  {
    id: 40,
    question: "'Narasapur Crochet Lace Products' are a famous handicraft from:",
    options: ["Telangana", "Andhra Pradesh", "Tamil Nadu", "Karnataka"],
    answer: "Andhra Pradesh",
    state: "Andhra Pradesh"
  },
  {
    id: 41,
    question: "'Udayagiri Wooden Cutlery' is a GI craft belonging to:",
    options: ["Andhra Pradesh", "Telangana", "Madhya Pradesh", "Odisha"],
    answer: "Andhra Pradesh",
    state: "Andhra Pradesh"
  },
  {
    id: 42,
    question: "'Bardhaman Sitabhog' is a sweet GI product from:",
    options: ["West Bengal", "Bihar", "Odisha", "Assam"],
    answer: "West Bengal",
    state: "West Bengal"
  },
  {
    id: 43,
    question: "'Udangudi Panangkarupatti' (Palm Jaggery) belongs to:",
    options: ["Kerala", "Tamil Nadu", "Andhra Pradesh", "Karnataka"],
    answer: "Tamil Nadu",
    state: "Tamil Nadu"
  },
  {
    id: 44,
    question: "'Salim Sago' (Sabudana) is a GI product from:",
    options: ["Maharashtra", "Tamil Nadu", "Gujarat", "Madhya Pradesh"],
    answer: "Tamil Nadu",
    state: "Tamil Nadu"
  },
  {
    id: 45,
    question: "'Basohli Pashmina' woolen products are from:",
    options: ["Ladakh", "Himachal Pradesh", "Jammu & Kashmir", "Uttarakhand"],
    answer: "Jammu & Kashmir",
    state: "Jammu & Kashmir"
  },
  {
    id: 46,
    question: "'Matti Banana' known for its honey-like taste is from:",
    options: ["Kerala", "Tamil Nadu (Kanyakumari)", "Karnataka", "Andhra Pradesh"],
    answer: "Tamil Nadu (Kanyakumari)",
    state: "Tamil Nadu"
  },
  {
    id: 47,
    question: "'Bhandara Chinnor Rice' is a GI agricultural product from:",
    options: ["Maharashtra", "Madhya Pradesh", "Chhattisgarh", "Odisha"],
    answer: "Maharashtra",
    state: "Maharashtra"
  },
  {
    id: 48,
    question: "'Marcha Rice' (Mircha Rice) known for its pepper-like shape is from:",
    options: ["West Bengal", "Bihar", "Jharkhand", "Uttar Pradesh"],
    answer: "Bihar",
    state: "Bihar"
  },
  {
    id: 49,
    question: "'Nathdwara Pichhwai Painting' is a famous art form from:",
    options: ["Gujarat", "Rajasthan", "Madhya Pradesh", "Uttar Pradesh"],
    answer: "Rajasthan",
    state: "Rajasthan"
  },
  {
    id: 50,
    question: "'Garo Dakmanda' is a traditional textile from:",
    options: ["Meghalaya", "Assam", "Tripura", "Mizoram"],
    answer: "Meghalaya",
    state: "Meghalaya"
  }
];

// Example: Function to get a random question from the quiz
function getRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * giQuizData.length);
  return giQuizData[randomIndex];
}

console.log(getRandomQuestion());
];
