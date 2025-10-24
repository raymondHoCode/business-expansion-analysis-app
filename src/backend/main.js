import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const API_URL = "https://places.googleapis.com/v1/places:searchNearby";
const BUSINESS_TYPE = "restaurant";

const LOCATION = { latitude: 43.4663, longitude: -79.9000 };
const RADIUS_METERS = 10000;

const FIELD_MASK = [
  "places.displayName",
  "places.location",
  "places.formattedAddress",
  "places.rating",
].join(",");

async function getNearbyPlaces() {
  console.log("Fetching nearby places");

  const body = {
    includedPrimaryTypes: [BUSINESS_TYPE],
    locationRestriction: {
      circle: {
        center: LOCATION,
        radius: RADIUS_METERS,
      },
    },
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${text}`);
  }

  const data = JSON.parse(text);
  const length = data.places?.length || 0;
  console.log(`Found ${length} places.`);
  return data.places || [];
}

function saveToCSV(places) {
  if (!places.length) {
    console.warn("No places found — no CSV written.");
    return;
  }

  const headers = ["Name", "Latitude", "Longitude", "Address", "Rating"];
  const rows = [headers.join(",")];

  for (const place of places) {
    const name = place.displayName?.text || "";
    const lat = place.location?.latitude || "";
    const lng = place.location?.longitude || "";
    const address = place.formattedAddress || "";
    const rating = place.rating || "";

    const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
    rows.push([esc(name), esc(lat), esc(lng), esc(address), esc(rating)].join(","));
  }

  const csvData = rows.join("\n");
  fs.writeFileSync("src/places.csv", csvData, "utf8");

  console.log(`Saved ${places.length} places to places.csv`);
}

async function main() {
  try {
    const places = await getNearbyPlaces();
    saveToCSV(places);
  } catch (err) {
    console.error("Something went wrong:", err.message);
  }
}

main();
