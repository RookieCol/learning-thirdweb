import { createThirdwebClient } from "thirdweb";
import { privateKeyToAccount } from "thirdweb/wallets";

export function createClient() {
  const clientId = process.env.clientId;
  const privateKey = process.env.privateKey;

  if (!clientId || !privateKey) {
    throw new Error("Missing environment variables");
  }

  const client = createThirdwebClient({ clientId });
  const account = privateKeyToAccount({ privateKey, client });

  return { client, account };
}
