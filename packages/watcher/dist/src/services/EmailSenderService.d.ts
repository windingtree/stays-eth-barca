import { StayInit } from '../../models/stay';
export default class EmailSenderService {
    private fromEmail;
    private message;
    private stayModel;
    constructor();
    setMessage(stayModel: typeof StayInit): void;
    sendEmail(): Promise<void>;
    private updateStayStatus;
}
