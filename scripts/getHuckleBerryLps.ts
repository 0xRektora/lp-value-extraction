import hre from "hardhat"

async function main() {
    await hre.run("getErc20Holders", {
        address: "0x98ec2A4afEe2578eF95421D6Ff699A247304D1F3",
        name: "USDC.m-FINN",
        contractCreation: 769533,
        blockStart: 808053,
        blockEnd: 808056,
        network: "mainnet"
    })
    await hre.run("getErc20Holders", {
        address: "0x39109Dd55Ed30fAd5aF63C8C79Bb5A8BB65e94C1",
        name: "MOVR-FINN",
        contractCreation: 769533,
        blockStart: 808053,
        blockEnd: 808056,
        network: "mainnet"
    })
    await hre.run("getErc20Holders", {
        address: "0xB1d3857e4435199cD6Bae09F6eCa346355BDbE12",
        name: "DOT-FINN",
        contractCreation: 769533,
        blockStart: 808053,
        blockEnd: 808056,
        network: "mainnet"
    })
    await hre.run("getErc20Holders", {
        address: "0x33D33ac00877012943f850026E0aa2D6a0A3a629",
        name: "XRP-FINN",
        contractCreation: 769533,
        blockStart: 808053,
        blockEnd: 808056,
        network: "mainnet"
    })
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });