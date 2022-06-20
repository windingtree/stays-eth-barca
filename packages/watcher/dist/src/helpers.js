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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.poller = exports.makeContract = void 0;
const stays_core_1 = require("stays-core");
const logger_1 = __importDefault(require("./utils/logger"));
const index_node_1 = require("@windingtree/ipfs-apis/dist/index.node");
const logger = (0, logger_1.default)('poller');
function makeContract() {
    return __awaiter(this, void 0, void 0, function* () {
        const key = process.env.APP_FILE_WEB3STORAGE_KEY || '';
        const contractAddress = process.env.APP_CONTRACT_ADDRESS || '';
        const provider = process.env.APP_NETWORK_PROVIDER || '';
        try {
            const web3Storage = new index_node_1.Web3StorageApi(key);
            return new stays_core_1.Contract(contractAddress, provider, web3Storage);
        }
        catch (error) {
            logger.error(error);
        }
    });
}
exports.makeContract = makeContract;
const poller = (fn, interval = 5000, pollerName) => {
    if (typeof fn !== 'function') {
        throw new TypeError('Can\'t poll without a callback function');
    }
    let disabled = false;
    let failures = 0;
    const poll = () => __awaiter(void 0, void 0, void 0, function* () {
        if (disabled) {
            return;
        }
        try {
            yield fn();
        }
        catch (error) {
            failures++;
            logger.error(error);
        }
        if (failures < 100) {
            setTimeout(poll, interval);
        }
        else {
            logger.debug(`Too much errors in poller ${pollerName}. Disabled`);
        }
    });
    poll();
    logger.debug(`Poller ${pollerName} started`);
    return () => {
        disabled = true;
        failures = 0;
        logger.debug(`Poller ${pollerName} stopped`);
    };
};
exports.poller = poller;
//# sourceMappingURL=helpers.js.map