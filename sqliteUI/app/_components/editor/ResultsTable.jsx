import { memo, useState } from "react";

const Tables = memo(function Tables({ results, keysArray, setState}) { 
    if (!results.length) return null;
    console.log("Tables rendered");
    console.log(results);

    const [selectedRow, setSelectedRow] = useState(null); // Track the selected row index

    const handleCheckboxChange = (id) => {
        setSelectedRow((prev) => (prev === id ? null : id)); // Toggle the selected state
        const isSelected = selectedRow !== id; // Check if the new row is selected
        console.log(`Selected row: ${isSelected ? id : "None"}`);
        if(isSelected){
            console.log(id)
            setState(true, id);
        } else{
            setState(false, null);
        }
    };

    return (
        <div className='bg-white p-4'>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left border border-gray-300">
                                Select
                            </th>
                            {keysArray.map((value, index) => (
                                <th key={index} className="px-4 py-2 text-left border border-gray-300">
                                    {value}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((row) => {
                            const isSelected = selectedRow === row.id;
                            return (
                                <tr key={row.id} className={`border-t ${isSelected ? "bg-blue-100" : ""}`}>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleCheckboxChange(row.id)}
                                        />
                                    </td>
                                    {keysArray.map((val, colIndex) => (
                                        <td key={colIndex} className="px-4 py-2 border border-gray-300">
                                            {row[val]}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default Tables;
