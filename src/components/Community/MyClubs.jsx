import ClubCard from "./ClubCard";

function MyClubs({
  clubs
}) {
  return (
    <aside
      id="my-clubs"
      className="my-clubs"
    >

      <div className="my-clubs-header">

        <div>
          <p>
            YOUR SPACE
          </p>

          <h2>
            My Theme's
          </h2>
        </div>

        <button
          className="my-clubs-icon"
          aria-label="Discover clubs"
          onClick={() => {
            document
              .getElementById(
                "discover-clubs"
              )
              ?.scrollIntoView({
                behavior: "smooth"
              });
          }}
        >
          +
        </button>

      </div>

      <div className="my-clubs-list">

        {clubs.length === 0 ? (
          <p className="empty-clubs">
            You haven't joined any clubs yet.
          </p>
        ) : (
          clubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              joined={true}
            />
          ))
        )}

      </div>

      <button
        className="discover-shortcut"
        onClick={() => {
          document
            .getElementById(
              "discover-clubs"
            )
            ?.scrollIntoView({
              behavior: "smooth"
            });
        }}
      >
        Discover more Theme
        <span>→</span>
      </button>

    </aside>
  );
}

export default MyClubs;
