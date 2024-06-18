class News {
  constructor({
    title = null,
    description = null,
    urlToImage = null,
    author = null,
    publishedAt = null,
  }) {
    this.title = title;
    this.description = description;
    this.urlToImage = urlToImage;
    this.author = author;
    this.publishedAt = publishedAt;
  }
}

export default News;
