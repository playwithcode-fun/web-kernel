import { IKernelProgram } from "./types/IKernel";
declare class ProgramHandler {
    programs: IKernelProgram;
    constructor();
    addProgram(key: string, program: any): void;
    startProgram(key: string): void;
    endProgram(key: string): void;
}
export default ProgramHandler;
