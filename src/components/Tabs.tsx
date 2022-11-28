import React, { FC } from "react";
import { TabsProps } from "../types/Custom.types";

const Tabs: FC<TabsProps> = (props) => {
  const statusArr = ["all", "pending", "completed"];
  const tabStatusArr = ["", false, true];

  const { tabStatus, setTabStatus, setPageNo } = props;

  const handleStatus = (status: string) => {
    setPageNo(1);
    switch (status) {
      case statusArr[0]:
        setTabStatus("");
        break;
      case statusArr[1]:
        setTabStatus(false);
        break;
      case statusArr[2]:
        setTabStatus(true);
        break;
      default:
        setTabStatus("");
    }
  };

  return (
    <div className="my-4 mx-2">
      <div className="flex">
        {statusArr.map((item, index) => {
          return (
            <div
              className={`p-2 px-4 border-gray-300 capitalize cursor-pointer ${
                tabStatus === tabStatusArr[index]
                  ? "border-t border-l border-r rounded-tl rounded-tr bg-[#ffffff]"
                  : "border-b"
              }`}
              onClick={() => handleStatus(item)}
              key={index}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
