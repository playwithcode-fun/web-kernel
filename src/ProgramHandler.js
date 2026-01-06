import { logger, LoggerLevel, ProgramState } from "./utils.js";

class ProgramHandler {
    programs = new Map();
    programState = new Map();

    constructor() {
        //
    }

    isProgramExists(key) {
        return (this.programs.has(key) && this.programState.has(key));
    }

    addProgram(key, program) {
        if(this.programs.has(key)) {
            logger(LoggerLevel.WARNING, `Program ${key} already exists.`);
        }

        this.programs.set(key, new program());
        this.programState.set(key, ProgramState.IDLE);
    }

    startProgram(key, args = null) {
        const program = this.programs.get(key);
        if(!program) {
            logger(LoggerLevel.WARNING, `Program ${key} not found.`);
            return;
        }

        const status = this.programState.get(key);
        if(status === ProgramState.RUNNING) {
            logger(LoggerLevel.WARNING, `Program ${key} is already running.`);
            return;
        }

        if(typeof program.onStart !== "function") {
            logger(LoggerLevel.ERROR, `onStart method is not defined in the program ${key}.`);
            return;
        }

        try {
            program.onStart(args);
            this.programState.set(key, ProgramState.RUNNING);
        } catch(error) {
            this.programState.set(key, ProgramState.ERROR);
            logger(LoggerLevel.ERROR, `Error occured in program ${key} - `, error);
        }
    }

    endProgram(key) {
        const program = this.programs.get(key);
        if(!program) {
            logger(LoggerLevel.WARNING, `Program ${key} not found.`);
            return;
        }

        if(this.programState.get(key) !== ProgramState.RUNNING) {
            logger(LoggerLevel.WARNING, `Program ${key} is not running.`);
            return;
        }

        if(typeof program.onDestroy !== "function") {
            logger(LoggerLevel.ERROR, `onDestroy method is not defined in the program ${key}.`);
            return;
        }
        
        try {
            program.onDestroy();
            this.programState.set(key, ProgramState.STOPPED);
        } catch(error) {
            this.programState.set(key, ProgramState.ERROR);
            logger(LoggerLevel.ERROR, `Error occured in program ${key} - `, error);
        }
    }

    getProgramsByState(programState) {
        const status = {};

        for(const [key, state] of this.programState) {
            if(state === programState) {
                status[key] = state;
            }
        }

        return status;
    }

    getAllProgramStatus() {
        const status = {};

        for(const [key, state] of this.programState) {
            status[key] = state;
        }

        return status;
    }

    getProgramStatus(key) {
        return this.programs.get(key);
    }
}

export default ProgramHandler;