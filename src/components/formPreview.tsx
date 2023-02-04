import { type FormValues } from "../types";
import { Icon } from "@iconify-icon/react";

const FormPreview = (props: FormValues) => {
  const {
    name,
    about,
    photoUrl,
    socialLinks,
    otherLinks,
    pageBackgroundColour,
  } = props;

  return (
    <div
      style={{ backgroundColor: pageBackgroundColour }}
      className="mx-auto flex aspect-[9/16] w-4/5 flex-col rounded-[3rem] border-8 border-black p-20"
    >
      <div className="flex flex-col items-center justify-center">
        {photoUrl && photoUrl.length > 0 && (
          <img
            className="h-32 w-32 rounded-full"
            src={photoUrl}
            alt="user profile image"
          />
        )}
        <p>{name}</p>
        <p>{about}</p>
      </div>
      <div className="flex flex-row">
        {socialLinks?.map((link, index) => (
          <a href={link.url} key={index}>
            <Icon icon={link.iconKey} key={index} />
          </a>
        ))}
      </div>
      <div className="flex flex-col">
        {otherLinks?.map((link, index) => (
          <div
            key={index}
            className="my-1 flex flex-row rounded bg-slate-200 py-1 px-3 shadow-lg"
          >
            <Icon
              onLoad={() => {
                console.log("loaded");
              }}
              icon={link.iconKey}
              key={index}
              className="p-1"
            />

            <a href={link.url}>
              <p>{link.label}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormPreview;
