import dotenv from "dotenv";
dotenv.config();
// const { ethers, JsonRpcProvider } = require("ethers");
import { ethers, JsonRpcProvider } from "ethers";
// const fs = require("fs");
import fs from "fs";
//private key comes from meta mask, when you deploy to test net
const { ETHEREUM_NODE_URL, WALLET_PRIVATE_KEY } = process.env;

const main = async () => {
    const provider = new JsonRpcProvider(ETHEREUM_NODE_URL);
    const wallet = new ethers.Wallet(String(WALLET_PRIVATE_KEY), provider);
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpeStorage.abi", "utf8");
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpeStorage.bin",
        "utf8"
    );

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

    //everytime you write the the block chain, always wait for a block
    const deployContract: any = await contractFactory.deploy();
    console.log("Deploying...");
    console.log(await deployContract.getAddress());

    const deployContractReceipt = await deployContract
        .deploymentTransaction()
        .wait(1);
    console.log("Deploy complete");

    //interracting with smartcontract using codes
    const getFavouriteeNumber = await deployContract.getter();
    console.log(getFavouriteeNumber.toString());

    //store favouriteNumber
    //since i'm updating state, i will have to wait for a block aka, wait for receipt
    const storeFavouriteNumber = await deployContract.store(27);
    const storeFavouriteNumberReceipt = await storeFavouriteNumber.wait(1);

    const updatedFavouriteNumber = await deployContract.getter();
    console.log(updatedFavouriteNumber);
};

main()
    .then((res) => {
        // console.log(res);
        process.exit(0);
    })
    .catch((err) => {
        console.log(err);
    });
