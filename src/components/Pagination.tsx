import React, { FC, useState } from "react";
import { PaginationProps } from "../types/Custom.types";

const Pagination: FC<PaginationProps> = (props) => {
  const { pageNo, setPageNo, perPage, size } = props;
  const totalPages = Math.ceil(size / perPage);

  const [pageText, setPageText] = useState<number>(pageNo);

  return (
    <div className="shadow-sm border flex items-center overflow-hidden rounded-lg">
      <button
        className="py-3 px-3 border bg-[#ffffff] hover:bg-[#eeeeee] cursor-pointer"
        onClick={() => {
          if (pageNo > 1) {
            setPageNo((cs: number) => cs - 1);
            setPageText(pageNo - 1);
          }
        }}
      >
        {" "}
        Prev
      </button>
      <input
        type="text"
        className="w-8 p-0 outline-none text-center h-full border-t border-l border-b hover:bg-[#eeeeee]"
        value={pageText}
        onChange={(e) => {
          const regex = new RegExp(/^[1-9]/g);
          const val: number | string = e.target.value;
          if (
            (regex.test(val) && Number(val) > 0 && Number(val) <= totalPages) ||
            val === ""
          ) {
            setPageText(Number(val));
            if (val !== "") setPageNo(Number(val));
          } else setPageText(1);
        }}
      />
      <div className="py-3 pr-3 border-t border-r border-b bg-[#ffffff] cursor-pointer">
        {" / " + totalPages}
      </div>
      <button
        className="py-3 px-3 border bg-[#ffffff] hover:bg-[#eeeeee] cursor-pointer"
        onClick={() => {
          if (pageNo < totalPages) {
            setPageNo((cs: number) => cs + 1);
            setPageText(pageNo + 1);
          }
        }}
      >
        {" "}
        Next{" "}
      </button>
    </div>
  );
};

export default Pagination;
