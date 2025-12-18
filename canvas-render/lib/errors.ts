export class TypeAssertError extends Error {
    constructor(type: string, value: string | { toString: () => string }) {
        const format_message = `Type assertion failed. Type: ${type}, Value: ${value}`;
        super(format_message);
    }
}
