import { Database, Code, LayoutDashboard, GitBranch, Terminal, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SQLite Online Editor</h1>
          <nav className="space-x-4">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#get-started" className="text-gray-600 hover:text-gray-900">
              Get Started
            </Link>
            <Link href="https://github.com" target="_blank" className="text-gray-600 hover:text-gray-900">
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-4">
          Simplify Database Management
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          An open-source SQLite Online Editor for developers. Create, update, delete databases, manage tables, execute SQL queries, and much more.
        </p>
        <div className="space-x-4">
          <Link href="https://github.com" target="_blank" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
              GitHub Repository
          </Link>
          <Link href="#features" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300">
            
              Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <Database className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold">Database Management</h3>
              <p className="text-gray-700">
                Select a database folder, create new databases, and manage existing ones effortlessly.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold">Dashboard</h3>
              <p className="text-gray-700">
                Insert, update, and delete data directly from the interactive dashboard.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Terminal className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold">SQL Editor</h3>
              <p className="text-gray-700">
                Execute SQL queries in a powerful and easy-to-use SQL editor.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <Code className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold">Open Source</h3>
              <p className="text-gray-700">
                Clone the repository from GitHub and start using the tool immediately.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <GitBranch className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold">Version Control</h3>
              <p className="text-gray-700">
                Manage your database changes effectively with seamless version control.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Zap className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold">Fast & Efficient</h3>
              <p className="text-gray-700">
                Perform database operations quickly with an intuitive user interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="get-started" className="bg-blue-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8">
          Clone the repository, run the app, and streamline your SQLite database management today.
        </p>
        <Link href="https://github.com" target="_blank" className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100">
            Go to GitHub
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>&copy; 2024 SQLite Online Editor. All rights reserved.</p>
      </footer>
    </div>
  );
}
