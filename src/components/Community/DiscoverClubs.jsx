import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import ClubCard from "./ClubCard";

function DiscoverClubs({
  clubs,
  joinedClubIds,
  onJoin,
}) {
  /*
   * =====================================================
   * AVAILABLE CLUBS
   * =====================================================
   */

  const availableClubs = useMemo(() => {
    return clubs.filter(
      (club) => !joinedClubIds.includes(club.id)
    );
  }, [clubs, joinedClubIds]);


  /*
   * =====================================================
   * ACTIVE CARD
   * =====================================================
   */

  const [activeIndex, setActiveIndex] = useState(0);


  const count = availableClubs.length;


  /*
   * =====================================================
   * NEXT
   * =====================================================
   */

  const nextCard = useCallback(() => {
    if (count < 2) {
      return;
    }

    setActiveIndex(
      (current) => (current + 1) % count
    );
  }, [count]);


  /*
   * =====================================================
   * PREVIOUS
   * =====================================================
   */

  const previousCard = useCallback(() => {
    if (count < 2) {
      return;
    }

    setActiveIndex(
      (current) =>
        (current - 1 + count) % count
    );
  }, [count]);


  /*
   * =====================================================
   * AUTOMATIC CAROUSEL
   * =====================================================
   *
   * This works like the Subscription carousel.
   *
   * There is NO special "moving" state.
   *
   * React changes activeIndex.
   *
   * The CSS transition on the cards then makes
   * every card smoothly travel to its new position.
   */

  useEffect(() => {
    if (count < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % count
      );
    }, 4500);

    return () => {
      window.clearInterval(timer);
    };
  }, [count]);


  /*
   * =====================================================
   * GET RELATIVE POSITION
   * =====================================================
   *
   * EXACT SAME IDEA AS SUBSCRIPTION.
   *
   * Example:
   *
   * activeIndex = 2
   *
   * card positions:
   *
   * -2 = far previous
   * -1 = previous
   *  0 = active
   * +1 = next
   * +2 = far next
   *
   * The modulo calculation makes the carousel
   * loop forever.
   */

  const getCardPosition = useCallback(
    (index) => {
      if (!count) {
        return 0;
      }

      let difference =
        index - activeIndex;

      /*
       * Wrap around from the beginning/end.
       */

      if (difference > count / 2) {
        difference -= count;
      }

      if (difference < -count / 2) {
        difference += count;
      }

      return difference;
    },
    [activeIndex, count]
  );


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

      {/* =================================================
          HEADER
          ================================================= */}

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


      {/* =================================================
          CAROUSEL
          ================================================= */}

      <div className="club-carousel">


        {/* =================================================
            LEFT ARROW
            ================================================= */}

        <button
          type="button"
          className="
            carousel-arrow
            carousel-arrow-left
          "
          onClick={previousCard}
          aria-label="Previous club"
        >
          ←
        </button>


        {/* =================================================
            CAROUSEL STAGE
            ================================================= */}

        <div className="carousel-stage">

          {availableClubs.map(
            (club, index) => {

              const position =
                getCardPosition(index);


              /*
               * =============================================
               * POSITION CLASS
               * =============================================
               *
               * This is the important change.
               *
               * We are NOT using:
               *
               * moving-next
               * moving-previous
               *
               * anymore.
               *
               * Instead the card simply changes from:
               *
               * previous → current
               *
               * or:
               *
               * current → next
               *
               * and your existing CSS transition handles
               * the physical movement.
               */

              let positionClass =
                "carousel-card-far-next";


              if (position === -2) {
                positionClass =
                  "carousel-card-far-previous";
              }

              else if (position === -1) {
                positionClass =
                  "carousel-card-previous";
              }

              else if (position === 0) {
                positionClass =
                  "carousel-card-current";
              }

              else if (position === 1) {
                positionClass =
                  "carousel-card-next";
              }

              else if (position === 2) {
                positionClass =
                  "carousel-card-far-next";
              }


              /*
               * =============================================
               * ACTIVE CARD
               * =============================================
               */

              const isActive =
                position === 0;


              return (
                <div
                  key={club.id}
                  className={`
                    carousel-card
                    ${positionClass}
                  `}
                >

                  <ClubCard
                    club={club}
                    featured={isActive}
                    onJoin={
                      isActive
                        ? onJoin
                        : undefined
                    }
                  />

                </div>
              );
            }
          )}

        </div>


        {/* =================================================
            RIGHT ARROW
            ================================================= */}

        <button
          type="button"
          className="
            carousel-arrow
            carousel-arrow-right
          "
          onClick={nextCard}
          aria-label="Next club"
        >
          →
        </button>

      </div>

    </section>
  );
}

export default DiscoverClubs;
