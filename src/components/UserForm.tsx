import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, UserPlus, Loader2 } from 'lucide-react';
import { userFormSchema, getEmptyUser, User } from '../config/formSchema';
import { FormInput } from './FormInput';
import { validateForm, hasErrors, ValidationErrors } from '../utils/validation';

interface UserFormProps {
  user?: User;
  onSubmit: (userData: Omit<User, 'id'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    user ? { ...user } : getEmptyUser()
  );
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!user;

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFieldBlur = (name: string) => {
    setTouchedFields((prev) => new Set(prev).add(name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFields = new Set(userFormSchema.fields.map((f) => f.name));
    setTouchedFields(allFields);

    const validationErrors = validateForm(formData, userFormSchema.fields);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { id, ...userData } = formData as User;
      await onSubmit(userData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-blue-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isEditMode ? (
              <Save className="w-6 h-6 text-white" />
            ) : (
              <UserPlus className="w-6 h-6 text-white" />
            )}
            <h2 className="text-2xl font-bold text-white">
              {isEditMode ? 'Edit User' : 'Create New User'}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
          <div className="grid grid-cols-2 gap-6">
            {userFormSchema.fields.map((field) => (
              <FormInput
                key={field.name}
                field={field}
                value={formData[field.name] || ''}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                error={errors[field.name]}
                touched={touchedFields.has(field.name)}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{isEditMode ? 'Update User' : 'Create User'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
