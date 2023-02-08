export type FormValues = {
  name: string;
  about: string;
  photoUrl: string;
  socialLinks: {
    iconKey: string;
    name: string;
    url: string;
  }[];
  otherLinks: {
    iconKey: string;
    label: string;
    url: string;
  }[];
  pageBackgroundColour: string;
  pageTextColour: string;
  pageTabColour: string;
};
