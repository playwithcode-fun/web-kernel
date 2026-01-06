import { fetchAdapter } from "./request/adapters.js";
import { logger, LoggerLevel } from "./utils.js";
import Request from "./request/Request.js";

class RequestHandler {
    requests = new Map();

    addRequest(key, RequestClass) {
        const instance = new RequestClass(fetchAdapter);

        if(!(instance instanceof Request)) {
            throw new Error(`Invalid request "${key}". It must extend kernel Request class.`);
        }

        this.requests.set(key, instance);
    }

    startRequest(key) {
        const instance = this.requests.get(key);

        if(!instance) {
            logger(LoggerLevel.WARNING, "Request not found.");
        }

        if(typeof instance.send !== "function") {
            logger(LoggerLevel.ERROR, "Send method not available for the request.");
        }

        instance.send();
    }
}

export default RequestHandler;