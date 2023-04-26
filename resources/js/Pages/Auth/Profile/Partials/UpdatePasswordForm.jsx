import { useRef } from 'react';
import PrimaryButton from '@/Components/Back/Button/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { InputText } from 'primereact/inputtext';

export default function UpdatePasswordForm({ className = '', toast}) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
              toast.current.show({
                severity: 'success',
                summary: 'Successful',
                detail: 'Profile Updated',
                life: 3000
              });
              reset()
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="current_password" >Current Password</label>

                    <InputText
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full h-9"
                        autoComplete="current-password"
                    />
                    {errors.current_password && <small className="p-error">{errors.current_password}</small>}
                </div>

                <div>
                    <label htmlFor="password" >New Password</label>

                    <InputText
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full h-9"
                        autoComplete="new-password"
                    />
                    {errors.password && <small className="p-error">{errors.password}</small>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" value="Confirm Password">Confirm Password</label>

                    <InputText
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full h-9"
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && <small className="p-error">{errors.password_confirmation}</small>}
                </div>

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
