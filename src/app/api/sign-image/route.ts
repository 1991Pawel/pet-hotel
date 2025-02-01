import cloudinary from "cloudinary";
import { assertString } from "@/lib/utils";

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
