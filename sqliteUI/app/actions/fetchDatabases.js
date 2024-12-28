'use server'

// Server Action to fetch database names
const fetchDatabases = async () => {
  const url = 'http://localhost:8000/api/databases/table/length';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch databases: ${response.statusText}`);
    }

    const { result } = await response.json();

    if (result) {
      // Remove the ".db" extension from each database name and return the result
      return result
    } else {
      console.error('No databases found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching databases:', error);
    return [];
  }
};


export default fetchDatabases;