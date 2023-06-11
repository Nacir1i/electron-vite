import React from "react";
import { Await } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

const TableCell = ({ contentType, contentValue, className, isCompact }) => {
  const _className = className || "";
  switch (contentType) {
    case "raw":
      return contentValue;
    case "link":
      return <td className={`text-highlight font-semibold text-sm underline ${_className}`}>
        <Link to={contentValue.href}>{contentValue.text}</Link>
      </td>
    case "wrapped":
      return <td className={_className}>
        {contentValue}
      </td>
    case "head":
      return <td className={_className}>{contentValue}</td>
    case "text":
    default:
      return <td className={`text-sm h-${isCompact ? "8" : "12"} ${_className}`}>{contentValue}</td>
  }
}

const TableBodyRows = ({ rows = [], isCompact }) => {
  return rows.map((cells, row_idx) => {
    return (
      <tr key={128 * (row_idx + 1)}>
        {cells.map((cell, cell_idx) => <TableCell isCompact={isCompact} {...cell} key={[cell_idx.toFixed(2), Math.random().toFixed(5)].join("-")} />)}
      </tr>
    );
  });
}

const TableHeadRow = ({ head }) => {
  return <tr className="font-bold text-base font-asap text-highlight">
    {head.map((cell, cell_idx) => <TableCell {...cell} key={cell_idx} />)}
  </tr>
}

export const Table = ({ rows = [], head = [], isCompact = false, className = "" }) => {
  return (
    <table className={`bg-secondary px-${isCompact ? 0 : 4} w-full h-fit border-separate border-spacing-y-${isCompact ? "0" : "4"} ${className}`}>
      <thead>
        <TableHeadRow head={head} />
      </thead>
      <tbody>
        <TableBodyRows rows={rows} isCompact={isCompact} />
      </tbody>
    </table>
  );
}

export const TableAsync = ({ head, rowsPromise, isCompact }) => {
  const Filler = () => new Array(Math.floor((head || []).length / 2)).map(() => <td className="w-full h-full"></td>)
  // TODO: Fix Loading alignment.
  const TableLoading = function () {
    return <tr className="w-full h-16">
      <Filler />
      <td className="w-full h-full flex justify-center items-center p-4">
        <AiOutlineLoading className="animate-spin text-4xl" />
      </td>
    </tr>;
  }
  return <table className={`bg-secondary px-4 w-full h-fit border-separate border-spacing-y-${isCompact ? "0" : "4"}`}>
    <thead>
      <TableHeadRow head={head ?? []} />
    </thead>
    <tbody className="relative">
      <React.Suspense fallback={<TableLoading />}>
        <Await resolve={rowsPromise} children={(rows) => <TableBodyRows rows={rows ?? []} isCompact={isCompact} />} />
      </React.Suspense>
    </tbody>
  </table>
}

export default Table;