import ProgramHandler from "./ProgramHandler";
import { IKernelProgram } from "./types/IKernel";

class Kernel {
    programHandler;
    
    constructor() {
        this.programHandler = new ProgramHandler();
    }

    registerPrograms(programs: IKernelProgram) {
        if(Object.keys(programs).length) {
            Object.keys(programs).forEach(key => {
                this.programHandler.addProgram(key, programs[key]);
            })
        }
    }

    start(programName: string) {
        this.programHandler.startProgram(programName);
    }

    destroy(programName: string) {
        this.programHandler.endProgram(programName);
    }
}

export default Kernel;
