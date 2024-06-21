import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import "./main.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { PiCube } from "react-icons/pi";
import { formatRelative } from "date-fns";
import Blocks from "./components/Blocks.jsx"
import Transactions from "./components/Transactions.jsx"

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

function App() {

  return (
    <div className="container py-4 px-3 mx-auto">
      <div className="row border rounded-2">
        <Blocks/>
        <Transactions/>
      </div>
    </div>
  );
}

export default App;
