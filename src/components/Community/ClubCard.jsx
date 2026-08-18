function ClubCard({
  club,
  joined = false,
  onJoin,
  featured = false
}) {
  return (
    <article
      className={`club-card ${
        featured ? "featured" : ""
      }`}
    >

      <div className="club-card-icon">
        {club.icon}
      </div>

      <div className="club-card-info">

        <p className="club-card-label">
          ART MAIL CLUB
        </p>

        <h3>
          {club.name}
        </h3>

        <p className="club-description">
          {club.description}
        </p>

        <span className="club-members">
          {club.members.toLocaleString()} members
        </span>

      </div>

      {joined ? (
        <button
          className="club-joined-button"
          disabled
        >
          Joined ✓
        </button>
      ) : (
        <button
          className="club-join-button"
          onClick={() =>
            onJoin?.(club.id)
          }
        >
          Join Club
        </button>
      )}

    </article>
  );
}

export default ClubCard;
