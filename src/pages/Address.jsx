import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "../App";
import { Utils } from "alchemy-sdk";

const Address = () => {
  const [balance, setBalance] = useState();
  const [txns, setTxns] = useState();
  const { address } = useParams();
  useEffect(() => {
    async function getBalance() {
      const balanceInWei = await alchemy.core.getBalance(address);
      setBalance(Utils.formatEther(balanceInWei));
    }
    getBalance();
  }, [address]);
  useEffect(() => {
    async function getLogs() {
      const data = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: address,
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
      });
      console.log(data);
    }
    getLogs();
  }, [address]);

  return (
    <div>
      Address: {address}
      balance:{balance} eth
      {txns?.slice(0, 2).map((tx) => {
        return Object.entries(tx).map(([key, value]) => (
          <p key={key}>
            {key}:{JSON.stringify(value)}
          </p>
        ));
      })}
    </div>
  );
};

export default Address;
