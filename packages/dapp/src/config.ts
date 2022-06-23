
import { Settings } from "luxon";

// Configure the time zone
Settings.defaultZone = 'Etc/GMT0';

export interface NetworkInfo {
  name: string;
  chainId: number;
  address: string;
  blockExplorer: string;
  currency?: string;
}

export interface NetworkWithRpc extends NetworkInfo {
  rpc: string;
};

export interface ApiKeys {
  [name: string]: string;
}

export interface DappConfig {
  mode: string;
  network: NetworkWithRpc;
  apiKeys: ApiKeys;
  dayZero: number;
}

export interface NetworkProviders {
  [chainId: number]: string;
}

if (
  !process.env.REACT_APP_NETWORK_PROVIDER ||
  process.env.REACT_APP_NETWORK_PROVIDER === ''
) {
  throw new Error('REACT_APP_NETWORK_PROVIDER must be provided in the ENV');
}

if (
  !process.env.REACT_APP_NETWORK_ID ||
  process.env.REACT_APP_NETWORK_ID === ''
) {
  throw new Error('REACT_APP_NETWORK_ID must be provided in the ENV');
}

if (
  !process.env.REACT_APP_CONTRACT_ADDRESS ||
  process.env.REACT_APP_CONTRACT_ADDRESS === ''
) {
  throw new Error('REACT_APP_CONTRACT_ADDRESS must be provided in the ENV');
}

if (
  !process.env.REACT_APP_FILE_WEB3STORAGE_KEY ||
  process.env.REACT_APP_FILE_WEB3STORAGE_KEY === ''
) {
  throw new Error('REACT_APP_FILE_WEB3STORAGE_KEY must be provided in the ENV');
}

const allowedNetworks: NetworkInfo[] = [
  {
    name: 'Ropsten Testnet',
    chainId: 3,
    address: '',
    blockExplorer: 'https://ropsten.etherscan.io',
  },
  {
    name: 'Rinkeby Testnet',
    chainId: 4,
    address: "",
    blockExplorer: 'https://rinkeby.etherscan.io',
  },
  {
    name: 'Arbitrum Rinkeby',
    chainId: 421611,
    address: '',
    blockExplorer: 'https://rinkeby-explorer.arbitrum.io',
  },
  {
    name: 'Sokol Testnet (xDai)',
    chainId: 77,
    address: '',
    blockExplorer: 'https://blockscout.com/poa/sokol',
    currency: 'SPOA'
  },
  {
    name: 'Gnosis Chain (xDai)',
    chainId: 100,
    address: '',
    blockExplorer: 'https://blockscout.com/xdai/mainnet',
    currency: 'XDAI'
  },
];

// if in test environment - allow the hardhat test network.
if (process.env.NODE_ENV === 'development') {
  allowedNetworks.push({
    name: 'Local Testnet',
    chainId: 31337,
    address: '',
    blockExplorer: "",
  })
}

const network = allowedNetworks.find(
  n => n.chainId === Number(process.env.REACT_APP_NETWORK_ID)
) as NetworkWithRpc;

if (network === undefined) {
  throw new Error(
    `Network with Id: ${process.env.REACT_APP_NETWORK_ID} is not allowed`
  );
}

network.address = process.env.REACT_APP_CONTRACT_ADDRESS;
network.rpc = process.env.REACT_APP_NETWORK_PROVIDER;

const config: DappConfig = {
  mode: process.env.REACT_APP_MODE || 'development',
  network,
  apiKeys: {
    web3Storage: process.env.REACT_APP_FILE_WEB3STORAGE_KEY
  },
  dayZero: 1645567342,
};

export const getDappMode = (): string => config.mode;

export const getNetwork = (): NetworkWithRpc => config.network;

export const getApiKey = (name: string): string => {
  if (!config.apiKeys[name]) {
    throw new Error(`${name} API key not found`);
  }
  return config.apiKeys[name];
};

export const getDayZero = (): number => config.dayZero;

export default config;
