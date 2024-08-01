/* eslint-disable react/react-in-jsx-scope */
import { ButtonDown } from './ButtonDown/ButtonDown';
import { ButtonLeft } from './ButtonLeft/ButtonLeft';
import { ButtonPause } from './ButtonPause/ButtonPause';
import { ButtonRevert } from './ButtonRevert/ButtonRevert';
import { ButtonRight } from './ButtonRight/ButtonRight';
import { ButtonUp } from './ButtonUp/ButtonUp';

export const ButtonPanel = ({
  pushLeft,
  pushRight,
  speedBoost,
  speedDebuff,
  togglePlayAndPause,
}: any) => {
  return (
    <div>
      <ButtonUp />
      <ButtonDown speedBoost={speedBoost} speedDebuff={speedDebuff} />
      <ButtonLeft pushLeft={pushLeft} />
      <ButtonRight pushRight={pushRight} />
      <ButtonRevert />
      <ButtonPause togglePlayAndPause={togglePlayAndPause} />
    </div>
  );
};
