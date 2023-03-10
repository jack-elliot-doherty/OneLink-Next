import { FormValues } from "../types";
import { Icon } from "@iconify-icon/react";

const Links = ({
  name,
  about,
  photoUrl,
  socialLinks,
  otherLinks,
  pageTabColour,
  pageIconColour,
}: Omit<FormValues, "pageBackgroundColour" | "pageTextColour">) => {
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
        <p className="mt-5 text-xl font-semibold">{name}</p>
        <p className="text-lg font-normal">{about}</p>
      </div>
      <div className="mt-3 flex flex-row items-center justify-center">
        {socialLinks?.map((link, index) => (
          <a
            className="mx-1"
            key={index}
            rel="noreferrer"
            target="_blank"
            href={link.url}
          >
            <Icon
              style={{ color: pageIconColour }}
              icon={link.iconKey}
              key={index}
            />
          </a>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center justify-center">
        {otherLinks?.map((link, index) => (
          <div
            key={index}
            style={{ backgroundColor: pageTabColour }}
            className="my-1 flex w-fit flex-row rounded  py-1 px-3 shadow-lg"
          >
            {link.iconKey !== "" && (
              <Icon
                style={{ color: pageIconColour }}
                className="p-1 "
                icon={link.iconKey}
                key={index}
              />
            )}

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
