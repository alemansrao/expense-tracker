// utils/validation.ts
export const validateTransaction = (type: string, amount: number, date: any, category: string, description: string) => {
    return type && amount > 0 && date && category && description;
  };
  