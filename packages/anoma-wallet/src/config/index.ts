import ChainConfig from "./chain";

export { default as RPCConfig, type Network } from "./rpc";
export { type Protocol } from "./chain";

const Config = {
  chain: ChainConfig,
};

export default Config;
