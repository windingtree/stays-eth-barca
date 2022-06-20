'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.StayInit = exports.Stay = void 0;
const sequelize_1 = require("sequelize");
class Stay extends sequelize_1.Model {
}
exports.Stay = Stay;
exports.default = exports.StayInit = (sequelize) => {
    Stay.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        facility_id: { type: sequelize_1.DataTypes.STRING },
        space_id: { type: sequelize_1.DataTypes.STRING },
        token_id: { type: sequelize_1.DataTypes.STRING },
        email: { type: sequelize_1.DataTypes.STRING },
        quantity: { type: sequelize_1.DataTypes.STRING },
        status: { type: sequelize_1.DataTypes.INTEGER },
        start_date: { type: sequelize_1.DataTypes.DATE },
        end_date: { type: sequelize_1.DataTypes.DATE },
        data: { type: sequelize_1.DataTypes.JSON }
    }, {
        sequelize,
        modelName: 'Stay',
    });
    return Stay;
};
//# sourceMappingURL=stay.js.map