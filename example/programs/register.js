import MyProgram from "./myprogram.js";

export function registerPrograms(kernel) {
    kernel.registerPrograms({
        "my-program": MyProgram
    });
}
