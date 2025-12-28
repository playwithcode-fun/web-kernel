import { ResponseTransformer } from "./interfaces";

class DataTransformer<T = Response> implements ResponseTransformer<T> {
    async transform(response: Response): Promise<T> {
        const contentType = response.headers.get("content-type") || "";

        if(contentType.includes("application/json")) {
            return await response.json();
        }

        if(contentType.includes("text/")) {
            return await response.text() as unknown as T;
        }

        return await response.blob() as unknown as T;
    }
}

export default DataTransformer;
