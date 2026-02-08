// Field configuration schema for dynamic form generation
// This is the key to extensibility - add new fields here without changing component code

export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'textarea' | 'select';

export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  custom?: (value: string) => string | null;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  validation?: ValidationRule;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  gridColumn?: string;
}

export interface FormSchema {
  fields: FieldConfig[];
}

// User schema configuration
// TO ADD A NEW FIELD: Simply add a new FieldConfig object to this array
export const userFormSchema: FormSchema = {
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter first name',
      validation: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s'-]+$/,
      },
      gridColumn: '1 / 2',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter last name',
      validation: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s'-]+$/,
      },
      gridColumn: '2 / 3',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter email address',
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      gridColumn: '1 / 2',
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '10-digit phone number',
      validation: {
        required: true,
        pattern: /^[\d\s\-\+\(\)]+$/,
        minLength: 10,
      },
      gridColumn: '2 / 3',
    },
  ],
};

// Generate TypeScript type from schema
export type User = {
  id: string;
} & {
  [K in typeof userFormSchema.fields[number]['name']]: string;
};

// Helper to get default/empty user object
export const getEmptyUser = (): Omit<User, 'id'> => {
  const emptyUser: Record<string, string> = {};
  userFormSchema.fields.forEach((field) => {
    emptyUser[field.name] = field.defaultValue || '';
  });
  return emptyUser as Omit<User, 'id'>;
};
