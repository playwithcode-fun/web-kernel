import ProgramHandler from "./ProgramHandler";
import { IKernelProgram } from "./types/IKernel";
declare class Kernel {
    programHandler: ProgramHandler;
    constructor();
    registerPrograms(programs: IKernelProgram): void;
    start(programName: string): void;
    destroy(programName: string): void;
}
export default Kernel;
