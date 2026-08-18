function CommunityFilters({
  activeFilter,
  setActiveFilter,
  onCreatePost
}) {
  return (
    <div className="community-filter-wrapper">

      <div className="community-filters">

        <button
          type="button"
          className={
            activeFilter === "all"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveFilter("all")
          }
        >
          All
        </button>

        <button
          type="button"
          className={
            activeFilter === "following"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveFilter("following")
          }
        >
          Following
        </button>

      </div>

      <button
        type="button"
        className="create-post-button"
        onClick={onCreatePost}
      >
        <span>＋</span>
        Write a Post
      </button>

    </div>
  );
}

export default CommunityFilters;
