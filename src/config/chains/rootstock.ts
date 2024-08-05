import { defineChain } from "thirdweb/chains";

export const rootstock = defineChain({
  id: 30,
  name: "Rootstock Mainnet",
  shortName: "rootstock",
  nativeCurrency: {
    decimals: 18,
    name: "Rootstock Bitcoin",
    symbol: "RBTC",
  },
  rpcUrls: {
    default: { http: ["https://public-node.rsk.co"] },
  },
  blockExplorers: {
    default: {
      name: "RSK Explorer",
      url: "https://explorer.rsk.co",
    },
  },
  testnet: false,
});
