import { useState } from "react";

function CommunityPost({
  post,
  club,
  onReply
}) {
  const [appreciated, setAppreciated] =
    useState(false);

  const [appreciateCount, setAppreciateCount] =
    useState(post.appreciates || 0);

  const [shared, setShared] =
    useState(false);

  const [showReplyBox, setShowReplyBox] =
    useState(false);

  const [replyText, setReplyText] =
    useState("");

  const handleAppreciate = () => {
    if (appreciated) {
      setAppreciateCount(
        (count) => Math.max(0, count - 1)
      );
    } else {
      setAppreciateCount(
        (count) => count + 1
      );
    }

    setAppreciated(
      (current) => !current
    );
  };

  const handleShare = async () => {
    const clubName =
      club?.name || "the community";

    const shareText =
      `Check out ${post.author}'s post in ${clubName}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Art Mail Club",
          text: shareText
        });

        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          shareText
        );

        setShared(true);

        setTimeout(() => {
          setShared(false);
        }, 2000);
      }
    } catch {
      // Sharing was cancelled.
    }
  };

  const handleReplySubmit = () => {
    const reply = replyText.trim();

    if (!reply) {
      return;
    }

    if (typeof onReply === "function") {
      onReply(post.id, reply);
    }

    setReplyText("");
    setShowReplyBox(false);
  };

  const handleReplyKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleReplySubmit();
    }
  };

  return (
    <article className="community-post">

      <div className="post-header">

        <div className="post-avatar">
          {post.author.charAt(0)}
        </div>

        <div className="post-author">

          <h4>
            {post.author}
          </h4>

          <p>
            {club?.icon} {club?.name}
            <span> · </span>
            {post.time}
          </p>

        </div>

      </div>

      <div className="post-content">

        <p className="post-text">
          {post.text}
        </p>

      </div>

      {showReplyBox && (
        <div className="post-reply-box">

          <textarea
            value={replyText}
            onChange={(event) =>
              setReplyText(
                event.target.value
              )
            }
            onKeyDown={handleReplyKeyDown}
            placeholder="Write a reply..."
            rows={3}
          />

          <p className="reply-hint">
            Press Enter to send · Shift + Enter
            for a new line
          </p>

          <div className="reply-actions">

            <button
              type="button"
              onClick={() => {
                setReplyText("");
                setShowReplyBox(false);
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleReplySubmit}
              disabled={!replyText.trim()}
            >
              Send Reply
            </button>

          </div>

        </div>
      )}

      <div className="post-actions">

        <button
          type="button"
          className={
            appreciated
              ? "appreciated"
              : ""
          }
          onClick={handleAppreciate}
        >
          {appreciated
            ? "♥ Appreciated"
            : "♡ Appreciate"}

          <span>
            {appreciateCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            setShowReplyBox(
              (current) => !current
            )
          }
        >
          💬 Reply

          <span>
            {post.replies || 0}
          </span>
        </button>

        <button
          type="button"
          onClick={handleShare}
        >
          ↗ {shared ? "Copied" : "Share"}
        </button>

      </div>

    </article>
  );
}

export default CommunityPost;
