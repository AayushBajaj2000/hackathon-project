import { Spinner } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

const Meeting = () => {
  const [value, setValue] = React.useState("");
  const router = useRouter();

  const joinMeeting = async () => {
    router.push(`/meeting/${value}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-20 w-auto"
                src="/logo.png"
                alt="Your Company"
              />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Join a meeting
              </h2>
            </div>
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="team-name" className="sr-only">
                    Meeting Id
                  </label>
                  <input
                    id="team-name"
                    name="name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="name"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Meeting Id"
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  disabled={value.length === 0}
                  className="group mt-1 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={joinMeeting}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                  {"Join Meeting"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default Meeting;
