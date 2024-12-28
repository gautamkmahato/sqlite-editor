'use server'

// Server Action to fetch table names from a database
const fetchTables = async (dbName) => {
  const url = `http://localhost:8000/api/databases/${dbName}/tables`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch tables: ${response.statusText}`);
    }

    const result = await response.json();
    const tables = result[dbName];

    console.log(tables)
    
    if (tables) {
      return tables.map(t => t.name); // Return the list of table names
    } else {
      console.error('No tables found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching tables:', error);
    return [];
  }
};


export default fetchTables;