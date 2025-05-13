import ForgotPasswordForm from "@/app/components/forms/ForgotPasswordForm";
export default function ForgotPasswordPage() {

  

  return (
    <div className="container mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-center text-2xl font-semibold">Zapomniałeś hasła?</h1>
      <p className="text-center">
        Wpisz swój adres e-mail, aby otrzymać link do resetowania hasła.
      </p>
      <ForgotPasswordForm />
    </div>
  );
}
