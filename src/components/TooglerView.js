const TooglerView = ({ section, setSection }) => {
  const styles = {
    selected: { border: " solid 1px #1797ff", color: "#1797ff" },
  };

  const handleClick = (e) => {
    setSection(e.target.value);
  };

  return (
    <div className="toogler_section">
      <button
        className="all_view"
        style={section === "all" ? styles.selected : null}
        onClick={handleClick}
        value="all"
        data-testid="all_section"
      >
        All
      </button>
      <button
        className="favs_view"
        style={section === "favs" ? styles.selected : null}
        onClick={handleClick}
        value="favs"
        data-testid="favs_section"
      >
        My favs
      </button>
    </div>
  );
};

export default TooglerView;
