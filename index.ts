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

const client = createThirdwebClient({
  clientId,
});

const account = privateKeyToAccount({
  privateKey,
  client,
});

try {
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
