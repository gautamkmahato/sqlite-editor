import Link from 'next/link';

export default function Documentation() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6 font-bold text-xl border-b border-gray-700">Documentation</div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link href="#introduction" className="block px-6 py-3 hover:bg-gray-700">
                Introduction
              </Link>
            </li>
            <li>
              <Link href="#getting-started" className="block px-6 py-3 hover:bg-gray-700">
                Getting Started
              </Link>
            </li>
            <li>
              <Link href="#connect-folder" className="block px-6 py-3 hover:bg-gray-700">
                Connect to Folder
              </Link>
            </li>
            <li>
              <Link href="#create-database" className="block px-6 py-3 hover:bg-gray-700">
                Create New Database
              </Link>
            </li>
            <li>
              <Link href="#create-table" className="block px-6 py-3 hover:bg-gray-700">
                Create New Table
              </Link>
            </li>
            <li>
              <Link href="#check-schema" className="block px-6 py-3 hover:bg-gray-700">
                Check Schema
              </Link>
            </li>
            <li>
              <Link href="#sql-editor" className="block px-6 py-3 hover:bg-gray-700">
                SQL Editor
              </Link>
            </li>
            <li>
              <Link href="#add-data" className="block px-6 py-3 hover:bg-gray-700">
                Add Data
              </Link>
            </li>
            <li>
              <Link href="#update-data" className="block px-6 py-3 hover:bg-gray-700">
                Update Data
              </Link>
            </li>
            <li>
              <Link href="#delete-data" className="block px-6 py-3 hover:bg-gray-700">
                Delete Data
              </Link>
            </li>
            <li>
              <Link href="#delete-table" className="block px-6 py-3 hover:bg-gray-700">
                Delete Table
              </Link>
            </li>
            <li>
              <Link href="#delete-database" className="block px-6 py-3 hover:bg-gray-700">
                Delete Database
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <section id="introduction" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Introduction</h2>
          <p className="text-gray-700">
            SQLite Online Editor is an open-source web-based tool designed to simplify database management tasks.
            It allows users to easily connect to a folder, create, update, and delete databases, as well as manage
            tables, schemas, and data. The tool also features a SQL editor for executing custom queries, making it
            an ideal solution for developers and database administrators alike.
          </p>
        </section>

        <section id="getting-started" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
          <ol className="list-decimal pl-6 text-gray-700">
            <li className="mb-2">Clone the repository from GitHub: <code>git clone &lt;repo-url&gt;</code></li>
            <li className="mb-2">Navigate to the project folder: <code>cd project-folder</code></li>
            <li className="mb-2">Install dependencies: <code>npm install</code></li>
            <li>Start the development server: <code>npm run dev</code></li>
          </ol>
        </section>

        <section id="connect-folder" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Connect to Folder</h2>
          <p className="text-gray-700">
            To connect to a folder, use the "Select Folder" option from the dashboard. This allows you to specify
            the directory where your SQLite databases are located.
          </p>
        </section>

        <section id="create-database" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Create New Database</h2>
          <p className="text-gray-700">
            You can create a new database by navigating to the "Databases" section and selecting the "Create New
            Database" option. Provide a name for your database and click "Save."
          </p>
        </section>

        <section id="create-table" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Create New Table</h2>
          <p className="text-gray-700">
            Use the "Create Table" feature in the "Tables" section to define a new table. Specify the table name,
            columns, and data types, then click "Create."
          </p>
        </section>

        <section id="check-schema" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Check Schema</h2>
          <p className="text-gray-700">
            To view the schema of a table, select the table from the list and click on "View Schema." This will
            display the table's structure, including columns and data types.
          </p>
        </section>

        <section id="sql-editor" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">SQL Editor</h2>
          <p className="text-gray-700">
            The SQL Editor allows you to execute custom SQL queries directly within the application. Use the query
            input field to write your SQL commands and click "Run" to execute them.
          </p>
        </section>

        <section id="add-data" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Add Data</h2>
          <p className="text-gray-700">
            To add data to a table, select the table from the list and click "Add Row." Fill in the required values
            for each column and save the changes.
          </p>
        </section>

        <section id="update-data" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Update Data</h2>
          <p className="text-gray-700">
            Update existing data by selecting a table, choosing a row to edit, and modifying the values. Save the
            changes to apply the updates.
          </p>
        </section>

        <section id="delete-data" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Delete Data</h2>
          <p className="text-gray-700">
            Delete data from a table by selecting the rows you want to remove and clicking "Delete." Confirm the
            action to complete the process.
          </p>
        </section>

        <section id="delete-table" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Delete Table</h2>
          <p className="text-gray-700">
            To delete a table, navigate to the "Tables" section, select the table, and click "Delete Table." Confirm
            the action to remove the table permanently.
          </p>
        </section>

        <section id="delete-database" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Delete Database</h2>
          <p className="text-gray-700">
            Delete a database by going to the "Databases" section, selecting the database, and clicking "Delete
            Database." Confirm the deletion to complete the process.
          </p>
        </section>
      </main>
    </div>
  );
}
