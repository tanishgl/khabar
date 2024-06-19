class News {
  constructor({
    title = null,
    description = null,
    urlToImage = null,
    author = null,
    publishedAt = null,
    content = null,
  }) {
    this.title = title;
    this.description = description;
    this.urlToImage = urlToImage;
    this.author = author;
    this.publishedAt = publishedAt;
    this.content = content;
  }
}

export default News;
