import React, { useState, useEffect } from "react";
import "./styles.css";

import { OnlyPlayPauseButton } from './players'



const App = () => {
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [moveCount, setMoveCount] = useState(0);
  const [dragId, setDragId] = useState();
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    initializeTiles();
  }, [level]);

  const initializeTiles = () => {
    const numTiles = level + 2;
    const initialTiles = Array.from({ length: numTiles }, (_, index) => ({
      id: `Tile-${index + 1}`,
      column: 1,
      row: index + 1,
      width: 2 + index * 2, 
    }));
    setTiles(initialTiles);
  };

  const handleDrag = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === ev.currentTarget.id);
    const topTile = tiles
      .filter((tile) => tile.column === dragTile.column)
      .sort((a, b) => a.width - b.width)[0];

    if (topTile && ev.currentTarget.id === topTile.id) {
      setDragId(ev.currentTarget.id);
    } else {
      ev.preventDefault();
    }
  };

  const handleDrop = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === dragId);
    const dropColumn = ev.currentTarget.id;

    const dropColumnTopTile = tiles
      .filter((tile) => tile.column.toString() === dropColumn.toString())
      .sort((a, b) => a.width - b.width)[0];

    let newTileState = tiles;

    if (!dropColumnTopTile || dragTile.width < dropColumnTopTile.width) {
      newTileState = tiles.map((tile) => {
        if (tile.id === dragTile.id) {
          tile.column = parseInt(dropColumn, 10);
          setMoveCount(moveCount + 1);
        }

        return tile;
      });
    }

    setTiles(newTileState);
  };

  const column1Tiles = tiles.filter((tile) => tile.column === 1);
  const column2Tiles = tiles.filter((tile) => tile.column === 2);
  const column3Tiles = tiles.filter((tile) => tile.column === 3);

  const winCondition = tiles.every((tile) => tile.column === 3);

  const handleReset = () => {
    resetGame();
  };

  useEffect(() => {
    if (winCondition) {
      setGameOver(true);
    }
  }, [winCondition]);

  const resetGame = () => {
    setMoveCount(0);
    initializeTiles();
    setGameOver(false);
  };

  return (
    <>
        <OnlyPlayPauseButton />
      <div className="App">
        <div className="instructions">
            <div className="reset-button-container">
              <button className="button reset-button" onClick={handleReset}>
                Reset Game
              </button>
            </div>
          <div>
            <h1 className="neonText">Tower Of Hanoi</h1>
            <p className="neonText">Shift the entire stack of disks</p>
            <p className="neonText">
              At no time may a bigger disk be placed on top of a smaller one.
            </p>
          </div>
        </div>
        <div className="content">
          {[column1Tiles, column2Tiles, column3Tiles].map((columnTiles, col) => (
            <div
              key={`column-${col + 1}`}
              className="column-container"
              id={col + 1}
              onDragOver={(ev) => ev.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="center-bar" />
              {columnTiles
                .sort((a, b) => a.width - b.width)
                .map((tile, index) => {
                  const tileCount = columnTiles.length;
                  const tileStyles = {
                    width: `${tile.width}em`,
                  };
                  tileStyles.marginTop =
                    index === 0 ? `calc(80vh - ${tileCount * 36.6 + 1}px)` : "0";
                  return (
                    <div
                      {...tile}
                      className="tile"
                      draggable
                      key={`column-${col + 1}-${tile.id}`}
                      onDragOver={(ev) => ev.preventDefault()}
                      onDragStart={handleDrag}
                      style={tileStyles}
                    />
                  );
                })}
            </div>
          ))}
        </div>
        {winCondition && (
          <div className="win-message">
            You Win!
            <div className="win-subtitle">
              You did it in <span className="win-number">{moveCount}</span>{" "}
              moves
            </div>
            <button className="win-button" onClick={resetGame}>
              Play Again
            </button>
          </div>
        )}
        <div className="level-selector">
          <label>Level:</label>
          <select
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value, 10))}
          >
            <option value={1}>Level 1</option>
            <option value={2}>Level 2</option>
            <option value={3}>Level 3</option>
            <option value={4}>Level 4</option>
          </select>
        </div>
        Move count: {moveCount}
      </div>
    </>
  );
};

export default App;
