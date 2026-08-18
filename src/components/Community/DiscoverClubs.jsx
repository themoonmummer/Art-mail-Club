import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ClubCard from "./ClubCard";

function DiscoverClubs({
  clubs,
  joinedClubIds,
  onJoin,
}) {
  const availableClubs = useMemo(() => {
    return clubs.filter(
      (club) => !joinedClubIds.includes(club.id)
    );
  }, [clubs, joinedClubIds]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  const animationTimer = useRef(null);
  const finishTimer = useRef(null);
  const autoTimer = useRef(null);
  const movingRef = useRef(false);

  const count = availableClubs.length;

  const getClub = useCallback(
    (offset) => {
      if (!count) {
        return null;
      }

      const index =
        (activeIndex + offset + count) % count;

      return availableClubs[index];
    },
    [activeIndex, availableClubs, count]
  );

  /*
   * =====================================================
   * FIVE CARD LOOP
   * =====================================================
   */

  const farPreviousClub = getClub(-2);
  const previousClub = getClub(-1);
  const currentClub = getClub(0);
  const nextClub = getClub(1);
  const farNextClub = getClub(2);

  /*
   * =====================================================
   * MOVE CAROUSEL
   * =====================================================
   *
   * The important part here is:
   *
   * 1. Add moving class.
   * 2. Let CSS animate for 650ms.
   * 3. Change activeIndex.
   * 4. Wait for React to render the new cards.
   * 5. Remove moving class.
   *
   * This prevents the cards from jumping back
   * to their original positions.
   */

  const moveCarousel = useCallback(
    (moveDirection) => {
      if (
        count < 2 ||
        movingRef.current
      ) {
        return;
      }

      movingRef.current = true;

      setIsMoving(true);
      setDirection(moveDirection);

      /*
       * Clear any old timers first.
       */

      if (animationTimer.current) {
        window.clearTimeout(
          animationTimer.current
        );
      }

      if (finishTimer.current) {
        window.clearTimeout(
          finishTimer.current
        );
      }

      /*
       * =================================================
       * STEP 1
       * Let the cards physically slide.
       * =================================================
       */

      animationTimer.current =
        window.setTimeout(() => {
          /*
           * =================================================
           * STEP 2
           * Change which club is active.
           *
           * IMPORTANT:
           * We keep the direction class active here.
           * This means there is NO visible reset.
           * =================================================
           */

          setActiveIndex((current) => {
            if (moveDirection === "next") {
              return (
                (current + 1) %
                count
              );
            }

            return (
              (current - 1 + count) %
              count
            );
          });

          /*
           * =================================================
           * STEP 3
           * Give React one frame to render the new
           * activeIndex before removing the moving class.
           * =================================================
           */

          finishTimer.current =
            window.setTimeout(() => {
              setDirection(null);
              setIsMoving(false);
              movingRef.current = false;
            }, 80);
        }, 650);
    },
    [count]
  );

  /*
   * =====================================================
   * AUTOMATIC SLIDESHOW
   * =====================================================
   */

  useEffect(() => {
    if (count < 2) {
      return undefined;
    }

    autoTimer.current =
      window.setInterval(() => {
        if (!movingRef.current) {
          moveCarousel("next");
        }
      }, 4500);

    return () => {
      if (autoTimer.current) {
        window.clearInterval(
          autoTimer.current
        );

        autoTimer.current = null;
      }

      if (animationTimer.current) {
        window.clearTimeout(
          animationTimer.current
        );

        animationTimer.current = null;
      }

      if (finishTimer.current) {
        window.clearTimeout(
          finishTimer.current
        );

        finishTimer.current = null;
      }

      movingRef.current = false;
    };
  }, [count, moveCarousel]);

  /*
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (count === 0) {
    return (
      <section
        id="discover-clubs"
        className="discover-clubs"
      >
        <div className="discover-clubs-header">
          <p className="community-tag">
            Find Your People
          </p>

          <h2>
            Discover a little corner
            <br />
            that feels like yours.
          </h2>

          <p>
            Every club has its own little rhythm.
            Wander around until you find one
            that feels familiar.
          </p>
        </div>

        <div className="all-clubs-joined">
          <span>✉</span>

          <h3>
            You've found your people.
          </h3>

          <p>
            You're already part of every
            available club.
          </p>
        </div>
      </section>
    );
  }

  /*
   * =====================================================
   * MAIN DISCOVER SECTION
   * =====================================================
   */

  return (
    <section
      id="discover-clubs"
      className="discover-clubs"
    >
      <div className="discover-clubs-header">
        <p className="community-tag">
          Find Your People
        </p>

        <h2>
          Discover a little corner
          <br />
          that feels like yours.
        </h2>

        <p>
          Every club has its own little rhythm.
          Wander around until you find one
          that feels familiar.
        </p>
      </div>

      <div className="club-carousel">

        {/* =================================================
            LEFT ARROW
            ================================================= */}

        <button
          type="button"
          className="carousel-arrow carousel-arrow-left"
          onClick={() =>
            moveCarousel("previous")
          }
          disabled={isMoving}
          aria-label="Previous club"
        >
          ←
        </button>


        {/* =================================================
            CAROUSEL STAGE
            ================================================= */}

        <div
          className={[
            "carousel-stage",
            direction
              ? `moving-${direction}`
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >

          {/* =================================================
              FAR LEFT
              ================================================= */}

          <div className="carousel-card carousel-card-far-previous">
            {farPreviousClub && (
              <ClubCard
                club={farPreviousClub}
              />
            )}
          </div>


          {/* =================================================
              LEFT / FADED
              ================================================= */}

          <div className="carousel-card carousel-card-previous">
            {previousClub && (
              <ClubCard
                club={previousClub}
              />
            )}
          </div>


          {/* =================================================
              CENTER / HIGHLIGHTED
              ================================================= */}

          <div className="carousel-card carousel-card-current">
            {currentClub && (
              <ClubCard
                club={currentClub}
                featured
                onJoin={onJoin}
              />
            )}
          </div>


          {/* =================================================
              RIGHT / FADED
              ================================================= */}

          <div className="carousel-card carousel-card-next">
            {nextClub && (
              <ClubCard
                club={nextClub}
              />
            )}
          </div>


          {/* =================================================
              FAR RIGHT
              ================================================= */}

          <div className="carousel-card carousel-card-far-next">
            {farNextClub && (
              <ClubCard
                club={farNextClub}
              />
            )}
          </div>

        </div>


        {/* =================================================
            RIGHT ARROW
            ================================================= */}

        <button
          type="button"
          className="carousel-arrow carousel-arrow-right"
          onClick={() =>
            moveCarousel("next")
          }
          disabled={isMoving}
          aria-label="Next club"
        >
          →
        </button>

      </div>
    </section>
  );
}

export default DiscoverClubs;
