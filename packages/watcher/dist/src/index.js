"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve().then(() => __importStar(require('./config')));
const StaysRepository_1 = __importDefault(require("./repositories/StaysRepository"));
const StayEntityService_1 = __importDefault(require("./services/StayEntityService"));
const helpers_1 = require("./helpers");
const StaysWorkerService_1 = __importDefault(require("./services/StaysWorkerService"));
const stay = new StaysRepository_1.default();
const worker = () => __awaiter(void 0, void 0, void 0, function* () {
    const contract = yield (0, helpers_1.makeContract)();
    if (!contract)
        throw new Error();
    const books = new StayEntityService_1.default(contract);
    yield books.process();
    yield stay.store(books.getTokenEntities());
    yield new StaysWorkerService_1.default();
});
(0, helpers_1.poller)(worker, 60 * 1000);
//# sourceMappingURL=index.js.map