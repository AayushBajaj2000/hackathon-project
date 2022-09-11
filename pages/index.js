import { Button, Input } from "@chakra-ui/react";
import React from "react";
import Carousel from "../components/carousel";

function Home() {
  return (
    <div className="px-2">
      <Carousel />
      <div className="fixed bottom-0 left-0 w-full flex justify-center">
        <Input
          placeholder="send message"
          width={300}
          className="w-[300px]"
          size="md"
        />
        <Button variant="solid" className="w-[50px]">
          Send
        </Button>
      </div>
    </div>
  );
}

export default Home;
