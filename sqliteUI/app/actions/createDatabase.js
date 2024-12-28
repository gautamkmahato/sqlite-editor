'use server'


const createDatabase = async (newDbName) => {
  try {
    const response = await fetch('http://localhost:8000/api/databases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newDbName })
    });

    if (!response.ok) {
      throw new Error(`Error creating database: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating database:', error);
    return { success: false, error: error.message };
  }
};

export default createDatabase;