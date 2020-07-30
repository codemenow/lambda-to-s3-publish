import axios from 'axios';

export const getNews = async () => {
  const newsListRawData = await axios.get('https://www.reddit.com/r/technews/top/.json?t=day');
  const newsList = newsListRawData.data.data.children.map(child => ({
    url: child.data.url,
    title: child.data.title,
  }));
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Tech News</title>
      <meta name="description" content="Top tech news">
      <link rel="stylesheet" href="../css/normalize.css">
      <link rel="stylesheet" href="../css/main.css">
      <link rel="stylesheet" href="../css/styles.css">
    </head>
    <body>
      <div class="blog-wrapper">
        <h1 class="blog-title">Tech News Today</h1>
        <ul>
          ${newsList.map(link => `<li><a target="_blank" href=${link.url}>${link.title}</a></li>`).join("")}
        </ul>
      </div>
    </body>
    </html>
  `;
};