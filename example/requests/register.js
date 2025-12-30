import GetPosts from "./getposts.js";

export function registerRequests(kernel) {
    kernel.registerRequests({
        "getposts" : GetPosts
    });
}
