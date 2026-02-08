import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Mail, Phone, Users, Loader2 } from 'lucide-react';
import { User } from '../config/formSchema';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-12 h-12 text-primary-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No users yet</h3>
        <p className="text-gray-600">Click "Add New User" to create your first user</p>
      </motion.div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-primary-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-gray-500">ID: {user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">{user.phoneNumber}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
                      title="Edit user"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
                          )
                        ) {
                          onDelete(user.id);
                        }
                      }}
                      className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
