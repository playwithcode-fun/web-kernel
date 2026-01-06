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