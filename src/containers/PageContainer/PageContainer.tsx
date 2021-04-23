import React from "react";

import styled from "styled-components";

import { FileInput } from "../../components/FileInput/FileInput";
import { Badge } from "../../components/BadgeItem/BadgeItem";
import BadgeList from "../../components/BadgeList/BadgeList";
import Image from "../../components/Image/Image";
import {
  getCoordinatetMultipliers,
  getCoordinatesRelativeImg,
} from "../../utils/common";
import { Size } from "../../types/common";

const StyledRoot = styled.div`
  overflow: hidden;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StyledContainer = styled.div`
  position: relative;
`;

const PageContainer: React.FC = () => {
  const refImg = React.useRef<HTMLImageElement>(null);

  const [file, setFile] = React.useState<File | null>(null);
  const [badges, setBadges] = React.useState<Badge[]>([]);
  const [movedItem, setMovedItem] = React.useState<number | null>(null);
  const [baseSize, setBaseSize] = React.useState<Size>({ height: 0, width: 0 });

  const handleChangeFile = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      event.target?.files && setFile(event.target.files[0]),
    [setFile]
  );

  const handleCreateBadge = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (badges.some((badge) => !badge.text)) {
        setBadges([...badges.filter((badge) => Boolean(badge.text))]);
      } else {
        const { xMultiplier, yMultiplier } = getCoordinatetMultipliers(
          refImg,
          baseSize
        );
        const { x, y } = getCoordinatesRelativeImg(
          event.clientX,
          event.clientY,
          refImg
        );

        setBadges([
          ...badges,
          {
            xBase: x / xMultiplier,
            yBase: y / yMultiplier,
            xCurrent: x,
            yCurrent: y,
            text: "",
          },
        ]);
      }
    },
    [badges, baseSize]
  );

  const handleDeleteItem = React.useCallback(
    (item: number) => () => {
      const newBadges = [...badges];

      newBadges.splice(item, 1);
      setBadges(newBadges);
    },
    [badges]
  );

  const handleBadgeChange = React.useCallback(
    (item: number) => (input: React.ChangeEvent<HTMLInputElement>) => {
      const newBadges = [...badges];

      newBadges[item] = {
        ...newBadges[item],
        text: input.target.value,
      };
      setBadges(newBadges);
    },
    [badges]
  );

  const handleLoadImg = React.useCallback(() => {
    if (refImg.current && (!baseSize.width || !baseSize.height)) {
      setBaseSize({
        width: refImg.current?.naturalWidth,
        height: refImg.current?.naturalHeight,
      });
    }
  }, [baseSize]);

  const transportBage = React.useCallback(
    (event: MouseEvent) => {
      if (movedItem !== null) {
        event.preventDefault();
        const { xMultiplier, yMultiplier } = getCoordinatetMultipliers(
          refImg,
          baseSize
        );
        const { x, y } = getCoordinatesRelativeImg(
          event.clientX,
          event.clientY,
          refImg
        );
        const newBadges = [...badges];

        newBadges[movedItem] = {
          ...newBadges[movedItem],
          xBase: x / xMultiplier,
          yBase: y / yMultiplier,
          xCurrent: x,
          yCurrent: y,
        };
        setBadges(newBadges);
      }
    },
    [movedItem, baseSize, badges]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", transportBage);
    return () => window.removeEventListener("mousemove", transportBage);
  }, [transportBage]);

  const updatePositions = React.useCallback(() => {
    const { xMultiplier, yMultiplier } = getCoordinatetMultipliers(
      refImg,
      baseSize
    );

    setBadges(
      badges.map((badge) => {
        return {
          ...badge,
          xCurrent: badge.xBase * xMultiplier,
          yCurrent: badge.yBase * yMultiplier,
        };
      })
    );
  }, [baseSize, badges, setBadges]);

  React.useEffect(() => {
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  });

  return (
    <StyledRoot>
      {!file ? (
        <FileInput onChange={handleChangeFile} />
      ) : (
        <StyledContainer>
          <Image
            refImg={refImg}
            file={file}
            onLoad={handleLoadImg}
            onCreateBadge={handleCreateBadge}
          />
          <BadgeList
            badges={badges}
            setMovedItem={setMovedItem}
            onDeleteItem={handleDeleteItem}
            onBadgeChange={handleBadgeChange}
          />
        </StyledContainer>
      )}
    </StyledRoot>
  );
};

export default PageContainer;
