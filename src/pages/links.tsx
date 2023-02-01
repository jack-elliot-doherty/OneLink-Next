import { useRouter } from "next/router";
import { decode } from "../utils/decode";

const Links = () => {
  const router = useRouter();
  const { data } = router.query;

  console.log(data);

  return (
    <>
      <h1>Links</h1>
      <p>Here are some links to my other sites.</p>
      <ul>
        <li>
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </li>
        <li>
          <a href="https://www.gatsbyjs.org/docs/">Gatsby docs</a>
        </li>
      </ul>
    </>
  );
};

export default Links;
