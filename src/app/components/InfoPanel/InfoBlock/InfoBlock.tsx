/* eslint-disable react/react-in-jsx-scope */
import styles from '../../../page.module.scss';

export const InfoBlock = ({ time, pushTime, score }: any) => {
  return (
    <div className={styles.infoBlock}>
      Время: {time}
      <br></br>
      Скорость: {pushTime}
      <br></br>
      Счёт: {score}
    </div>
  );
};
