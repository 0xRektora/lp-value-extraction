import "@nomiclabs/hardhat-ethers"
import { task } from "hardhat/config";

import { string, int } from "hardhat/internal/core/params/argumentTypes";
import { getErc20Holders } from "./tasks/getErc20Holders";


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

task("getErc20Holders",)
    .addParam("address", "Jar vault address", undefined, string)
    .addParam("name", "Jar vault name", undefined, string)
    .addParam("contractCreation", "The block number of the contract creation", undefined, int)
    .addParam("blockStart", "The block to start from", undefined, int)
    .addParam("blockEnd", "The block to end to", undefined, int)
    .setAction(getErc20Holders)

