import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Textarea } from "@chakra-ui/react";
import Carousel from "@components/carousel";
import Navbar from "@components/navbar";
import { doc, onSnapshot } from "firebase/firestore";
import db from "@utils/db";

const Output = () => {
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState("");
  const [info, setInfo] = useState({});
  let fetched = false;

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const getData = async (id) => {
    const test = await fetch(`/api/meeting/?id=${id}`);
    const data = await test.json();
    setInfo(data);
  };

  useEffect(() => {
    if (id && !fetched) {
      const unsubscribe = onSnapshot(doc(db, "Meetings", id), (doc) => {
        const data = doc.data();
        setInfo(data);
      });
      getData(id);
      fetched = true;
    }
  }, [id]);

  return (
    <>
      <Navbar info={info} />
      <div className="px-2">
        {<Carousel id={id} currentIdea={info?.currentIdea} />}
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
};

export default Output;
