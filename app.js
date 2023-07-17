const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Song = require("./model/song");
const Playlist = require("./model/playlist");

const port = 3000;

let myPlayList = new Playlist("My Favorite", []);

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  try {
    let songs;
    let sort = req.query.sort;

    if (sort === "most-played") {
      songs = myPlayList.getSongs(true)
    } else {
      songs = myPlayList.getSongs(false);
    }

    res.send({
      message: "Successful get songs",
      data: songs,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.get("/play/:id", (req, res) => {
  try {
    let id = req.params.id;
    let song = myPlayList.playSong(id);

    if (!song) {
      throw Error("Song not found");
    }

    res.send({
      message: "Successful get song",
      data: song,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
});

app.post("/", (req, res) => {
  try {
    let body = req.body;
    let newSong = new Song(body.title, body.artists, body.url);
    myPlayList.addSong(newSong);

    res.send({ message: "Song has been added" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
