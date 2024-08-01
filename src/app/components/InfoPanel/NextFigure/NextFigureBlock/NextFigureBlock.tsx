/* eslint-disable react/react-in-jsx-scope */
import styles from '../../../../page.module.scss';

export const NextFigureBlock = ({ status }: any) => {
  switch (status) {
    case 'empty':
      return <div className={styles.nextFigureBlockEmpty}></div>;
    case 'figure':
      return <div className={styles.nextFigureBlockFigure}></div>;
    default:
      break;
  }
};
