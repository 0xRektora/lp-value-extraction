import { HardhatRuntimeEnvironment } from "hardhat/types";
import sendWeb3Req from '../helpers/sendWeb3Req'
import fs from "fs"


/**
 * Get the # of LP in a jar vault by user
 */
export const getErc20Holders = async (taskArgs: { address: string, name: string, contractCreation: number, blockStart: number, blockEnd: number }, hre: HardhatRuntimeEnvironment) => {
    const jar = await hre.ethers.getContractAt('IJar', taskArgs.address)

    const filter = jar.filters.Deposit()
    const logs = await sendWeb3Req(async () => jar.queryFilter(filter, taskArgs.contractCreation, taskArgs.blockEnd))

    const users = logs.map(e => e.args._from)

    const balances: { [k: string]: any } = {};

    const blocks =
        [...(Array((taskArgs.blockEnd + 1) - taskArgs.blockStart))]
            .map((_, i) => taskArgs.blockStart + i)

    for (const block of blocks) {
        for (const user of users) {
            if (!balances[user]) {
                console.log(`users: ${user}`);

                const jarRatio = hre.ethers.utils.formatUnits((await sendWeb3Req(async () => jar.getRatio())), 'ether')
                const shares = hre.ethers.utils
                    .formatUnits((await sendWeb3Req(async () => jar.balanceOf(user, { blockTag: block }))), "ether")
                const lp = Number(jarRatio) * Number(shares)

                if (lp !== 0) {
                    balances[user] = {
                        block,
                        lp
                    }
                }
            }
        }
    }

    let data = {}
    try {
        data = JSON.parse(fs.readFileSync("data.json").toString())
    } catch (err) { }
    fs.writeFileSync("data.json", JSON.stringify({
        ...data,
        [taskArgs.name]: {
            "vaultAddress": taskArgs.address,
            "vaultUsers": Object.keys(balances).map(user => ({ ...balances[user], user }))
        }
    }, null, 2))
}