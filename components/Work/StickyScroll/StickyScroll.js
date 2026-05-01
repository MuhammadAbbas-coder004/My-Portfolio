import React, { useState, useRef, useEffect } from "react";
import DotPattern from "../DotPattern/DotPattern";
import { cn } from "utils/cn";

const backgroundColors = ["#000000"];

const linearGradients = [
  "linear-gradient(to bottom right, #ef008f, #6ec3f4)",
  "linear-gradient(to bottom right, #6ec3f4, #7038ff)",
  "linear-gradient(to bottom right, #7038ff, #c9c9c9)",
];

const StickyScroll = ({ contentItems }) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);

  const cardLength = contentItems.length;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const scrollYProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      
      const cardsBreakpoints = contentItems.map(
        (_, index) => index / cardLength - 0.1
      );

      const closestBreakpointIndex = cardsBreakpoints.reduce(
        (acc, breakpoint, index) => {
          const distance = Math.abs(scrollYProgress - breakpoint);
          if (distance < Math.abs(scrollYProgress - cardsBreakpoints[acc])) {
            return index;
          }
          return acc;
        },
        0
      );
      setActiveCard(closestBreakpointIndex);
    };

    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      // Initialize
      handleScroll();
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [contentItems, cardLength]);

  return (
    <div className="relative">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] rounded-2xl py-3 px-2 md:px-0 z-20"
        )}
      />

      <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black to-transparent z-10 rounded-2xl" />
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black to-transparent z-10 rounded-2xl" />

      <div
        ref={containerRef}
        style={{
          backgroundColor:
            backgroundColors[activeCard % backgroundColors.length],
          transition: "background-color 0.3s ease",
        }}
        className="h-[28rem] flex justify-center space-x-10 p-4 rounded-2xl outline outline-1 outline-gray-dark-1 overflow-y-auto no-scrollbar"
      >
        <div className="flex items-start px-4">
          <div className="max-w-2xl">
            {contentItems.map((item, index) => (
              <div key={item.title + index} className="my-8">
                <h2
                  style={{
                    opacity: activeCard === index ? 1 : 0.3,
                    transition: "opacity 0.3s ease",
                  }}
                  className="text-2xl font-bold text-slate-100"
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    opacity: activeCard === index ? 1 : 0.3,
                    transition: "opacity 0.3s ease",
                  }}
                  className="text-lg text-slate-300 max-w-sm mt-4"
                >
                  {item.description}
                </p>
              </div>
            ))}
            <div className="h-40" />
          </div>
        </div>
        <div
          style={{
            backgroundImage:
              linearGradients[activeCard % linearGradients.length],
            transition: "background-image 0.3s ease",
          }}
          className="hidden lg:block h-60 w-80 rounded-xl bg-white sticky top-10 overflow-hidden"
        >
          {contentItems[activeCard].content ?? null}
        </div>
      </div>
    </div>
  );
};

export default StickyScroll;
