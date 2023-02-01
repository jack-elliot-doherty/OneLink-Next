export const decode = (str: string) => {
  return Buffer.from(str, "base64").toString("utf8");
};
