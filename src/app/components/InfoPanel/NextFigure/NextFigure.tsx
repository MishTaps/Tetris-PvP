/* eslint-disable react/react-in-jsx-scope */
import styles from '../../../page.module.scss';
import { NextFigureBlock } from './NextFigureBlock/NextFigureBlock';

export const NextFigure = ({ nextFigure, figures }: any) => {
  const infoBlocks_new = new Array(8);
  for (let index = 0; index < infoBlocks_new.length; index++) {
    infoBlocks_new[index] = {
      id: index,
      status: 'empty',
    };
  }
  switch (nextFigure.toString()) {
    case figures[0].toString():
      infoBlocks_new[0] = {
        id: 0,
        status: 'figure',
      };
      infoBlocks_new[1] = {
        id: 1,
        status: 'figure',
      };
      infoBlocks_new[2] = {
        id: 2,
        status: 'figure',
      };
      infoBlocks_new[3] = {
        id: 3,
        status: 'figure',
      };
      break;
    case figures[1].toString():
      infoBlocks_new[1] = {
        id: 1,
        status: 'figure',
      };
      infoBlocks_new[2] = {
        id: 2,
        status: 'figure',
      };
      infoBlocks_new[5] = {
        id: 5,
        status: 'figure',
      };
      infoBlocks_new[6] = {
        id: 6,
        status: 'figure',
      };
      break;
    case figures[2].toString():
      infoBlocks_new[5] = {
        id: 5,
        status: 'figure',
      };
      infoBlocks_new[6] = {
        id: 6,
        status: 'figure',
      };
      infoBlocks_new[2] = {
        id: 2,
        status: 'figure',
      };
      infoBlocks_new[3] = {
        id: 3,
        status: 'figure',
      };
      break;
    case figures[3].toString():
      infoBlocks_new[0] = {
        id: 0,
        status: 'figure',
      };
      infoBlocks_new[1] = {
        id: 1,
        status: 'figure',
      };
      infoBlocks_new[5] = {
        id: 5,
        status: 'figure',
      };
      infoBlocks_new[6] = {
        id: 6,
        status: 'figure',
      };
      break;
    case figures[4].toString():
      infoBlocks_new[2] = {
        id: 2,
        status: 'figure',
      };
      infoBlocks_new[4] = {
        id: 4,
        status: 'figure',
      };
      infoBlocks_new[5] = {
        id: 5,
        status: 'figure',
      };
      infoBlocks_new[6] = {
        id: 6,
        status: 'figure',
      };
      break;
    case figures[5].toString():
      infoBlocks_new[1] = {
        id: 1,
        status: 'figure',
      };
      infoBlocks_new[5] = {
        id: 5,
        status: 'figure',
      };
      infoBlocks_new[6] = {
        id: 6,
        status: 'figure',
      };
      infoBlocks_new[7] = {
        id: 7,
        status: 'figure',
      };
      break;
    case figures[6].toString():
      infoBlocks_new[2] = {
        id: 2,
        status: 'figure',
      };
      infoBlocks_new[5] = {
        id: 5,
        status: 'figure',
      };
      infoBlocks_new[6] = {
        id: 6,
        status: 'figure',
      };
      infoBlocks_new[7] = {
        id: 7,
        status: 'figure',
      };
      break;
    default:
      break;
  }
  const infoBlocks = infoBlocks_new;
  const nextFigureBlocks = infoBlocks.map((block: any) => (
    <NextFigureBlock key={block.id} status={block.status} />
  ));
  return <div className={styles.nextFigure}>{nextFigureBlocks}</div>;
};
