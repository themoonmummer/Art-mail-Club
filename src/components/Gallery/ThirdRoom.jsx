import "./ThirdRoom.css";
import MuseumFrame from "./MuseumFrame";

import letter001 from "../../assets/images/gallery/letter001.jpeg";
import letter002 from "../../assets/images/gallery/letter002.jpeg";
import letter003 from "../../assets/images/gallery/letter003.jpeg";
import letter004 from "../../assets/images/gallery/letter004.jpeg";

function ThirdRoom() {
  return (
    <section className="third-room">
      <div className="third-room-wall">

        <div className="third-room-art">

         <div className="frame t1">
            <MuseumFrame image={letter001}  />
          </div>

          <div className="frame t2">
            <MuseumFrame image={letter002}/>
          </div>

          <div className="frame t3">
            <MuseumFrame image={letter003}/>
          </div>

          <div className="frame t4">
            <MuseumFrame image={letter004}/>
          </div>

          <div className="frame t5">
            <MuseumFrame image={letter001}/>
          </div>

          <div className="frame t6">
            <MuseumFrame image={letter002}/>
          </div>
          <div className="frame t7">
  <MuseumFrame image={letter003}/>
</div>

<div className="frame t8">
  <MuseumFrame image={letter004}/>
</div>

<div className="frame t9">
  <MuseumFrame image={letter001}/>
</div>

<div className="frame t10">
  <MuseumFrame image={letter002}/>
</div>
<div className="frame t11">
  <MuseumFrame image={letter003}/>
</div>

<div className="frame t12">
  <MuseumFrame image={letter001}/>
</div>

<div className="frame t13">
  <MuseumFrame image={letter002}/>
</div>

<div className="frame t14">
  <MuseumFrame image={letter003}/>
</div>

<div className="frame t15">
    <MuseumFrame image={letter004}/>
</div>

<div className="frame t16">
    <MuseumFrame image={letter001}/>
</div>

<div className="frame t17">
    <MuseumFrame image={letter002}/>
</div>

<div className="frame t18">
    <MuseumFrame image={letter003}/>
</div>

<div className="frame t19">
    <MuseumFrame image={letter004}/>
</div>
<div className="frame third-bridge-left">
  <MuseumFrame image={letter002} />
</div>


        </div>

      </div>
    </section>
  );
}

export default ThirdRoom;
