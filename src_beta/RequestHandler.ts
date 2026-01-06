import { fetchAdapter } from "./request/adapters";
import Request from "./request/Request";
import { IKernelRequest } from "./types/IKernel";
import { logger, LoggerLevel } from "./utils";

class RequestHandler {
    requests: IKernelRequest = {};

    addRequest(key: string, RequestClass: any) {
        const instance = new RequestClass(fetchAdapter);
        if(!(instance instanceof Request)) {
            throw new Error(`Invalid request "${key}". It must extend kernel Request class.`);
        }
        
        this.requests[key] = instance;
    }

    startRequest(key: string) {
        if(!this.requests[key]) {
            logger(LoggerLevel.WARNING, "Request not found.");
        }

        if(typeof this.requests[key].send !== "function") {
            logger(LoggerLevel.ERROR, "Send method not available for the request.");
        }

        this.requests[key].send();
    }
}

export default RequestHandler;
