import React from 'react';
import { FieldConfig } from '../config/formSchema';
import { AlertCircle } from 'lucide-react';

interface FormInputProps {
  field: FieldConfig;
  value: string;
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
  error?: string;
  touched?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    onChange(field.name, e.target.value);
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(field.name);
    }
  };

  const showError = touched && error;
  const isRequired = field.validation?.required;

  const baseClasses = `input-field ${showError ? 'input-error' : ''}`;

  const renderInput = () => {
    if (field.type === 'textarea') {
      return (
        <textarea
          id={field.name}
          name={field.name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={field.placeholder}
          className={`${baseClasses} min-h-[100px] resize-y`}
          required={isRequired}
        />
      );
    }

    if (field.type === 'select' && field.options) {
      return (
        <select
          id={field.name}
          name={field.name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={baseClasses}
          required={isRequired}
        >
          <option value="">Select {field.label}</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={field.placeholder}
        className={baseClasses}
        required={isRequired}
      />
    );
  };

  return (
    <div className="space-y-2" style={{ gridColumn: field.gridColumn }}>
      <label
        htmlFor={field.name}
        className="block text-sm font-semibold text-gray-700"
      >
        {field.label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {showError && (
        <div className="flex items-center gap-2 text-red-600 text-sm animate-shake">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
