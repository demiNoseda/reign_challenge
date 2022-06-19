import PostCard from "./PostCard";

const NewsList = ({ postsList, addOrRemoveFavPost }) => {
  return (
    <div className="news_list">
      <div className="container">
        {postsList.map((post) => (
          <PostCard
            author={post.author}
            story_title={post.story_title}
            story_url={post.story_url}
            created_at={post.created_at}
            addOrRemoveFavPost={addOrRemoveFavPost}
            key={post.id}
            id={post.id}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
