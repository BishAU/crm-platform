'use client';

import React from 'react';

const ParallaxScene = () => {
  return (
    <div id="scene" style={{ position: 'relative', width: '100%', height: '100%', background: `url('/images/underwater.avif') no-repeat center center/cover` }}>
      <div className="horizon" style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 0, borderTop: '2px solid transparent' }}></div>
      <img
        id="surfer"
        src={`/images/surfer.png`}
        alt="Surfer"
        style={{ position: 'absolute', width: '100px', height: 'auto', top: '55%', transform: 'translateX(0%) translateY(-40%) scaleX(1)' }}
      />
      <img
        id="paraglider"
        src={`/images/paraglider.png`}
        alt="Paraglider"
        style={{ position: 'absolute', width: '150px', height: 'auto', top: '10%', transform: 'translateX(0%) translateY(10%) scale(0.5)' }}
      />
    </div>
  );
};

export default ParallaxScene;
