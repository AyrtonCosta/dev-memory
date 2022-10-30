import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button";
import { InfoItem } from "./components/infoItem";
import "./global.css";
import { items } from "./data/items";
import { useEffect, useState } from "react";
import { GridItemsType } from "./types/GridItemType";
import { GridItem } from "./components/GridItem";
import { FormatTimeElapsed } from "./helpers/formatTimeElapsed";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemsType[]>([]);

  useEffect(() => {
    resetAndCreateGrid();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true);

      if (opened[0].item === opened[1].item) {
        let tmpGrid = [...gridItems];
        for (let i in tmpGrid) {
          if (tmpGrid[i].shown) {
            tmpGrid[i].permanentShow = true;
            tmpGrid[i].shown = false;
          }
        }
        setGridItems(tmpGrid);
        setShowCount(0);
      } else {
        setTimeout(() => {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            tmpGrid[i].shown = false;
          }
          setGridItems(tmpGrid);
          setShowCount(0);
        }, 1000);
      }

      setMoveCount((moveCount) => moveCount + 1);
    }
  }, [showCount, gridItems]);

  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanentShow === true)
    ) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    //passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    //passo 2 - criar o grid e commeçar o jogo
    //2.1 - criar um grid vazio
    let tmpGrid: GridItemsType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShow: false,
      });
    }
    //2.2 - preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }

    //2.3 - jogar no state
    setGridItems(tmpGrid);

    //passo 3 - começar jogo
    setPlaying(true);
  };

  const handleClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems];

      if (
        tmpGrid[index].permanentShow === false &&
        tmpGrid[index].shown === false
      ) {
        tmpGrid[index].shown = true;
        setShowCount(showCount + 1);
      }
      setGridItems(tmpGrid);
    }
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} alt="logo" width={200} />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value={FormatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>

        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
