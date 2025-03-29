export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${mapboxToken}&autocomplete=true&limit=5&country=PL&language=pl&types=place`;

    const response = await fetch(mapboxUrl);

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error("Błąd podczas komunikacji z Mapbox API.");
    }

    return Response.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    } else {
      return Response.json({ error: "Unknown error" });
    }
  }
}
