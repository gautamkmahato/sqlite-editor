'use server'

// Server Action to delete table
const deleteDataFromTable = async (dbName, tableName, id) => {
    console.log(dbName, tableName, id)
    const url = `http://localhost:8000/api/database/${dbName}/tables/${tableName}/delete/data`;
    const data = {
        id: id
    }
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
        throw new Error(`Failed to fetch table: ${response.statusText}`);
        }

        const result = await response.json();

        if (result) {
        return result;
        } else {
            console.error('No id found');
            return "No Id found";
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        return `Error deleting data: ${error}`;
    }
};


export default deleteDataFromTable;