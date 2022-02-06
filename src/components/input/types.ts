import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputId: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string | number | undefined; label: string }[];
}
