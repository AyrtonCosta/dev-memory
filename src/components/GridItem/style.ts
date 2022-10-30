import styled from "styled-components";

type ContainerProps = {
  showBackground: boolean;
};

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) =>
    props.showBackground ? "#1550ff" : "#e2e3e3"};
  height: 6.25rem;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

type IconProps = {
  opacity?: number;
};

export const Icon = styled.img<IconProps>`
  width: 2.5rem;
  height: 2.5rem;
  opacity: ${(props) => props.opacity ?? 1};
`;
