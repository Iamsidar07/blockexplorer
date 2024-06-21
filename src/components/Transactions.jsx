import { useState, useEffect } from "react";
import { alchemy } from "../App";
import { PiCube } from "react-icons/pi";
import { formatRelative } from "date-fns";
import { Utils } from "alchemy-sdk";
import { TiDocumentText } from "react-icons/ti";

const Transactions = () => {
  const [txns, setTxns] = useState();

  useEffect(() => {
    async function getLatestTransactions() {
      const block = await alchemy.core.getBlockWithTransactions("latest");
      setTxns(block.transactions.slice(0, 10));
    }

    getLatestTransactions();
  }, []);
  console.log(txns);
  return (
    <div className="col border-end px-0">
      <p className="fw-semibold p-4 mb-0">Latest Transactions</p>
      <div className="w-auto border-bottom mt-"></div>
      {txns?.map((txn, i) => {
        return (
          <div key={txn.hash}>
            <div className="w-auto border-bottom" />
            <div className="d-flex align-items-center justify-content-between p-2">
              <div className="d-flex align-items-center">
                <div className="me-2 p-1" style={{ backgroundColor: "#f8f9fa" }}>
                  <TiDocumentText className="fs-5 " />
                </div>
                <div className="me-4">
                  <a href={`/tx/${txn.hash}`} className="d-block">
                    {txn.hash.slice(0, 12)}...
                  </a>
                  <small className="text-secondary">
                    {formatRelative(
                      new Date(txn.timestamp || 90682),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </small>
                </div>
              </div>
              <div>
                <p className=" mb-0">
                  From
                  <a href={`/address/${txn.from}`} className="ms-2">
                    {txn.from.slice(0, 12)}...{txn.from.slice(-10)}
                  </a>
                </p>
                <p className=" mb-0">
                  To
                  <a href={`/address/${txn.to}`} className="ms-2">
                    {txn.to.slice(0, 12)}...{txn.to.slice(-10)}
                  </a>
                </p>
              </div>
              <small
                className="border rounded-1 px-1 fw-medium"
                style={{ fontSize: "0.8rem" }}
              >
                {Utils.formatEther(txn.value).slice(0, 4)} Eth
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;
