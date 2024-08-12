import ora from "ora";
import inquirer from "inquirer";
import { deployERC721Contract } from "thirdweb/deploys";

type ERC721Questions = {
  name: string;
  symbol: string;
  description: string;
};

// Define the deployERC721 function to accept parameters
export async function deployERC721({
  chain,
  client,
  account,
}: {
  chain: any;
  client: any;
  account: any;
}): Promise<void> {
  const questions: any = [
    { type: "input", name: "name", message: "Enter the name of the ERC721 token:" },
    { type: "input", name: "symbol", message: "Enter the symbol of the ERC721 token:" },
    { type: "input", name: "description", message: "Enter a description for the ERC721 token:" },
  ];

  const answers = await inquirer.prompt<ERC721Questions>(questions);
  const spinner = ora("Deploying ERC721 contract...").start();
  try {
    // Deploy the ERC721 contract
    const erc721Address = await deployERC721Contract({
      chain,
      client,
      account,
      type: "DropERC721",
      params: answers,
    });
    // Indicate success and display the contract address
    spinner.succeed(`ERC721 token deployed at address: ${erc721Address}`);
  } catch (error) {
    // Indicate failure and throw the error
    spinner.fail("Failed to deploy ERC721 contract");
    throw error;
  }
}
