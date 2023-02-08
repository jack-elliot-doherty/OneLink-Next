import { useRouter } from "next/router";
import { decode } from "../utils/decode";
import Links from "../components/links";
import Head from "next/head";

const LinkDisplay = () => {
  const router = useRouter();
  const { data } = router.query;

  const decodedData = decode(data);

  if (!decodedData) {
    return <div>Error</div>;
  }

  return (
    <>
      <Head>
        <title>{decodedData.name} - OneLink</title>
        <meta
          name="description"
          content="All My Links type app with no data stored - all data is hashed and used as a query param"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          backgroundColor: decodedData.pageBackgroundColour,
          color: decodedData.pageTextColour,
        }}
        className="h-screen items-center justify-center p-20"
      >
        <Links {...decodedData} />
      </div>
    </>
  );
};

export default LinkDisplay;
