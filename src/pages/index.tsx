/* eslint-disable  @typescript-eslint/no-misused-promises */
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormPreview from "../components/formPreview";
import { ChromePicker } from "react-color";
import { type FormValues } from "../types";
import { encode } from "../utils/encode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: React.FC<{ values: FormValues }> = ({
  values = {
    name: "",
    about: "",
    photoUrl: "",
    // photoUrl: "https://picsum.photos/200",
    socialLinks: [
      {
        iconKey: "material-symbols:add-link",
        url: "",
      },
    ],
    otherLinks: [
      {
        iconKey: "material-symbols:add-link",
        label: "",
        url: "",
      },
    ],
  },
}) => {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: values,
  });

  const [colour, setColour] = useState("#982323");
  const [loading, setLoading] = useState(false);

  const [socialLinkKey, setSocialLinkKey] = useState(1);
  const [otherLinkKey, setOtherLinkKey] = useState(1);

  const [socialLinkIds, setSocialLinkIds] = useState(
    Object.keys(values.socialLinks)
  );
  const [otherLinkIds, setOtherLinkIds] = useState(
    Object.keys(values.otherLinks)
  );

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    console.log("submitting");
    const encodedData = encode(JSON.stringify(data));
    const domain =
      process.env.NODE_ENV === "development"
        ? "localhost:3000"
        : "https://one-link-next.vercel.app";

    navigator.clipboard
      .writeText(domain + "/links?data=" + encodedData)
      .then(() => {
        toast.success("Copied to clipboard!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  });

  const onDeleteSocialLink = (index: string) => {
    setSocialLinkIds(socialLinkIds.filter((id) => id !== index.toString()));
  };

  const onDeleteOtherLink = (index: string) => {
    setOtherLinkIds(otherLinkIds.filter((id) => id !== index.toString()));
  };

  const onAddSocialLink = () => {
    setSocialLinkIds([...socialLinkIds, socialLinkKey.toString()]);
    setSocialLinkKey(socialLinkKey + 1);
  };

  const onAddOtherLink = () => {
    setOtherLinkIds([...otherLinkIds, otherLinkKey.toString()]);
    setOtherLinkKey(otherLinkKey + 1);
  };

  return (
    <>
      <Head>
        <title>OneLink-Next</title>
        <meta
          name="description"
          content="All My Links type app with no data stored - all data is hashed and used as a query param"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className=" flex h-full w-full flex-row  items-center justify-center">
        <div className="h-screen w-2/3 overflow-y-auto bg-gray-100">
          <form onSubmit={onSubmit}>
            <div className="flex flex-row p-2">
              {/* basic info */}
              <div className="mr-12 p-5">
                <p className="text-xl font-semibold">Profile</p>
                <p className="text-xs">Some public information about you.</p>
              </div>
              <div className="flex w-full flex-col rounded bg-white p-5 shadow-md">
                <label>Name</label>
                <input
                  required
                  type="text"
                  {...register("name", { required: true })}
                />

                <label>
                  Photo Url <span className="text-xs">(Optional)</span>
                </label>
                <input
                  {...register("photoUrl", { required: false })}
                  type="text"
                />
                <label>
                  About You <span className="text-xs ">(Optional)</span>
                </label>
                <textarea {...register("about", { required: false })} />
              </div>
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <div className="flex flex-row p-2">
              <div className="p-5">
                <p className="text-xl font-semibold">Social Links</p>
                <p className="text-xs">Add some social media links.</p>
                <a className="text-xs" href="https://icones.js.org/">
                  <span className="underline">
                    Icons can be found here https://icones.js.org/
                  </span>
                </a>
              </div>
              <div className="flex w-full flex-row flex-wrap ">
                {socialLinkIds.length > 0 &&
                  socialLinkIds.map((index) => {
                    return (
                      <div
                        key={index}
                        className="m-1 flex
                         flex-grow flex-col rounded bg-white p-5 shadow-md  transition-opacity duration-500 ease-in-out  "
                      >
                        <div className="flex flex-row ">
                          <div className="flex flex-grow flex-col">
                            <label>Icon Key</label>
                            <input
                              required
                              type="text"
                              {...register(
                                `socialLinks.${Number(index)}.iconKey`,
                                {
                                  required: true,
                                }
                              )}
                            />
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => onDeleteSocialLink(index)}
                              className="my-3 w-full rounded  p-1 font-bold text-gray-600 hover:bg-gray-200"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-auto h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <label>Link Url</label>
                        <input
                          required
                          className=""
                          type="text"
                          {...register(`socialLinks.${Number(index)}.url`, {
                            required: true,
                          })}
                        />
                      </div>
                    );
                  })}
                <button
                  type="button"
                  onClick={() => onAddSocialLink()}
                  className="my-3 w-full rounded border-2 border-dashed border-gray-400 p-1 font-bold text-gray-600 hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <div className="flex flex-row p-2">
              {/* Other links */}
              <div className="p-5">
                <p className="text-xl font-semibold">Other links</p>
                <p className="text-xs">Add some more links here.</p>
                <a className="text-xs" href="https://icones.js.org/">
                  <span className="underline">
                    Icons can be found here https://icones.js.org/
                  </span>
                </a>
              </div>
              <div className="flex w-full flex-row flex-wrap justify-start ">
                {otherLinkIds.map((index) => (
                  <div
                    className="m-1 flex w-[49%] flex-grow flex-col rounded bg-white p-5 shadow-md"
                    key={index}
                  >
                    <div className="flex  flex-row">
                      <div className="flex flex-grow flex-col">
                        <label>Label</label>
                        <input
                          required
                          type="text"
                          {...register(`otherLinks.${Number(index)}.label`, {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="flex flex-grow flex-col">
                        <label>Icon Key (Optional)</label>
                        <input
                          type="text"
                          {...register(`otherLinks.${Number(index)}.iconKey`, {
                            required: false,
                          })}
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => onDeleteOtherLink(index)}
                          className="hover:textg-gray-200 m-5 my-3   w-full text-gray-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <label>Link Url</label>
                    <input
                      required
                      type="text"
                      {...register(`otherLinks.${Number(index)}.url`, {
                        required: true,
                      })}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => onAddOtherLink()}
                  className="my-3 w-full rounded border-2 border-dashed border-gray-400 p-1 font-bold text-gray-600 hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
              <br></br>
              <hr></hr>
              <br></br>
            </div>
            <div className="flex flex-row">
              {/* colour picker */}
              <div className="p-5">
                <p className="text-xl font-semibold">Colour</p>
                <p className="text-xs">Pick a colour for your card.</p>
              </div>
              <div className="flex flex-col ">
                <ChromePicker
                  color={colour}
                  onChange={() => {
                    console.log();
                  }}
                  onChangeComplete={(updatedColor) => {
                    setColour(updatedColor.hex);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row p-5">
              <div className="flex w-1/2 flex-col items-center justify-center rounded bg-white p-5 shadow-md">
                <button
                  disabled={loading}
                  type="submit"
                  className="mx-auto w-1/2 rounded bg-black p-1 font-bold text-white hover:bg-blue-600"
                >
                  {loading ? (
                    <svg
                      className="mx-auto h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
                      ></path>
                    </svg>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className=" h-full w-1/3 flex-col">
          <FormPreview
            {...{
              ...watch(),
              socialLinks: socialLinkIds.map((index) => {
                return {
                  name: watch(`socialLinks.${Number(index)}.name`),
                  iconKey: watch(`socialLinks.${Number(index)}.iconKey`),
                  url: watch(`socialLinks.${Number(index)}.url`),
                };
              }),
              otherLinks: otherLinkIds.map((index) => {
                return {
                  label: watch(`otherLinks.${Number(index)}.label`),
                  iconKey: watch(`otherLinks.${Number(index)}.iconKey`),
                  url: watch(`otherLinks.${Number(index)}.url`),
                };
              }),
              pageBackgroundColour: colour,
            }}
          />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
    </>
  );
};

export default Home;
