import { useRouter } from "next/router";
import FormPreview from "../components/formPreview";
import { FormValues } from "../types";
import { decode } from "../utils/decode";


const Links = () => {
  const router = useRouter();
  const { data } = router.query;

  const decodedData: FormValues = decode(data);

  return (
    <div className="items-center justify-center">
      <FormPreview {...decodedData} />
    </div>
  );
};

export default Links;
