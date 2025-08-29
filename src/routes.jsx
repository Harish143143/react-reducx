import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Loader } from 'lucide-react'

const Home = lazy(() => import('./pages/Home/HomePage'))
const Shop = lazy(() => import('./features/shop/pages/ShopPage'))
const Users = lazy(() => import('./features/users/pages/UserPage'))

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 to-indigo-900">
    <div className="text-center">
      <Loader className="w-8 h-8 animate-spin text-white mx-auto mb-4" />
      <p className="text-white text-lg">Loading...</p>
    </div>
  </div>
)

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/shop', element: <Shop /> },
  { path: '/users', element: <Users /> }
])

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}