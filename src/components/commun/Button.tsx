import React from 'react';
import { Pencil, Trash2, Plus, Eye, Check } from 'lucide-react';

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    text?: string;
}

const baseStyles = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

export const EditButton: React.FC<ButtonProps> = ({ onClick, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200 ${className}`}
    >
        <Pencil size={16} />
        <span>Edit</span>
    </button>
);

export const DeleteButton: React.FC<ButtonProps> = ({ onClick, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-200 ${className}`}
    >
        <Trash2 size={16} />
        <span></span>
    </button>
);

export const CreateButton: React.FC<ButtonProps> = ({ onClick, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 ${className}`}
    >
        <Plus size={18} />
        <span>Create</span>
    </button>
);

// --- Outline Variants (Subtle & Modern) ---

export const EditButtonOutline: React.FC<ButtonProps> = ({ onClick, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} border border-blue-200 bg-blue-50/30 text-blue-600 hover:bg-blue-50 ${className}`}
    >
        <Pencil size={16} />
    </button>
);

export const DeleteButtonOutline: React.FC<ButtonProps> = ({ onClick, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} border border-rose-200 bg-rose-50/30 text-rose-600 hover:bg-rose-50 ${className}`}
    >
        <Trash2 size={16} />
    </button>
);

export const CreateButtonOutline: React.FC<ButtonProps> = ({ onClick, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} border border-indigo-200 bg-indigo-50/30 text-indigo-600 hover:bg-indigo-50 ${className}`}
    >
        <Plus size={18} />
    </button>
);


export const OrderShowButtonOutline: React.FC<ButtonProps> = ({ onClick, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} border border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100 ${className}`}
    >
        <Eye size={16} />
    </button>
);


export const ConfirmButton: React.FC<ButtonProps> = ({ onClick, disabled, className = '', text= '' }) => (
    <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200 ${className}`}
    >
        <Check size={16} />
        <span>Confirm {text}</span>
    </button>
);