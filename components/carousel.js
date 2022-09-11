import { collection, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { db } from "@utils/db";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";

const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventDefaultTouchmoveEvent: false, // call e.preventDefault *See Details*
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
};

const Carousel = ({ id, currentIdea, position, positionSet }) => {
  const [ideas, setIdeas] = useState([]);
  const [current, setCurrent] = useState();
  const router = useRouter();

  let fetchedData = false;

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      const dir = eventData.dir;

      if (dir === "Left") {
        if (position < testIdeas.length - 1) {
          positionSet(position + 1);
        }
      }
      if (dir === "Right") {
        if (position > 0) {
          positionSet(position - 1);
        }
      }
    },
    ...config,
  });

  const getData = async (id) => {
    const test = await fetch(`/api/meeting/ideas?id=${id}`);
    const data = await test.json();
    setIdeas(data.ideas);
  };

  const updateRating = async (rating) => {
    const data = fetch(`/api/meeting/ideas/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ideaId: currentIdea,
        meetingId: router.query.id,
        rating: rating,
      }),
    });
  };

  const updateCurrent = async (id) => {
    const data = fetch(`/api/meeting/updateIdea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentIdea: id,
        meetingId: router.query.id,
      }),
    });
  };

  useEffect(() => {
    if (id && !fetchedData) {
      const unsubscribe_two = onSnapshot(
        collection(db, "Meetings/" + id + "/Ideas"),
        (docSnapshot) => {
          const ideas = [];
          docSnapshot.forEach((doc) => {
            ideas.push({ data: doc.data(), id: doc.id });
          });
          setIdeas(ideas);
        }
      );
      getData(id);
      fetchedData = true;
    }
  }, [id]);

  useEffect(() => {
    // find the index of the current idea
    const index = ideas.findIndex((idea) => idea.id === currentIdea);
    if (index !== -1) {
      positionSet(index);
      setCurrent(ideas[index]);
    } else {
      positionSet(0);
      setCurrent(ideas[0]);
    }
  }, [currentIdea]);

  console.log(current);

  return (
    <>
      <div
        {...handlers}
        style={{
          transform: "translate(-50%, -50%)", // center the div
        }}
        className="absolute left-[calc(50%-210px)] top-[24vh] bg-black mt-[100px]"
      >
        {ideas.map((idea, index) => (
          <motion.div
            className="container"
            key={index}
            initial={{ scale: 0, rotation: -180 }}
            animate={{
              rotate: 0,
              left: `${(index - position) * 420}px`,
              scale: index === position ? 1 : 0.8,
              transition: {
                duration: 0.2,
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 1,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1,
            }}
          >
            <div className="min-w-[300px] p-4 h-[180px] bg-[rgba(164,199,243,0.5)] rounded-xl  text-black mx-5">
              {idea?.data?.text}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="fixed flex flex-col bottom-[300px] text-xl font-bold left-1/2 transform -translate-x-1/2 mb-4">
        <p className="ml-[80px]">Rank the idea</p>
        <div>
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              className="text-xl font-bold mt-4 mx-2"
              onClick={() => {
                updateRating(num);
              }}
            >
              {num}
            </Button>
          ))}
        </div>
      </div>

      {position === ideas.length - 1 ? (
        <Button
          onClick={() => {
            router.push(`/meeting/${id}/results`);
          }}
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4"
          colorScheme="blue"
        >
          Results
        </Button>
      ) : (
        <Button
          onClick={() => {
            if (position < ideas.length - 1) {
              positionSet(position + 1);
              // setCurrent(ideas[position + 1]);
              updateCurrent(ideas[position + 1].id);
            }
          }}
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4"
          colorScheme="blue"
        >
          Next Idea
        </Button>
      )}
    </>
  );
};

export default Carousel;
