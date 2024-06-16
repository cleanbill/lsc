export const VERSIONS_STAMP = 'versions-stamp';
export const API_KEY = 'API_KEY';

export type Toast = {
    message: string;
    messageType: MessageType
};

export enum MessageType {
    ERROR = 'ERROR',
    INFO = 'INFO',
}