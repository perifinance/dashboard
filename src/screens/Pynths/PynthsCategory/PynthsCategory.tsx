import { useSelector } from "react-redux";
import { RootState } from "reducers";

import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/flicking/dist/flicking.css";
import { useEffect, useState } from "react";
import { Arrow } from "@egjs/flicking-plugins";
import ActiveCard from "components/ActiveCard";
import categories from "configure/coins/categories";
import pynths from "configure/coins/pynths";
import dexNetworkId from "configure/network/dexNetworkId";
import "swiper/css";
import "./PynthsCategory.css";

const PynthsCategory = ({ isActive, setIsActive }) => {
  const { pynthsIsReady } = useSelector((state: RootState) => state.app);
  const [activeCategory, setActiveCategory] = useState(0);

  const [pynthsCategories, setPynthsCategories] = useState([]);
  const [pynthsCategoriesCount, setPynthsCategoriesCount] = useState([]);

  const getCount = () => {
    let value = [];
    pynthsCategories.forEach((category) => {
      if (category === "all") {
        value.push(pynths[dexNetworkId].length);
      } else {
        value.push(
          pynths[dexNetworkId].filter((e) => e.categories.includes(category))
            .length
        );
      }
    });
    setPynthsCategoriesCount(value);
  };

  useEffect(() => {
    if (pynthsCategories.length > 0) {
      getCount();
    }
  }, [pynthsCategories]);

  useEffect(() => {
    if (pynthsIsReady) {
      const addAll = categories.slice(0, 6);
      addAll.unshift("all");
      setPynthsCategories(addAll);
    }
  }, [pynthsIsReady]);
  return (
    <div>
      <div className="lg:invisible visible">
        <Flicking
          className="h-15 bg-navy-500 mb-5 text-lg font-light p-4"
          plugins={[new Arrow()]}
          moveType="freeScroll"
          bound={true}
        >
          {pynthsCategories.map((e, index) => (
            <span
              className={`button ${
                index === activeCategory
                  ? "font-medium text-blue-500"
                  : "font-medium"
              } outline-none px-2`}
              key={index}
              onClick={() => {
                setActiveCategory(index);
                setIsActive(e);
              }}
            >
              {e.toUpperCase()} ({pynthsCategoriesCount[index]})
            </span>
          ))}
          <ViewportSlot>
            <span className="flicking-arrow-prev w-8">
              <img src="/images/icon/left-arrow.svg" />
            </span>
            <span className="flicking-arrow-next w-8">
              <img src="/images/icon/right-arrow.svg" />
            </span>
          </ViewportSlot>
        </Flicking>
      </div>

      <div className="hidden lg:flex mb-3 gap-3 h-10">
        {pynthsCategories.map((e, index) => (
          <ActiveCard
            key={index}
            isActive={isActive === e}
            onClick={() => {
              setIsActive(e);
            }}
          >
            <div className="text-lg text-center my-1">
              {e.toUpperCase()} ({pynthsCategoriesCount[index]})
            </div>
          </ActiveCard>
        ))}
      </div>
    </div>
  );
};
export default PynthsCategory;
