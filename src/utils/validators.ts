import { z } from 'zod';

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Ukrainian format)
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+38)?0[0-9]{9}$/;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return phoneRegex.test(cleaned);
};

// Password validation
export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

// Price validation
export const validatePrice = (price: number): boolean => {
  return price > 0 && price <= 1000000; // Maximum price limit
};

// String length validation
export const validateStringLength = (value: string, min: number, max: number): boolean => {
  return value.length >= min && value.length <= max;
};

// Image file validation
export const validateImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  return allowedTypes.includes(file.type) && file.size <= maxSize;
};

// Zod schemas for form validation
export const loginSchema = z.object({
  email: z.string().email('Невірний формат email'),
  password: z.string().min(1, 'Пароль обов\'язковий'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Ім\'я має містити принаймні 2 символи'),
  email: z.string().email('Невірний формат email'),
  password: z
    .string()
    .min(8, 'Пароль має містити принаймні 8 символів')
    .regex(/[A-Z]/, 'Пароль має містити принаймні одну велику літеру')
    .regex(/[a-z]/, 'Пароль має містити принаймні одну малу літеру')
    .regex(/[0-9]/, 'Пароль має містити принаймні одну цифру'),
  phoneNumber: z
    .string()
    .regex(/^(\+38)?0[0-9]{9}$/, 'Невірний формат номеру телефону')
    .optional()
    .or(z.literal('')),
});

export const listingSchema = z.object({
  title: z.string().min(5, 'Назва має містити принаймні 5 символів').max(100, 'Назва надто довга'),
  description: z.string().min(20, 'Опис має містити принаймні 20 символів').max(2000, 'Опис надто довгий'),
  price: z.number().min(1, 'Ціна має бути більше 0').max(1000000, 'Занадто висока ціна'),
  location: z.string().min(3, 'Локація обов\'язкова'),
  category: z.string().min(1, 'Категорія обов\'язкова'),
  categoryId: z.number().min(1, 'Невірний ID категорії').optional(),
  images: z.array(z.string()).max(5, 'Максимум 5 зображень'),
});

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED: 'Це поле обов\'язкове',
  INVALID_EMAIL: 'Невірний формат email',
  INVALID_PHONE: 'Невірний формат номеру телефону',
  INVALID_PASSWORD: 'Пароль має містити принаймні 8 символів, одну велику літеру, одну малу літеру та одну цифру',
  STRING_TOO_SHORT: (min: number) => `Мінімум ${min} символів`,
  STRING_TOO_LONG: (max: number) => `Максимум ${max} символів`,
  FILE_TOO_LARGE: 'Файл занадто великий',
  INVALID_FILE_TYPE: 'Невірний тип файлу',
};