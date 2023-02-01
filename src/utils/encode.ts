export const encode = (str: string) => {
  return Buffer.from(str).toString("base64");
};
