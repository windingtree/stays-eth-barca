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
// get statistics for stays
const ethers_1 = require("ethers");
const typechain_1 = require("../typechain");
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
const RPC = 'https://poa-xdai.gateway.pokt.network/v1/lb/6255d2a0adb03f003800758d';
const STAYS = '0xEcfF1da7acD4025c532C04db3B57b454bAB95b4E';
const dayZero = 1645567342; // dayZero from the Stays.sol
/**
 * Initial statistics reporting for Stays
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(RPC);
        const stays = typechain_1.Stays__factory.connect(STAYS, provider);
        // get list of all tokens (ie. number of tokens)
        // NB: only suppors number of tokens limited by MAX_SAFE_INTEGER
        const numTokens = (yield stays.totalSupply()).toNumber();
        let numberOfDays = 0;
        let bookingsByDay = [];
        // iterate through all tokens
        for (let i = 1; i <= numTokens; i++) {
            const tokenURI = yield stays.tokenURI(i);
            const owner = yield stays.ownerOf(i);
            const metadata = JSON.parse(atob(tokenURI.substring(29)));
            const _startDay = parseInt(metadata.attributes[2].value);
            const _startDate = (new Date((dayZero + _startDay * 86400) * 1000)).getUTCDate();
            const _numDays = parseInt(metadata.attributes[3].value);
            const _quantity = parseInt(metadata.attributes[4].value);
            log(chalk_1.default.green(metadata.name));
            log(chalk_1.default.green(`Owner:      ${owner}`));
            log(chalk_1.default.green(`Facility:   ${metadata.attributes[0].value}`));
            log(chalk_1.default.green(`Space:      ${metadata.attributes[1].value}`));
            log(chalk_1.default.green(`Check-In:   ${_startDate}`));
            log(chalk_1.default.green(`# of days:  ${_numDays}`));
            log(chalk_1.default.green(`Check-Out:  ${_startDate + _numDays}`));
            log(chalk_1.default.green(`# of rooms: ${_quantity}`));
            for (let x = _startDate; x < _startDate + _numDays; x++) {
                if (typeof (bookingsByDay[x]) === 'undefined') {
                    bookingsByDay[x] = _quantity;
                }
                else {
                    bookingsByDay[x] = bookingsByDay[x] + _quantity;
                }
            }
            numberOfDays += (_numDays * _quantity);
            log("");
        }
        log(chalk_1.default.green(`Total roomnights: ${numberOfDays}`));
        log("April");
        bookingsByDay.forEach((e, i) => {
            log(`${i}\t` + '█'.repeat(e) + `\t${e}`);
        });
    });
}
main();
//# sourceMappingURL=stats.js.map