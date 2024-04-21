import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";

task("sendEth", "sendEth from L1 to L2 or from L2 to L1")
  .addParam("target", "send target")
  .addParam("amount", "send amount")
  .setAction(async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    console.log(
      "===================================== [START] ====================================="
    );
    // get Contract Address
    const {
      contracts: {Wallet},
    } = loadDeployedContractAddresses(hre.network.name);

    // create Wallet contract
    const wallet = await hre.ethers.getContractAt("Wallet", Wallet);

    try {
      // send message
      const tx = await wallet.send(taskArgs.target, {
        value: hre.ethers.parseEther(taskArgs.amount),
      });
      console.log({tx});
    } catch (err: any) {
      console.error("err:", err);
    } finally {
      console.log(
        "===================================== [END] ====================================="
      );
    }
  });
