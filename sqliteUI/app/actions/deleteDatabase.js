'use server'
 
// Server Action to delete table
const deleteDatabase = async (dbName) => {
  console.log("delet database function ",dbName)
  const url = `http://localhost:8000/api/database/${dbName}/delete`;

  try {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch table: ${response.statusText}`);
    }

    const result = await response.json();

    if (result) {
      // Remove the ".db" extension from each database name and return the result
      return result;
    } else {
      console.error('No Database found');
      return "No Database found";
    }
  } catch (error) {
    console.error('Error fetching database:', error);
    return `Error fetching database: ${error}`;
  }
};


export default deleteDatabase;