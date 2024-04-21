const optimism = require("@eth-optimism/sdk");
const ethers = require("ethers");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const L2_TX = process.env.L2_TX;

const L1_RPC = process.env.INFURA_SEPOLIA_RPC_URL;
const L2_RPC = process.env.INFURA_OPTIMISM_SEPOLIA_RPC_URL;

// 11155111 for Sepolia, 1 for Ethereum
const L1_CHAIN_ID = 11155111;
// 11155420 for OP Sepolia, 10 for OP Mainnet
const L2_CHAIN_ID = 11155420;

const WAIT_TIME = 60;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

/**
 * L2でのトランザクションをL1に反映させるためのスクリプト
 */
async function main() {
  // Create RPC providers and wallet
  const l1_provider = new ethers.providers.StaticJsonRpcProvider(L1_RPC);
  const l2_provider = new ethers.providers.StaticJsonRpcProvider(L2_RPC);
  // L1とL2用のsignerインスタンスを生成
  const l1_wallet = new ethers.Wallet(PRIVATE_KEY, l1_provider);
  const l2_wallet = new ethers.Wallet(PRIVATE_KEY, l2_provider);

  // Create CrossChainMessenger instance
  const messenger = new optimism.CrossChainMessenger({
    l1ChainId: L1_CHAIN_ID,
    l2ChainId: L2_CHAIN_ID,
    l1SignerOrProvider: l1_wallet,
    l2SignerOrProvider: l2_wallet,
  });

  // Wait until message is ready to prove
  console.log("Wait for message status...");
  // waitForMessageStatusメソッドを呼び出す
  await messenger.waitForMessageStatus(
    L2_TX,
    optimism.MessageStatus.READY_TO_PROVE
  );

  // Prove the message on L1
  console.log("Prove message on L1...");
  // proveMessage メソッドを呼び出す
  await messenger.proveMessage(L2_TX);

  // Wait until the message is ready for relay
  // NOTE:
  // This can only happen after the fault proof period has elapsed.
  // On OP Sepolia, this is only a few seconds.
  // On OP Mainnet, this takes 7 days.
  console.log("Wait for message status...");
  await messenger.waitForMessageStatus(
    L2_TX,
    optimism.MessageStatus.READY_FOR_RELAY
  );

  console.log(`Sleep ${WAIT_TIME} seconds`);
  await sleep(WAIT_TIME * 1000);

  // Relay the message on L1
  console.log("Finalize...");
  // Transactionをfinalizeする
  await messenger.finalizeMessage(L2_TX);

  // Wait until the message is relayed
  console.log("Wait for message status...");
  await messenger.waitForMessageStatus(L2_TX, optimism.MessageStatus.RELAYED);
}

main();
