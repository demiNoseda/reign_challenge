import { useEffect, useState } from "react";
import Header from "./components/Header";
import TooglerView from "./components/TooglerView";
import NewsList from "./components/news_list/NewsList";
import "./styles/main.scss";
import TopicDropdown from "./components/TopicDropdown";
import Spinner from "./components/Spinner";
import Pagination from "./components/Pagination";

function App() {
  const [section, setSection] = useState("all");
  const [postsList, setPostsList] = useState([]);
  const [favPostsList, setFavPostsList] = useState([]);
  const [newsTopic, setNewsTopic] = useState("Select your news");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialPage, setInitialPage] = useState(1);

  useEffect(() => {
    if (newsTopic === "Select your news") {
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const url = `https://hn.algolia.com/api/v1/search_by_date?query=${newsTopic.toLowerCase()}&page=${
        page - 1
      }&hitsPerPage=80`;
      const response = await fetch(url);
      const data = await response.json();
      setTotalPages(data.nbPages);
      const hitsFiltered = data.hits.filter(
        ({ title, created_at, url, author }) =>
          title && created_at && url && author
      );
      setLoading(false);
      setPostsList(
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
  }, [newsTopic, page]);

  const addOrRemoveFavPost = (post) => {
    const listFiltered = favPostsList.filter(
      (favPost) => favPost.id !== post.id
    );

    if (listFiltered.length < favPostsList.length) {
      setFavPostsList(listFiltered);
    } else {
      setFavPostsList([...favPostsList, post]);
    }
  };

  const paginate = (pageNumber) => {
    setPage(pageNumber);
    if (pageNumber > initialPage + 8) {
      setInitialPage(pageNumber);
    } else {
      if (initialPage > pageNumber) {
        setInitialPage(pageNumber - 8);
      }
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
          postsList={section === "all" ? postsList : favPostsList}
          addOrRemoveFavPost={addOrRemoveFavPost}
        />
        {loading ? <Spinner /> : null}
      </div>
      {totalPages > 0 ? (
        <div className="pagination">
          {page > 1 ? (
            <button
              type="button"
              onClick={() => {
                paginate(page - 1);
              }}
            >
              &lt;
            </button>
          ) : null}

          <Pagination
            actualPage={page}
            totalPages={totalPages}
            paginate={paginate}
            initialPage={initialPage}
          />

          {page < totalPages - 1 ? (
            <button
              type="button"
              onClick={() => {
                paginate(page + 1);
              }}
            >
              &gt;
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default App;
