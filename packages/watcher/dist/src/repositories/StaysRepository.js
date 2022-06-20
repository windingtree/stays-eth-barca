"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const stay_1 = require("../../models/stay");
const models_1 = require("../../models");
const ethers_1 = require("ethers");
class default_1 {
    constructor() {
        this.stayModel = (0, stay_1.StayInit)(models_1.sequelize);
    }
    getUnprocessed() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stayModel.findAll({
                where: {
                    status: 0
                }
            });
        });
    }
    store(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            const mappedEntities = this.mapEntity(entities);
            yield this.stayModel.bulkCreate(mappedEntities);
        });
    }
    mapEntity(entities) {
        return entities.map(entity => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const total = ethers_1.BigNumber.from(((_a = entity.space) === null || _a === void 0 ? void 0 : _a.contractData.pricePerNightWei) || 0)
                .mul(ethers_1.BigNumber.from(entity.numberOfDays))
                .mul(ethers_1.BigNumber.from(entity.quantity)).toString();
            const totalEther = ethers_1.utils.formatUnits(total, 'ether');
            return {
                facility_id: entity.facilityId,
                space_id: entity.spaceId,
                token_id: entity.tokenId,
                email: (_c = (_b = entity.facility) === null || _b === void 0 ? void 0 : _b.contact) === null || _c === void 0 ? void 0 : _c.email,
                quantity: entity.quantity,
                status: 0,
                start_date: (_d = entity.startDayParsed) === null || _d === void 0 ? void 0 : _d.setUTCHours(12, 0, 0),
                end_date: (_e = entity.endDayParsed) === null || _e === void 0 ? void 0 : _e.setUTCHours(12, 0, 0),
                data: {
                    name: (_f = entity.facility) === null || _f === void 0 ? void 0 : _f.name,
                    price: totalEther,
                    address: (_g = entity.facility) === null || _g === void 0 ? void 0 : _g.address,
                    contact: (_h = entity.facility) === null || _h === void 0 ? void 0 : _h.contact
                }
            };
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=StaysRepository.js.map