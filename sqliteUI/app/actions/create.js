'use server'


const create = async (folderPath) => {
    console.log(folderPath)
  try {
    const response = await fetch('http://localhost:8000/api/databases/select-folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderPath: folderPath }),
    });  

    const data = await response.json();
    if (response.ok) {
        console.log(`Connected to folder: ${data.folderPath}`);
    } else {
        console.log(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error('Error creating database:', error);
    return { success: false, error: error.message };
  }
};

export default create;