const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware to parse JSON request bodies
const corsOptions = {
  origin: 'http://localhost:3000', // Set to your frontend origin
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

let userDatabaseFolder = ''; // Store user-selected folder path in memory or cache
let DB_DIR = '';

// Set database folder
app.post('/api/databases/select-folder', express.json(), (req, res) => {
    const { folderPath } = req.body;
    console.log(folderPath)

    DB_DIR = path.join(__dirname, folderPath);
    if (!fs.existsSync(DB_DIR)) {
      res.status(400).json({ error: 'Invalid folder path' });
      return;
    }

    userDatabaseFolder = DB_DIR;
    console.log(DB_DIR)
    res.json({ message: 'Database folder selected successfully', folderPath });
});


//Get list of databases
app.get('/api/databases', (req, res) => {
    fs.readdir(DB_DIR, (err, files) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const databases = files.filter(file => file.endsWith('.db'));
        console.log(databases)
        res.json({ databases });
    });
});

// Create new database
app.post('/api/databases', express.json(),  (req, res) => {
    const { name } = req.body;
    console.log(name)
    if (!name) {
        res.status(400).json({ error: 'Database name is required' });
        return;
    }

    const dbPath = path.join(DB_DIR, `${name}.db`);
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Database created successfully', name });
    });
    db.close();
});

// delete database
app.delete('/api/database/:dbName/delete', (req, res) => {
  const dbName = req.params.dbName;
  const dbPath = path.join(DB_DIR, `${dbName}.db`);

  // Check if the database file exists
  if (fs.existsSync(dbPath)) {
    try {
      fs.unlinkSync(dbPath); // Delete the file
      res.status(200).json({ message: `Successfully deleted the database ${dbName}` });
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ error: `Error deleting the database: ${err.message}` });
    }
  } else {
    res.status(404).json({ error: `Database not found: ${dbName}` });
  }
});

  
// Get tables in a database
app.get('/api/databases/:name/tables', (req, res) => {
    const name = req.params.name;
    const dbPath = path.join(DB_DIR, `${name}.db`);
    const db = new sqlite3.Database(dbPath);

    db.all(`
        SELECT * FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `, (err, tables) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ [name]: tables });
    });
    db.close();
});

// Get tables List with database
app.get('/api/databases/tables', async (req, res) => {
  try {
    const files = await fs.promises.readdir(DB_DIR);
    const databases = files.filter(file => file.endsWith('.db'));

    const result = [];
    
    for (const database of databases) {
      const dbPath = path.join(DB_DIR, database);
      const db = new sqlite3.Database(dbPath);

      await new Promise((resolve, reject) => {
        db.all(
          `
          SELECT name 
          FROM sqlite_master 
          WHERE type='table' AND name NOT LIKE 'sqlite_%'
          `,
          (err, tables) => {
            if (err) {
              reject(err);
              return;
            }
            result.push({ database, tables });
            resolve();
          }
        );
        db.close();
      });
    }

    res.status(200).json({ message: 'Success', data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new table
app.post('/api/databases/:name/tables', express.json(), (req, res) => {
    const { tableName, columns } = req.body;
    const name = req.params.name;
    if (!tableName || !columns || !columns.length) {
        res.status(400).json({ error: 'Table name and columns are required' });
        return;
    }

    const dbPath = path.join(DB_DIR, `${name}.db`);
    const db = new sqlite3.Database(dbPath);

    const columnDefinitions = columns.map(col => 
        `${col.name} ${col.type} ${col.primaryKey ? ' PRIMARY KEY' : ''} ${col.notNull ? ' NOT NULL' : ''}`
    ).join(', ');

    //console.log(columnDefinitions)

    const query = `CREATE TABLE ${tableName} (${columnDefinitions})`;

    db.run(query, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Table created successfully', tableName });
    });
    db.close();
});

// Get tables meta data
app.get('/api/databases/:name/table/metadata', (req, res) => {
  const dbPath = path.join(DB_DIR, `${req.params.name}.db`);
  const db = new sqlite3.Database(dbPath);

  // Retrieve table metadata
  db.all(`PRAGMA table_info(users);`, (err, tableInfo) => {
    if (err) {
      res.status(500).json({ error: `Failed to retrieve metadata for table: users` });
      db.close();
      return;
    }

    if (tableInfo.length === 0) {
      res.status(404).json({ error: `Table not found: users` });
    } else {
      res.json({ metadata: tableInfo });
    }

  });

  db.close();
});

// Get data
app.get('/api/databases/:name/tables/:table/data', (req, res) => {
    const dbPath = path.join(DB_DIR, `${req.params.name}.db`);
    const db = new sqlite3.Database(dbPath);

    db.all(`SELECT * FROM ${req.params.table}`, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
    db.close();
});

// Get table metadata
app.get('/api/databases/:dbName/tables/:tableName/metadata', (req, res) => {
  const dbName = req.params.dbName;
  const tableName = req.params.tableName;

  // Build the database file path
  const dbPath = path.join(DB_DIR, `${dbName}.db`);

  // Check if the database exists
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      res.status(500).json({ error: `Database not found: ${dbName}` });
      return;
    }
  });

  // Retrieve table metadata
  db.all(`PRAGMA table_info(${tableName});`, (err, tableInfo) => {
    if (err) {
      res.status(500).json({ error: `Failed to retrieve metadata for table: ${tableName}` });
      db.close();
      return;
    }

    if (tableInfo.length === 0) {
      res.status(404).json({ error: `Table not found: ${tableName}` });
    } else {
      res.json({ tableName, metadata: tableInfo });
    }

    db.close();
  });
});

// delete table
app.delete('/api/database/:dbName/tables/:tableName/delete', (req, res) =>{
  const dbName = req.params.dbName;
  const tableName = req.params.tableName;

  // Build the database file path
  const dbPath = path.join(DB_DIR, `${dbName}.db`);

  // Check if the database exists
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      res.status(500).json({ error: `Database not found: ${dbName}` });
      return;
    }
  });

  const query = `DROP TABLE ${tableName}`;

  db.all(query, (err, result) =>{
    if(err){
      res.status(500).json({message: `Internal Server error ${err}`});
      return;
    } else{
      res.status(200).json({message: `Successfully deleted the table ${tableName}`, result: result, status: true});
    }
  });
  db.close();
})

// update table
app.put('/api/database/:dbName/tables/:tableName/update', (req, res) =>{
  const dbName = req.params.dbName;
  const tableName = req.params.tableName;

  // Build the database file path
  const dbPath = path.join(DB_DIR, `${dbName}.db`);

  // Check if the database exists
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      res.status(500).json({ error: `Database not found: ${dbName}` });
      return;
    }
  });

  const query = `UPDATE TABLE ${tableName} SET COLUMNS`;
})

// execute query
app.post('/api/database/:dbName/tables/:tableName/execute', express.json(), (req, res) =>{
  const dbName = req.params.dbName;
  const tableName = req.params.tableName;
  const { query } = req.body;
  console.log(query)

  // Build the database file path
  const dbPath = path.join(DB_DIR, `${dbName}.db`);

  // Check if the database exists
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      res.status(500).json({ error: `Database not found: ${dbName}` });
      return;
    }
  });

  db.all(query, (err, result) => {
    try {
      if (err) {
        // Handle SQL syntax or execution errors
        if (err.message.includes('syntax error')) {
          res.status(400).json({ message: `Bad Query: ${err.message}` });
        } else {
          res.status(500).json({ message: `Internal Server Error: ${err.message}` });
        }
        return;
      }
  
      // Determine query type
      const queryType = query.trim().split(' ')[0].toUpperCase();
  
      // Handle responses based on query type
      switch (queryType) {
        case 'SELECT':
          if (result.length === 0) {
            res.status(404).json({ message: 'No data found', data: [] });
          } else {
            res.status(200).json({ message: 'Query executed successfully', data: result });
          }
          break;
  
        case 'INSERT':
          res.status(200).json({ message: 'Data inserted successfully' });
          break;
  
        case 'UPDATE':
          res.status(200).json({ message: 'Data updated successfully' });
          break;
  
        case 'DELETE':
          res.status(200).json({ message: 'Data deleted successfully' });
          break;
  
        case 'CREATE':
        case 'ALTER':
        case 'DROP':
          res.status(200).json({ message: 'Schema updated successfully' });
          break;
  
        default:
          res.status(200).json({ message: 'Query executed successfully', data: result });
          break;
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      res.status(500).json({ message: 'Unexpected server error' });
    }
  });
  

})

app.get('/api/databases/table/length', async (req, res) => {
  console.log("Database length function called...");
  console.log(DB_DIR)
  try {
    if (!DB_DIR) {
      console.error("DB_DIR is not defined. Please set the database directory.");
      return res.status(400).json({ error: "Database directory is not set." });
    }

    console.log("Reading files from directory:", DB_DIR);
    const files = await fs.promises.readdir(DB_DIR);
    console.log("Files in directory:", files);

    const databases = files.filter(file => file.endsWith('.db'));
    console.log("Filtered database files:", databases);

    const result = await Promise.all(
      databases.map(async (database) => {
        const dbPath = path.join(DB_DIR, database);
        console.log(`Processing database: ${database}`);

        return new Promise((resolve, reject) => {
          const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
              console.error(`Error opening database ${database}:`, err.message);
              reject(`Database not found: ${database}`);
              return;
            }
          });

          db.all(
            `SELECT * FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`,
            (err, tables) => {
              if (err) {
                console.error(`Error querying tables in ${database}:`, err.message);
                reject(err.message);
              } else {
                console.log(`Tables found in ${database}:`, tables);
                resolve({ database, tables });
              }
              db.close();
            }
          );
        });
      })
    );

    res.status(200).json({ message: "Success", result });
  } catch (err) {
    console.error("Error in /api/databases/table/length:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// Add Data in the Table
app.post('/api/database/:dbName/tables/:tableName/add/data', express.json(), (req, res) =>{
  const dbName = req.params.dbName;
  const tableName = req.params.tableName;
  const input = req.body;

  const columns = input.keys.join(',');
  const values = input.inputValues;

  console.log(columns)
  console.log(values)

  // Build the database file path
  const dbPath = path.join(DB_DIR, `${dbName}.db`);

  // Check if the database exists
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      res.status(500).json({ error: `Database not found: ${dbName}` });
      return;
    }
  });

  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values.map(() => '?').join(',')})`;

  db.run(query, values, (err) => {
      if (err) {
          res.status(400).json({ message: `Error in Inserting Data: ${err.message}` });
          return;
      }
      res.status(200).json({ id: this.id, message: `Successfully Inserted Data in table ${tableName}`, success: true });
  });


  db.close();

})

// Delete Data in the Table
app.delete('/api/database/:dbName/tables/:tableName/delete/data', express.json(), (req, res) =>{
  const dbName = req.params.dbName;
  const tableName = req.params.tableName;
  const {id} = req.body;

  console.log(dbName, tableName, id)

  // Build the database file path
  const dbPath = path.join(DB_DIR, `${dbName}.db`);

  // Check if the database exists
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      res.status(500).json({ error: `Database not found: ${dbName}` });
      return;
    }
  });

  const query = `DELETE FROM ${tableName} WHERE id = ?`;

  db.run(query, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
        res.status(404).json({ error: 'Id not found' });
    } else {
        res.status(200).json({ message: 'Data deleted successfully', success: true });
    }
  });

  db.close();

})

// Get data by ID
app.get('/api/databases/:dbName/tables/:tableName/data/:id', (req, res) => {
  const dbName = req.params.dbName;
  const tableName = req.params.tableName;
  const id = req.params.id;

  const dbPath = path.join(DB_DIR, `${dbName}.db`);
  const db = new sqlite3.Database(dbPath);

  const query = `SELECT * FROM ${tableName} WHERE id = ?`;

  db.all(query, [id], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json({ message: "Success", data: rows, status: true });
  });
  db.close();
});

// update data by Id in table
app.put('/api/database/:dbName/tables/:tableName/update/:id', express.json(), (req, res) =>{
  const dbName = req.params.dbName;
  const tableName = req.params.tableName;
  const id = req.params.id;
  const {keys, inputValues} = req.body;

  console.log(dbName, tableName, id);
  console.log(keys);
  console.log(inputValues);

  // Build the database file path
  const dbPath = path.join(DB_DIR, `${dbName}.db`);

  // Check if the database exists
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      res.status(500).json({ error: `Database not found: ${dbName}` });
      return;
    }
  });

  // Safely construct the SET clause
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const query = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;

  const params = [...inputValues, id];

  db.run(query, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ id: id, status: "Successfully Updated" });
    }
  });



})

app.listen(8000, () => {
  console.log("Server is running on PORT 8000...");
});
