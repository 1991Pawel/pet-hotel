

import ResetPasswordForm from "@/app/components/forms/ResetPasswordForm";
export default async function ResetPasswordPage() {
  return (
    <div className="container mx-auto p-6 flex flex-col gap-4">
     <h1>Resetuj haslo</h1>
     <ResetPasswordForm />
    </div>
  );
}
