import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace IStays {
    type CheckInVoucherStruct = {
        from: string;
        to: string;
        tokenId: BigNumberish;
        signature: BytesLike;
    };
    type CheckInVoucherStructOutput = [
        string,
        string,
        BigNumber,
        string
    ] & {
        from: string;
        to: string;
        tokenId: BigNumber;
        signature: string;
    };
}
export interface IStaysInterface extends utils.Interface {
    contractName: "IStays";
    functions: {
        "activateLodgingFacility(bytes32)": FunctionFragment;
        "activateSpace(bytes32)": FunctionFragment;
        "addSpace(bytes32,uint256,uint256,bool,string)": FunctionFragment;
        "checkIn(uint256,(address,address,uint256,bytes))": FunctionFragment;
        "checkOut(uint256)": FunctionFragment;
        "deactivateLodgingFacility(bytes32)": FunctionFragment;
        "deactivateSpace(bytes32)": FunctionFragment;
        "deleteLodgingFacility(bytes32)": FunctionFragment;
        "deposit(address,bytes32,uint256)": FunctionFragment;
        "depositOf(address,bytes32,uint256)": FunctionFragment;
        "depositState(uint256)": FunctionFragment;
        "getActiveLodgingFacilityIds()": FunctionFragment;
        "getActiveSpaceIdsByFacilityId(bytes32)": FunctionFragment;
        "getAllLodgingFacilityIds()": FunctionFragment;
        "getAvailability(bytes32,uint256,uint256)": FunctionFragment;
        "getLodgingFacilityById(bytes32)": FunctionFragment;
        "getLodgingFacilityIdsByOwner(address)": FunctionFragment;
        "getSpaceById(bytes32)": FunctionFragment;
        "getSpaceIdsByFacilityId(bytes32)": FunctionFragment;
        "getTokensBySpaceId(bytes32,uint8)": FunctionFragment;
        "newStay(bytes32,uint256,uint256,uint256)": FunctionFragment;
        "registerLodgingFacility(string,bool)": FunctionFragment;
        "updateLodgingFacility(bytes32,string)": FunctionFragment;
        "updateSpace(bytes32,uint256,uint256,string)": FunctionFragment;
        "yieldLodgingFacility(bytes32,address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "activateLodgingFacility", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "activateSpace", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "addSpace", values: [BytesLike, BigNumberish, BigNumberish, boolean, string]): string;
    encodeFunctionData(functionFragment: "checkIn", values: [BigNumberish, IStays.CheckInVoucherStruct]): string;
    encodeFunctionData(functionFragment: "checkOut", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "deactivateLodgingFacility", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "deactivateSpace", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "deleteLodgingFacility", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "deposit", values: [string, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "depositOf", values: [string, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "depositState", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getActiveLodgingFacilityIds", values?: undefined): string;
    encodeFunctionData(functionFragment: "getActiveSpaceIdsByFacilityId", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getAllLodgingFacilityIds", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAvailability", values: [BytesLike, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getLodgingFacilityById", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getLodgingFacilityIdsByOwner", values: [string]): string;
    encodeFunctionData(functionFragment: "getSpaceById", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getSpaceIdsByFacilityId", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getTokensBySpaceId", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "newStay", values: [BytesLike, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "registerLodgingFacility", values: [string, boolean]): string;
    encodeFunctionData(functionFragment: "updateLodgingFacility", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "updateSpace", values: [BytesLike, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "yieldLodgingFacility", values: [BytesLike, string]): string;
    decodeFunctionResult(functionFragment: "activateLodgingFacility", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "activateSpace", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addSpace", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "checkIn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "checkOut", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deactivateLodgingFacility", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deactivateSpace", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deleteLodgingFacility", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositState", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getActiveLodgingFacilityIds", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getActiveSpaceIdsByFacilityId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAllLodgingFacilityIds", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAvailability", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLodgingFacilityById", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLodgingFacilityIdsByOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSpaceById", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSpaceIdsByFacilityId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTokensBySpaceId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "newStay", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerLodgingFacility", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateLodgingFacility", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateSpace", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "yieldLodgingFacility", data: BytesLike): Result;
    events: {
        "Cancel(uint256)": EventFragment;
        "CheckIn(uint256)": EventFragment;
        "CheckOut(uint256)": EventFragment;
        "Deposited(address,uint256,bytes32,uint256)": EventFragment;
        "LodgingFacilityActiveState(bytes32,bool)": EventFragment;
        "LodgingFacilityCreated(bytes32,address,string)": EventFragment;
        "LodgingFacilityOwnershipTransfer(bytes32,address,address)": EventFragment;
        "LodgingFacilityRemoved(bytes32)": EventFragment;
        "LodgingFacilityUpdated(bytes32,string)": EventFragment;
        "NewStay(bytes32,uint256)": EventFragment;
        "Refund(address,uint256,bytes32,uint256)": EventFragment;
        "SpaceActiveState(bytes32,bool)": EventFragment;
        "SpaceAdded(bytes32,bytes32,uint256,uint256,bool,string)": EventFragment;
        "SpaceRemoved(bytes32)": EventFragment;
        "SpaceUpdated(bytes32,uint256,uint256,string)": EventFragment;
        "Withdraw(address,address,uint256,bytes32,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Cancel"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CheckIn"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CheckOut"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Deposited"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LodgingFacilityActiveState"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LodgingFacilityCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LodgingFacilityOwnershipTransfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LodgingFacilityRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LodgingFacilityUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NewStay"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Refund"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SpaceActiveState"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SpaceAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SpaceRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SpaceUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}
export declare type CancelEvent = TypedEvent<[BigNumber], {
    tokenId: BigNumber;
}>;
export declare type CancelEventFilter = TypedEventFilter<CancelEvent>;
export declare type CheckInEvent = TypedEvent<[BigNumber], {
    tokenId: BigNumber;
}>;
export declare type CheckInEventFilter = TypedEventFilter<CheckInEvent>;
export declare type CheckOutEvent = TypedEvent<[BigNumber], {
    tokenId: BigNumber;
}>;
export declare type CheckOutEventFilter = TypedEventFilter<CheckOutEvent>;
export declare type DepositedEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    BigNumber
], {
    payee: string;
    weiAmount: BigNumber;
    spaceId: string;
    tokenId: BigNumber;
}>;
export declare type DepositedEventFilter = TypedEventFilter<DepositedEvent>;
export declare type LodgingFacilityActiveStateEvent = TypedEvent<[
    string,
    boolean
], {
    facilityId: string;
    active: boolean;
}>;
export declare type LodgingFacilityActiveStateEventFilter = TypedEventFilter<LodgingFacilityActiveStateEvent>;
export declare type LodgingFacilityCreatedEvent = TypedEvent<[
    string,
    string,
    string
], {
    facilityId: string;
    owner: string;
    dataURI: string;
}>;
export declare type LodgingFacilityCreatedEventFilter = TypedEventFilter<LodgingFacilityCreatedEvent>;
export declare type LodgingFacilityOwnershipTransferEvent = TypedEvent<[
    string,
    string,
    string
], {
    facilityId: string;
    prevOwner: string;
    newOwner: string;
}>;
export declare type LodgingFacilityOwnershipTransferEventFilter = TypedEventFilter<LodgingFacilityOwnershipTransferEvent>;
export declare type LodgingFacilityRemovedEvent = TypedEvent<[
    string
], {
    facilityId: string;
}>;
export declare type LodgingFacilityRemovedEventFilter = TypedEventFilter<LodgingFacilityRemovedEvent>;
export declare type LodgingFacilityUpdatedEvent = TypedEvent<[
    string,
    string
], {
    facilityId: string;
    dataURI: string;
}>;
export declare type LodgingFacilityUpdatedEventFilter = TypedEventFilter<LodgingFacilityUpdatedEvent>;
export declare type NewStayEvent = TypedEvent<[
    string,
    BigNumber
], {
    spaceId: string;
    tokenId: BigNumber;
}>;
export declare type NewStayEventFilter = TypedEventFilter<NewStayEvent>;
export declare type RefundEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    BigNumber
], {
    payee: string;
    weiAmount: BigNumber;
    spaceId: string;
    tokenId: BigNumber;
}>;
export declare type RefundEventFilter = TypedEventFilter<RefundEvent>;
export declare type SpaceActiveStateEvent = TypedEvent<[
    string,
    boolean
], {
    spaceId: string;
    active: boolean;
}>;
export declare type SpaceActiveStateEventFilter = TypedEventFilter<SpaceActiveStateEvent>;
export declare type SpaceAddedEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    boolean,
    string
], {
    spaceId: string;
    facilityId: string;
    capacity: BigNumber;
    pricePerNightWei: BigNumber;
    active: boolean;
    dataURI: string;
}>;
export declare type SpaceAddedEventFilter = TypedEventFilter<SpaceAddedEvent>;
export declare type SpaceRemovedEvent = TypedEvent<[string], {
    spaceId: string;
}>;
export declare type SpaceRemovedEventFilter = TypedEventFilter<SpaceRemovedEvent>;
export declare type SpaceUpdatedEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    string
], {
    spaceId: string;
    capacity: BigNumber;
    pricePerNightWei: BigNumber;
    dataURI: string;
}>;
export declare type SpaceUpdatedEventFilter = TypedEventFilter<SpaceUpdatedEvent>;
export declare type WithdrawEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    string,
    BigNumber
], {
    payer: string;
    payee: string;
    weiAmount: BigNumber;
    spaceId: string;
    tokenId: BigNumber;
}>;
export declare type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;
export interface IStays extends BaseContract {
    contractName: "IStays";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IStaysInterface;
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
        activateLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        activateSpace(_spaceId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        addSpace(_lodgingFacilityId: BytesLike, _capacity: BigNumberish, _pricePerNightWei: BigNumberish, _active: boolean, _dataURI: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        checkIn(_tokenId: BigNumberish, voucher: IStays.CheckInVoucherStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        checkOut(_tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        deactivateLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        deactivateSpace(_spaceId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        deleteLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        deposit(payer: string, spaceId: BytesLike, tokenId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        depositOf(payer: string, spaceId: BytesLike, tokenId: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        depositState(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[number]>;
        getActiveLodgingFacilityIds(overrides?: CallOverrides): Promise<[string[]]>;
        getActiveSpaceIdsByFacilityId(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getAllLodgingFacilityIds(overrides?: CallOverrides): Promise<[string[]]>;
        getAvailability(_spaceId: BytesLike, _startDay: BigNumberish, _numberOfDays: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber[]]>;
        getLodgingFacilityById(_lodgingFacilityId: BytesLike, overrides?: CallOverrides): Promise<[
            boolean,
            string,
            boolean,
            string
        ] & {
            exists: boolean;
            owner: string;
            active: boolean;
            dataURI: string;
        }>;
        getLodgingFacilityIdsByOwner(_owner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getSpaceById(_spaceId: BytesLike, overrides?: CallOverrides): Promise<[
            boolean,
            string,
            BigNumber,
            BigNumber,
            boolean,
            string
        ] & {
            exists: boolean;
            lodgingFacilityId: string;
            capacity: BigNumber;
            pricePerNightWei: BigNumber;
            active: boolean;
            dataURI: string;
        }>;
        getSpaceIdsByFacilityId(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getTokensBySpaceId(_spaceId: BytesLike, _state: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber[]]>;
        newStay(_spaceId: BytesLike, _startDay: BigNumberish, _numberOfDays: BigNumberish, _quantity: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        "registerLodgingFacility(string,bool)"(_dataURI: string, _active: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        "registerLodgingFacility(string,bool,address)"(_dataURI: string, _active: boolean, _fren: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        updateLodgingFacility(_lodgingFacilityId: BytesLike, _newDataURI: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        updateSpace(_spaceId: BytesLike, _capacity: BigNumberish, _pricePerNightWei: BigNumberish, _dataURI: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        yieldLodgingFacility(_lodgingFacilityId: BytesLike, _newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    activateLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    activateSpace(_spaceId: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    addSpace(_lodgingFacilityId: BytesLike, _capacity: BigNumberish, _pricePerNightWei: BigNumberish, _active: boolean, _dataURI: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    checkIn(_tokenId: BigNumberish, voucher: IStays.CheckInVoucherStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    checkOut(_tokenId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    deactivateLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    deactivateSpace(_spaceId: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    deleteLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    deposit(payer: string, spaceId: BytesLike, tokenId: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    depositOf(payer: string, spaceId: BytesLike, tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    depositState(tokenId: BigNumberish, overrides?: CallOverrides): Promise<number>;
    getActiveLodgingFacilityIds(overrides?: CallOverrides): Promise<string[]>;
    getActiveSpaceIdsByFacilityId(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getAllLodgingFacilityIds(overrides?: CallOverrides): Promise<string[]>;
    getAvailability(_spaceId: BytesLike, _startDay: BigNumberish, _numberOfDays: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;
    getLodgingFacilityById(_lodgingFacilityId: BytesLike, overrides?: CallOverrides): Promise<[
        boolean,
        string,
        boolean,
        string
    ] & {
        exists: boolean;
        owner: string;
        active: boolean;
        dataURI: string;
    }>;
    getLodgingFacilityIdsByOwner(_owner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getSpaceById(_spaceId: BytesLike, overrides?: CallOverrides): Promise<[
        boolean,
        string,
        BigNumber,
        BigNumber,
        boolean,
        string
    ] & {
        exists: boolean;
        lodgingFacilityId: string;
        capacity: BigNumber;
        pricePerNightWei: BigNumber;
        active: boolean;
        dataURI: string;
    }>;
    getSpaceIdsByFacilityId(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getTokensBySpaceId(_spaceId: BytesLike, _state: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;
    newStay(_spaceId: BytesLike, _startDay: BigNumberish, _numberOfDays: BigNumberish, _quantity: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    "registerLodgingFacility(string,bool)"(_dataURI: string, _active: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    "registerLodgingFacility(string,bool,address)"(_dataURI: string, _active: boolean, _fren: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    updateLodgingFacility(_lodgingFacilityId: BytesLike, _newDataURI: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    updateSpace(_spaceId: BytesLike, _capacity: BigNumberish, _pricePerNightWei: BigNumberish, _dataURI: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    yieldLodgingFacility(_lodgingFacilityId: BytesLike, _newOwner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        activateLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: CallOverrides): Promise<void>;
        activateSpace(_spaceId: BytesLike, overrides?: CallOverrides): Promise<void>;
        addSpace(_lodgingFacilityId: BytesLike, _capacity: BigNumberish, _pricePerNightWei: BigNumberish, _active: boolean, _dataURI: string, overrides?: CallOverrides): Promise<void>;
        checkIn(_tokenId: BigNumberish, voucher: IStays.CheckInVoucherStruct, overrides?: CallOverrides): Promise<void>;
        checkOut(_tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        deactivateLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: CallOverrides): Promise<void>;
        deactivateSpace(_spaceId: BytesLike, overrides?: CallOverrides): Promise<void>;
        deleteLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: CallOverrides): Promise<void>;
        deposit(payer: string, spaceId: BytesLike, tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        depositOf(payer: string, spaceId: BytesLike, tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        depositState(tokenId: BigNumberish, overrides?: CallOverrides): Promise<number>;
        getActiveLodgingFacilityIds(overrides?: CallOverrides): Promise<string[]>;
        getActiveSpaceIdsByFacilityId(_lodgingFacilityId: BytesLike, overrides?: CallOverrides): Promise<string[]>;
        getAllLodgingFacilityIds(overrides?: CallOverrides): Promise<string[]>;
        getAvailability(_spaceId: BytesLike, _startDay: BigNumberish, _numberOfDays: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;
        getLodgingFacilityById(_lodgingFacilityId: BytesLike, overrides?: CallOverrides): Promise<[
            boolean,
            string,
            boolean,
            string
        ] & {
            exists: boolean;
            owner: string;
            active: boolean;
            dataURI: string;
        }>;
        getLodgingFacilityIdsByOwner(_owner: string, overrides?: CallOverrides): Promise<string[]>;
        getSpaceById(_spaceId: BytesLike, overrides?: CallOverrides): Promise<[
            boolean,
            string,
            BigNumber,
            BigNumber,
            boolean,
            string
        ] & {
            exists: boolean;
            lodgingFacilityId: string;
            capacity: BigNumber;
            pricePerNightWei: BigNumber;
            active: boolean;
            dataURI: string;
        }>;
        getSpaceIdsByFacilityId(_lodgingFacilityId: BytesLike, overrides?: CallOverrides): Promise<string[]>;
        getTokensBySpaceId(_spaceId: BytesLike, _state: BigNumberish, overrides?: CallOverrides): Promise<BigNumber[]>;
        newStay(_spaceId: BytesLike, _startDay: BigNumberish, _numberOfDays: BigNumberish, _quantity: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        "registerLodgingFacility(string,bool)"(_dataURI: string, _active: boolean, overrides?: CallOverrides): Promise<void>;
        "registerLodgingFacility(string,bool,address)"(_dataURI: string, _active: boolean, _fren: string, overrides?: CallOverrides): Promise<void>;
        updateLodgingFacility(_lodgingFacilityId: BytesLike, _newDataURI: string, overrides?: CallOverrides): Promise<void>;
        updateSpace(_spaceId: BytesLike, _capacity: BigNumberish, _pricePerNightWei: BigNumberish, _dataURI: string, overrides?: CallOverrides): Promise<void>;
        yieldLodgingFacility(_lodgingFacilityId: BytesLike, _newOwner: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Cancel(uint256)"(tokenId?: null): CancelEventFilter;
        Cancel(tokenId?: null): CancelEventFilter;
        "CheckIn(uint256)"(tokenId?: null): CheckInEventFilter;
        CheckIn(tokenId?: null): CheckInEventFilter;
        "CheckOut(uint256)"(tokenId?: null): CheckOutEventFilter;
        CheckOut(tokenId?: null): CheckOutEventFilter;
        "Deposited(address,uint256,bytes32,uint256)"(payee?: string | null, weiAmount?: null, spaceId?: null, tokenId?: null): DepositedEventFilter;
        Deposited(payee?: string | null, weiAmount?: null, spaceId?: null, tokenId?: null): DepositedEventFilter;
        "LodgingFacilityActiveState(bytes32,bool)"(facilityId?: null, active?: null): LodgingFacilityActiveStateEventFilter;
        LodgingFacilityActiveState(facilityId?: null, active?: null): LodgingFacilityActiveStateEventFilter;
        "LodgingFacilityCreated(bytes32,address,string)"(facilityId?: null, owner?: string | null, dataURI?: null): LodgingFacilityCreatedEventFilter;
        LodgingFacilityCreated(facilityId?: null, owner?: string | null, dataURI?: null): LodgingFacilityCreatedEventFilter;
        "LodgingFacilityOwnershipTransfer(bytes32,address,address)"(facilityId?: null, prevOwner?: string | null, newOwner?: string | null): LodgingFacilityOwnershipTransferEventFilter;
        LodgingFacilityOwnershipTransfer(facilityId?: null, prevOwner?: string | null, newOwner?: string | null): LodgingFacilityOwnershipTransferEventFilter;
        "LodgingFacilityRemoved(bytes32)"(facilityId?: null): LodgingFacilityRemovedEventFilter;
        LodgingFacilityRemoved(facilityId?: null): LodgingFacilityRemovedEventFilter;
        "LodgingFacilityUpdated(bytes32,string)"(facilityId?: null, dataURI?: null): LodgingFacilityUpdatedEventFilter;
        LodgingFacilityUpdated(facilityId?: null, dataURI?: null): LodgingFacilityUpdatedEventFilter;
        "NewStay(bytes32,uint256)"(spaceId?: null, tokenId?: null): NewStayEventFilter;
        NewStay(spaceId?: null, tokenId?: null): NewStayEventFilter;
        "Refund(address,uint256,bytes32,uint256)"(payee?: string | null, weiAmount?: null, spaceId?: null, tokenId?: null): RefundEventFilter;
        Refund(payee?: string | null, weiAmount?: null, spaceId?: null, tokenId?: null): RefundEventFilter;
        "SpaceActiveState(bytes32,bool)"(spaceId?: null, active?: null): SpaceActiveStateEventFilter;
        SpaceActiveState(spaceId?: null, active?: null): SpaceActiveStateEventFilter;
        "SpaceAdded(bytes32,bytes32,uint256,uint256,bool,string)"(spaceId?: null, facilityId?: null, capacity?: null, pricePerNightWei?: null, active?: null, dataURI?: null): SpaceAddedEventFilter;
        SpaceAdded(spaceId?: null, facilityId?: null, capacity?: null, pricePerNightWei?: null, active?: null, dataURI?: null): SpaceAddedEventFilter;
        "SpaceRemoved(bytes32)"(spaceId?: null): SpaceRemovedEventFilter;
        SpaceRemoved(spaceId?: null): SpaceRemovedEventFilter;
        "SpaceUpdated(bytes32,uint256,uint256,string)"(spaceId?: null, capacity?: null, pricePerNightWei?: null, dataURI?: null): SpaceUpdatedEventFilter;
        SpaceUpdated(spaceId?: null, capacity?: null, pricePerNightWei?: null, dataURI?: null): SpaceUpdatedEventFilter;
        "Withdraw(address,address,uint256,bytes32,uint256)"(payer?: string | null, payee?: string | null, weiAmount?: null, spaceId?: null, tokenId?: null): WithdrawEventFilter;
        Withdraw(payer?: string | null, payee?: string | null, weiAmount?: null, spaceId?: null, tokenId?: null): WithdrawEventFilter;
    };
    estimateGas: {
        activateLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        activateSpace(_spaceId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        addSpace(_lodgingFacilityId: BytesLike, _capacity: BigNumberish, _pricePerNightWei: BigNumberish, _active: boolean, _dataURI: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        checkIn(_tokenId: BigNumberish, voucher: IStays.CheckInVoucherStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        checkOut(_tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        deactivateLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        deactivateSpace(_spaceId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        deleteLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        deposit(payer: string, spaceId: BytesLike, tokenId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        depositOf(payer: string, spaceId: BytesLike, tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        depositState(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getActiveLodgingFacilityIds(overrides?: CallOverrides): Promise<BigNumber>;
        getActiveSpaceIdsByFacilityId(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getAllLodgingFacilityIds(overrides?: CallOverrides): Promise<BigNumber>;
        getAvailability(_spaceId: BytesLike, _startDay: BigNumberish, _numberOfDays: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getLodgingFacilityById(_lodgingFacilityId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        getLodgingFacilityIdsByOwner(_owner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getSpaceById(_spaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        getSpaceIdsByFacilityId(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getTokensBySpaceId(_spaceId: BytesLike, _state: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        newStay(_spaceId: BytesLike, _startDay: BigNumberish, _numberOfDays: BigNumberish, _quantity: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        "registerLodgingFacility(string,bool)"(_dataURI: string, _active: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        "registerLodgingFacility(string,bool,address)"(_dataURI: string, _active: boolean, _fren: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        updateLodgingFacility(_lodgingFacilityId: BytesLike, _newDataURI: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        updateSpace(_spaceId: BytesLike, _capacity: BigNumberish, _pricePerNightWei: BigNumberish, _dataURI: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        yieldLodgingFacility(_lodgingFacilityId: BytesLike, _newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        activateLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        activateSpace(_spaceId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        addSpace(_lodgingFacilityId: BytesLike, _capacity: BigNumberish, _pricePerNightWei: BigNumberish, _active: boolean, _dataURI: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        checkIn(_tokenId: BigNumberish, voucher: IStays.CheckInVoucherStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        checkOut(_tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        deactivateLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        deactivateSpace(_spaceId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        deleteLodgingFacility(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        deposit(payer: string, spaceId: BytesLike, tokenId: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        depositOf(payer: string, spaceId: BytesLike, tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        depositState(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getActiveLodgingFacilityIds(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getActiveSpaceIdsByFacilityId(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getAllLodgingFacilityIds(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAvailability(_spaceId: BytesLike, _startDay: BigNumberish, _numberOfDays: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLodgingFacilityById(_lodgingFacilityId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLodgingFacilityIdsByOwner(_owner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getSpaceById(_spaceId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getSpaceIdsByFacilityId(_lodgingFacilityId: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getTokensBySpaceId(_spaceId: BytesLike, _state: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        newStay(_spaceId: BytesLike, _startDay: BigNumberish, _numberOfDays: BigNumberish, _quantity: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        "registerLodgingFacility(string,bool)"(_dataURI: string, _active: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        "registerLodgingFacility(string,bool,address)"(_dataURI: string, _active: boolean, _fren: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        updateLodgingFacility(_lodgingFacilityId: BytesLike, _newDataURI: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        updateSpace(_spaceId: BytesLike, _capacity: BigNumberish, _pricePerNightWei: BigNumberish, _dataURI: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        yieldLodgingFacility(_lodgingFacilityId: BytesLike, _newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
