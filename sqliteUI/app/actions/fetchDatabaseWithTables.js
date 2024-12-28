'use server'

// Server Action to fetch database names
const fetchDatabaseWithTables = async () => {
  const url = 'http://localhost:8000/api/databases/tables';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch databases: ${response.statusText}`);
    }

    const databases = await response.json();

    if (databases) {
      // Remove the ".db" extension from each database name and return the result
      return databases.data
    } else {
      console.error('No databases found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching databases:', error);
    return [];
  }
};


export default fetchDatabaseWithTables;