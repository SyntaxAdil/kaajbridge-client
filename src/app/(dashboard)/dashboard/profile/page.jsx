import { headers } from 'next/headers';
import React from 'react';
import { auth } from '../../../../lib/auth/auth';
import ProfileForm from '../../../../pages/profile/ProfileForm';
import { SidebarTrigger } from '../../../../components/ui/sidebar';


export const metadata = {
  title: "Profile - KaajBridge"
};

const ProfilePage = async () => {
  const sessionHeaders = await headers();
  const session = await auth.api.getSession({ headers: sessionHeaders });
  const user = session?.user;
  const userRole = user?.role?.toLowerCase() || 'candidate';

  const roleColors = {
    admin: "bg-red-500/10 text-red-500 border-red-500/20",
    recruiter: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    candidate: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  const currentRoleColor = roleColors[userRole] || roleColors.candidate;

  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 ">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="flex items-center gap-2">
          {/* <SidebarTrigger className="mx-2" /> */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              My Profile
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your personal identity, structural nodes, and professional account details.
            </p>
          </div>
        </div>

        <div className="sm:ml-auto px-2 flex items-center">
          <span className={`inline-flex items-center justify-center rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-widest ${currentRoleColor}`}>
            {userRole} Account
          </span>
        </div>
      </header>

      <ProfileForm serverUser={user} />
    </div>
  );
};

export default ProfilePage;