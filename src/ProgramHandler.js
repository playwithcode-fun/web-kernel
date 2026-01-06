class ProgramHandler {
    programs = new Map();
    programState = new Map();

    constructor() {
        //
    }

    isProgramExists(key) {
        return (this.programs.has(key) && this.programState.has(key));
    }
}
