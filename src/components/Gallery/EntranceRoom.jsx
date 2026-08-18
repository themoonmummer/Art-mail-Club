import "./EntranceRoom.css";

import MuseumLight from "./MuseumLight";
import MuseumFrame from "./MuseumFrame";
import MuseumFloor from "./MuseumFloor";
import letter001 from "../../assets/images/gallery/letter001.jpeg";
import letter002 from "../../assets/images/gallery/letter002.jpeg";
import letter003 from "../../assets/images/gallery/letter003.jpeg";
import letter004 from "../../assets/images/gallery/letter004.jpeg";

function EntranceRoom() {

  return (

    <section className="entrance-room">
       <MuseumFloor>
      <MuseumLight />


      <div className="salon-wall museum-room-wall">
        </div>
     <div className="frame e1">
            <MuseumFrame image={letter004} />
          </div>

          <div className="frame e2">
            <MuseumFrame image={letter002} />
          </div>

          <div className="frame e3">
            <MuseumFrame image={letter001} />
          </div>

          <div className="frame e4">
            <MuseumFrame image={letter003} />
          </div>

          <div className="frame e5">
            <MuseumFrame image={letter002} />
          </div>

          <div className="frame e6">
            <MuseumFrame image={letter004} />
          </div>

          <div className="frame e7">
            <MuseumFrame image={letter001} />
          </div>

          <div className="frame e8">
            <MuseumFrame image={letter003} />
          </div>

          <div className="frame e10">
            <MuseumFrame image={letter004} />
          </div>

          <div className="frame e11">
            <MuseumFrame image={letter001} />
          </div>

          <div className="frame e12">
            <MuseumFrame image={letter003} />
          </div>

          <div className="frame e13">
            <MuseumFrame image={letter004} />
          </div>

          <div className="frame e14">
            <MuseumFrame image={letter002} />
          </div>

          <div className="frame e15">
            <MuseumFrame image={letter001} />
          </div>

          <div className="frame e16">
            <MuseumFrame image={letter003} />
          </div>

          <div className="frame e17">
            <MuseumFrame image={letter004} />
          </div>

          <div className="frame e18">
            <MuseumFrame image={letter002} />
          </div>

          <div className="frame e19">
            <MuseumFrame image={letter001} />
          </div>
        

      <div className="gallery-title">

        <h1>The Grand Gallery</h1>

        <span>Walk Through Stories, Not Screens.</span>

      </div>

      </MuseumFloor>
    </section>

  );

}


export default EntranceRoom;