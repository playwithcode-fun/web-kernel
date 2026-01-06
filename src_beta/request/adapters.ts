import { FetchRequestConfig, RequestMethods } from "./interfaces";

export function fetchAdapter(config: FetchRequestConfig): Promise<Response> {
    return fetch(config.url, {
        method: config.method || RequestMethods.GET,
        headers: config.headers,
        body: config.body ?? null,
        signal: config.signal
    });
}
