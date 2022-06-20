import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
export declare class BlockNumber extends Model<InferAttributes<BlockNumber>, InferCreationAttributes<BlockNumber>> {
    id: CreationOptional<number>;
    block_number: number;
}
export declare const BlockNumberInit: (sequelize: any) => typeof BlockNumber;
