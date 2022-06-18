import { useEffect, useState } from "react";
import Header from "./components/Header";
import TooglerView from "./components/TooglerView";
import NewsList from "./components/news_list/NewsList";
import "./styles/main.scss";

function App() {
  const [section, setSection] = useState("all");
  const [newsArray, setNewsArray] = useState([]);
  const [favPostList, setFavPostList] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=1&hitsPerPage=80`;

      const response = await fetch(url);
      const data = await response.json();

      const hitsFiltered = data.hits.filter(
        ({ title, created_at, url, author }) =>
          title && created_at && url && author
      );

      setNewsArray(
        hitsFiltered.map(({ title, created_at, url, author, objectID }) => ({
          author,
          story_title: title,
          story_url: url,
          created_at,
          id: objectID,
        }))
      );
    };
    fetchApi();
  }, []);
  const addOrRemoveFavPost = (post) => {
    const listFiltered = favPostList.filter(
      (favPost) => favPost.id !== post.id
    );

    if (listFiltered.length < favPostList.length) {
      setFavPostList(listFiltered);
    } else {
      setFavPostList([...favPostList, post]);
    }
  };

  return (
    <div className="home_page">
      <Header />
      <TooglerView section={section} setSection={setSection} />
      <NewsList
        newsArray={section === "all" ? newsArray : favPostList}
        addOrRemoveFavPost={addOrRemoveFavPost}
      />
    </div>
  );
}

export default App;
