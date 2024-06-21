import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "../App";

const Block = () => {
  const [block, setBlock] = useState({});
  const { blockNumber } = useParams();
  useEffect(() => {
    async function getBlock() {
      if (!blockNumber) return;
      setBlock(await alchemy.core.getBlock(Number(blockNumber)));
    }
    getBlock();
  }, [blockNumber]);
  return <div>{JSON.stringify(block)}</div>;
};

export default Block;
