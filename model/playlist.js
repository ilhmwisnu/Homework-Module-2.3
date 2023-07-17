class Playlist {
  constructor(name, songs) {
    this.name = name;
    this.songs = songs;
  }

  addSong(song) {
    this.songs.push(song);
  }

  getSongs(isSorted) {
    if (isSorted) {
      return this.songs.sort((a, b) => (a.play_count < b.play_count ? 1 : -1));
    }

    return this.songs
  }

  playSong(id) {
    let song = this.songs.find((value) => value.id === id);
    song.play();
    return song;
  }
}

module.exports = Playlist;
