import cloudinary from "cloudinary";

function assertString(
  value: unknown,
  errorMessage: string
): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(errorMessage);
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { paramsToSign } = body;

  assertString(
    process.env.CLOUDINARY_API_SECRET,
    "CLOUDINARY_API_SECRET is not defined or is not a string"
  );

  const signature = cloudinary.v2.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  return Response.json({ signature });
}
