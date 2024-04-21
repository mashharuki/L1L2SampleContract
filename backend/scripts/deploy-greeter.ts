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

  const greeter = await ethers.deployContract("Greeter", [remote_greeter]);

  await greeter.waitForDeployment();

  console.log(`Contract deployed to ${greeter.target}`);

  await run(`verify:verify`, {
    contract: "contracts/Greeter.sol:Greeter",
    address: greeter.target! as any,
    constructorArguments: [remote_greeter],
  });

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "Greeter",
    value: greeter.target! as any,
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
