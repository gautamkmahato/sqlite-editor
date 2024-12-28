import { Users, Star, Search, Settings, Filter, Github, Info, Database, LayoutDashboard, Terminal, Code, GitBranch, Zap } from 'lucide-react';
import GeometricBackground from './_components/GeometricBackground';
import desktop from '../public/assets/desktop.png'
import test from '../public/assets/SCREEN.jpg'
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    
  return (
    <div className="min-h-screen bg-white">


      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
        {/* GeometricBackground */}
        <div className="absolute inset-0 overflow-hidden">
          <GeometricBackground />
        </div>

        
        <div className="relative text-center">  
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Simplify Database Management
        </h2>
          <p className="text-lg text-gray-700 mb-8">
          An open-source SQLite Online Editor for developers. Create, update, delete databases, manage tables, execute SQL queries, and much more.
        </p>


        <div className="space-x-4 mb-10">
          {/* GitHub Button */}
          <Link 
            href="https://github.com" 
            target="_blank" 
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900"
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub Repository
          </Link>
          
          {/* Learn More Button */}
          <Link 
            href="#features" 
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300"
          >
            <Info className="w-5 h-5 mr-2" />
            Learn More
          </Link>
        </div>


          {/* Testimonials */}
          <div className="flex justify-center items-center mb-16">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white" />
            </div>
            <div className="flex items-center ml-4">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 font-semibold">4.8+</span>
              <span className="ml-2 text-gray-600">From 40+ Users</span>
            </div>
          </div>

          {/* Product Preview */}
          <div className="relative mx-auto w-[70%] mt-12">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-center py-8 bg-gray-100">
          {/* Outer Border (Laptop Frame) */}
          <div className="relative bg-gray-400 rounded-xl p-2 shadow-lg w-[800px] h-[500px]">
            {/* Inner Border */}
            <div className="bg-black rounded-lg w-full h-full p-4">
              {/* Screen (Image) */}
              <div className="w-full h-full rounded-md bg-black">
                <div 
                  className="w-full h-full bg-cover bg-center rounded-md" 
                  style={{
                    backgroundImage: `url(${test.src})`,
                    backgroundSize: 'contain', // Fit the image
                    backgroundRepeat: 'no-repeat', // Avoid repetition
                  }}
                />
              </div>
            </div>
          </div>
        </div>
            </div>
          </div>

        </div>

      </div>

{/* Features Section */}
<section id="features" className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <Database className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Database Management</h3>
              <p className="text-gray-700">
                Select a database folder, create new databases, and manage existing ones effortlessly.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Dashboard</h3>
              <p className="text-gray-700">
                Insert, update, and delete data directly from the interactive dashboard.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Terminal className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">SQL Editor</h3>
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
              <h3 className="text-xl font-bold text-gray-800">Open Source</h3>
              <p className="text-gray-700">
                Clone the repository from GitHub and start using the tool immediately.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <GitBranch className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Version Control</h3>
              <p className="text-gray-700">
                Manage your database changes effectively with seamless version control.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Zap className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Fast & Efficient</h3>
              <p className="text-gray-700">
                Perform database operations quickly with an intuitive user interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="get-started" className="bg-white py-16 text-center text-gray-800">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-700 mb-8">
          Clone the repository, run the app, and streamline your SQLite database management today.
        </p>
        {/* GitHub Button */}
        <Link 
            href="https://github.com" 
            target="_blank" 
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900"
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub Repository
          </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>&copy; 2024 SQLite Online Editor. All rights reserved.</p>
      </footer>

    </div>
  );
};