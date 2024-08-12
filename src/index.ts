import inquirer from "inquirer";
import { chains, createClient } from "./config"; 
import { deployERC20,deployERC1155,deployERC721 } from "./deploy";


type ChainKey = keyof typeof chains;

async function main() {
  try {
    // Define the chain selection question
    const chainQuestion: any[] = [
      {
        type: "list",
        name: "chainSelection",
        message: "Select the blockchain network:",
        choices: Object.keys(chains).map((key) => ({
          name: key,
          value: key,
        })),
      },
    ];

    const { chainSelection } = await inquirer.prompt<any>(chainQuestion);
    const selectedChainKey = chainSelection as ChainKey;
    const chain = chains[selectedChainKey];
    const { client, account } = createClient();

    const contractQuestion: any[] = [
      {
        type: "list",
        name: "contractType",
        message: "Which type of contract would you like to deploy?",
        choices: [
          { name: "ERC20", value: "ERC20" },
          { name: "ERC721", value: "ERC721" },
          { name: "ERC1155", value: "ERC1155" },
        ],
      },
    ];

    const { contractType } = await inquirer.prompt<any>(contractQuestion);

    switch (contractType) {
      case "ERC20":
        await deployERC20({ client, account, chain });
        break;
        case "ERC721":
          await deployERC721({ client, account, chain });
          break;
          case "ERC1155":
        await deployERC1155({ client, account, chain });
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
