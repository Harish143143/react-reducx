import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUsers,
  selectAllUsers,
  updateUser,
  deleteUser,
  createUser,
  setEditingUser,
  clearEditingUser,
  clearError
} from '../usersSlice'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import ThemeToggle from '../../../components/ThemeToggle'
import { Users, Plus, Edit, Trash2, Mail, Phone, Globe, Home, ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css'

export default function UserPage() {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme.mode)

  const users        = useSelector(selectAllUsers)
  const status       = useSelector(s => s.users.status)
  const error        = useSelector(s => s.users.error)
  const editingUser  = useSelector(s => s.users.editingUser)
  const updateStatus = useSelector(s => s.users.updateStatus)

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', website: '' })
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Exactly 6 per page => 2 rows * 3 cards per row for mobile
  const usersPerPage = 6
  const totalPages   = Math.max(1, Math.ceil(users.length / usersPerPage))
  const indexOfLast  = currentPage * usersPerPage
  const indexOfFirst = indexOfLast - usersPerPage
  const currentUsers = users.slice(indexOfFirst, indexOfLast)

  // Refs for smooth scroll & focusing the first input
  const topRef = useRef(null)
  const firstInputRef = useRef(null)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers())
  }, [status, dispatch])

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name:    editingUser.name    || '',
        email:   editingUser.email   || '',
        phone:   editingUser.phone   || '',
        website: editingUser.website || ''
      })
    } else if (!showCreateForm) {
      setFormData({ name: '', email: '', phone: '', website: '' })
    }
  }, [editingUser, showCreateForm])

  // Focus first field when form appears
  useEffect(() => {
    if ((editingUser || showCreateForm) && firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [editingUser, showCreateForm])

  const smoothScrollTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const startCreate = () => {
    dispatch(clearEditingUser())
    setShowCreateForm(true)
    setFormData({ name: '', email: '', phone: '', website: '' })
    smoothScrollTop()
  }

  const handleSave = () => {
    if (editingUser) {
      const targetId = editingUser._id || editingUser.id
      dispatch(updateUser({ id: targetId, userData: formData }))
        .unwrap()
        .then(() => toast.success('User updated successfully ✅'))
        .catch(() => toast.error('Failed to update ❌'))
    } else {
      dispatch(createUser(formData))
        .unwrap()
        .then(() => {
          toast.success('New user added 🎉')
          setShowCreateForm(false)
          // Optionally reset to first page to surface the new item
          setCurrentPage(1)
        })
        .catch(() => toast.error('Failed to add user ❌'))
    }
  }

  const handleCancel = () => {
    dispatch(clearEditingUser())
    setShowCreateForm(false)
  }

  const handleEdit = (user) => {
    setShowCreateForm(false)
    dispatch(setEditingUser(user))
    smoothScrollTop()
  }

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id)
  }

  const confirmDelete = () => {
    if (confirmDeleteId) {
      dispatch(deleteUser(confirmDeleteId))
        .unwrap()
        .then(() => toast.success('User deleted 🗑️'))
        .catch(() => toast.error('Failed to delete ❌'))
      setConfirmDeleteId(null)
    }
  }

  return (
    <div className={`min-h-screen relative ${theme === 'dark' ? 'dark' : ''}`} ref={topRef}>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M20 20c0-11.046-8.954-20-20-20s20 8.954 20 20 8.954 20 20 20-20-8.954-20-20z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      <ThemeToggle />

      <div className="w-full max-w-[1200px] mx-auto relative z-10 px-3 sm:px-4 py-6 sm:py-8">
        <header className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Team Directory
            </h1>
          </div>
          <p className="text-sm sm:text-xl text-gray-200 sm:text-gray-300 max-w-2xl mx-auto">
            Manage members and their contact information
          </p>

          {/* Back to Home Button - centered below content */}
          <div className="text-center mt-4 sm:mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Home className="w-5 h-5 sm:w-7 sm:h-7" />
              Back to Home
            </Link>
          </div>
        </header>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-5 sm:px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50"
            onClick={startCreate}
            disabled={Boolean(editingUser) || showCreateForm}
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add New Member
          </button>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-200 px-3 sm:px-4 py-2 rounded-lg">
              <span className="text-sm sm:text-base truncate">{error}</span>
              <button
                onClick={() => dispatch(clearError())}
                className="text-red-300 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Create/Edit Form */}
        {(editingUser || showCreateForm) && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              {editingUser ? 'Edit Team Member' : 'Add New Team Member'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Full Name</label>
                <input
                  ref={firstInputRef}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors text-sm sm:text-base"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInput}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Email Address</label>
                <input
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors text-sm sm:text-base"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Phone</label>
                <input
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors text-sm sm:text-base"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInput}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Website</label>
                <input
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors text-sm sm:text-base"
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInput}
                  placeholder="Enter website URL"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 text-sm sm:text-base"
                onClick={handleSave}
                disabled={updateStatus === 'loading' || !formData.name || !formData.email}
              >
                {updateStatus === 'loading' ? 'Saving…' : editingUser ? 'Update' : 'Add'}
              </button>
              <button
                className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 sm:px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {status === 'loading' && (
          <div className="text-center py-10 sm:py-12">
            <Loader className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-white mx-auto mb-3 sm:mb-4" />
            <p className="text-white text-sm sm:text-lg">Loading team members…</p>
          </div>
        )}

        {/* Error */}
        {status === 'failed' && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-5 sm:p-6 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-red-200 mb-2">Unable to load team members</h3>
            <p className="text-red-300 mb-4 text-sm sm:text-base">{error}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-5 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              onClick={() => dispatch(fetchUsers())}
            >
              Retry
            </button>
          </div>
        )}

        {/* Users Grid */}
        {status === 'succeeded' && (
          <>
            {/* Base: 3 columns (mobile), ensuring 2 rows x 3 cards = 6 per page */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
              {currentUsers.map((user, idx) => (
                <div
                  key={user._id || user.id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-base sm:text-lg">
                      {user.name?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-white truncate">{user.name}</h3>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-200 sm:text-gray-300">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm truncate">{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center gap-1.5 sm:gap-2 text-gray-200 sm:text-gray-300">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">{user.phone}</span>
                      </div>
                    )}
                    {user.website && (
                      <div className="flex items-center gap-1.5 sm:gap-2 text-gray-200 sm:text-gray-300">
                        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm truncate">{user.website}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-base"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Edit
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-red-500/20 border border-red-500/30 text-red-200 sm:text-red-300 hover:bg-red-500 hover:text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-base"
                      onClick={() => handleDeleteClick(user._id || user.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
                <button
                  className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-base"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <span className="text-white font-semibold px-2 sm:px-4 py-2 text-xs sm:text-base">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-base"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Confirm Delete</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-5 sm:mb-6 text-sm sm:text-base">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  )
}
