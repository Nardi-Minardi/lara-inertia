import React, { useRef } from 'react';
import BackLayout from '@/Layouts/BackLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { Toast } from 'primereact/toast';

export default function Edit({ auth, mustVerifyEmail, status }) {
  const toast = useRef(null);
  return (
    <BackLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
    >
      <Toast ref={toast} />
      <Head title="Profile" />

      <div className="py-8 px-0">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
              toast={toast}
            />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl" toast={toast} />
          </div>

          {/* <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <DeleteUserForm className="max-w-xl" toast={toast}/>
          </div> */}
        </div>
      </div>
    </BackLayout>
  );
}
