export const FormatError = (stack?: string | string[]): string[] => {
    if (!stack) {
        return ['No stack trace available'];
    }

    // Check if the stack is already an array and format each line
    if (Array.isArray(stack)) {
        return stack.map((line) => formatLine(line));
    }

    // Otherwise, it's a string, so split by new lines and format each line
    return stack?.split('\n')?.map((line) => formatLine(line));
};

// Helper function to clean up each line of the stack trace
const formatLine = (line: string): string => {
    // Remove unnecessary file paths (e.g., long node_modules or project paths)
    return line
        ?.replace(/\\/g, '/') // Normalize file paths
        ?.replace(/.*node_modules.*\//, '') // Strip node_modules paths
        ?.replace(/.*src\/.*?\//, '') // Strip local source file paths
        ?.trim(); // Remove excessive spaces
};
