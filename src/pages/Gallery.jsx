import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ThirdRoom from "../components/Gallery/ThirdRoom";
import EntranceRoom from "../components/Gallery/EntranceRoom";
import LettersRoom from "../components/Gallery/LettersRoom";
import FourthRoom from "../components/Gallery/FourthRoom";
import "../components/Gallery/Gallery.css";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);



function Gallery() {


  const pinRef = useRef(null);

  const trackRef = useRef(null);



  useEffect(() => {


    const track = trackRef.current;


    const ctx = gsap.context(() => {


      gsap.to(track, {


        x: () => -(track.scrollWidth - window.innerWidth),


        ease: "none",


        scrollTrigger: {


          trigger: pinRef.current,


          start: "top top",


          end: () => `+=${track.scrollWidth - window.innerWidth}`,


          pin: pinRef.current,


          scrub: 1,


        },


      });



    });



    return () => {


      ctx.revert();


    };


  }, []);




  return (

    <>

      <Navbar variant="gallery" />

      <main className="gallery-page">


        <div
          ref={pinRef}
          className="gallery-pin"
        >


          <section

            ref={trackRef}

            className="gallery-track"

          >



            <section className="gallery-section entrance">

              <EntranceRoom />
            </section>
            
          <section className="gallery-section letters">
           <LettersRoom />
          </section>

           <section className="gallery-section third-room">
           <ThirdRoom />
          </section>

          <section className="gallery-section fourth-room-section">
         <FourthRoom />
        </section>

          </section>


        </div>


      </main>


      <Footer />

    </>

  );

}


export default Gallery;