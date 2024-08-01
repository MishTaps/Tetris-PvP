/* eslint-disable react/react-in-jsx-scope */
import styles from '../../page.module.scss';
import { InfoBlock } from './InfoBlock/InfoBlock';
import { NextFigure } from './NextFigure/NextFigure';

export const InfoPanel = ({
  time,
  pushTime,
  score,
  nextFigure,
  figures,
}: any) => {
  return (
    <div className={styles.infoPanel}>
      <InfoBlock time={time} pushTime={pushTime} score={score} />
      <NextFigure nextFigure={nextFigure} figures={figures} />
    </div>
  );
};
