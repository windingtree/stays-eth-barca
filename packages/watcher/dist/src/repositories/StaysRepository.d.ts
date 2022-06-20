import { TokenEntity } from "../types";
import { StaysRepositoryInterface } from "./interfaces/StaysRepositoryInterface";
import { StayInit } from '../../models/stay';
export default class implements StaysRepositoryInterface {
    private stayModel;
    constructor();
    getUnprocessed(): Promise<Array<typeof StayInit>>;
    store(entities: TokenEntity[]): Promise<void>;
    private mapEntity;
}
