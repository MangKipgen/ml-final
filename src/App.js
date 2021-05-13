import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import './App.css';
import Overlay from './Overlay';
import { Helmet } from 'react-helmet';
import main from './main';




function App() {
  const canvas = useRef(null);
  const [ overlay, setOverlay ] = useState(null);
  const world_Width = 3000;
  const world_Height = 2000;

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      view: canvas.current
    });

    const viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: world_Width,
      worldHeight: world_Height,
      
      interaction: app.renderer.plugins.interaction
    });
  
    app.stage.addChild(viewport);

    viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate()

    let positionDict = {}

    // const siteName = new PIXI.Text('The British Museum Collection', style);
    // console.log(style)

    // app.stage.addChild(siteName);


    fetch('./images.json')
      .then((response) => {return response.json()})
      .then((data) => {
        for(let i = 0; i < data.length; i++) {
          const fileName = data[i].filename.replace(/\//g, '_');
          const name = fileName.replace('.jpg', '');
          app.loader.add(name, './resized/' + fileName);
          data[i].name = name;
          positionDict[name] = data[i];
        }

        app.loader.load((loader, resources) => {
          for(let key in resources) {
            const imageSprite = new PIXI.Sprite(resources[key].texture)
            const clusterPos = positionDict[key].cluster_pos;

            imageSprite.x = 5 * app.renderer.width * (clusterPos[0] * 3 - 1);
            imageSprite.y = 5 * app.renderer.width * (clusterPos[1] * 3 - 1);

            // imageSprite.anchor.x = 0.5;
            // imageSprite.anchor.y = 0.5;
            imageSprite.interactive = true;

            const name = key;

            imageSprite.on('click', () => {
              setOverlay(positionDict[name]);
            });

            viewport.addChild(imageSprite)
            viewport.fit()
            // viewport.moveCenter(world_Width, world_Height)
            viewport.moveCenter(imageSprite.x, imageSprite.y)

          }
        });
      });

  }, [])

  return (

    <div className="App">
      <canvas ref={canvas} />
      {overlay &&
        <Overlay
          details={overlay}
          setOverlay={setOverlay}
        />
      }

        <Helmet>
        <title>The British Museum</title>
        <meta name="description" content="App Description" />
        <meta name="theme-color" content="#008f68" />
        <body class = 'dark' data-react-helmet='class'>
        </body>
        </Helmet>

      <main />

    </div>
  );
}

export default App;
