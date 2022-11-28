import React, { FC } from "react";
import { TooltipProps } from "../types/Custom.types";

const Tooltip: FC<TooltipProps> = (props) => {
  const { error, message, directon } = props;
  return error ? (
    <></>
  ) : (
    <div
      className={`absolute w-[200px] top-[50%] translate-y-[-50%] ${
        directon === "left" ? "left-[-214px]" : "right-[-214px]"
      }`}
    >
      <div
        className={`relative flex before:content-[''] ${
          directon === "left"
            ? `after:absolute after:border after:w-0 after:h-0 after:top-[50%] after:translate-y-[-50%] after:right-[-9px] 
              ${"after:border-t-[8px] after:border-b-[8px] after:border-l-[8px] after:border-t-[#00000000] after:border-b-[#00000000] after:border-l-[#f03b3b]"}`
            : `before:absolute before:border before:w-0 before:h-0 before:top-[50%] before:translate-y-[-50%] before:left-[-9px] 
              ${"before:border-t-[8px] before:border-b-[8px] before:border-r-[8px] before:border-t-[#00000000] before:border-b-[#00000000] before:border-r-[#f03b3b]"}`
        }`}
      >
        <span className="w-full text-center bg-[#f03b3b50] border border-[#f03b3b] rounded p-1 px-2 text-sm">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Tooltip;
