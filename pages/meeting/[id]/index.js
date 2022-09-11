import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Carousel from "@components/carousel";
import Navbar from "@components/navbar";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@utils/db";

const Output = () => {
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState("");
  const [info, setInfo] = useState({});
  const [position, positionSet] = useState(0);
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
        {
          <Carousel
            id={id}
            currentIdea={info?.currentIdea}
            position={position}
            positionSet={positionSet}
          />
        }
      </div>
    </>
  );
};

export default Output;
