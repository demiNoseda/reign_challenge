import { useEffect, useState } from "react";
import Header from "./components/Header";
import TooglerView from "./components/TooglerView";
import NewsList from "./components/news_list/NewsList";
import "./styles/main.scss";
import TopicDropdown from "./components/TopicDropdown";
import Spinner from "./components/Spinner";

function App() {
  const [section, setSection] = useState("all");
  const [newsArray, setNewsArray] = useState([]);
  const [favPostList, setFavPostList] = useState([]);
  const [newsTopic, setNewsTopic] = useState("Select your news");
  const [page, setPage] = useState(0);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    if (newsTopic === "Select your news") {
      return;
    }
    const fetchApi = async () => {
      setSpinner(true);
      const url = `https://hn.algolia.com/api/v1/search_by_date?query=${newsTopic.toLowerCase()}&page=${page}&hitsPerPage=80`;
  
      const response = await fetch(url);
      const data = await response.json();

      const hitsFiltered = data.hits.filter(
        ({ title, created_at, url, author }) =>
          title && created_at && url && author
      );
      setSpinner(false);
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
  }, [newsTopic]);
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
      <div className="news_container">
        {section === "all" ? (
          <TopicDropdown newsTopic={newsTopic} setNewsTopic={setNewsTopic} />
        ) : null}

        <NewsList
          newsArray={section === "all" ? newsArray : favPostList}
          addOrRemoveFavPost={addOrRemoveFavPost}
        />
        {spinner ? <Spinner /> : null}
      </div>
    </div>
  );
}

export default App;
