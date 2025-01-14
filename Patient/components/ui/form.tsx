import React, { ReactNode } from 'react';

// Define the props for each component
interface FormProps {
  children: ReactNode;
}

interface FormControlProps {
  children: ReactNode;
}

interface FormFieldProps {
  children: ReactNode;
}

interface FormItemProps {
  children: ReactNode;
}

interface FormLabelProps {
  children: ReactNode;
}

interface FormMessageProps {
  children: ReactNode;
}

// Form component
export const Form: React.FC<FormProps> = ({ children }) => {
  return <form className="form">{children}</form>;
};

// FormControl component
export const FormControl: React.FC<FormControlProps> = ({ children }) => {
  return <div className="form-control">{children}</div>;
};

// FormField component
export const FormField: React.FC<FormFieldProps> = ({ children }) => {
  return <div className="form-field">{children}</div>;
};

// FormItem component
export const FormItem: React.FC<FormItemProps> = ({ children }) => {
  return <div className="form-item">{children}</div>;
};

// FormLabel component
export const FormLabel: React.FC<FormLabelProps> = ({ children }) => {
  return <label className="form-label">{children}</label>;
};

// FormMessage component
export const FormMessage: React.FC<FormMessageProps> = ({ children }) => {
  return <div className="form-message text-red-500">{children}</div>;
};
