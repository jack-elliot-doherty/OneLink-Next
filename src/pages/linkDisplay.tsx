import { useRouter } from "next/router";
import { FormValues } from "../types";
import { decode } from "../utils/decode";
import Links from "../components/links";

const LinkDisplay = () => {
  const router = useRouter();
  const { data } = router.query;

  const decodedData: FormValues = decode(data);
  console.log(decodedData);

  return (
    <div
      style={{ backgroundColor: decodedData.pageBackgroundColour }}
      className="h-screen items-center justify-center p-20"
    >
      <Links {...decodedData} />
    </div>
  );
};

export default LinkDisplay;
