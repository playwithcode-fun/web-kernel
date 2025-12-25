export enum LoggerLevel {
    LOG = "LOG :: ",
    ERROR = "ERROR :: ",
    WARNING = "WARNING :: "
}

export function logger(level: LoggerLevel, message: any) {
    if(level == LoggerLevel.ERROR) {
        console.error(LoggerLevel.ERROR, message);
    } else if(level == LoggerLevel.WARNING) {
        console.warn(LoggerLevel.WARNING, message);
    } else {
        console.log(LoggerLevel.LOG, message);
    }
}
