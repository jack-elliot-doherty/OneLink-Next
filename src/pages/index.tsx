import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormPreview from "../components/formPreview";
import { ChromePicker } from "react-color";
import { FormValues } from "../types";

const Home = ({
  values = {
    name: "Jack Doherty",
    about: "eihfeduyhfedjhfejuhf",
    photoUrl: "https://picsum.photos/200",
    socialLinks: [
      {
        iconKey: "https://picsum.photos/200",
        name: "Jack Doherty",
        url: "https://picsum.photos/200",
      },
    ],
    otherLinks: [
      {
        iconKey: "https://picsum.photos/200",
        label: "Jack Doherty",
        url: "https://picsum.photos/200",
      },
    ],
  },
}) => {
  const { register, handleSubmit, watch } = useForm({
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: values,
  });

  const [socialLinkKey, setSocialLinkKey] = useState(1);
  const [otherLinkKey, setOtherLinkKey] = useState(1);

  const [socialLinkIds, setSocialLinkIds] = useState(
    Object.keys(values.socialLinks)
  );
  const [otherLinkIds, setOtherLinkIds] = useState(
    Object.keys(values.otherLinks)
  );

  console.log("socialLinkIds", socialLinkIds);
  console.log("otherLinkIds", otherLinkIds);

  const onRawSubmit = (data: FormValues) => {
    console.log({
      ...data,
      socialLinks: Object.values(data.socialLinks),
      otherLinks: Object.values(data.otherLinks),
    });
  };

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex h-full w-full flex-row  items-center justify-center">
        <div className="h-screen w-2/3 overflow-y-auto bg-gray-100">
          <form onSubmit={handleSubmit((data) => onRawSubmit(data))}>
            <div className="flex flex-row p-2">
              {/* basic info */}
              <div className="p-5">
                <p className="text-xl font-semibold">Profile</p>
                <p className="text-xs">Some public information about you.</p>
              </div>
              <div className="flex w-full flex-col rounded bg-white p-5 shadow-md">
                <label>Name</label>
                <input type="text" {...register("name", { required: true })} />
                <label>Photo Url</label>
                <input
                  {...register("photoUrl", { required: true })}
                  type="text"
                />

                <label>About You</label>
                <textarea {...register("about", { required: false })} />
              </div>
            </div>
            <br></br>
            <hr></hr>
            <br></br>
            <div className="flex flex-row p-2">
              {/* social links */}
              <div className="p-5">
                <p className="text-xl font-semibold">Social Links</p>
                <p className="text-xs">Add some social media links.</p>
              </div>
              <div className="flex w-full flex-col">
                {socialLinkIds.length > 0 &&
                  socialLinkIds.map((index) => {
                    return (
                      <div
                        key={index}
                        className="my-2 flex  flex-col rounded bg-white p-5  shadow-md transition-opacity duration-500 ease-in-out"
                      >
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col">
                            <label>Name</label>

                            <input
                              type="text"
                              {...register(
                                `socialLinks.${Number(index)}.name`,
                                {
                                  required: true,
                                }
                              )}
                            />
                          </div>
                          <div className="flex flex-col">
                            <label>Icon Key (Optional)</label>
                            <input
                              type="text"
                              {...register(
                                `socialLinks.${Number(index)}.iconKey`,
                                {
                                  required: false,
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
                              {/* Garbage can icon */}
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
                  {/* plus sign in a circle */}
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
              </div>
              <div className="flex w-full flex-col">
                {otherLinkIds.map((index) => (
                  <div
                    className="my-2 flex flex-col rounded bg-white p-5 shadow-md"
                    key={index}
                  >
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col">
                        <label>Label</label>
                        <input
                          type="text"
                          {...register(`otherLinks.${Number(index)}.label`, {
                            required: true,
                          })}
                        />
                      </div>
                      <div className="flex flex-col">
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
                          className="my-3 w-full rounded  p-1 font-bold text-gray-600 hover:bg-gray-200"
                        >
                          {/* Garbage can icon */}
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
                  {/* plus sign in a circle */}
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
                <ChromePicker />
              </div>
            </div>
            <div className="flex flex-row p-5">
              <div className="flex w-full flex-col rounded bg-white p-5 shadow-md">
                <button
                  type="submit"
                  className="w-full rounded bg-blue-500 p-1 font-bold text-white hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className=" h-full w-1/3 flex-col">
          <FormPreview {...watch()} />
        </div>
      </main>
    </>
  );
};

export default Home;
