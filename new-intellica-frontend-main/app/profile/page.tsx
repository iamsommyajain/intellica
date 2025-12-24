import { Suspense } from "react";
import ProfileClient from "./ProfileClient";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading profile...</div>}>
      <ProfileClient />
    </Suspense>
  );
}
