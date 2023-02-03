export const encode = (str: string): string => {
  return Buffer.from(str).toString("base64");
};
