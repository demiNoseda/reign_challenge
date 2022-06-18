const TooglerView = ({ section, setSection }) => {
  const styles = {
    selected: { border: " solid 1px #1797ff", color: "#1797ff" },
  };

  const handleClick = (e) => {
    setSection(e.target.value);
  };

  return (
    <div className="toogler_view">
      <button
        className="all_view"
        style={section === "all" ? styles.selected : null}
        onClick={handleClick}
        value="all"
      >
        All
      </button>
      <button
        className="favs_view"
        style={section === "favs" ? styles.selected : null}
        onClick={handleClick}
        value="favs"
      >
        My faves
      </button>
    </div>
  );
};

export default TooglerView;
