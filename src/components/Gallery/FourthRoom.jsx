import "./FourthRoom.css";
import MuseumFrame from "./MuseumFrame";

import letter001 from "../../assets/images/gallery/letter001.jpeg";
import letter002 from "../../assets/images/gallery/letter002.jpeg";
import letter003 from "../../assets/images/gallery/letter003.jpeg";
import letter004 from "../../assets/images/gallery/letter004.jpeg";

function FourthRoom() {
  return (
    <section className="fourth-room">
      <div className="fourth-room-wall">

        <div className="fourth-room-art">

          <div className="frame f1">
            <MuseumFrame image={letter004} />
          </div>

          <div className="frame f2">
            <MuseumFrame image={letter002} />
          </div>

          <div className="frame f3">
            <MuseumFrame image={letter001} />
          </div>

          <div className="frame f4">
            <MuseumFrame image={letter003} />
          </div>

          <div className="frame f5">
            <MuseumFrame image={letter002} />
          </div>

          <div className="frame f6">
            <MuseumFrame image={letter004} />
          </div>

          <div className="frame f7">
            <MuseumFrame image={letter001} />
          </div>

          <div className="frame f8">
            <MuseumFrame image={letter003} />
          </div>

          <div className="frame f9">
            <MuseumFrame image={letter002} />
          </div>

          <div className="frame f10">
            <MuseumFrame image={letter004} />
          </div>

          <div className="frame f11">
            <MuseumFrame image={letter001} />
          </div>

          <div className="frame f12">
            <MuseumFrame image={letter003} />
          </div>

          <div className="frame f13">
            <MuseumFrame image={letter004} />
          </div>

          <div className="frame f14">
            <MuseumFrame image={letter002} />
          </div>

          <div className="frame f15">
            <MuseumFrame image={letter001} />
          </div>

          <div className="frame f16">
            <MuseumFrame image={letter003} />
          </div>

          <div className="frame f17">
            <MuseumFrame image={letter004} />
          </div>

          <div className="frame f18">
            <MuseumFrame image={letter002} />
          </div>

          <div className="frame f19">
            <MuseumFrame image={letter001} />
          </div>
          <div className="frame third-bridge-left3">
  <MuseumFrame image={letter002} />
</div>

        </div>

      </div>
    </section>
  );
}

export default FourthRoom;
