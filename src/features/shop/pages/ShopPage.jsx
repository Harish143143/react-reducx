import CakeCard from "../components/CakeCard"
import IceCreamCard from "../components/IceCreamCard"
import ThemeToggle from "../../../components/ThemeToggle"
import { Link } from "react-router-dom"
import { Home, Store } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function ShopPage() {
  const theme = useSelector(state => state.theme.mode)

  return (
    <div className={`min-h-screen relative flex flex-col items-center ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      <ThemeToggle />
      
      <div className="relative z-10 w-full flex flex-col items-center px-4 py-12">
        
        {/* Header */}
        <header className="text-center mb-8 max-w-3xl">
          <div className="h-30 flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="w-fit h-30 text-5xl font-bold text-white">
              Sweet Delights Bakery
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Discover our handcrafted collection of premium cakes and artisanal ice creams
          </p>

          {/* Back to Home Button - moved here */}
          <Link 
            to="/"
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Home className="w-6 h-6" />
            Back to Home
          </Link>
        </header>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <CakeCard />
          <IceCreamCard />
        </div>
      </div>
    </div>
  )
}
