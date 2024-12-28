'use server';

const createTable = async (dbName, tableName, columns) => {
  try {
    const response = await fetch(`http://localhost:8000/api/databases/${dbName}/tables`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tableName, columns })
    });

    if (!response.ok) {
      throw new Error(`Error creating table: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating table:', error);
    return { success: false, error: error.message };
  }
};


export default createTable;