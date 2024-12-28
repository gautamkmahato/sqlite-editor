'use server'

// Server Action to fetch table data
const fetchTableData = async (dbName, tableName) => {
  const url = `http://localhost:8000/api/databases/${dbName}/tables/${tableName}/metadata`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const { metadata } = await response.json();

    if (metadata) {
      console.log(metadata);
      return metadata; // Return the fetched metadata
    } else {
      console.error('No metadata found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching table data:', error);
    return null;
  }
};


export default fetchTableData;