'use server'

// Server Action to delete table
const deleteTable = async (dbName, tableName) => {
  console.log(dbName, tableName)
  const url = `http://localhost:8000/api/database/${dbName}/tables/${tableName}/delete`;

  try {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch table: ${response.statusText}`);
    }

    const result = await response.json();

    if (result) {
      // Remove the ".db" extension from each database name and return the result
      return result;
    } else {
      console.error('No Tables found');
      return "No Tables found";
    }
  } catch (error) {
    console.error('Error fetching tables:', error);
    return `Error fetching tables: ${error}`;
  }
};


export default deleteTable;