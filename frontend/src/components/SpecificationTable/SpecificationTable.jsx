import React, { forwardRef } from "react";
import SpecificationRow from "../SpecificationRow/SpecificationRow";

const SpecificationTable = forwardRef((props, ref) => {
    return (
        <div ref={ref} className="flex flex-col items-center pt-10">
            <div className="w-3/5">
                <h2 className="text-4xl text-left mb-3">Specifications</h2>
            </div>
            <table className="w-3/5">
                <tbody>
                    <SpecificationRow label="Connection" value="Wireless" />
                    <SpecificationRow label="Material" value="Aluminium" />
                    <SpecificationRow label="Audio system" value="Stereo 2.0" />
                </tbody>
            </table>
        </div>
    );
});

export default SpecificationTable;
