import React from "react";
import styled from "styled-components";

import moveImg from "../../assets/images/move.svg";
import trashImg from "../../assets/images/trash.svg";

export interface Badge {
  xCurrent: number;
  yCurrent: number;
  xBase: number;
  yBase: number;
  text: string;
}

interface BadgeItemProps {
  badge: Badge;
  focused: boolean;
  index: number;
  onDeleteItem: (item: number) => () => void;
  setMovedItem: (item: number | null) => void;
  onBadgeChange: (
    el: number
  ) => (input: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInputWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
  animation: transform 0.5 ease-in-out;
`;

const StyledMove = styled.img`
  position: absolute;
  bottom: 6px;
  left: 5px;
  cursor: move;
  width: 10px;
  height: 10px;
`;

const StyledDelete = styled.img`
  position: absolute;
  bottom: 6px;
  right: 5px;
  cursor: pointer;
  width: 10px;
  height: 10px;
`;

const StyledInput = styled.input`
  padding-left: 20px;
  padding-right: 10px;
  border: none;
  background: rgb(255, 255, 255, 0.5);
  outline: none;
  color: red;
  font-size: 18px;
  font-family: monospace;
`;

const BadgeItem: React.FC<BadgeItemProps> = ({
  index,
  badge,
  focused,
  setMovedItem,
  onBadgeChange,
  onDeleteItem,
}) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (focused && !badge?.text) {
      ref.current?.focus();
    }
  }, [focused, badge]);

  return (
    <StyledInputWrapper
      key={`${badge.xCurrent + badge.yCurrent}-key`}
      style={{
        transform: `translate(${badge.xCurrent}px, ${badge.yCurrent}px)`,
      }}
    >
      <StyledMove
        alt=""
        src={moveImg}
        onMouseDown={() => setMovedItem(index)}
        onMouseUp={() => setMovedItem(null)}
      />
      <StyledInput
        ref={ref}
        size={badge.text?.length || 1}
        onChange={onBadgeChange(index)}
        value={badge.text}
      />
      <StyledDelete alt="" src={trashImg} onClick={onDeleteItem(index)} />
    </StyledInputWrapper>
  );
};

export default React.memo(BadgeItem);
