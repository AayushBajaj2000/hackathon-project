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
  const [info, setInfo] = useState([]);
  let fetched = false;

  const getData = async (id) => {
    const test = await fetch(`/api/meeting/results?id=${id}`);
    const data = await test.json();
    setInfo(data.ideas);
  };

  useEffect(() => {
    if (id && !fetched) {
      getData(id);
      fetched = true;
    }
  }, [id]);

  return (
    <>
      <Navbar info={info} />
      <div className="px-2">
        <div className="px-5">The top ranked ideas were:</div>

        <div className="card my-3">
          <div className="px-5  py-3">
            <strong>user:</strong> {info[0]?.data?.username}
          </div>
          <div className="w-full px-5  py-3">
            <strong>Idea:</strong> {info[0]?.data?.text}
          </div>
        </div>
        <div className="card my-3">
          <div className="px-5  py-3">
            <strong>user:</strong> {info[1]?.data?.username}
          </div>
          <div className="w-full px-5  py-3">
            <strong>Idea:</strong> {info[1]?.data?.text}
          </div>
        </div>
        <div className="card my-3">
          <div className="px-5  py-3">
            <strong>user:</strong> {info[2]?.data?.username}
          </div>
          <div className="w-full px-5  py-3">
            <strong>Idea:</strong> {info[2]?.data?.text}
          </div>
        </div>
      </div>
    </>
  );
};

export default Output;
