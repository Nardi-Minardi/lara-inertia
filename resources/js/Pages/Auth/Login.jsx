import { useEffect } from 'react';
import Checkbox from '@/Components/Back/Checkbox/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/Back/Button/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { InputText } from 'primereact/inputtext';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <form onSubmit={submit}>
        <div>
          <label htmlFor="email" >Email</label>

          <InputText
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full h-9"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <small className="p-error">{errors.email}</small>}
         
        </div>

        <div className="mt-4">
          <label htmlFor="password">Password</label>

          <InputText
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full h-9"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <small className="p-error">{errors.password}</small>}
         
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>
        <div className="block mt-4">
          <label className="flex items-center">
            <span className="ml-2 text-sm text-gray-600">Don't have an account? <Link href={route('register')} className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none ">Register</Link></span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Forgot your password?
            </Link>
          )}

          <PrimaryButton className="ml-4" disabled={processing}>
            Log in
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
