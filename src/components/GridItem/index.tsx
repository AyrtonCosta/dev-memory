import { GridItemsType } from "../../types/GridItemType";
import * as C from "./style";
import b7Svg from "../../svgs/b7.svg";
import { items } from "../../data/items";

type Props = {
  item: GridItemsType;
  onClick: () => void;
};

export const GridItem = ({ item, onClick }: Props) => {
  return (
    <C.Container
      showBackground={item.permanentShow || item.shown}
      onClick={onClick}
    >
      {item.permanentShow === false && item.shown === false && (
        <C.Icon src={b7Svg} opacity={0.1} />
      )}
      {(item.permanentShow || item.shown) && item.item !== null && (
        <C.Icon src={items[item.item].icon} alt="" />
      )}
    </C.Container>
  );
};
