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

          <Link
            to="/week-2"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md group-hover:bg-blue-100 transition-colors">
                Week 2
              </span>
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                OOP & SOLID
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                Object-Oriented Programming and SOLID principles.
              </p>
            </div>
          </Link>

          <Link
            to="/week-3"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md group-hover:bg-blue-100 transition-colors">
                Week 3
              </span>
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                Component Patterns
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                Container vs Presentational, and more.
              </p>
            </div>
          </Link>

          <Link
            to="/week-4"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md group-hover:bg-blue-100 transition-colors">
                Week 4
              </span>
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                State Management
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                Deep Dive into Redux, Middleware, Modern Libraries
                (MobX/Recoil/Zustand), and more.
              </p>
            </div>
          </Link>

          <Link
            to="/week-5"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md group-hover:bg-blue-100 transition-colors">
                Week 5
              </span>
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                React & Next.js Advanced
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                Concurrency, React 19, App Router, and Data Strategies.
              </p>
            </div>
          </Link>

          <Link
            to="/week-6"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md group-hover:bg-blue-100 transition-colors">
                Week 6
              </span>
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                React & Next.js Advanced
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                Concurrency, React 19, App Router, and Data Strategies.
              </p>
            </div>
          </Link>

          <Link
            to="/week-7"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md group-hover:bg-blue-100 transition-colors">
                Week 7
              </span>
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                Forms & Validation
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                React Hook Form, Zod, async validation, security, and UX.
              </p>
            </div>
          </Link>

          <Link
            to="/week-8"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md group-hover:bg-red-100 transition-colors">
                Week 8
              </span>
              <h2 className="text-xl font-semibold group-hover:text-red-600 transition-colors">
                Frontend Testing
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                Unit, Integration, and E2E testing with Jest, Vitest, RTL, MSW.
              </p>
            </div>
          </Link>

          <Link
            to="/week-9"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-md group-hover:bg-purple-100 transition-colors">
                Week 9
              </span>
              <h2 className="text-xl font-semibold group-hover:text-purple-600 transition-colors">
                Framer Motion
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                Gestures, drag, layout animations, transitions, and performance.
              </p>
            </div>
          </Link>

          <Link
            to="/week-10"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md group-hover:bg-green-100 transition-colors">
                Week 10
              </span>
              <h2 className="text-xl font-semibold group-hover:text-green-600 transition-colors">
                GSAP Animation
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                GSAP basics, ScrollTrigger, SVG animations, and performance.
              </p>
            </div>
          </Link>

          <Link
            to="/week-11"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-md group-hover:bg-orange-100 transition-colors">
                Week 11
              </span>
              <h2 className="text-xl font-semibold group-hover:text-orange-600 transition-colors">
                Web Performance
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                Core Web Vitals, LCP, INP, CLS, and optimization strategies.
              </p>
            </div>
          </Link>

          <Link
            to="/week-12"
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left space-y-2">
              <span className="text-sm font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-md group-hover:bg-rose-100 transition-colors">
                Week 12
              </span>
              <h2 className="text-xl font-semibold group-hover:text-rose-600 transition-colors">
                Auth & Security
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                OAuth 2.0, OIDC, NextAuth.js, JWT, XSS, CSRF protection.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
