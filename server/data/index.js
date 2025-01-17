import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];


export const accessories = [
  
];


export const users = [
  {
    _id: userIds[0],
    firstName: "test",
    lastName: "me",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    location: "San Fran, CA",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Steve",
    lastName: "Ralph",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    location: "New York, CA",
    occupation: "Degenerate",
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Some",
    lastName: "Guy",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    location: "Canada, CA",
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Whatcha",
    lastName: "Doing",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpeg",
    location: "Korea, CA",
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.jpeg",
    location: "Utah, CA",
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Harvey",
    lastName: "Dunn",
    email: "harveydunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpeg",
    friends: [],
    location: "Los Angeles, CA",
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Carly",
    lastName: "Vowel",
    email: "carlyvowel@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p8.jpeg",
    location: "Chicago, IL",
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Jessica",
    lastName: "Dunn",
    email: "jessicadunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p9.jpeg",
    location: "Washington, DC",
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];

export const games = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Gaming Mouse X200",
    shortDescription: "High precision wireless gaming mouse",
    longDescription: "The Gaming Mouse X200 offers ultra-precision, customizable buttons, and RGB lighting for an enhanced gaming experience.",
    price: 559.99,
    picturePath: "https://m.media-amazon.com/images/I/71gEuyRXIDL.jpg",
    category: ["Mouse", "Gaming"],
    rating: 4.8,
  },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Mechanical Keyboard K900",
  //   shortDescription: "Mechanical keyboard with customizable RGB lighting",
  //   longDescription: "The Mechanical Keyboard K900 features tactile switches, programmable keys, and dynamic RGB lighting to suit your gaming style.",
  //   price: 10029.99,
  //   picturePath: "https://m.media-amazon.com/images/I/71sb3zHHnEL._AC_SL1500_.jpg",
  //   category: ["Keyboard", "Gaming"],
  //   rating: 3,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Logitech Headset Pro",
  //   shortDescription: "Surround sound gaming headset",
  //   longDescription: "The Logitech Headset Pro provides immersive surround sound, noise-cancelling mic, and comfortable ear cushions for long gaming sessions.",
  //   price: 8900.99,
  //   picturePath: "https://m.media-amazon.com/images/I/51j+X0scmhL._AC_SL1000_.jpg",
  //   category: ["Headset", "Gaming"],
  //   rating: 4.6,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "UltraWide Monitor 34",
  //   shortDescription: "34-inch UltraWide curved gaming monitor",
  //   longDescription: "The UltraWide Monitor 34\" offers a curved display, 144Hz refresh rate, and ultra-thin bezels for an expansive gaming view.",
  //   price: 149999.99,
  //   picturePath: "https://m.media-amazon.com/images/I/91g-Y1B09EL.jpg",
  //   category: ["Monitor", "Gaming"],
  //   rating: 4.9,
  // },
  // {
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Gaming Chair Elite",
  //   shortDescription: "Ergonomic gaming chair with lumbar support",
  //   longDescription: "The Gaming Chair Elite features ergonomic design, adjustable armrests, and built-in lumbar support for maximum comfort during gameplay.",
  //   price: 19999.99,
  //   picturePath: "https://i5.walmartimages.com/seo/Next-Level-Racing-NLR-G004-Elite-Gaming-Chair-Leather-Edition_696225a0-ba30-46af-9730-7375506b563f.8067a83c80771593bc7cd08a140cce33.jpeg",
  //   category: ["Chair", "Gaming"],
  //   rating: 4.5,
  // },
    // {
    //     _id:   new mongoose.Types.ObjectId(),
    //     name: "Sample Game 1",
    //     shortDescription: "Short description for Sample Game 1",
    //     longDescription: "Long description for Sample Game 1",
    //     price: 49.99,
    //     picturePath: ["https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg", "https://media.rawg.io/media/games/15c/15c95a4915f88a3e89c821526afe05fc.jpg"],
    //     category: ["Action", "Adventure"],
    //     platform: ["PC", "PlayStation", "Xbox"],
    //     rating: 8.0,
    //     creator: "Ubisoft",
    //   },
      {
        _id:    new mongoose.Types.ObjectId(),
        name: "Sample Game 2",
        shortDescription: "Short description for Sample Game 2",
        longDescription: "Long description for Sample Game 2",
        price: 29.99,
        picturePath: ["https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg", "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg"],
        category: ["Simulation", "Strategy"],
        platform: ["PC", "Nintendo Switch"],
        rating: 7.5,
        creator: "Electronic Arts",
      },
];