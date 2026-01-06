import { Request } from "/src/index.js";

export default class GetPosts extends Request {
    get url() {
        return "https://jsonplaceholder.typicode.com/posts";
    }

    get method() {
        return "GET";
    }
    
    onProcessing() {
        console.log("Get posts is processing");
    }

    onSuccess(response) {
        console.log("Get posts is success :: ", response);
    }

    onError(error) {
        console.error("Get Posts is error :: ", error);
    }
}
