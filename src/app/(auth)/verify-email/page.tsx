import { verifyEmail } from "@/app/actions/authActions";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;
  const result = await verifyEmail(token);
  return (
    <div className="container mx-auto p-6 flex flex-col gap-4">
      Zweryfikuj email token {token}
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
