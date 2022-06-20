import { useEffect, useState } from "react";
import Header from "./components/Header";
import TooglerView from "./components/TooglerView";
import NewsList from "./components/news_list/NewsList";
import "./styles/main.scss";
import TopicDropdown from "./components/TopicDropdown";
import Spinner from "./components/Spinner";
import Pagination from "./components/Pagination";
import { getHackerNews } from "./service/apiCalls";

function App() {
  const [section, setSection] = useState(
    JSON.parse(localStorage.getItem("section")) ?? "all"
  );

  const [favPostsList, setFavPostsList] = useState(
    JSON.parse(localStorage.getItem("favPosts")) ?? []
  );

  const [query, setQuery] = useState(
    JSON.parse(localStorage.getItem("query")) ?? "Select your news"
  );

  const [postsList, setPostsList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialPage, setInitialPage] = useState(1);

  useEffect(() => {
    if (query === "Select your news") return;

    const fetchApi = async () => {
      if (section === "all") setLoading(true);
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });

      const data = await getHackerNews(query, page);

      setTotalPages(data.nbPages);
      setLoading(false);
      setPostsList(data.newsList);
    };

    fetchApi();
  }, [query, page, section]);

  useEffect(() => {
    localStorage.setItem("favPosts", JSON.stringify(favPostsList));
  }, [favPostsList]);

  useEffect(() => {
    localStorage.setItem("query", JSON.stringify(query));
    setPage(1);
    setInitialPage(1);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("section", JSON.stringify(section));
  }, [section]);

  const addOrRemoveFavPost = (post) => {
    const listFiltered = favPostsList.filter(
      (favPost) => favPost.story_id !== post.story_id
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
      <div className="jumbotron">
        <Header />
      </div>
      <TooglerView section={section} setSection={setSection} />
      <div className="news_container">
        {section === "all" ? (
          <TopicDropdown query={query} setQuery={setQuery} />
        ) : null}

        {loading ? <Spinner /> : null}

        <NewsList
          postsList={section === "all" ? postsList : favPostsList}
          addOrRemoveFavPost={addOrRemoveFavPost}
          favPostsList={favPostsList}
        />

        {totalPages > 0 && section === "all" ? (
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
    </div>
  );
}

export default App;
