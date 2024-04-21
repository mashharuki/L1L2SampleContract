import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {
  loadDeployedContractAddresses,
  resetContractAddressesJson,
} from "../helper/contractsJsonHelper";

task("sendMessage", "sendMessege from L1 to L2 or from L2 to L1")
  .addParam("message", "message data")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    console.log(
      "===================================== [START] ====================================="
    );
    // get Contract Address
    const {
      contracts: {Greeter},
    } = loadDeployedContractAddresses(hre.network.name);

    // create Greeter contract
    const greeter = await hre.ethers.getContractAt("Greeter", Greeter);

    try {
      // send message
      const tx = await greeter.send(taskArgs.message);
      console.log({tx});
    } catch (err: any) {
      console.error("err:", err);
    } finally {
      console.log(
        "===================================== [END] ====================================="
      );
    }
  });
