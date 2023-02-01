import { FormValues } from "../types";
const FormPreview = (props: FormValues) => {
  const { name, about, photoUrl, socialLinks, otherLinks } = props;

  return (
    <div className=" top-5 right-10 mx-auto flex aspect-[9/16] w-4/5 flex-col items-center justify-center rounded-[3rem] border-8 border-black bg-blue-300">
      <div>
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
      <div>
        {socialLinks?.map((link, index) => (
          <a href={link.url} key={index}>
            <img src={link.iconKey} alt={link.name} />
          </a>
        ))}
      </div>
      <div>
        {otherLinks?.map((link, index) => (
          <a href={link.url} key={index}>
            <img src={link.iconKey} alt={link.label} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FormPreview;
