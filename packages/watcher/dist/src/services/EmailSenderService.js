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
const mail_1 = __importDefault(require("@sendgrid/mail"));
class EmailSenderService {
    constructor() {
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY || '');
        this.fromEmail = process.env.SENDRID_EMAIL_FROM || '';
    }
    setMessage(stayModel) {
        this.stayModel = stayModel;
        const start_date = (new Date(stayModel.start_date)).toLocaleString("en-US", { timeZone: "UTC" });
        const end_date = (new Date(stayModel.end_date)).toLocaleString("en-US", { timeZone: "UTC" });
        this.message = {
            from: process.env.SENDRID_EMAIL_FROM || '',
            personalizations: [{
                    to: [
                        {
                            email: process.env.SENDRID_EMAIL_TO || stayModel.email,
                            name: stayModel.name
                        }
                    ],
                    dynamic_template_data: {
                        name: stayModel.data.name,
                        token_id: stayModel.token_id,
                        price: stayModel.data.price,
                        guests: stayModel.quantity,
                        start_date,
                        end_date,
                        policy: '-',
                        address: stayModel.data.address,
                        contact: stayModel.data.contact
                    },
                }],
            template_id: process.env.SENDRID_EMAIL_TEMPLATE_ID || ''
        };
    }
    sendEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mail_1.default
                .send(this.message)
                .then(() => __awaiter(this, void 0, void 0, function* () { return yield this.updateStayStatus(); }))
                .catch(error => {
                throw error;
            });
        });
    }
    updateStayStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stayModel.update({ status: 1 });
        });
    }
}
exports.default = EmailSenderService;
//# sourceMappingURL=EmailSenderService.js.map