import mongoose from 'mongoose';
import { Song } from "../models/song.model.js"
import { config } from 'dotenv';

config();

const songs = [
  {
    "title": "Crystal Rain",
    "artist": "Echo Valley",
    "imageUrl": "/cover-images/1.jpg",
    "audioUrl": "/songs/1.mp3",
    "duration": 39
  },
  {
    "title": "Neon Tokyo",
    "artist": "Future Pulse",
    "imageUrl": "/cover-images/2.jpg",
    "audioUrl": "/songs/2.mp3",
    "duration": 42
  },
  {
    "title": "Midnight Blues",
    "artist": "Jazz Cats",
    "imageUrl": "/cover-images/3.jpg",
    "audioUrl": "/songs/3.mp3",
    "duration": 29
  },
  {
    "title": "Sunset Drive",
    "artist": "Lunar Echo",
    "imageUrl": "/cover-images/4.jpg",
    "audioUrl": "/songs/4.mp3",
    "duration": 45
  },
  {
    "title": "Ocean Lights",
    "artist": "Blue Horizon",
    "imageUrl": "/cover-images/5.jpg",
    "audioUrl": "/songs/5.mp3",
    "duration": 51
  },
  {
    "title": "City Nights",
    "artist": "Neon Vibes",
    "imageUrl": "/cover-images/6.jpg",
    "audioUrl": "/songs/6.mp3",
    "duration": 33
  },
  {
    "title": "Golden Hour",
    "artist": "Aurora Sky",
    "imageUrl": "/cover-images/7.jpg",
    "audioUrl": "/songs/7.mp3",
    "duration": 48
  },
  {
    "title": "Dreamscape",
    "artist": "Echo Dreams",
    "imageUrl": "/cover-images/8.jpg",
    "audioUrl": "/songs/8.mp3",
    "duration": 41
  },
  {
    "title": "Velvet Moon",
    "artist": "Lofi Crew",
    "imageUrl": "/cover-images/9.jpg",
    "audioUrl": "/songs/9.mp3",
    "duration": 37
  },
  {
    "title": "Starlight",
    "artist": "Cosmic Flow",
    "imageUrl": "/cover-images/10.jpg",
    "audioUrl": "/songs/10.mp3",
    "duration": 46
  },
  {
    "title": "Shadow Walk",
    "artist": "Urban Beats",
    "imageUrl": "/cover-images/11.jpg",
    "audioUrl": "/songs/11.mp3",
    "duration": 32
  },
  {
    "title": "Serenity",
    "artist": "Calm Waves",
    "imageUrl": "/cover-images/12.jpg",
    "audioUrl": "/songs/12.mp3",
    "duration": 55
  },
  {
    "title": "Electric Dawn",
    "artist": "Pulse Riders",
    "imageUrl": "/cover-images/13.jpg",
    "audioUrl": "/songs/13.mp3",
    "duration": 44
  },
  {
    "title": "Retro Love",
    "artist": "Synth Lovers",
    "imageUrl": "/cover-images/14.jpg",
    "audioUrl": "/songs/14.mp3",
    "duration": 38
  },
  {
    "title": "Mystic River",
    "artist": "Zen Masters",
    "imageUrl": "/cover-images/15.jpg",
    "audioUrl": "/songs/15.mp3",
    "duration": 50
  },
  {
    "title": "Skyline",
    "artist": "City Lights",
    "imageUrl": "/cover-images/16.jpg",
    "audioUrl": "/songs/16.mp3",
    "duration": 43
  },
  {
    "title": "Frozen Echo",
    "artist": "Ice Flow",
    "imageUrl": "/cover-images/17.jpg",
    "audioUrl": "/songs/17.mp3",
    "duration": 36
  },
  {
    "title": "Solar Wind",
    "artist": "Galactic Beats",
    "imageUrl": "/cover-images/18.jpg",
    "audioUrl": "/songs/18.mp3",
    "duration": 47
  }
]



const seedSongs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Song.deleteMany({});
        await Song.insertMany(songs);
        console.log("Songs seeded successfully!");
    } catch (error) {
        console.error("Error seeding songs:", error);
    }finally{
        mongoose.connection.close();
    }
}

seedSongs();