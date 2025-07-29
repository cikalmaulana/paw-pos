import { EventEmitter } from 'events';

export type TAlertPayload = {
    message: string;
    isSuccess?: boolean;
};

class GlobalEmitter extends EventEmitter {}

export const globalEmitter = new GlobalEmitter();
