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

  const handleOnClick = (index) => {
    const updatedTabs = [...tabItems];
    const selectedTab = updatedTabs.splice(index, 1);
    updatedTabs.unshift(selectedTab[0]);
    setTabs(updatedTabs);
    setActiveTab(updatedTabs[0]);
    sfx.play("tab-switch");
  };

  return (
    <div className="staggered-reveal">
      <div className="pt-12 flex flex-row justify-center items-center [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full">
        {tabItems.map((tab, index) => (
          <Tab
            key={tab.title}
            index={index}
            tab={tab}
            activeTab={activeTab}
            handleOnClick={handleOnClick}
            setIsHovering={setIsHovering}
          />
        ))}
      </div>
      <TabsContent
        key={activeTab.value}
        tabs={tabs}
        activeTab={activeTab}
        isHovering={isHovering}
      />
    </div>
  );
};

export default Tabs;
