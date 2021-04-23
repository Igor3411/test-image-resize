import React from "react";

import styled from "styled-components";

interface ImageProps {
  refImg: React.RefObject<HTMLImageElement>;
  file: File | null;
  onLoad: () => void;
  onCreateBadge: (event: React.MouseEvent<HTMLElement>) => void;
}

const StyledImg = styled.img`
  position: relative;
  max-width: 100vw;
  max-height: 100vh;
`;

const Image: React.FC<ImageProps> = ({
  refImg,
  file,
  onLoad,
  onCreateBadge,
}) => {
  return (
    <StyledImg
      alt=""
      ref={refImg}
      onLoad={onLoad}
      onClick={onCreateBadge}
      src={file ? URL.createObjectURL(file) : ""}
    />
  );
};

export default React.memo(Image);
