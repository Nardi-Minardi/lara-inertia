import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/Back/Button/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import { InputText } from 'primereact/inputtext';

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
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

    post(route('password.store'));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <form onSubmit={submit}>
        <div>
          <label htmlFor="email">Email</label>

          <InputText
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
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
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.password && <small className="p-error">{errors.password}</small>}
         
        </div>

        <div className="mt-4">
          <label htmlFor="password_confirmation">Confirm Password</label>

          <InputText
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
          />
          {errors.password_confirmation && <small className="p-error">{errors.password_confirmation}</small>}
         
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" disabled={processing}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
