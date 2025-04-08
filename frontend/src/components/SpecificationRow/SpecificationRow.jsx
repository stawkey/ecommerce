import React from "react";

const SpecificationRow = ({ label, value }) => {
    return (
        <tr className="border-y border-[#efe0dc]">
            <th className="w-1/4 p-3 text-left">{label}</th>
            <td className="p-3">{value}</td>
        </tr>
    );
};

export default SpecificationRow;
