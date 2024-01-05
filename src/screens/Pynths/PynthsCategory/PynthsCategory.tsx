import { useSelector } from "react-redux";
import { RootState } from "reducers";

import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/flicking/dist/flicking.css";
import { useEffect, useState } from "react";
import { Arrow } from "@egjs/flicking-plugins";
import ActiveCard from "components/ActiveCard";
import categories from "configure/coins/categories";
import pynths from "configure/coins/pynths";
// import "swiper/css";
import "./PynthsCategory.css";

const PynthsCategory = ({ isActive, setIsActive }) => {
  const { pynthsIsReady } = useSelector((state: RootState) => state.app);
  const [activeCategory, setActiveCategory] = useState(0);

  const [pynthsCategories, setPynthsCategories] = useState([]);
  const [pynthsCategoriesCount, setPynthsCategoriesCount] = useState([]);

  const getCount = () => {
    let value = [];

    const uniqPynths = Object.keys(pynths).map((e) => pynths[e]).flat().reduce(function(acc, current) {
      if (acc.findIndex(({ symbol }) => symbol === current.symbol) === -1) {
        acc.push(current);
      }
      return acc;
    }, []);

    pynthsCategories.forEach((category) => {
      if (category === "all") {
        value.push(uniqPynths.length);
      } else {
        const count = uniqPynths.filter((e) => e.categories.includes(category))
            .length
        count && value.push(count);
      }
    });

    console.log(value);
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
    <div className="flex w-full justify-center">
      <div className="hidden mb-3 gap-1 text-lg font-light p-4">
        <Flicking
          className="h-15 bg-navy-500 mb-5 text-lg font-light p-4"
          plugins={[new Arrow()]}
          moveType="freeScroll"
          bound={true}
        >
          {pynthsCategories.map((e, index) => (

            pynthsCategoriesCount[index] && <span
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
              <img src="/images/icon/left-arrow.svg" alt="left_arrow"/>
            </span>
            <span className="flicking-arrow-next w-8">
              <img src="/images/icon/right-arrow.svg" alt="right_arrow"/>
            </span>
          </ViewportSlot>
        </Flicking>
      </div>

      <div className="flex mb-3 gap-1 h-10 w-[90%] lg:w-full">
        {pynthsCategories.map((e, index) => (
          pynthsCategoriesCount[index] && <ActiveCard
            key={index}
            isActive={isActive === e}
            onClick={() => {
              setIsActive(e);
            }}
          >
            <div className="inline-block text-sm lg:text-lg font-bold">
              {e.toUpperCase()} ({pynthsCategoriesCount[index]})
            </div>
          </ActiveCard>
        ))}
      </div>
    </div>
  );
};
export default PynthsCategory;
