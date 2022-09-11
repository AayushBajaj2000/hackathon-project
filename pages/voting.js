import { Button, Input, Textarea } from "@chakra-ui/react";
import React from "react";
import Carousel from "@components/carousel";
import Navbar from "@components/navbar";

function Home() {
  let [value, setValue] = React.useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <>
      <Navbar />
      <div className="px-2">
        <Carousel />
        <div className="fixed bottom-20 left-0 w-full flex justify-center">
          <Textarea
            value={value}
            onChange={handleInputChange}
            width={"280px"}
            height={"140px"}
            placeholder="Add your idea here"
            size="sm"
          />
          <Button variant="solid" width={"50px"} height={"140px"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
