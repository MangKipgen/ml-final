import React from 'react';


import './Overlay.css';

export default function Overlay({ details, setOverlay}) {
  const { name } = details;

  return(
    <div className="Overlay">
      <button
        onClick={() => {
          setOverlay(null);
        }}
      >Close</button>
      <h1>{name}</h1>
      <img src={'./images/' + name + '.jpg'} />
    </div>
    );
}
