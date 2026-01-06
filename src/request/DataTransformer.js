class DataTransformer {
    async transform(response) {
        const contentType = response.headers.get("content-type") || "";

        if(contentType.includes("application/json")) {
            return await response.json();
        }

        if(contentType.includes("text/")) {
            return await response.text();
        }

        return await response.blob();
    }
}

export default DataTransformer;