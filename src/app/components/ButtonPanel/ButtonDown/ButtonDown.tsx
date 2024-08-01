/* eslint-disable react/react-in-jsx-scope */
export const ButtonDown = ({ speedBoost, speedDebuff }: any) => {
  return (
    <button
      onMouseDown={speedBoost}
      onMouseUp={speedDebuff}
      onMouseLeave={speedDebuff}
    >
      ↓
    </button>
  );
};
