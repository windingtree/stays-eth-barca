import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
export declare class Stay extends Model<InferAttributes<Stay>, InferCreationAttributes<Stay>> {
    id: CreationOptional<number>;
    facility_id: string;
    space_id: string;
    token_id: string;
    email: string;
    quantity: number;
    status: number;
    start_date: Date;
    end_date: Date;
    data: JSON;
}
export declare let StayInit: any;
declare const _default: (sequelize: any) => typeof Stay;
export default _default;
