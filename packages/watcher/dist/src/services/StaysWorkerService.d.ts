export default class StaysWorkerService {
    private elements;
    constructor(autoProcess?: boolean);
    process(): Promise<void>;
    private getUnprocessedStays;
    private sendEmails;
}
