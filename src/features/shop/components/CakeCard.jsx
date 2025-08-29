import { useDispatch, useSelector } from 'react-redux'
import { ordered, restocked } from '../cakeSlice'
import { ShoppingCart, Package } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CakeCard() {
  const count = useSelector(state => state.cake.count)
  const dispatch = useDispatch()

  return (
    <motion.div 
      whileHover={{ scale: 1.03, rotate: 0.3 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 
      dark:from-pink-950/40 dark:via-rose-900/30 dark:to-pink-800/30 
      p-7 shadow-xl hover:shadow-2xl border border-pink-200/60 dark:border-pink-700/40 backdrop-blur-sm"
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity duration-500">
        <img 
          src="https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg" 
          alt="Cakes background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-600/30 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-pink-500/20 backdrop-blur-sm">
            <Package className="w-7 h-7 text-pink-600 dark:text-pink-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Premium Artisan Cakes
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-5 text-sm">
          Indulge in handcrafted cakes made with the finest ingredients. From soft vanilla sponge 
          to rich chocolate ganache — every bite is pure artistry.
        </p>

        {/* Stock Indicator */}
        <div className="mb-5">
          <div className="flex justify-between text-sm mb-1 text-gray-600 dark:text-gray-300">
            <span>In Stock</span>
            <span className="font-semibold">{count}</span>
          </div>
          <div className="w-full h-3 rounded-full bg-pink-200/50 dark:bg-pink-900/40 overflow-hidden">
            <div 
              style={{ width: `${Math.min(count * 10, 100)}%` }} 
              className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all"
            ></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 
            hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-xl font-semibold 
            shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => dispatch(ordered())}
            disabled={count === 0}
          >
            <ShoppingCart className="w-5 h-5" />
            Order Cake
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 bg-white/80 dark:bg-gray-900/70 
            border border-pink-200 dark:border-pink-700 text-pink-600 dark:text-pink-400 
            px-6 py-3 rounded-xl font-semibold hover:bg-pink-50 dark:hover:bg-gray-800 
            shadow-md hover:shadow-xl transition-all"
            onClick={() => dispatch(restocked(5))}
          >
            <Package className="w-5 h-5" />
            Restock 5
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
