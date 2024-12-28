'use client'

import React, { useState, useRef } from "react";

export default function Page() {
    const keysArray = ["id", "title", "content", "description", "date"];
    const [formState, setFormState] = useState(
        keysArray.reduce((acc, key) => {
            acc[key] = "";
            return acc;
        }, {})
    );

    const [name, setName] = useState('')

    const localFormState = useRef({ ...formState });

    const handleChange = (key, value) => {
        localFormState.current[key] = value; // Update local state
    };

    const handleSubmit = () => {
        setFormState({ ...localFormState.current }); // Sync local state with React state
    };

    const arr = [
        {
            name: "Gautam",
            age: 20,
            city: "Jamshedpur"
        },
        {
            name: "Kumar",
            age: 25,
            city: "Ranchi"
        },
        {
            name: "Mahato",
            age: 22,
            city: "Delhi"
        },
        {
            name: "John",
            age: 20,
            city: "New yorrk"
        }
    ]

    return (
        <>
            <h1>Local State Example</h1>
            {keysArray.map((key) => (
                <div key={key} className="mb-4">
                    <label className="block font-bold">{key}</label>
                    {key === 'content' ? <textarea
                        type="text"
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="border p-2 rounded w-full"
                        placeholder={`Enter ${key}`}
                    /> : key === 'date' ? <input
                        type="date"
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="border p-2 rounded w-full"
                        placeholder={`Enter ${key}`}
                    /> : <input
                        type="text"
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="border p-2 rounded w-full"
                        placeholder={`Enter ${key}`}
                    />}
                    
                </div>
            ))}

            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
            </button>

            {/* <pre>{JSON.stringify(formState, null, 2)}</pre> */}
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>age</td>
                        <td>city</td>
                    </tr>
                </thead>
            </table>
            {arr.map((val, index) =>(
                <tr key={index}>
                    <td value={name} onChange={() => setName(e.target.value)}>
                        {val.name}
                    </td>
                    <td>
                        {val.age}
                    </td>
                    <td>
                        {val.city}
                    </td>
                </tr>
            ))}
        </>
    );
}
