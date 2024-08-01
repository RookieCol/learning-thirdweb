import { createThirdwebClient } from "thirdweb";
import { arbitrumSepolia } from "thirdweb/chains";
import { deployERC20Contract } from "thirdweb/deploys";
import { privateKeyToAccount } from "thirdweb/wallets";

// Access the secrets using process.env
const clientId = process.env.clientId;
const privateKey = process.env.nmonic;

if (!clientId || !privateKey) {
  throw Error("Missing environment variables");
}

/**
 * Create a Thirdweb client instance.
 * @param {Object} config - The configuration object for creating the client.
 * @param {string} config.clientId - The client ID used for authenticating with Thirdweb.
 * @returns {Object} - The Thirdweb client instance.
 */
const client = createThirdwebClient({
  clientId,
});

/**
 * Converts a private key to an account object.
 * @param {Object} config - The configuration object for the account.
 * @param {string} config.privateKey - The private key to convert into an account.
 * @param {Object} config.client - The Thirdweb client instance.
 * @returns {Object} - The account object containing address and key information.
 */
const account = privateKeyToAccount({
  privateKey,
  client,
});

try {
  /**
   * Deploy an ERC20 contract to a specified blockchain network.
   * @async
   * @param {Object} config - The deployment configuration object.
   * @param {Object} config.chain - The blockchain network where the contract will be deployed.
   * @param {Object} config.client - The Thirdweb client instance.
   * @param {Object} config.account - The account used to deploy the contract.
   * @param {string} config.type - The type of contract to deploy (e.g., "TokenERC20").
   * @param {Object} config.params - The parameters for the contract deployment.
   * @param {string} config.params.name - The name of the ERC20 token.
   * @param {string} config.params.description - The description of the token contract.
   * @param {string} config.params.symbol - The symbol of the ERC20 token.
   * @returns {Promise<string>} - The address of the deployed contract.
   */
  const contractAddress = await deployERC20Contract({
    chain: arbitrumSepolia,
    client,
    account,
    type: "TokenERC20",
    params: {
      name: "MyToken",
      description: "My Token contract",
      symbol: "MT",
    },
  });

  console.log(contractAddress);
} catch (error) {
  console.log(error);
}
