import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventDefaultTouchmoveEvent: false, // call e.preventDefault *See Details*
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
};

const Carousel = ({ id, currentIdea }) => {
  const [ideas, setIdeas] = useState([]);
  const [position, positionSet] = useState(0);
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

  useEffect(() => {
    if (id && !fetchedData) {
      getData(id);
      fetchedData = true;
    }
  }, [id]);

  useEffect(() => {
    // find the index of the current idea
    const index = ideas.findIndex((idea) => idea.id === currentIdea);
    positionSet(index);
  }, [currentIdea]);

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
      <button
        className="absolute bottom-0 left-0"
        onClick={() => {
          if (position < ideas.length - 1) {
            positionSet(position + 1);
          }
        }}
      >
        Next Idea
      </button>
    </>
  );
};

export default Carousel;
