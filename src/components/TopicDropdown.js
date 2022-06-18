import { ReactComponent as Arrow } from "../assets/dropdown-arrow-icon.svg";
import { useOutsideAlerter } from "../hooks/outsideAlerter";
import angularLogo from "../assets/imgs/angular_icon.png";
import reactLogo from "../assets/imgs/react_icon.png";
import vuejsLogo from "../assets/imgs/vuejs_icon.png";
const style_newsTopic = {
  background: "#F7F7F7",
};

const TopicDropdown = ({ newsTopic, setNewsTopic }) => {
  const { visible, setVisible, ref } = useOutsideAlerter(false);

  const handleOpenDropdown = () => {
    setVisible((prevState) => !prevState);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewsTopic(e.target.text);
    handleOpenDropdown();
  };

  const options = [
    { id: 1, text: "Angular", imgSrc: angularLogo },
    { id: 2, text: "Reactjs", imgSrc: reactLogo },
    { id: 3, text: "Vuejs", imgSrc: vuejsLogo },
  ];

  const selectedInfo = options.filter((option) => option.text === newsTopic);

  return (
    <div
      ref={ref}
      className={`dropdown ${visible ? "active" : ""}`}
      data-dropdown
    >
      <button
        data-testid="topicDropdown"
        onClick={handleOpenDropdown}
        className="link text_bg"
        data-dropdown-button
      >
        <p>
          {selectedInfo.length > 0 ? (
            <img src={selectedInfo[0].imgSrc} />
          ) : null}

          {newsTopic}
        </p>
        <Arrow />
      </button>
      <div data-testid="dropdownMenu" className="dropdown-menu ">
        <div className="dropdown-links">
          {options.map((option) => (
            // eslint-disable-next-line

            <a
              onClick={handleChange}
              style={option === newsTopic ? style_newsTopic : null}
              className="link text_bg"
              key={option.id}
            >
              <img src={option.imgSrc} />
              {option.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicDropdown;
