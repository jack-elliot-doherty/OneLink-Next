import { type FormValues } from "../types";
import { Icon } from "@iconify-icon/react";

const FormPreview = (props: FormValues) => {
  const { name, about, photoUrl, socialLinks, otherLinks } = props;

  return (
    <div className="mx-auto flex aspect-[9/16] w-4/5 flex-col items-center justify-center rounded-[3rem] border-8 border-black bg-blue-300">
      <div className="flex flex-col items-center justify-center">
        {photoUrl.length > 0 && (
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
            className="flex flex-row rounded bg-slate-300 px-3 py-1 shadow-md"
          >
            <Icon icon={link.iconKey} key={index} className="p-1" />

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
