import { FormValues } from "../types";
import { Icon } from "@iconify-icon/react";

const Links = ({
  name,
  about,
  photoUrl,
  socialLinks,
  otherLinks,
}: Omit<FormValues, "pageBackgroundColour">) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {photoUrl && photoUrl.length > 0 && (
          <img
            className="h-auto w-4/5 max-w-[12rem] rounded-full"
            src={photoUrl}
            alt="user profile image"
          />
        )}
        <p>{name}</p>
        <p>{about}</p>
      </div>
      <div className="flex flex-row items-center justify-center">
        {socialLinks?.map((link, index) => (
          <a rel="noreferrer" target="_blank" href={link.url}>
            <Icon icon={link.iconKey} key={index} />
          </a>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center">
        {otherLinks?.map((link, index) => (
          <div
            key={index}
            className="my-1 flex w-fit flex-row rounded bg-slate-200 py-1 px-3 shadow-lg"
          >
            <Icon
              onLoad={() => {
                console.log("loaded");
              }}
              icon={link.iconKey}
              key={index}
              className="p-1"
            />

            <a rel="noreferrer" target="_blank" href={link.url}>
              <p>{link.label}</p>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Links;
