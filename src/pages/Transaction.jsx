import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "../App";

const Transactions = () => {
  const [tx, setTx] = useState({});
  const { txHash } = useParams();
  useEffect(() => {
    async function getTransaction() {
      setTx(await alchemy.core.getTransactionReceipt(txHash));
    }
    getTransaction();
  }, [txHash]);
  console.log("tx", tx);
  return <div>{JSON.stringify(tx)}</div>;
};

export default Transactions;
