import { useState, useEffect } from "react";
import { useSfx } from "utils/use-sfx";
import { cn } from "utils/cn";

const Tab = ({ index, tab, activeTab, handleOnClick, setIsHovering }) => {
  return (
    <button
      onMouseDown={() => handleOnClick(index)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative px-4 py-1 rounded-full cursor-none"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {activeTab.value === tab.value && (
        <div
          className="absolute inset-0 bg-gray-dark-2 rounded-full transition-all duration-300"
        />
      )}

      <span
        className={cn(
          "relative text-white top-[3px] link",
          tab.value !== activeTab.value && "hover:text-gray-light-3"
        )}
      >
        {tab.title}
      </span>
    </button>
  );
};

const TabsContent = ({ tabs, isHovering }) => {
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    setBouncing(true);
    const timer = setTimeout(() => setBouncing(false), 300);
    return () => clearTimeout(timer);
  }, [tabs[0].value]);

  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, index) => {
        const isTopTab = tab.value === tabs[0].value;
        const bounceY = isTopTab && bouncing ? "20px" : "0px";
        
        return (
          <div
            key={tab.value}
            style={{
              transform: `scale(${1 - index * 0.1}) translateY(${bounceY})`,
              top: isHovering ? index * -50 : 0,
              zIndex: -index,
              opacity: index < 3 ? 1 - index * 0.1 : 0,
              transition: "all 0.5s ease",
            }}
            className="w-full h-full absolute top-0 left-0 mt-24 md:mt-20"
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
};

const Tabs = ({ tabItems }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [tabs, setTabs] = useState(tabItems);
  const [activeTab, setActiveTab] = useState(tabItems[0]);
  const sfx = useSfx();

  const activeIndex = tabItems.findIndex((t) => t.value === activeTab.value);

  const handleOnClick = (index) => {
    const updatedTabs = [...tabItems];
    const selectedTab = updatedTabs.splice(index, 1);
    updatedTabs.unshift(selectedTab[0]);
    setTabs(updatedTabs);
    setActiveTab(updatedTabs[0]);
    sfx.play("tab-switch");
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      handleOnClick(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < tabItems.length - 1) {
      handleOnClick(activeIndex + 1);
    }
  };

  return (
    <div className="staggered-reveal">
      <TabsContent
        key={activeTab.value}
        tabs={tabs}
        activeTab={activeTab}
        isHovering={isHovering}
      />
      {/* Previous / Next Buttons */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onMouseDown={handlePrev}
          disabled={activeIndex === 0}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-none",
            activeIndex === 0
              ? "bg-gray-dark-2/40 text-gray-light-3/40 cursor-not-allowed"
              : "bg-gray-dark-2 text-white hover:bg-gray-dark-3 hover:scale-105"
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Previous
        </button>
        <span className="text-gray-light-3 text-sm font-mono">
          {activeIndex + 1} / {tabItems.length}
        </span>
        <button
          onMouseDown={handleNext}
          disabled={activeIndex === tabItems.length - 1}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-none",
            activeIndex === tabItems.length - 1
              ? "bg-gray-dark-2/40 text-gray-light-3/40 cursor-not-allowed"
              : "bg-gray-dark-2 text-white hover:bg-gray-dark-3 hover:scale-105"
          )}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Tabs;
