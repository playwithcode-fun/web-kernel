import { fetchAdapter } from "./adapters.js";
import { logger, LoggerLevel, RequestMethods } from "../utils.js";
import DataTransformer from "./DataTransformer.js";

class Request {
    adapter;
    transformer;

    constructor(adapter = null, transformer = null) {
        if(new.target === Request) {
            throw new Error("Request is abstract");
        }
        this.adapter = adapter ?? fetchAdapter;
        this.transformer = transformer ?? new DataTransformer();
    }

    get url() {
        logger(LoggerLevel.ERROR, "Subclasses must implement `url` getter.");
        return;
    }

    get method() {
        return RequestMethods.GET;
    }

    get headers() {
        return undefined;
    }

    get payload() {
        return null;
    }

    get signal() {
        return undefined;
    }

    async send() {
        try {
            this.onProcessing();

            const response = await this.adapter({
                url: this.url,
                method: this.method,
                headers: this.headers,
                body: this.payload,
                signal: this.signal
            });

            if(!response.ok) {
                throw response;
            }

            const data = await this.transformer.transform(response);

            this.onSuccess(data);
            return data;

        } catch(error) {
            this.onError(error);
            throw error;
        }
    }

    onProcessing() {
        //
    }

    onSuccess(_response) {
        //
    }

    onError(_error) {
        //
    }
}

export default Request;