export const LoggerLevel = {
    ERROR: "ERROR :: ",
    LOG: "LOG :: ",
    WARNING: "WARNING :: "
};

export function logger(level, message, data = undefined) {
    if(level == LoggerLevel.ERROR) {
        console.error(LoggerLevel.ERROR, message, data);
    } else if(level == LoggerLevel.WARNING) {
        console.warn(LoggerLevel.WARNING, message, data);
    } else {
        console.log(LoggerLevel.LOG, message, data);
    }
}

export const KernelState = {
    CREATED: "CREATED",
    BOOTING: "BOOTING",
    BOOTED: "BOOTED"
}

export const ProgramState = {
    IDLE: "IDLE",
    RUNNING: "RUNNING",
    STOPPED: "STOPPED",
    ERROR: "ERROR"
}

export const RequestMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE"
}