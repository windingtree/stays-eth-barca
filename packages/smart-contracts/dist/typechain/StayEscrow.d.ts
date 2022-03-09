import { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface StayEscrowInterface extends utils.Interface {
    contractName: "StayEscrow";
    functions: {
        "deposit(address,bytes32)": FunctionFragment;
        "depositsOf(address,bytes32)": FunctionFragment;
        "depositsState(address,bytes32)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "deposit", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "depositsOf", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "depositsState", values: [string, BytesLike]): string;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositsOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositsState", data: BytesLike): Result;
    events: {
        "Deposited(address,uint256,bytes32)": EventFragment;
        "Withdrawn(address,uint256,bytes32)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Deposited"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}
export declare type DepositedEvent = TypedEvent<[
    string,
    BigNumber,
    string
], {
    payee: string;
    weiAmount: BigNumber;
    spaceId: string;
}>;
export declare type DepositedEventFilter = TypedEventFilter<DepositedEvent>;
export declare type WithdrawnEvent = TypedEvent<[
    string,
    BigNumber,
    string
], {
    payee: string;
    weiAmount: BigNumber;
    spaceId: string;
}>;
export declare type WithdrawnEventFilter = TypedEventFilter<WithdrawnEvent>;
export interface StayEscrow extends BaseContract {
    contractName: "StayEscrow";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: StayEscrowInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        deposit(payee: string, spaceId: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        depositsOf(payee: string, spaceId: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;
        depositsState(payee: string, spaceId: BytesLike, overrides?: CallOverrides): Promise<[number]>;
    };
    deposit(payee: string, spaceId: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    depositsOf(payee: string, spaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    depositsState(payee: string, spaceId: BytesLike, overrides?: CallOverrides): Promise<number>;
    callStatic: {
        deposit(payee: string, spaceId: BytesLike, overrides?: CallOverrides): Promise<void>;
        depositsOf(payee: string, spaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        depositsState(payee: string, spaceId: BytesLike, overrides?: CallOverrides): Promise<number>;
    };
    filters: {
        "Deposited(address,uint256,bytes32)"(payee?: string | null, weiAmount?: null, spaceId?: null): DepositedEventFilter;
        Deposited(payee?: string | null, weiAmount?: null, spaceId?: null): DepositedEventFilter;
        "Withdrawn(address,uint256,bytes32)"(payee?: string | null, weiAmount?: null, spaceId?: null): WithdrawnEventFilter;
        Withdrawn(payee?: string | null, weiAmount?: null, spaceId?: null): WithdrawnEventFilter;
    };
    estimateGas: {
        deposit(payee: string, spaceId: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        depositsOf(payee: string, spaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        depositsState(payee: string, spaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        deposit(payee: string, spaceId: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        depositsOf(payee: string, spaceId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        depositsState(payee: string, spaceId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
