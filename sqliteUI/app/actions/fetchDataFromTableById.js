'use server'

// Server Action to fetch table data
const fetchDataFromTableById = async (dbName, tableName, id) => {
    const url = `http://localhost:8000/api/databases/${dbName}/tables/${tableName}/data/${id}`;
    console.log(dbName, tableName);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();

        if (result) {
            console.log(result);
        return result; // Return the fetched metadata
        } else {
            console.error('No metadata found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching table data:', error);
        return null;
    }
};


export default fetchDataFromTableById;