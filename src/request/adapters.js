import { RequestMethods } from "../utils.js";

export function fetchAdapter(config) {
    return fetch(config.url, {
        method: config.method || RequestMethods.GET,
        headers: config.headers,
        body: config.body ?? null,
        signal: config.signal
    });
}