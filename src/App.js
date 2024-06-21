import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import "./main.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { PiCube } from "react-icons/pi";
import { formatRelative } from "date-fns";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
export const alchemy = new Alchemy(settings);

function App() {
  const [blocks, setBlocks] = useState([]);
  const [txns, setTxns] = useState([]);
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlocks() {
      const block = await alchemy.core.getBlockWithTransactions("latest");
      setTxns(block.transactions.slice(0, 10));
      setBlockNumber(block.number);
    }

    getBlocks();
  }, []);

  useEffect(() => {
    async function getLatestBlocks() {
      if (!blockNumber) return;
      const arr = [];
      for (let i = blockNumber; i > blockNumber - 5; i--) {
        arr.push(await alchemy.core.getBlock(i));
      }
      setBlocks(arr);
    }
    getLatestBlocks();
  }, [blockNumber]);

  return (
    <div className="container py-4 px-3 mx-auto">
      <div className="row border rounded-2">
        <div className="col border-end px-0">
          <p className="fw-semibold p-4 mb-0">Latest Blocks</p>
          <div className="w-auto border-bottom mt-"></div>
          {blocks?.map((block, i) => {
            const blockReward =
              (parseInt(block.baseFeePerGas._hex) *
                parseInt(block.gasUsed._hex)) /
              10 ** 18;

            return (
              <div
                key={block.hash}
                className="d-flex align-items-center justify-content-between p-2"
              >
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <PiCube className="fs-3 " />
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
                      {block.miner.slice(0, 7)}...
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
            );
          })}
        </div>
        <div className="col p-2">
          <p className="fw-semibold">Latest Transactions</p>
        </div>
      </div>
    </div>
  );
}

export default App;
