import PrimaryButton from '@/Components/Back/Button/PrimaryButton';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { InputText } from 'primereact/inputtext';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '', toast }) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
  });

  const submit = (e) => {
    e.preventDefault();

    patch(route('profile.update'), {
      onSuccess: () => {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Profile Updated',
          life: 3000
        });
      },
    }
    );
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

        <p className="mt-1 text-sm text-gray-600">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="name" >Name</label>

          <InputText
            id="name"
            className="mt-1 block w-full h-9"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            autoComplete="name"
          />
          {errors.name && <small className="p-error">{errors.name}</small>}
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <InputText
            id="email"
            type="email"
            className="mt-1 block w-full h-9"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            autoComplete="username"
          />
          {errors.email && <small className="p-error">{errors.email}</small>}
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="text-sm mt-2 text-gray-800">
              Your email address is unverified.
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className="mt-2 font-medium text-sm text-green-600">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <p className="text-sm text-gray-600">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
