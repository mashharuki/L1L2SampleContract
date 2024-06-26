import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {
  loadDeployedContractAddresses,
  resetContractAddressesJson,
} from "../helper/contractsJsonHelper";

task("verifyContract", "verifyContract")
  .addParam("name", "Contract Name")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    console.log(
      "===================================== [START] ====================================="
    );
    // get Contract Address
    const {
      contracts: {Greeter, Wallet},
    } = loadDeployedContractAddresses(hre.network.name);

    if (taskArgs.name == "Greeter") {
      await hre.run(`verify:verify`, {
        contract: "contracts/Greeter.sol:Greeter",
        address: Greeter,
        constructorArguments: ["0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef"],
      });
    } else if (taskArgs.name == "Wallet") {
      await hre.run(`verify:verify`, {
        contract: "contracts/Wallet.sol:Wallet",
        address: Wallet,
        constructorArguments: ["0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef"],
      });
    }

    console.log(
      "===================================== [END] ====================================="
    );
  });
