// utils/queryParser.js

export const parseQuery = (query) => {
  query = query.toLowerCase();

  // 1️⃣ BHK
  const bhkMatch = query.match(/(\d+)\s?BHK/i);

  // 2️⃣ City
  const cityMatch = query.match(
    /\b(Pune|Mumbai|Delhi|Bangalore|Hyderabad|Chennai|Kolkata|Ahmedabad)\b/i
  );

  // 3️⃣ Budget
  const budgetMatch = query.match(
    /under\s?₹?\s?(\d+\.?\d*)\s?(l|L|lakhs?|cr|Cr)?/i
  );

  let budget = null;
  if (budgetMatch) {
    let amount = parseFloat(budgetMatch[1]);
    const unit = budgetMatch[2]?.toLowerCase();
    if (unit?.startsWith("l")) amount *= 100000;
    if (unit?.startsWith("c")) amount *= 10000000;
    budget = amount;
  }

  // 4️⃣ Readiness
  const readinessMatch = query.match(/ready[-\s]?to[-\s]?move|under construction/i);
  let readiness = null;
  if (readinessMatch) {
    const text = readinessMatch[0].toLowerCase();
    if (text.includes("ready")) readiness = "READY_TO_MOVE";
    else if (text.includes("under")) readiness = "UNDER_CONSTRUCTION";
  }

  // 5️⃣ Locality / soft intents
  // Matches patterns like "near metro", "near IT park", "close to lake"
  const localityMatch = query.match(/near\s+([a-zA-Z0-9\s]+?)(?:,|$)/i);
  const locality = localityMatch ? localityMatch[1].trim() : null;

  // 6️⃣ Project name (optional)
  // Only extract if explicitly mentioned "project <name>" or "<name> project"
  let projectName = null;
  const explicitProjectMatch = query.match(/project\s+([a-zA-Z0-9\s]+)/i);
  if (explicitProjectMatch) projectName = explicitProjectMatch[1].trim();

  return {
    bhk: bhkMatch ? `${bhkMatch[1]}BHK` : null,
    city: cityMatch ? cityMatch[1] : null,
    budget,
    readiness,
    locality,
    projectName,
  };
};
