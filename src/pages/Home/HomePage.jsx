import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ThemeToggle from '../../components/ThemeToggle'
import { ShoppingBag, Users, Package, Sparkles } from 'lucide-react'

export default function HomePage() {
  const noOfCakes = useSelector((state) => state.cake.count)
  const noOfIceCreams = useSelector((state) => state.iceCream.count)
  const theme = useSelector(state => state.theme.mode)

  return (
    <div className={`min-h-screen relative flex flex-col items-center ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' fill-opacity='0.02'/></g></g></svg>%3E')] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <ThemeToggle />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full flex flex-col items-center justify-start px-4 py-12">
        
        {/* Header */}
        <header className="text-center mb-16 max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              Redux Toolkit
            </h1>
          </div>
          <p className="text-2xl text-gray-300 mb-4">Mini Demos</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Quick, clear examples to learn Redux Toolkit step by step with modern UI design
          </p>
        </header>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Reducers Demo Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-orange-500">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Reducers Demo</h2>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Simple state changes with Redux slices. Learn how to manage inventory with actions and reducers.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Package className="w-4 h-4" />
                  Inventory management example
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-white font-semibold">Current Cakes: </span>
                  <span className="bg-pink-500/20 px-3 py-1 rounded-full text-pink-300 font-bold">
                    {noOfCakes}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-white font-semibold">Current Ice Creams: </span>
                  <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-300 font-bold">
                    {noOfIceCreams}
                  </span>
                </div>
              </div>
              
              <Link 
                to="/shop" 
                className="block w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white text-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Open Reducers Demo
              </Link>
            </div>
          </div>

          {/* Thunk + API Demo Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Thunk + API Demo</h2>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Async operations with createAsyncThunk. Complete CRUD operations with API integration.
              </p>
              
              <ul className="space-y-2 mb-8 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  Fetch users via <code className="bg-gray-800 px-2 py-1 rounded text-blue-300">createAsyncThunk</code>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  Handle loading states & errors elegantly
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                  Normalized state with <code className="bg-gray-800 px-2 py-1 rounded text-indigo-300">createEntityAdapter</code>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                  Complete user management system
                </li>
              </ul>
              
              <Link 
                to="/users" 
                className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Open Thunk & API Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
