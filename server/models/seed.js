const mongoose = require("mongoose");
const User = require("./userModel");
const Mod = require("./modModel");
const Author = require("./authorModel");

// MongoDB connection URI
const dbURI = "mongodb+srv://eskandertaher:wyDfmmc6eerTU81O@cluster0.fk9njl5.mongodb.net/uust_smu" 

const users = [
    {
        username: "admin",
        password: "123",
        email: "admin@mail.com",
        role: "admin",
        firstName: "Admin",
        lastName: "One",
        verifiedByEmail: true,
    },
    {
        username: "mod",
        password: "123",
        email: "mod@mail.com",
        role: "mod",
        firstName: "Mod",
        lastName: "One",
        verifiedByEmail: true,
        faculty: "Science",
        department: "Physics",
        jobTitle: "Senior Moderator",
    },
    {
        username: "author",
        password: "123",
        email: "author@mail.com",
        role: "author",
        firstName: "Author",
        lastName: "One",
        verifiedByEmail: true,
        verifiedByAdmin: true,
        participantStatus: "young scientist",
        region: "North",
        city: "CityOne",
        university: "UniversityOne",
        faculty: "Engineering",
        department: "Computer Science",
        course: 2,
        groupNumber: "G1",
    },
];

async function seedDatabase() {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB");

        await User.deleteMany({});
        console.log("Cleared existing users");

        for (const userData of users) {
            const { username, password, email, role, ...rest } = userData;

            let user;
            switch (role) {
                case "admin":
                    user = new User({ username, password, email, role, ...rest });
                    break;
                case "mod":
                    user = new Mod({ username, password, email, role, ...rest });
                    break;
                case "author":
                    user = new Author({ username, password, email, role, ...rest });
                    break;
                default:
                    user = new User({ username, password, email, ...rest });
                    break;
            }

            await user.save();
            console.log(`Created user: ${username}`);
        }

        console.log("Database seeding completed");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

seedDatabase();