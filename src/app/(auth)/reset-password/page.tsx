import { verifyEmail } from "@/app/actions/authActions";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const params = await searchParams;
  const result = await verifyEmail(params.token);
  return (
    <div className="container mx-auto p-6 flex flex-col gap-4">
      Zweryfikuj email token {params.token}
      {result.status === "success" ? (
        <div className="text-green-500">Email zweryfikowany</div>
      ) : (
        <div className="text-red-500">Błąd: {result.error}</div>
      )}
      <div className="text-gray-500">
        {result.status === "success"
          ? "Twoje konto zostało zweryfikowane. Możesz się teraz zalogować."
          : "Wystąpił błąd podczas weryfikacji konta. Sprawdź poprawność linku."}
      </div>
    </div>
  );
}
