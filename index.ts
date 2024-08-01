import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import {
  deployERC20Contract,
  deployERC721Contract,
  deployERC1155Contract,
} from "thirdweb/deploys";
import { privateKeyToAccount } from "thirdweb/wallets";
import inquirer from "inquirer";
import ora from "ora"; 

// Define the blockchain network configuration for Rootstock Testnet
const chain = defineChain({
  id: 31,
  name: "Rootstock Testnet",
  shortName: "rootstock",
  nativeCurrency: {
    decimals: 18,
    name: "Rootstock Bitcoin",
    symbol: "tRBTC",
  },
  rpcUrls: {
    default: { http: ["https://public-node.testnet.rsk.co"] },
  },
  blockExplorers: {
    default: {
      name: "RSK Explorer",
      url: "https://explorer.testnet.rsk.co",
    },
  },
  testnet: true,
});

// Access the secrets using process.env
const clientId = process.env.clientId;
const privateKey = process.env.privateKey;

if (!clientId || !privateKey) {
  throw new Error("Missing environment variables");
}

// Create a Thirdweb client instance
const client = createThirdwebClient({ clientId });

// Convert a private key to an account object
const account = privateKeyToAccount({ privateKey, client });

async function main() {
  try {
    // Prompt user to select the contract type
    const { contractType } = await inquirer.prompt([
      {
        type: "list",
        name: "contractType",
        message: "Which type of contract would you like to deploy?",
        choices: ["ERC20", "ERC721", "ERC1155"],
      },
    ]);

    let deploymentParams;

    switch (contractType) {
      case "ERC20":
        deploymentParams = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter the name of the ERC20 token:",
          },
          {
            type: "input",
            name: "symbol",
            message: "Enter the symbol of the ERC20 token:",
          },
          {
            type: "input",
            name: "description",
            message: "Enter a description for the ERC20 token:",
          },
        ]);

        const spinner = ora("Deploying ERC20 contract...").start();
        try {
          const erc20Address = await deployERC20Contract({
            chain,
            client,
            account,
            type: "TokenERC20",
            params: {
              name: deploymentParams.name,
              symbol: deploymentParams.symbol,
              description: deploymentParams.description,
            },
          });

          spinner.succeed(`ERC20 token deployed at address: ${erc20Address}`);
        } catch (error) {
          spinner.fail("Failed to deploy ERC20 contract");
          throw error;
        }
        break;

      case "ERC721":
        deploymentParams = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter the name of the ERC721 token:",
          },
          {
            type: "input",
            name: "symbol",
            message: "Enter the symbol of the ERC721 token:",
          },
          {
            type: "input",
            name: "description",
            message: "Enter a description for the ERC721 token:",
          },
        ]);

        const spinnerERC721 = ora("Deploying ERC721 contract...").start();
        try {
          const erc721Address = await deployERC721Contract({
            chain,
            client,
            account,
            type: "DropERC721",
            params: {
              name: deploymentParams.name,
              symbol: deploymentParams.symbol,
              description: deploymentParams.description,
            },
          });

          spinnerERC721.succeed(
            `ERC721 token deployed at address: ${erc721Address}`,
          );
        } catch (error) {
          spinnerERC721.fail("Failed to deploy ERC721 contract");
          throw error;
        }
        break;

      case "ERC1155":
        deploymentParams = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter the name of the ERC1155 collection:",
          },
          {
            type: "input",
            name: "symbol",
            message: "Enter the symbol of the ERC1155 collection:",
          },
          {
            type: "input",
            name: "description",
            message: "Enter a description for the ERC1155 collection:",
          },
        ]);

        const spinnerERC1155 = ora("Deploying ERC1155 contract...").start();
        try {
          const erc1155Address = await deployERC1155Contract({
            chain,
            client,
            account,
            type: "DropERC1155",
            params: {
              name: deploymentParams.name,
              symbol: deploymentParams.symbol,
              description: deploymentParams.description,
            },
          });

          spinnerERC1155.succeed(
            `ERC1155 token deployed at address: ${erc1155Address}`,
          );
        } catch (error) {
          spinnerERC1155.fail("Failed to deploy ERC1155 contract");
          throw error;
        }
        break;

      default:
        console.log("Invalid contract type selected.");
        break;
    }
  } catch (error) {
    console.error("An error occurred during deployment:", error);
  }
}

main();
