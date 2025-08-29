import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/theme/themeSlice'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme.mode)

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  )
}