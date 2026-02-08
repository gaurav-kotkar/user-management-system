import { FieldConfig, ValidationRule } from '../config/formSchema';

export type ValidationErrors = Record<string, string>;

export const validateField = (value: string, validation?: ValidationRule): string | null => {
  if (!validation) return null;

  if (validation.required && !value.trim()) {
    return 'This field is required';
  }

  if (!value.trim() && !validation.required) {
    return null;
  }

  if (validation.pattern && !validation.pattern.test(value)) {
    return 'Invalid format';
  }

  if (validation.minLength && value.length < validation.minLength) {
    return `Minimum ${validation.minLength} characters required`;
  }

  if (validation.maxLength && value.length > validation.maxLength) {
    return `Maximum ${validation.maxLength} characters allowed`;
  }

  if (validation.min !== undefined) {
    const numValue = parseFloat(value);
    if (numValue < validation.min) {
      return `Minimum value is ${validation.min}`;
    }
  }

  if (validation.max !== undefined) {
    const numValue = parseFloat(value);
    if (numValue > validation.max) {
      return `Maximum value is ${validation.max}`;
    }
  }

  if (validation.custom) {
    return validation.custom(value);
  }

  return null;
};

export const validateForm = (
  formData: Record<string, string>,
  fields: FieldConfig[]
): ValidationErrors => {
  const errors: ValidationErrors = {};
  fields.forEach((field) => {
    const error = validateField(formData[field.name] || '', field.validation);
    if (error) {
      errors[field.name] = error;
    }
  });
  return errors;
};

export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
