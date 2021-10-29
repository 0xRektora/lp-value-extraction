import hre from "hardhat"
import fs from 'fs'

const _USDC_m = "0x748134b5F553F2bcBD78c6826De99a70274bDEb3"
const _FINN = "0x9A92B5EBf1F6F6f7d93696FCD44e5Cf75035A756"
const _FINN_USDC = "0xb04492345b0618acFf27AC27CeC4244fBdd30208"

const getFinnPrice = async () => {
    const usdc_m = await hre.ethers.getContractAt('IERC20', _USDC_m)
    const finn = await hre.ethers.getContractAt('IERC20', _FINN)

    const finnBalance = hre.ethers.utils.formatUnits(await finn.balanceOf(_FINN_USDC), 'ether')
    const finnUsdcBalance = hre.ethers.utils.formatUnits(await usdc_m.balanceOf(_FINN_USDC), 'ether')


    return 1 / (Number(finnBalance) / (Number(finnUsdcBalance) * 10 ** 12))


}

const getLpPrice = async (jarAddr: string, finnPrice: number) => {
    const jar = await hre.ethers.getContractAt('IJar', jarAddr)
    const lp = await hre.ethers.getContractAt('IERC20', await jar.token())

    const finn = await hre.ethers.getContractAt('IERC20', _FINN)

    const numberOfFinnInLp = await finn.balanceOf(lp.address)
    const totalSupply = await lp.totalSupply()

    return (numberOfFinnInLp.div(totalSupply)).toNumber() * finnPrice * 2
}

async function main() {
    const finnPrice = await getFinnPrice()

    let data: {
        [lp: string]: {
            vaultAddress: string,
            vaultUsers: { block: number, lp: number, user: string }[]
        }
    } = {}
    try {
        data = JSON.parse(fs.readFileSync("data.json").toString())
    } catch (err) {
        console.log("A data.json file needs to be generated");
        return;
    }

    const lpNames = Object.keys(data)

    const populatedPricesData = data
    for (const lpName of lpNames) {
        const jarInfo = populatedPricesData[lpName]

        const jarAddr = jarInfo.vaultAddress
        const vaultUsers = jarInfo.vaultUsers
        const lpPrice = await getLpPrice(jarAddr, finnPrice)

        console.log(`${lpName} : ${lpPrice}`);

        populatedPricesData[lpName].vaultUsers = vaultUsers.map(user => ({
            ...user,
            lpValue: user.lp * Number(lpPrice)
        }))
    }

    fs.writeFileSync("data.json", JSON.stringify(populatedPricesData, null, 2))

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });