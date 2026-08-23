import "./WindowScene.css";

function WindowScene() {
  return (
    <div className="window-scene cinematic-window">

      {/* =================================
          ROOM / OUTSIDE SCENE
      ================================= */}

      <div className="scene-art" />


      {/* =================================
          GLASS
      ================================= */}

      <div className="window-glass">

        <div className="glass-daylight" />

        <div className="glass-sun-glow" />

        <div className="glass-reflection" />

      </div>


      {/* =================================
          WOODEN FRAME
      ================================= */}

      <div className="window-frame">

        <div className="window-divider window-divider-vertical" />

        <div className="window-divider window-divider-horizontal" />

      </div>


      {/* =================================
          SILL
      ================================= */}

      <div className="window-sill" />

    </div>
  );
}

export default WindowScene;
