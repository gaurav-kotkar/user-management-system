import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UserPlus, Users, RefreshCw, TrendingUp, Database, Activity } from 'lucide-react';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { ToastContainer, Toast, ToastType } from './components/Toast';
import { User } from './config/formSchema';
import { userAPI } from './services/api';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userAPI.getUsers();
      setUsers(data);
    } catch (error) {
      showToast('error', 'Failed to load users. Please try again.');
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (type: ToastType, message: string) => {
    const toast: Toast = {
      id: Date.now().toString(),
      type,
      message,
    };
    setToasts((prev) => [...prev, toast]);
  };

  const closeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleCreateUser = async (userData: Omit<User, 'id'>) => {
    try {
      const newUser = await userAPI.createUser(userData);
      setUsers((prev) => [...prev, newUser]);
      setShowForm(false);
      showToast('success', '✨ User created successfully!');
    } catch (error) {
      showToast('error', 'Failed to create user. Please try again.');
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const handleUpdateUser = async (userData: Omit<User, 'id'>) => {
    if (!editingUser) return;

    try {
      const updatedUser = await userAPI.updateUser(editingUser.id, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === editingUser.id ? updatedUser : user))
      );
      setEditingUser(undefined);
      setShowForm(false);
      showToast('success', '✅ User updated successfully!');
    } catch (error) {
      showToast('error', 'Failed to update user. Please try again.');
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await userAPI.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      showToast('success', '🗑️ User deleted successfully!');
    } catch (error) {
      showToast('error', 'Failed to delete user. Please try again.');
      console.error('Error deleting user:', error);
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingUser(undefined);
  };

  return (
    <div className="min-h-screen">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-glow">
                <Users className="w-9 h-9 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold gradient-text font-display">
                  User Management
                </h1>
                <p className="text-gray-600 mt-1 font-medium">
                  Manage your users with ease and efficiency
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadUsers}
                className="btn-secondary flex items-center gap-2"
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="btn-primary flex items-center gap-1.5"
              >
                <UserPlus className="w-5 h-5" />
                <span>Add New User</span>
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Status</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {isLoading ? 'Loading...' : 'Active'}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">API Mode</p>
                  <p className="text-3xl font-bold text-purple-600">Mock</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Database className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* User List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <UserList
            users={users}
            onEdit={handleEditClick}
            onDelete={handleDeleteUser}
            isLoading={isLoading}
          />
        </motion.div>
      </div>

      {/* User Form Modal */}
      <AnimatePresence>
        {showForm && (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
            onCancel={handleFormClose}
          />
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={closeToast} />
    </div>
  );
}

export default App;
