import { MouseEventHandler } from "react";
import * as C from "./styles";

type Props = {
  label: string;
  icon?: any;
  onClick: MouseEventHandler<HTMLDivElement>;
};

export const Button = ({ label, icon, onClick }: Props) => {
  return (
    <C.Container onClick={onClick}>
      {icon && (
        <C.IconArea>
          <C.Icon src={icon}></C.Icon>
        </C.IconArea>
      )}
      <C.Label>{label}</C.Label>
    </C.Container>
  );
};
