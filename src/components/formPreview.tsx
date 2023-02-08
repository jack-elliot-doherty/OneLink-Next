import { type FormValues } from "../types";
import Links from "./links";

const FormPreview = (props: FormValues) => {
  const { pageBackgroundColour, pageTextColour } = props;

  return (
    <div
      style={{ backgroundColor: pageBackgroundColour, color: pageTextColour }}
      className="mx-auto flex aspect-[9/16] w-4/5 flex-col rounded-[3rem] border-8 border-black p-14"
    >
      <Links {...props} />
    </div>
  );
};

export default FormPreview;
