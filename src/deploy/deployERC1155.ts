import ora from "ora";
import inquirer from "inquirer";
import { deployERC1155Contract } from "thirdweb/deploys";

type ERC1155Questions = {
  name: string;
  symbol: string;
  description: string;
};

export async function deployERC1155({
  chain,
  client,
  account,
}: {
  chain: any;
  client: any;
  account: any;
}): Promise<void> {
  const questions: any = [
    { type: "input", name: "name", message: "Enter the name of the ERC1155 collection:" },
    { type: "input", name: "symbol", message: "Enter the symbol of the ERC1155 collection:" },
    { type: "input", name: "description", message: "Enter a description for the ERC1155 collection:" },
  ];

  const answers = await inquirer.prompt<ERC1155Questions>(questions);
  const spinner = ora("Deploying ERC1155 contract...").start();
  try {
    const erc1155Address = await deployERC1155Contract({
      chain,
      client,
      account,
      type: "DropERC1155",
      params: answers,
    });
    spinner.succeed(`ERC1155 token deployed at address: ${erc1155Address}`);
  } catch (error) {
    spinner.fail("Failed to deploy ERC1155 contract");
    throw error;
  }
}
