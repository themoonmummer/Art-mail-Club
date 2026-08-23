import { useState } from "react";

import "../components/Community/Community.css";

import mandalaOne from "../assets/images/mandala/md1.jpeg";
import mandalaTwo from "../assets/images/mandala/md2.jpeg";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import CommunityHeader from "../components/Community/CommunityHeader";
import CommunityFilters from "../components/Community/CommunityFilters";
import CommunityFeed from "../components/Community/CommunityFeed";
import MyClubs from "../components/Community/MyClubs";
import DiscoverClubs from "../components/Community/DiscoverClubs";

import {
  clubs,
  posts,
  myClubIds,
} from "../data/communityData";

function Community() {
  const [activeFilter, setActiveFilter] = useState("all");

  const [showComposer, setShowComposer] = useState(false);

  const [postContent, setPostContent] = useState("");

  const [communityPosts, setCommunityPosts] = useState(() => {
    try {
      const savedPosts = localStorage.getItem(
        "art-mail-community-posts"
      );

      if (savedPosts) {
        return JSON.parse(savedPosts);
      }
    } catch {
      // Fall back to original posts.
    }

    return posts;
  });

const [joinedClubIds, setJoinedClubIds] = useState(() => {
  try {
    const saved = localStorage.getItem(
      "art-mail-joined-clubs"
    );

    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Use default clubs.
  }

  return myClubIds;
});


  const myClubs = clubs.filter((club) =>
    joinedClubIds.includes(club.id)
  );

  const visiblePosts =
    activeFilter === "all"
      ? communityPosts
      : communityPosts.filter((post) =>
          joinedClubIds.includes(post.clubId)
        );

  const savePosts = (updatedPosts) => {
    setCommunityPosts(updatedPosts);

    try {
      localStorage.setItem(
        "art-mail-community-posts",
        JSON.stringify(updatedPosts)
      );
    } catch {
      // Ignore storage errors.
    }
  };

  const handleJoinClub = (clubId) => {
  setJoinedClubIds((currentIds) => {
    if (currentIds.includes(clubId)) {
      return currentIds;
    }

    const updatedIds = [
      ...currentIds,
      clubId,
    ];

    localStorage.setItem(
      "art-mail-joined-clubs",
      JSON.stringify(updatedIds)
    );

    window.dispatchEvent(
      new Event("art-mail-profile-update")
    );

    return updatedIds;
  });
};


  const handlePublishPost = () => {
    const text = postContent.trim();

    if (!text) {
      return;
    }

    const newPost = {
      id: Date.now(),
      author: "You",
      clubId: joinedClubIds[0] || 1,
      time: "Just now",
      text,
      appreciates: 0,
      replies: 0,
    };

    savePosts([
      newPost,
      ...communityPosts,
    ]);

    setPostContent("");
    setShowComposer(false);
  };

  const handleReply = (postId, replyText) => {
    if (!replyText?.trim()) {
      return;
    }

    const updatedPosts = communityPosts.map((post) =>
      post.id === postId
        ? {
            ...post,
            replies: (post.replies || 0) + 1,
          }
        : post
    );

    savePosts(updatedPosts);
  };

  return (
    <>
     <Navbar variant="community" />

      <main className="community">

        {/* =====================================================
            DECORATIVE MANDALAS
            ===================================================== */}

        <div
          className="community-mandalas"
          aria-hidden="true"
        >
          <img
            src={mandalaOne}
            className="community-mandala mandala-1"
            alt=""
          />

          <img
            src={mandalaTwo}
            className="community-mandala mandala-2"
            alt=""
          />

          <img
            src={mandalaOne}
            className="community-mandala mandala-3"
            alt=""
          />

          <img
            src={mandalaTwo}
            className="community-mandala mandala-4"
            alt=""
          />

          <img
            src={mandalaOne}
            className="community-mandala mandala-5"
            alt=""
          />

          <img
            src={mandalaTwo}
            className="community-mandala mandala-6"
            alt=""
          />

          <img
            src={mandalaOne}
            className="community-mandala mandala-7"
            alt=""
          />

          <img
            src={mandalaTwo}
            className="community-mandala mandala-8"
            alt=""
          />
        </div>

        {/* =====================================================
            COMMUNITY HEADER
            ===================================================== */}

        <CommunityHeader />

        <CommunityFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onCreatePost={() => setShowComposer(true)}
        />

        {/* =====================================================
            POST COMPOSER
            ===================================================== */}

        {showComposer && (
          <div className="community-composer">
            <div className="composer-inner">

              <button
                type="button"
                className="composer-close"
                onClick={() => {
                  setPostContent("");
                  setShowComposer(false);
                }}
              >
                ×
              </button>

              <p className="composer-label">
                COMMUNITY LETTERBOARD
              </p>

              <h2>
                Write something worth sharing.
              </h2>

              <textarea
                value={postContent}
                onChange={(event) =>
                  setPostContent(event.target.value)
                }
                placeholder="What's on your mind?"
              />

              <div className="composer-actions">

                <button
                  type="button"
                  className="composer-cancel"
                  onClick={() => {
                    setPostContent("");
                    setShowComposer(false);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="composer-publish"
                  onClick={handlePublishPost}
                  disabled={!postContent.trim()}
                >
                  Publish Post
                </button>

              </div>

            </div>
          </div>
        )}

        {/* =====================================================
            COMMUNITY CONTENT
            ===================================================== */}

        <div className="community-layout">

          <CommunityFeed
            posts={visiblePosts}
            clubs={clubs}
            onReply={handleReply}
          />

          <MyClubs clubs={myClubs} />

        </div>

        {/* =====================================================
            DISCOVER CLUBS
            ===================================================== */}

        <DiscoverClubs
          clubs={clubs}
          joinedClubIds={joinedClubIds}
          onJoin={handleJoinClub}
        />

      </main>
<Footer variant="community" />
    </>
  );
}

export default Community;
