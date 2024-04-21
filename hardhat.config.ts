import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import fs from "fs";
import "hardhat-gas-reporter";
import path from "path";

dotenv.config();

const {
  PRIVATE_KEY,
  OPTIMISMSCAN_API_KEY,
  ETHERSCAN_API_KEY,
  INFURA_SEPOLIA_RPC_URL,
  INFURA_OPTIMISM_SEPOLIA_RPC_URL,
  GAS_REPORT,
  COINMARKETCAP_API_KEY,
} = process.env;

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
if (!SKIP_LOAD) {
  const taskPaths = [""];
  taskPaths.forEach((folder) => {
    const tasksPath = path.join(__dirname, "tasks", folder);
    fs.readdirSync(tasksPath)
      .filter((_path) => _path.includes(".ts"))
      .forEach((task) => {
        require(`${tasksPath}/${task}`);
      });
  });
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: INFURA_SEPOLIA_RPC_URL,
      accounts: [`${PRIVATE_KEY}`],
      chainId: 11155111,
    },
    optimismSepolia: {
      url: INFURA_OPTIMISM_SEPOLIA_RPC_URL,
      accounts: [`${PRIVATE_KEY}`],
      chainId: 11155420,
    },
  },
  etherscan: {
    apiKey: {
      optimismSepolia: OPTIMISMSCAN_API_KEY!,
      sepolia: ETHERSCAN_API_KEY!,
    },
    customChains: [
      {
        network: "optimismSepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io/",
        },
      },
    ],
  },
  gasReporter: {
    enabled: GAS_REPORT ? true : false,
    currency: "JPY",
    gasPrice: 20,
    token: "ETH",
    coinmarketcap: COINMARKETCAP_API_KEY,
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
  },
};

export default config;
