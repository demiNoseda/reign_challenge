import PostCard from "./PostCard";

const NewsList = ({ newsArray }) => {
  return (
    <div className="news_list">
      <div className="container">
        {newsArray.map((post) => (
          <PostCard
            author={post.author}
            story_title={post.story_title}
            story_url={post.story_url}
            created_at={post.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
