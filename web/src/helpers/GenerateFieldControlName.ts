export const GenerateFieldControlName = (
    fieldArrayName: string,
    index: number,
    fieldName: string,
) => {
    return `${fieldArrayName}.${index}.${fieldName}` as const;
};
