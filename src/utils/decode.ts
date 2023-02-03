import { FormValues } from "../types";

export const decode = (str: string | string[] | undefined): FormValues => {
  if (typeof str === "string") {
    const decoded = Buffer.from(str, "base64").toString("utf8");

    return JSON.parse(decoded);
  } else {
    return {
      name: "",
      about: "",
      photoUrl: "",
      socialLinks: [],
      otherLinks: [],
      pageBackgroundColour: "",
    };
  }
};
