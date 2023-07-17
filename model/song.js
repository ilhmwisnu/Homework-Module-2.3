class Song {
  constructor(title,artists,url){
    this.id = this.generateId()
    this.title = title
    this.artists = artists
    this.url = url
    this.play_count = 0
  }

  generateId(){
    return Math.random().toString()
  }

  play(){
    this.play_count += 1
  }
}

module.exports = Song