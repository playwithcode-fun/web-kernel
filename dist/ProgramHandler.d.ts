import { ProgramState } from "./types/IKernel";
declare class ProgramHandler {
    private programs;
    private programState;
    constructor();
    isProgramExists(key: string): boolean;
    addProgram(key: string, program: any): void;
    startProgram(key: string, args?: any): void;
    endProgram(key: string): void;
    getProgramsByState(programState: ProgramState): any;
    getAllProgramStatus(): any;
    getProgramStatus(key: string): any;
}
export default ProgramHandler;
