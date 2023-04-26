import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/Back/Button/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import { InputText } from 'primereact/inputtext';

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('password.confirm'));
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <form onSubmit={submit}>
        <div className="mt-4">
          <label htmlFor="password" value="Password" ></label>

          <InputText
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full h-9"
            onChange={(e) => setData('password', e.target.value)}
          />

          {errors.password && <small className="p-error">{errors.password}</small>}
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" disabled={processing}>
            Confirm
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
