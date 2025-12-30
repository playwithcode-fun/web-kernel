import { IKernelRequest } from "./types/IKernel";
declare class RequestHandler {
    requests: IKernelRequest;
    addRequest(key: string, RequestClass: any): void;
    startRequest(key: string): void;
}
export default RequestHandler;
