import {ethers, network, run} from "hardhat";
import {writeContractAddress} from "../helper/contractsJsonHelper";

async function main() {
  console.log(
    "===================================== [START] ====================================="
  );

  let remote_greeter;

  if (network.name == "sepolia") {
    remote_greeter = "0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef";
  } else if (network.name == "optimismSepolia") {
    remote_greeter = "0x4200000000000000000000000000000000000007";
  }

  const wallet = await ethers.deployContract("Wallet", [remote_greeter]);

  await wallet.waitForDeployment();

  console.log(`Contract deployed to ${wallet.target}`);

  await run(`verify:verify`, {
    contract: "contracts/Wallet.sol:Wallet",
    address: wallet.target! as any,
    constructorArguments: [remote_greeter],
  });

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "Wallet",
    value: wallet.target! as any,
    network: network.name,
  });

  console.log(
    "===================================== [END] ====================================="
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
