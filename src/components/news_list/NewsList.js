import PostCard from "./PostCard";

const NewsList = ({ postsList, addOrRemoveFavPost, favPostsList }) => {
  const isFavPost = (post) => {
    const exist =
      favPostsList.filter((favPost) => favPost.story_id === post.story_id)
        .length > 0
        ? true
        : false;

    return exist;
  };

  return (
    <div className="news_list">
      <div className="container">
        {postsList.map((post, index) => (
          <PostCard
            author={post.author}
            story_title={post.story_title}
            story_url={post.story_url}
            created_at={post.created_at}
            addOrRemoveFavPost={addOrRemoveFavPost}
            key={index}
            story_id={post.story_id}
            favorite={isFavPost(post)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
