import { Contract } from "stays-core";
export declare function makeContract(): Promise<Contract | undefined>;
export declare const poller: (fn: any, interval?: number, pollerName?: string | undefined) => () => void;
