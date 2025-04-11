import { config } from "dotenv";
import { connectDB } from "../lib/databas.js";
import User from "../modeller/user.modeller.js";

config();

const seedUsers = [
    {
      email: "lina.svensson@example.com",
      namn: "Lina Svensson",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      email: "nora.persson@example.com",
      namn: "Nora Persson",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      email: "agnes.nilsson@example.com",
      namn: "Agnes Nilsson",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      email: "freja.larsson@example.com",
      namn: "Freja Larsson",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      email: "tilda.eriksson@example.com",
      namn: "Tilda Eriksson",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      email: "meja.karlsson@example.com",
      namn: "Meja Karlsson",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      email: "saga.johansson@example.com",
      namn: "Saga Johansson",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      email: "elin.berg@example.com",
      namn: "Elin Berg",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      email: "oscar.lindgren@example.com",
      namn: "Oscar Lindgren",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      email: "leo.holm@example.com",
      namn: "Leo Holm",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      email: "alex.hansson@example.com",
      namn: "Alex Hansson",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      email: "noah.sundberg@example.com",
      namn: "Noah Sundberg",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      email: "viktor.jonsson@example.com",
      namn: "Viktor Jonsson",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      email: "felix.nyman@example.com",
      namn: "Felix Nyman",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      email: "albin.björk@example.com",
      namn: "Albin Björk",
      password: "123456",
      profilBild: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ];
  

  const seedDatabase = async () => {
    try {
      await connectDB();
  
      await User.insertMany(seedUsers);
      console.log("Databasen har framgångsrikt skapats");
    } catch (error) {
      console.error("Fel vid skapande av databas:", error);
    }
  };  

// Call the function
seedDatabase();