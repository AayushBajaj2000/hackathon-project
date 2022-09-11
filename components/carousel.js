import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const testIdeas = ["test1", "test2", "test3", "test4"];
const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventDefaultTouchmoveEvent: false, // call e.preventDefault *See Details*
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
};

const Carousel = () => {
  const [position, positionSet] = useState(0);
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

  return (
    <>
      <div
        {...handlers}
        className="absolute left-[10%] top-[24vh] sm:left-[20%] md:left-[37%] bg-black mt-[100px]"
      >
        {testIdeas.map((test, index) => (
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
            <div className="min-w-[300px] h-[180px] bg-[rgba(164,199,243,0.5)] rounded-xl  text-black mx-5">
              {test}
            </div>
          </motion.div>
        ))}
      </div>
      <button
        className="absolute bottom-0 left-0"
        onClick={() => {
          if (position < testIdeas.length - 1) {
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
