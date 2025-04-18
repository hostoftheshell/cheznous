// src/pages/api/business-hours.js
import { getBusinessHours } from "../../lib/googleBusinessApi";

export async function GET() {
  try {
    const regularHours = await getBusinessHours();

    return new Response(JSON.stringify(regularHours), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API Error fetching business hours:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch business hours",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
