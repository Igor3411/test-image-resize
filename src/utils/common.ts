import React from "react";

import { Multipliers, Coordinates, Size } from "../types/common";

const ADDITIONAL_OFFSET = 10; // доп. смещение для плавного перемещения с учетом размеров инпута
const INPUT_HEIGHT = 24;

export const getCoordinatetMultipliers = (
  ref: React.RefObject<HTMLImageElement>,
  baseSize: Size
): Multipliers => {
  if (ref.current) {
    const { width, height } = ref.current?.getBoundingClientRect();

    return {
      xMultiplier: width / baseSize.width,
      yMultiplier: height / baseSize.height,
    };
  }

  return {
    xMultiplier: 0,
    yMultiplier: 0,
  };
};

export const checkCoordinate = (coordinate: number, size: number) => {
  if (coordinate < 0) {
    return 0;
  }
  if (coordinate > size) {
    return size;
  }

  return coordinate;
};

export const getCoordinatesRelativeImg = (
  clientX: number,
  clientY: number,
  refImg: React.RefObject<HTMLImageElement>
): Coordinates => {
  if (refImg.current) {
    const { left, top, height, width } = refImg.current.getBoundingClientRect();

    let x = clientX - left - ADDITIONAL_OFFSET;
    let y = clientY - top - ADDITIONAL_OFFSET;
    x = checkCoordinate(x, width);
    y = checkCoordinate(y, height - INPUT_HEIGHT);

    return { x, y };
  }
  return { x: 0, y: 0 };
};
