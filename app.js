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
  let songs;
  let sort = req.query.sort;
  if (req.query.sort === "most-played") {
    songs = myPlayList.songs.sort((a, b) =>
      a.play_count < b.play_count ? 1 : -1
    )
  } else {
    songs = myPlayList.songs;
  }

  res.send({
    message: `Successful get songs ${sort ?? ""}`,
    data: songs,
  });
});

app.get("/play/:id", (req, res) => {
  let id = req.params.id;
  let song = myPlayList.songs[id];

  if (!song) {
    return res.status(404).send({
      message: "Song not found",
    });
  }

  myPlayList.songs[id].play_count += 1;

  res.send({
    message: "Successful get song",
    data: song,
  });
});

app.post("/", (req, res) => {
  let body = req.body;
  let newSong = new Song(body.title, body.artists, body.url);
  myPlayList.songs.push(newSong);

  res.send({
    message: "Song has been added",
  });
});
