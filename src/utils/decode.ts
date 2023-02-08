import { FormValues } from "../types";

export const decode = (str: string | string[] | undefined) => {
  if (typeof str === "string") {
    const decoded = Buffer.from(str, "base64").toString("utf8");

    return JSON.parse(decoded) as FormValues;
  }
};
