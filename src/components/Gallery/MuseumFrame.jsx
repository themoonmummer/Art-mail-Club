import "./MuseumFrame.css";


function MuseumFrame({
  className = "",
  image,
  title = "Artwork",
  artist = "Art Mail Club Collection"
}) {

  return (

    <div className={`museum-frame ${className}`}>

      <div className="frame-carving">

        <div className="frame-inner">

          <div className="artwork-space">

            {image && (

              <img
                src={image}
                alt={title}
                className="artwork-image"
              />

            )}

          </div>

        </div>

      </div>


      <div className="museum-label">

        <span>{title}</span>

        <small>{artist}</small>

      </div>


    </div>

  );

}


export default MuseumFrame;