'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const db_host = process.env.DB_HOST || 'development.db';
exports.sequelize = new sequelize_1.Sequelize('sqlite', '', 'db_pass', {
    dialect: 'sqlite',
    host: db_host,
});
exports.default = {
    sequelize: exports.sequelize,
    Sequelize: sequelize_1.Sequelize
};
//# sourceMappingURL=index.js.map