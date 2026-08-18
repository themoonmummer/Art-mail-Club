import "./LettersRoom.css";
import MuseumFrame from "./MuseumFrame";
import letter001 from "../../assets/images/gallery/letter001.jpeg";
import letter002 from "../../assets/images/gallery/letter002.jpeg";
import letter003 from "../../assets/images/gallery/letter003.jpeg";
import letter004 from "../../assets/images/gallery/letter004.jpeg";

function LettersRoom() {
  return (
    <section className="letters-room">
      <div className="gallery-room-wall">

        <div className="letters-wall">

          <div className="frame l1">
            <MuseumFrame image={letter001}  />
          </div>

          <div className="frame l2">
            <MuseumFrame image={letter002}/>
          </div>

          <div className="frame l3">
            <MuseumFrame image={letter003}/>
          </div>

          <div className="frame l4">
            <MuseumFrame image={letter004}/>
          </div>

          <div className="frame l5">
            <MuseumFrame image={letter001}/>
          </div>

          <div className="frame l6">
            <MuseumFrame image={letter002}/>
          </div>
          <div className="frame l7">
  <MuseumFrame image={letter003}/>
</div>

<div className="frame l8">
  <MuseumFrame image={letter004}/>
</div>

<div className="frame l9">
  <MuseumFrame image={letter001}/>
</div>

<div className="frame l10">
  <MuseumFrame image={letter002}/>
</div>
<div className="frame l11">
  <MuseumFrame image={letter003}/>
</div>

<div className="frame l12">
  <MuseumFrame image={letter001}/>
</div>

<div className="frame l14">
  <MuseumFrame image={letter002}/>
</div>

<div className="frame l15">
  <MuseumFrame image={letter003}/>
</div>

<div className="frame l16">
    <MuseumFrame image={letter004}/>
</div>

<div className="frame l17">
    <MuseumFrame image={letter001}/>
</div>

<div className="frame l18">
    <MuseumFrame image={letter002}/>
</div>

<div className="frame l19">
    <MuseumFrame image={letter003}/>
</div>

<div className="frame l20">
    <MuseumFrame image={letter004}/>
</div>

 <div className="frame third-bridge-left2">
  <MuseumFrame image={letter002} />
</div>

        </div>

      </div>
    </section>
  );
}

export default LettersRoom;
