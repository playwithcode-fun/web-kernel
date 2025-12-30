import { ResponseTransformer } from "./interfaces";
declare class DataTransformer<T = Response> implements ResponseTransformer<T> {
    transform(response: Response): Promise<T>;
}
export default DataTransformer;
