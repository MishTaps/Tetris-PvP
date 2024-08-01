/* eslint-disable react/react-in-jsx-scope */
'use client';

import { useEffect, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import { ButtonPanel } from './components/ButtonPanel/ButtonPanel';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import { Monitor } from './components/Monitor/Monitor';
import styles from './page.module.scss';

export default function Home() {
  const spawnTime = 1;
  const [pushTime, setPushTime] = useState(15);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const hiddenButtonForControls = useRef(0);

  const blocks_new = new Array(220);
  for (let index = 0; index < blocks_new.length; index++) {
    blocks_new[index] = {
      id: index,
      status: 'empty',
    };
  }
  const [blocks, setBlocks] = useImmer(blocks_new);
  const [wasGenerated, setWasGenerated] = useState(false);

  const figures = [
    [13, 14, 15, 16], // I
    [4, 5, 14, 15], // O
    [14, 15, 5, 6], // S
    [3, 4, 14, 15], // Z
    [13, 14, 15, 5], // L
    [4, 14, 15, 16], // J
    [14, 15, 16, 5], // T
  ];
  const [nextFigure, setNextFigure] = useState(
    figures[Math.floor(Math.random() * figures.length)],
  );
  const [figure, setFigure] = useImmer(
    figures[Math.floor(Math.random() * figures.length)],
  );
  const [isFigure, setIsFigure] = useState(true);
  const figureBlocks: any[] = blocks.filter(
    (block: any) => block.status === 'figure',
  );

  // Таймер
  const [time, setTime] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setTime(time + 1);
        setWasGenerated(false);
      }
    }, 10);
    return () => clearInterval(timer);
  }, [time, isPaused]);

  const pushLeft = () => {
    let isAllowed = true;
    figureBlocks.forEach((figureBlock: any) => {
      if (
        (figureBlock.id - 1) % 10 === 9 ||
        blocks[figureBlock.id - 1].status === 'filled'
      ) {
        isAllowed = false;
      }
    });
    if (isAllowed) {
      const figureBlocksID = figureBlocks.map(
        (figureBlock: any) => figureBlock.id,
      );
      // Очистка старого местопожения фигуры
      figureBlocksID.forEach((figureID: any) => {
        setBlocks((draft: any) => {
          const figureBlocks = draft.find((a: any) => a.id === figureID);
          figureBlocks.status = 'empty';
        });
      });
      // Запись нового местоположения фигуры
      const newFigureBlocks = figureBlocks.map((figureBlock: any) => ({
        id: figureBlock.id - 1,
        status: 'figure',
      }));
      const newFigureBlocksID = newFigureBlocks.map(
        (figureBlock: any) => figureBlock.id,
      );
      newFigureBlocksID.forEach((figureID: any) => {
        setBlocks((draft: any) => {
          const figureBlocks = draft.find((a: any) => a.id === figureID);
          figureBlocks.status = 'figure';
        });
      });
    }
  };
  const pushRight = () => {
    let isAllowed = true;
    figureBlocks.forEach((figureBlock: any) => {
      if (
        (figureBlock.id + 1) % 10 === 0 ||
        blocks[figureBlock.id + 1].status === 'filled'
      ) {
        isAllowed = false;
      }
    });
    if (isAllowed) {
      const figureBlocksID = figureBlocks.map(
        (figureBlock: any) => figureBlock.id,
      );
      // Очистка старого местопожения фигуры
      figureBlocksID.forEach((figureID: any) => {
        setBlocks((draft: any) => {
          const figureBlocks = draft.find((a: any) => a.id === figureID);
          figureBlocks.status = 'empty';
        });
      });
      // Запись нового местоположения фигуры
      const newFigureBlocks = figureBlocks.map((figureBlock: any) => ({
        id: figureBlock.id + 1,
        status: 'figure',
      }));
      const newFigureBlocksID = newFigureBlocks.map(
        (figureBlock: any) => figureBlock.id,
      );
      newFigureBlocksID.forEach((figureID: any) => {
        setBlocks((draft: any) => {
          const figureBlocks = draft.find((a: any) => a.id === figureID);
          figureBlocks.status = 'figure';
        });
      });
    }
  };

  const [isSpeedBoostActive, setIsSpeedBoostActive] = useState(false);
  const speedBoost = () => {
    if (!isSpeedBoostActive) {
      setPushTime(pushTime / 5);
      setIsSpeedBoostActive(true);
    }
  };
  const speedDebuff = () => {
    if (isSpeedBoostActive) {
      setPushTime(pushTime * 5);
      setIsSpeedBoostActive(false);
    }
  };
  const togglePlayAndPause = () => {
    isPaused ? setIsPaused(false) : setIsPaused(true);
  };

  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case 'ArrowLeft':
        pushLeft();
        break;
      case 'ArrowRight':
        pushRight();
        break;
      case 'ArrowDown':
        speedBoost();
        break;
      case 'Enter':
        togglePlayAndPause();
        break;
      default:
        break;
    }
  };
  const handleKeyUp = (event: any) => {
    switch (event.key) {
      case 'ArrowDown':
        speedDebuff();
        break;
      default:
        break;
    }
  };

  return (
    <main
      className={styles.main}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <div>{isGameOver ? 'Game Over' : ''}</div>
      <InfoPanel
        time={time}
        pushTime={pushTime}
        score={score}
        nextFigure={nextFigure}
        figures={figures}
      />
      <Monitor
        blocks={blocks}
        setBlocks={setBlocks}
        time={time}
        spawnTime={spawnTime}
        pushTime={pushTime}
        isFigure={isFigure}
        setIsFigure={setIsFigure}
        wasGenerated={wasGenerated}
        setWasGenerated={setWasGenerated}
        figure={figure}
        setFigure={setFigure}
        figureBlocks={figureBlocks}
        figures={figures}
        score={score}
        setScore={setScore}
        nextFigure={nextFigure}
        setNextFigure={setNextFigure}
        setIsGameOver={setIsGameOver}
        setIsPaused={setIsPaused}
      />
      <ButtonPanel
        pushLeft={pushLeft}
        pushRight={pushRight}
        speedBoost={speedBoost}
        speedDebuff={speedDebuff}
        togglePlayAndPause={togglePlayAndPause}
      />
      <button autoFocus>
        Нажмите сюда для управления с помощью клавиатуры
      </button>
    </main>
  );
}
