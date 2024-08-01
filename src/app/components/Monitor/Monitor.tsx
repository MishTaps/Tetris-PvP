/* eslint-disable react/react-in-jsx-scope */
'use client';

import styles from '../../page.module.scss';
import { Block } from './Block';

export const Monitor = ({
  blocks,
  setBlocks,
  time,
  spawnTime,
  pushTime,
  isFigure,
  setIsFigure,
  wasGenerated,
  setWasGenerated,
  figure,
  setFigure,
  figureBlocks,
  figures,
  score,
  setScore,
  nextFigure,
  setNextFigure,
  setIsGameOver,
  setIsPaused,
}: any) => {
  const monitorBlocks = blocks.map((block: any) => (
    <Block
      key={block.id}
      ID={block.id}
      status={block.status}
      blocks={blocks}
      setBlocks={setBlocks}
      figureBlocks={figureBlocks}
    />
  ));

  // Генерировать новую фигуру
  const generate = (figure: any) => {
    figure.forEach((figureID: any) => {
      setBlocks((draft: any) => {
        const figureBlocks = draft.find((a: any) => a.id === figureID);
        figureBlocks.status = 'figure';
      });
    });
  };

  // Двигать фигуру вниз
  const pushFigure = () => {
    const figureBlocksID = figureBlocks.map(
      (figureBlock: any) => figureBlock.id,
    );
    // Какой следующий шаг?
    let nextStepStatus = 'push';
    figureBlocks.forEach((figureBlock: any) => {
      if (
        figureBlock.id + 10 >= 220 ||
        blocks[figureBlock.id + 10].status === 'filled'
      ) {
        nextStepStatus = 'save';
      }
      if (
        figureBlock.id < 20 &&
        blocks[figureBlock.id + 10].status === 'filled'
      ) {
        setIsGameOver(true);
        setIsPaused(true);
      }
    });
    switch (nextStepStatus) {
      case 'push':
        // Очистка старого местопожения фигуры
        figureBlocksID.forEach((figureID: any) => {
          setBlocks((draft: any) => {
            const figureBlocks = draft.find((a: any) => a.id === figureID);
            figureBlocks.status = 'empty';
          });
        });
        // Запись нового местоположения фигуры
        const newFigureBlocks = figureBlocks.map((figureBlock: any) => ({
          id: figureBlock.id + 10,
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
        break;
      case 'save':
        // Фиксация фигуры
        figureBlocksID.forEach((figureID: any) => {
          setBlocks((draft: any) => {
            const figureBlocks = draft.find((a: any) => a.id === figureID);
            figureBlocks.status = 'filled';
          });
        });
        // Генерация новой фигуры
        setNextFigure(figures[Math.floor(Math.random() * figures.length)]);
        setFigure(nextFigure);
        setIsFigure(false);
        break;
      default:
        break;
    }
  };

  // Удалять полные линии
  const deleteFullLines = () => {
    const blockLinesToDelete = [];
    for (
      let indexStartBlock = 0;
      indexStartBlock < blocks.length;
      indexStartBlock += 10
    ) {
      let isLineFull = true;
      for (
        let indexLineBlock = indexStartBlock;
        indexLineBlock < indexStartBlock + 10;
        indexLineBlock++
      ) {
        if (blocks[indexLineBlock].status !== 'filled') {
          isLineFull = false;
          break;
        }
      }
      if (isLineFull) {
        for (
          let indexLineBlock = indexStartBlock;
          indexLineBlock < indexStartBlock + 10;
          indexLineBlock++
        ) {
          setBlocks((draft: any) => {
            draft[indexLineBlock].status = 'empty';
          });
        }
        blockLinesToDelete.push(indexStartBlock);
      }
    }
    if (blockLinesToDelete.length) {
      pushBlocks(blockLinesToDelete);
      switch (blockLinesToDelete.length) {
        case 1:
          setScore((score += 100));
          break;
        case 2:
          setScore((score += 300));
          break;
        case 3:
          setScore((score += 700));
          break;
        case 4:
          setScore((score += 1500));
          break;
        default:
          break;
      }
    }
  };

  // Двигать блоки вниз при наличии линии
  const pushBlocks = (blockLinesToDelete: any) => {
    let newBlocks = [...blocks];
    blockLinesToDelete.forEach((indexStartBlock: any) => {
      const firstLine = [
        { id: 0, status: 'empty' },
        { id: 1, status: 'empty' },
        { id: 2, status: 'empty' },
        { id: 3, status: 'empty' },
        { id: 4, status: 'empty' },
        { id: 5, status: 'empty' },
        { id: 6, status: 'empty' },
        { id: 7, status: 'empty' },
        { id: 8, status: 'empty' },
        { id: 9, status: 'empty' },
      ];
      const slicesBlocksUntilDelete = newBlocks.slice(0, indexStartBlock);
      const pushedSlicesBlocksUntilDelete = slicesBlocksUntilDelete.map(
        (block: any) => ({
          id: block.id + 10,
          status: block.status,
        }),
      );
      const slicesBlocksAfterDelete = newBlocks.slice(
        indexStartBlock + 10,
        220,
      );
      newBlocks = firstLine
        .concat(pushedSlicesBlocksUntilDelete)
        .concat(slicesBlocksAfterDelete);
      setBlocks(newBlocks);
    });
  };

  // Cпавн фигуры
  if (time === spawnTime || (time % pushTime === 0 && !isFigure)) {
    if (!wasGenerated) {
      deleteFullLines();
      generate(figure);
      setWasGenerated(true);
      setIsFigure(true);
    }
  }

  // Продвижение фигуры
  if (time % pushTime === 0 && time > spawnTime) {
    if (!wasGenerated && isFigure) {
      pushFigure();
      setWasGenerated(true);
    }
  }

  return <div className={styles.monitor}>{monitorBlocks}</div>;
};
