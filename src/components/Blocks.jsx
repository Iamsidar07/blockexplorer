import { formatRelative } from "date-fns";
import { useEffect, useState } from "react";
import { PiCube } from "react-icons/pi";
import { alchemy } from "../App";

const Blocks = () => {
  const [blocks, setBlocks] = useState();

  useEffect(() => {
    async function getLatestBlocks() {
      const blockNumber = await alchemy.core.getBlockNumber();
      const arr = [];
      for (let i = blockNumber; i > blockNumber - 10; i--) {
        arr.push(await alchemy.core.getBlock(i));
      }
      setBlocks(arr);
    }
    getLatestBlocks();
  }, []);

  return (
    <div className="col border-end px-0">
      <p className="fw-semibold p-4 mb-0">Latest Blocks</p>
      {blocks?.map((block, i) => {
        const blockReward =
          (parseInt(block.baseFeePerGas._hex) * parseInt(block.gasUsed._hex)) /
          10 ** 18;

        return (
          <div key={block.hash}>
            <div className="w-auto border-bottom" />
            <div className="d-flex align-items-center justify-content-between p-2">
              <div className="d-flex align-items-center">
                <div
                  className="me-2 p-1"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <PiCube className="fs-5" />
                </div>
                <div className="me-4">
                  <a href={`/block/${block.number}`} className="d-block">
                    {block.number}
                  </a>
                  <small className="text-secondary">
                    {formatRelative(new Date(block.timestamp), new Date(), {
                      addSuffix: true,
                    })}
                  </small>
                </div>
              </div>
              <div>
                <p className=" mb-0">
                  Fee Receipt
                  <a href={`/address/${block.miner}`} className="ms-2">
                    {block.miner.slice(0, 12)}...
                  </a>
                </p>
                <p className="lh-sm mb-0">
                  <a href="/block/transactions">
                    {block.transactions.length} txns
                  </a>
                  <small className="text-secondary ms-2">in </small>
                </p>
              </div>
              <small
                className="border rounded-1 px-1 fw-medium"
                style={{ fontSize: "0.8rem" }}
              >
                {blockReward.toFixed(4)} Eth
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Blocks;
