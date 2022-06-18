import { useState } from "react";
import ClockIcon from "../../assets/clockIcon";
import HearthIcon from "../../assets/hearthIcon";
import calculateDifferenceInHours from "../../helpers/calculateDifferenceInHours";

const PostCard = ({ author, story_title, story_url, created_at }) => {
  const date1 = new Date(created_at);
  const date2 = new Date();
  const dateDifference = calculateDifferenceInHours(date1, date2);
  const dateDiferrenceObject = {
    days: Math.floor(dateDifference / 24),
    hours: dateDifference - 24 * Math.floor(dateDifference / 24),
  };
  console.log(calculateDifferenceInHours(date1, date2));
  // {created_at} by {author} the difference is{" "}

  const [fav, setFav] = useState(false);

  const handleClic = () => {
    setFav(!fav);
  };

  const handleOpenPost = ()=>{
    window.open(story_url, '_blank', 'noopener,noreferrer');
  }
  return (
    <div className="post_card">
      <div className="container_card" onClick={handleOpenPost}>
        <div className="info">
          <ClockIcon />
          <p>
            {dateDiferrenceObject.days > 0
              ? `${dateDiferrenceObject.days} day${
                  dateDiferrenceObject.days > 1 ? "s" : ""
                }, `
              : null}{" "}
            {dateDiferrenceObject.hours} hours ago by {author}
          </p>
        </div>
        <div className="title">
          <span>{story_title}</span>
        </div>
      </div>
      <div className="fav" onClick={handleClic}>
        <HearthIcon selected={fav} />
      </div>
    </div>
  );
};

export default PostCard;
