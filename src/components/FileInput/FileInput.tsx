import React from "react";

import styled from "styled-components";

interface FileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input`
  display: none;
`;

const StyledButton = styled.div`
  width: 100%;
  max-width: 310px;
  height: 60px;
  background: #1bbc9b;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 auto;
  border: none;
`;

export const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  return (
    <label>
      <StyledInput
        onChange={onChange}
        type="file"
        name="image"
        accept="image/*"
      />
      <StyledButton>Выберите файл</StyledButton>
    </label>
  );
};
