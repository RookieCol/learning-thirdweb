import inquirer from "inquirer";
import { chains } from "./config"; // Assuming ChainOptions is exported from config
import { createClient } from "./config";
import { deployERC20 } from "./deploy/deployERC20";
//import { deployERC20 } from "./deploy";

// Define a type for the keys of chains
type ChainKey = keyof typeof chains;

async function main() {
  try {
    // Prompt the user to select a blockchain network
    const { chainSelection } = await inquirer.prompt([
      {
        type: "list",
        name: "chainSelection",
        message: "Select the blockchain network:",
        choices: Object.keys(chains), // Ensure choices match keys of chains
      },
    ]);

    // Assert that chainSelection is a valid key of chains
    const selectedChainKey = chainSelection as ChainKey;
    const chain = chains[selectedChainKey];

    // Create client and account
    const { client, account } = createClient();

    // Prompt the user to select a contract type
    const { contractType } = await inquirer.prompt([
      {
        type: "list",
        name: "contractType",
        message: "Which type of contract would you like to deploy?",
        choices: ["ERC20", "ERC721", "ERC1155"],
      },
    ]);

    // Deploy the selected contract type
    switch (contractType) {
      case "ERC20":
        await deployERC20({ client, account, chain });
        break;
      /* case "ERC721":
        await deployERC721({ chain, client, account });
        break;
      case "ERC1155":
        await deployERC1155({ chain, client, account });
        break; */
      default:
        console.log("Invalid contract type selected.");
        break;
    }
  } catch (error) {
    console.error("An error occurred during deployment:", error);
  }
}

main();
