# Description

Get LPs by users on certain block number for a given jar

# Configuration and installation

Create an `.env` file. An example can be found in `.env.example`

```
MAINNET=
PRIVATE_KEY=
```

Install dependencies

```
yarn
```

If you don't have `npx`

```
yarn global add npx
```

# Usage

By default it'll fork the mainnet and execute locally.
To run on a mainnet, just add `--network mainnet` at the end of the command.

Example with USDC-FINN on MOVR

```
npx hardhat getErc20Holders --address 0x98ec2A4afEe2578eF95421D6Ff699A247304D1F3 --contract-creation 769533 --block-start 808053 --block-end 808056 --network mainnet
```
