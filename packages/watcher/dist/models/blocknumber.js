'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockNumberInit = exports.BlockNumber = void 0;
const sequelize_1 = require("sequelize");
class BlockNumber extends sequelize_1.Model {
}
exports.BlockNumber = BlockNumber;
const BlockNumberInit = (sequelize) => {
    BlockNumber.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        block_number: sequelize_1.DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'BlockNumber',
    });
    return BlockNumber;
};
exports.BlockNumberInit = BlockNumberInit;
//# sourceMappingURL=blocknumber.js.map