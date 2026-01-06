export interface FetchRequestConfig {
    url: string
    method?: string,
    headers?: HeadersInit
    body?: BodyInit | null
    signal?: AbortSignal
}

export type RequestAdapter = (config: FetchRequestConfig) => Promise<Response>

export interface ResponseTransformer<T = any> {
    transform(response: Response): Promise<T>
}

export enum RequestMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}
