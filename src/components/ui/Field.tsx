import React from 'react';

export const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-xs font-bold uppercase tracking-[0.3em] mb-2 section-muted">{children}</label>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className="input-field" />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select {...props} className="input-field" />
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea {...props} className="input-field min-h-[120px] resize-none" />
);
