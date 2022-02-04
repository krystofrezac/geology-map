import { InputHTMLAttributes } from 'react';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputId: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
