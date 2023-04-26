import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/Back/Button/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { InputText } from 'primereact/inputtext';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('register'));
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">Name</label>

          <InputText
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full h-9"
            autoComplete="name"
            onChange={(e) => setData('name', e.target.value)}
            required
          />

          {errors.name && <small className="p-error">{errors.name}</small>}
        </div>

        <div className="mt-4">
          <label htmlFor="email" >Email</label>

          <InputText
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full h-9"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            required
          />

          {errors.email && <small className="p-error">{errors.email}</small>}
        </div>

        <div className="mt-4">
          <label htmlFor="password" >Password</label>

          <InputText
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full h-9"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            required
          />

          {errors.password && <small className="p-error">{errors.password}</small>}
        </div>

        <div className="mt-4">
          <label htmlFor="password_confirmation">Confirm Password</label>

          <InputText
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full h-9"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
          />

          {errors.password_confirmation && <small className="p-error">{errors.password_confirmation}</small>}
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route('login')}
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none "
          >
            Already registered?
          </Link>

          <PrimaryButton className="ml-4" disabled={processing}>
            Register
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
