import CommunityPost from "./CommunityPost";

function CommunityFeed({
  posts,
  clubs,
  onReply
}) {
  return (
    <div className="community-feed">

      {posts.length === 0 ? (
        <div className="empty-feed">

          <span>✉</span>

          <h3>
            Nothing here yet.
          </h3>

          <p>
            Join a few clubs and their conversations
            will find their way here.
          </p>

        </div>
      ) : (
        posts.map((post) => {

          const club = clubs.find(
            (club) =>
              club.id === post.clubId
          );

          return (
            <CommunityPost
              key={post.id}
              post={post}
              club={club}
              onReply={onReply}
            />
          );
        })
      )}

    </div>
  );
}

export default CommunityFeed;
