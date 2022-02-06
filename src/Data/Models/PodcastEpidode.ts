import BaseModel from './Base/BaseModel'

export default class PodcastEpisode extends BaseModel {
  Name : string

  EpisodeNumber : number

  UserId : string

  FilePath : string

  ImagePath : string

  /**
   *
   */
  constructor(name : string, episodeNumber : number, userId : string, filePath : string, imagePath : string) {
    super()
    this.Name = name
    this.EpisodeNumber = episodeNumber
    this.UserId = userId
    this.FilePath = filePath
    this.ImagePath = imagePath
  }
}
