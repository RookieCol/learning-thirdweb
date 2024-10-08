import ora from "ora";
import inquirer from "inquirer";
import { deployERC20Contract } from "thirdweb/deploys";

type ERC20Questions = {
  type: string;
  name: string;
  message: string;
};

// Define the deployERC20 function to accept parameters
export async function deployERC20({ chain, client, account }: { chain: any; client: any; account: any }): Promise<void> {
  const questions: any  = [
    { type: "input", name: "name", message: "Enter the name of the ERC20 token:" },
    { type: "input", name: "symbol", message: "Enter the symbol of the ERC20 token:" },
    { type: "input", name: "description", message: "Enter a description for the ERC20 token:" },
  ];

  const answers = await inquirer.prompt<ERC20Questions>(questions);
  const spinner = ora("Deploying ERC20 contract...").start();
  try {
    // Deploy the ERC20 contract
    const erc20Address = await deployERC20Contract({
      chain,
      client,
      account,
      type: "TokenERC20",
      params: answers,
    });
    // Indicate success and display the contract address
    spinner.succeed(`ERC20 token deployed at address: ${erc20Address}`);
  } catch (error) {
    // Indicate failure and throw the error
    spinner.fail("Failed to deploy ERC20 contract");
    throw error;
  }
}