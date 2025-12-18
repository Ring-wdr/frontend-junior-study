import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 font-sans text-gray-900">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Frontend Study Dashboard
        </h1>
        <p className="text-lg text-gray-500">
          Select a week to view the curriculum and interactive examples.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          <Link
            to="/week-1"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md group-hover:bg-blue-100 transition-colors">
                Week 1
              </span>
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                JS Deep Dive
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                Event Loop, `this`, Closures, and Async patterns.
              </p>
            </div>
          </Link>

          {/* Placeholders for future weeks */}
          {[2, 3, 4, 5, 6].map((week) => (
            <div
              key={week}
              className="p-6 bg-gray-50 rounded-xl border border-gray-100 opacity-50 cursor-not-allowed"
            >
              <div className="flex flex-col items-start text-left space-y-2">
                <span className="text-sm font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                  Week {week}
                </span>
                <h2 className="text-xl font-semibold text-gray-300">
                  Coming Soon
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
