import "./WindowScene.css";

function WindowScene() {
  return (
   <div className="window-scene">

      <div className="window-frame">

        <div className="window-glass">

          {/* Sky */}
          <div className="sky"></div>

          {/* Sun */}
          <div className="sun"></div>

          {/* Clouds */}
          <div className="cloud cloud-left"></div>
          <div className="cloud cloud-right"></div>

          {/* Landscape */}
          <div className="landscape"></div>

        </div>

        {/* Window Dividers */}
        <div className="window-divider window-divider-vertical"></div>
        <div className="window-divider window-divider-horizontal"></div>

      </div>

      {/* Window Sill */}
      <div className="window-sill"></div>

    </div>
  );
}

export default WindowScene;