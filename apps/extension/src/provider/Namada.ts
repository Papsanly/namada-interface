import { Namada as INamada, Chain, DerivedAccount } from "@namada/types";
import { Ports, MessageRequester } from "router";

import {
  ApproveTransferMsg,
  ConnectInterfaceMsg,
  GetChainMsg,
  GetChainsMsg,
  SuggestChainMsg,
  EncodeInitAccountMsg,
  QueryAccountsMsg,
  FetchAndStoreMaspParamsMsg,
  HasMaspParamsMsg,
  QueryBalancesMsg,
  SubmitBondMsg,
  SubmitUnbondMsg,
  SubmitIbcTransferMsg,
} from "./messages";

export class Namada implements INamada {
  constructor(
    private readonly _version: string,
    protected readonly requester?: MessageRequester
  ) {}

  public async connect(chainId: string): Promise<void> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new ConnectInterfaceMsg(chainId)
    );
  }

  public async chain(chainId: string): Promise<Chain | undefined> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new GetChainMsg(chainId)
    );
  }

  public async chains(): Promise<Chain[] | undefined> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new GetChainsMsg()
    );
  }

  public async accounts(
    chainId: string
  ): Promise<DerivedAccount[] | undefined> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new QueryAccountsMsg(chainId)
    );
  }

  public async fetchAndStoreMaspParams(): Promise<void> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new FetchAndStoreMaspParamsMsg()
    );
  }

  public async hasMaspParams(): Promise<boolean | undefined> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new HasMaspParamsMsg()
    );
  }

  public async balances(
    owner: string
  ): Promise<{ token: string; amount: string }[] | undefined> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new QueryBalancesMsg(owner)
    );
  }

  public async suggestChain(chain: Chain): Promise<void> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new SuggestChainMsg(chain)
    );
  }

  public async submitBond(txMsg: string): Promise<void> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new SubmitBondMsg(txMsg)
    );
  }

  public async submitUnbond(txMsg: string): Promise<void> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new SubmitUnbondMsg(txMsg)
    );
  }

  public async submitTransfer(txMsg: string): Promise<void> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new ApproveTransferMsg(txMsg)
    );
  }

  public async submitIbcTransfer(txMsg: string): Promise<void> {
    return await this.requester?.sendMessage(
      Ports.Background,
      new SubmitIbcTransferMsg(txMsg)
    );
  }

  public async encodeInitAccount(props: {
    txMsg: string;
    address: string;
  }): Promise<string | undefined> {
    const { txMsg, address } = props;
    return await this.requester?.sendMessage(
      Ports.Background,
      new EncodeInitAccountMsg(txMsg, address)
    );
  }

  public version(): string {
    return this._version;
  }
}