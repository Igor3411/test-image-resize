import React from "react";

import BadgeItem, { Badge } from "../BadgeItem/BadgeItem";

interface BadgeListProps {
  badges: Badge[];
  setMovedItem: (item: number | null) => void;
  onDeleteItem: (item: number) => () => void;
  onBadgeChange: (
    el: number
  ) => (input: React.ChangeEvent<HTMLInputElement>) => void;
}

const BadgeList: React.FC<BadgeListProps> = ({
  badges,
  setMovedItem,
  onDeleteItem,
  onBadgeChange,
}) => {
  return (
    <>
      {badges.map((badge, i) => (
        <BadgeItem
          key={`${i}-key`}
          badge={badge}
          index={i}
          setMovedItem={setMovedItem}
          onDeleteItem={onDeleteItem}
          onBadgeChange={onBadgeChange}
          focused={i === badges.length - 1}
        />
      ))}
    </>
  );
};

export default BadgeList;
