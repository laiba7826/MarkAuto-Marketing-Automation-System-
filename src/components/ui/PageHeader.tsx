import React from 'react';

interface Props { title: string; subtitle: string; action?: React.ReactNode; }
export const PageHeader: React.FC<Props> = ({ title, subtitle, action }) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div className="space-y-2">
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>
    </div>
    {action}
  </div>
);
