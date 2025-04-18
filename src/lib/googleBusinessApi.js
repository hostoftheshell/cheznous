// lib/googleBusinessApi.js
import { google } from "googleapis";

export async function getGoogleBusinessClient() {
  // const credentialsRaw = import.meta.env.GOOGLE_CREDENTIALS_BASE64;

  if (!credentialsRaw) {
    console.error("Environment variable GOOGLE_CREDENTIALS_BASE64 is not set.");
    throw new Error(
      "Missing Google credentials configuration: GOOGLE_CREDENTIALS_BASE64 env var not found.",
    );
  }

  // Trim whitespace which might be added by the environment
  const cleanedCredentialsRaw = credentialsRaw.trim();
  // Optional: Remove potential surrounding quotes if your environment adds them.
  // const potentiallyQuoted = cleanedCredentialsRaw.replace(/^["']|["']$/g, "");

  let credentialsString;
  try {
    // Use the cleaned (or potentially quoted) string
    credentialsString = Buffer.from(cleanedCredentialsRaw, "base64").toString(
      "utf-8",
    );
  } catch (decodeError) {
    console.error("Error decoding base64 credentials:", decodeError.message);
    // Log first few chars of raw string for debugging (might expose sensitive info in logs)
    // console.error("Raw Base64 (start):", cleanedCredentialsRaw.substring(0, 50));
    throw new Error(
      `Failed to decode GOOGLE_CREDENTIALS_BASE64: ${decodeError.message}. Check if the env var contains valid Base64.`,
    );
  }

  // Add a simple check if decoded string looks like JSON before parsing
  if (!credentialsString || !credentialsString.trim().startsWith("{")) {
    console.error(
      "Decoded credentials do not appear to be valid JSON (doesn't start with '{').",
    );
    // Log decoded string start for debugging (might expose sensitive info in logs)
    // console.error("Decoded string (start):", credentialsString.substring(0, 100));
    throw new Error(
      "Decoded Google credentials are not valid JSON. Verify the original JSON and the Base64 encoding.",
    );
  }

  let credentials;
  try {
    credentials = JSON.parse(credentialsString);
  } catch (parseError) {
    console.error("Error parsing JSON credentials:", parseError.message);
    // Log decoded string start for debugging (might expose sensitive info in logs)
    // console.error("Decoded string (start):", credentialsString.substring(0, 100));
    throw new Error(
      `Failed to parse Google credentials JSON: ${parseError.message}. Verify the Base64 env var decodes to valid JSON.`,
    );
  }

  // --- Authentication logic remains the same ---
  try {
    const scope = import.meta.env.GOOGLE_API_SCOPE;
    if (!scope) {
      console.error("Environment variable GOOGLE_API_SCOPE is not set.");
      throw new Error("Missing Google API scope configuration.");
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [scope], // Ensure scope is defined
    });

    const client = await auth.getClient();
    const mybusiness = google.mybusinessbusinessinformation({
      version: "v1",
      auth: client,
    });

    console.log("Google Business client initialized successfully."); // Added success log
    return { mybusiness, auth };
  } catch (authError) {
    console.error(
      "Error during Google authentication or client creation:",
      authError,
    );
    throw new Error(
      `Failed to authenticate or initialize Google API client: ${authError.message}`,
    );
  }
}

// --- getBusinessHours function remains the same as in the previous example ---
export async function getBusinessHours() {
  try {
    const { mybusiness } = await getGoogleBusinessClient();
    const locationId = import.meta.env.GOOGLE_LOCATION_ID;

    if (!locationId) {
      console.error("Environment variable GOOGLE_LOCATION_ID is not set.");
      throw new Error(
        "Google Location ID is not defined in environment variables",
      );
    }

    const resourceName = `locations/${locationId}`;
    console.log(`Workspaceing business hours for: ${resourceName}`); // Log which location
    // Fetch the location information including working hours

    // Specify the fields you need using readMask for efficiency
    const response = await mybusiness.locations.get({
      name: resourceName,
      readMask: "regularHours", // Only request the regularHours field
    });

    console.log("Successfully fetched location data.");

    // Check if data and regularHours exist
    if (response.data && response.data.regularHours) {
      console.log("Regular hours found:", response.data.regularHours);
      return response.data.regularHours;
    } else {
      console.log("No regular hours found for this location.");
      return null; // Explicitly return null if not found
    }
  } catch (error) {
    // Log more specific error details if available
    const errorMessage = error.response?.data?.error?.message || error.message;
    console.error("Error fetching business hours:", errorMessage, error);
    throw new Error(`Failed to fetch business hours: ${errorMessage}`); // Rethrow with specific message
  }
}
