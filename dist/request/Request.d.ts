import { RequestAdapter, RequestMethods, ResponseTransformer } from "./interfaces";
declare abstract class Request<T = Response> {
    protected adapter: RequestAdapter;
    protected transformer: ResponseTransformer<T>;
    constructor(adapter?: RequestAdapter, transformer?: ResponseTransformer<T>);
    protected abstract get url(): string;
    protected get method(): RequestMethods;
    protected get headers(): HeadersInit | undefined;
    protected get payload(): BodyInit | null;
    protected get signal(): AbortSignal | undefined;
    send(): Promise<T>;
    protected onProcessing(): void;
    protected onSuccess(_response: T): void;
    protected onError(_error: any): void;
}
export default Request;
