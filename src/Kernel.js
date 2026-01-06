import KernelEvents from "./KernelEvents.js";
import ProgramHandler from "./ProgramHandler.js";
import RequestHandler from "./RequestHandler.js";
import { KernelState } from "./utils.js";

class Kernel {
    programHandler;
    eventHandler;
    requestHandler;
    state;
    bootHandlers;

    constructor() {
        this.programHandler = new ProgramHandler();
        this.eventHandler = new KernelEvents();
        this.requestHandler = new RequestHandler();
        this.state = KernelState.CREATED;
        this.bootHandlers = [];
    }

    onBoot(callback) {
        if(this.state == KernelState.BOOTED) {
            callback(this);
            return;
        }

        this.bootHandlers.push(callback);
    }

    boot() {
        if(this.state !== KernelState.CREATED) {
            return;
        }

        this.state = KernelState.BOOTING;

        for(const handler of this.bootHandlers) {
            handler(this);
        }

        this.bootHandlers.length = 0;
        this.state = KernelState.BOOTED;
    }

    registerPrograms(programs) {
        if(Object.keys(programs).length) {
            Object.keys(programs).forEach(key => {
                this.programHandler.addProgram(key, programs[key]);
            })
        }
    }

    start(programName, args = null) {
        this.programHandler.startProgram(programName, args);
    }

    destroy(programName) {
        this.programHandler.endProgram(programName);
    }

    status() {
        const data = {};

        data["programs"] = this.programHandler.getAllProgramStatus();

        console.log(data);
    }

    emit(type, detail = {}) {
        this.eventHandler.emit(type, detail);
    }

    on(type, handler, options = {}) {
        return this.eventHandler.on(type, handler, options);
    }

    once(type, handler) {
        return this.eventHandler.once(type, handler);
    }

    registerRequests(requests) {
        if(Object.keys(requests).length) {
            Object.keys(requests).forEach(key => {
                this.requestHandler.addRequest(key, requests[key]);
            });
        }
    }

    send(key) {
        this.requestHandler.startRequest(key);
    }
}

export default Kernel;