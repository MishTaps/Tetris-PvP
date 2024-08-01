/* eslint-disable react/react-in-jsx-scope */
import styles from '../../../page.module.scss';

export const Block = ({ ID, status, blocks, setBlocks }: any) => {
  let blockStyle;
  switch (status) {
    case 'empty':
      blockStyle = styles.blockEmpty;
      break;
    case 'filled':
      blockStyle = styles.blockFilled;
      break;
    case 'figure':
      blockStyle = styles.blockFigure;
      break;
    default:
      break;
  }

  const handleClick = () => {
    const blocks_new = [...blocks];
    blocks_new[ID] = {
      id: ID,
      status: 'filled',
    };
    setBlocks(blocks_new);
  };
  if (ID < 20) {
    return <div className={blockStyle} onClick={handleClick} hidden></div>;
  } else {
    return <div className={blockStyle} onClick={handleClick}></div>;
  }
};
