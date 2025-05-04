// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '@store/hooks';
// import { login } from '@store/slices/authSlice';
// import { Input } from '@components/common/Input';
// import { Button } from '@components/common/Button';
// import { Alert } from '@components/common/Alert';
// import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

// export const LoginForm: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error } = useAppSelector((state) => state.auth);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await dispatch(login(formData)).unwrap();
//       navigate('/');
//     } catch (error) {
//       // Error is handled by Redux state
//     }
//   };

//   return (
//     <form className="space-y-6" onSubmit={handleSubmit}>
//       {error && (
//         <Alert variant="error" title="Помилка входу">
//           {error}
//         </Alert>
//       )}
      
//       <Input
//         name="email"
//         type="email"
//         label="Email адреса"
//         value={formData.email}
//         onChange={handleChange}
//         icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
//         required
//       />

//       <Input
//         name="password"
//         type="password"
//         label="Пароль"
//         value={formData.password}
//         onChange={handleChange}
//         icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
//         required
//       />

//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <input
//             id="remember-me"
//             name="remember-me"
//             type="checkbox"
//             className="h-4 w-4 text-primary-green focus:ring-primary-green/50 border-gray-300 rounded"
//           />
//           <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//             Запам'ятати мене
//           </label>
//         </div>

//         <div className="text-sm">
//           <a href="/forgot-password" className="font-medium text-primary-green hover:text-primary-green-hover">
//             Забули пароль?
//           </a>
//         </div>
//       </div>

//       <Button
//         type="submit"
//         className="w-full"
//         isLoading={isLoading}
//       >
//         Увійти
//       </Button>
//     </form>
//   );
// };

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { login } from '@store/slices/authSlice';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Alert } from '@components/common/Alert';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import debounce from 'lodash.debounce';
import ReCAPTCHA from 'react-google-recaptcha';

// Схема валідації
const schema = yup.object().shape({
  email: yup.string().email('Невірний формат email').required('Email обов\'язковий'),
  password: yup.string()
    .min(8, 'Пароль повинен містити мінімум 8 символів')
    .max(32, 'Пароль повинен бути не довше 32 символів')
    .matches(/[a-z]/, 'Пароль повинен містити маленькі літери')
    .matches(/[A-Z]/, 'Пароль повинен містити великі літери')
    .matches(/\d/, 'Пароль повинен містити цифри')
    .required('Пароль обов\'язковий'),
  rememberMe: yup.boolean().required().default(false),
  recaptcha: yup.string().required('Підтвердіть, що ви не робот')
});

type FormData = yup.InferType<typeof schema>;

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
      recaptcha: ''
    }
  });

  // Debounce для обробки змін полів
  const debouncedChange = debounce((name: keyof FormData, value: any) => {
    setValue(name, value, { shouldValidate: true });
  }, 300);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debouncedChange(name as keyof FormData, value);
  }, []);

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      await dispatch(login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe
      })).unwrap();
      
      navigate('/');
    } catch (error) {
      // Очищаємо капчу при помилці
      setValue('recaptcha', '');
    }
  }, [dispatch, navigate]);

  const onRecaptchaChange = useCallback((token: string | null) => {
    setValue('recaptcha', token || '', { shouldValidate: true });
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <Alert variant="error" title="Помилка входу" aria-live="assertive">
          {error}
        </Alert>
      )}
      
      <Input
        {...register('email')}
        type="email"
        label="Email адреса"
        error={errors.email?.message}
        icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
        onChange={handleChange}
        autoComplete="username"
        aria-invalid={!!errors.email}
      />

      <Input
        {...register('password')}
        type={showPassword ? 'text' : 'password'}
        label="Пароль"
        error={errors.password?.message}
        onChange={handleChange}
        autoComplete="current-password"
        aria-invalid={!!errors.password}
        icon={
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-gray-400 hover:text-gray-500"
            aria-label={showPassword ? 'Приховати пароль' : 'Показати пароль'}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        }
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
            className="h-4 w-4 text-primary-green focus:ring-primary-green/50 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
            Запам'ятати мене
          </label>
        </div>

        <div className="text-sm">
          <a 
            href="/forgot-password" 
            className="font-medium text-primary-green hover:text-primary-green-hover"
            aria-label="Відновити пароль"
          >
            Забули пароль?
          </a>
        </div>
      </div>

      <ReCAPTCHA
        sitekey="YOUR_RECAPTCHA_SITE_KEY"
        onChange={onRecaptchaChange}
        className="flex justify-center"
      />
      {errors.recaptcha && (
        <p className="mt-1 text-sm text-red-600">{errors.recaptcha.message}</p>
      )}

      <Button
        type="submit"
        className="w-full mt-4"
        isLoading={isLoading}
        disabled={!isValid || isLoading}
      >
        Увійти
      </Button>
    </form>
  );
};