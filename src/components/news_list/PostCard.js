import { useState } from "react";
import ClockIcon from "../../assets/clockIcon";
import HearthIcon from "../../assets/hearthIcon";
import timeDiffFromNow from "../../helpers/timeDiffFromNow";
import truncateString from "../../helpers/truncateString";

const PostCard = ({
  author,
  story_title,
  story_url,
  created_at,
  addOrRemoveFavPost,
  story_id,
  favorite,
}) => {
  const [fav, setFav] = useState(favorite);

  const handleClick = () => {
    const post = {
      author,
      story_title,
      story_url,
      created_at,
      story_id,
      fav: !fav,
    };
    setFav(!fav);
    addOrRemoveFavPost(post);
  };

  const handleOpenPost = () => {
    window.open(story_url, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="post_card">
      <div
        className="container_card"
        onClick={handleOpenPost}
        data-testid="post_card"
      >
        <div className="info">
          <ClockIcon />
          <p>
            {timeDiffFromNow(created_at)} by {author}
          </p>
        </div>
        <div className="title">
          <span>
            {story_title.length > 70
              ? truncateString(story_title, 55)
              : story_title}
          </span>
        </div>
      </div>
      <div className="fav" onClick={handleClick}  data-testid="hearth_icon">
        <HearthIcon selected={favorite} />
      </div>
    </div>
  );
};

export default PostCard;
