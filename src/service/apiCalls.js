const getHackerNews = async (query, page) => {
  const url = `https://hn.algolia.com/api/v1/search_by_date?query=${query.toLowerCase()}&page=${
    page - 1
  }&hitsPerPage=20`;

  const response = await fetch(url);

  const data = await response.json();

  const newsList = data.hits.reduce((list, item) => {
    const { author, created_at, story_id, story_title, story_url } = item;
    if (author && created_at && story_id && story_title && story_url) {
      const news = {
        author,
        created_at,
        story_id,
        story_title,
        story_url,
      };
      return list.concat(news);
    }
    return list;
  }, []);

  console.log("---------------");
  console.log(data.hits, data.nbPages);

  const result = {
    nbPages: data.nbPages,
    newsList,
  };
  return result;
};

export {getHackerNews};
