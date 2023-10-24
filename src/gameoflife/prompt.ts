import {input, confirm} from '@inquirer/prompts';

type InputMode = 'r' | number;
export type Input = {
    inputMode: InputMode,
    gridHeight: number,
    gridWidth: number
};

export async function promptForInput(): Promise<Input> {
    const inputModeRaw = await input({message: 'Input: r(andom), (file)1, (file)2, ...'});
    const inputMode: InputMode = (inputModeRaw === 'r') ? inputModeRaw : Number(inputModeRaw);
    let gridHeight = 0, gridWidth = 0;
    if (inputMode === 'r') {
        gridHeight = Number(await input({message: 'Grid height'}));
        gridWidth = Number(await input({message: 'Grid width'}));
    }

    return {inputMode, gridHeight, gridWidth};
}

export async function promptContinue(): Promise<boolean> {
    return confirm({message: 'Continue?'});
}
