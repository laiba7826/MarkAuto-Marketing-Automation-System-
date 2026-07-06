import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, title, onClose, children, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_35px_120px_-40px_rgba(0,0,0,0.65)] backdrop-blur-xl text-white overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-xl font-black tracking-tight">{title}</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white transition-colors">
            <X size={22} />
          </button>
        </div>
        <div className="p-6 space-y-5">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-3 p-6 border-t border-white/10 bg-slate-950/90">{footer}</div>}
      </div>
    </div>
  );
};
