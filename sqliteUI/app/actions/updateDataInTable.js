'use server';

const updateDataInTable = async (dbName, tableName, id, data) => {
    console.log("Update data action ", data);
    const keys = Object.keys(data);
    const inputValues = Object.values(data);
    const updatedKeys = keys.filter((val) => val !== 'id');
    const updatedValues = inputValues.filter((val) => val !== id);

    try {
        const response = await fetch(`http://localhost:8000/api/database/${dbName}/tables/${tableName}/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({keys: updatedKeys, inputValues: updatedValues})
        }); 
 
        if (!response.ok) {
        throw new Error(`Error inserting in table: ${response.statusText}`);
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating data in table:', error);
        return { success: false, error: error.message };
    }
};


export default updateDataInTable;