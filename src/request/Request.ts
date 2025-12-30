import { fetchAdapter } from "./adapters";
import DataTransformer from "./DataTransformer";
import { FetchRequestConfig, RequestAdapter, RequestMethods, ResponseTransformer } from "./interfaces";

abstract class Request<T = Response> {
    protected adapter: RequestAdapter;
    protected transformer: ResponseTransformer<T>;

    constructor(
        adapter?: RequestAdapter,
        transformer?: ResponseTransformer<T>
    ) {
        if(new.target === Request) {
            throw new Error("Request is abstract");
        }
        this.adapter = adapter ?? fetchAdapter;
        this.transformer = transformer ?? new DataTransformer<T>();
    }

    protected abstract get url(): string;

    protected get method(): RequestMethods {
        return RequestMethods.GET;
    }

    protected get headers(): HeadersInit | undefined {
        return undefined;
    }

    protected get payload(): BodyInit | null {
        return null;
    }

    protected get signal(): AbortSignal | undefined {
        return undefined;
    }

    async send(): Promise<T> {
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

    protected onProcessing(): void {}
    protected onSuccess(_response: T): void {}
    protected onError(_error: any): void {}
}

export default Request;
