interface Visitor {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  timestamp: string;
}

interface LocationInfo {
  city: string;
  region: string;
  country: string;
  country_code: string;
}

const STORAGE_KEY = 'visitor-analytics';

export async function addVisitor(
  city: string,
  country: string,
  countryCode: string,
  region: string
): Promise<void> {
  try {
    const response = await fetch('/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, region, country, countryCode }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Visitor added successfully:', data);
  } catch (error) {
    console.error('Error adding visitor:', error);
    throw error; // Re-throw to handle in component
  }
}

export async function getLatestVisitor(): Promise<LocationInfo | null> {
  try {
    const response = await fetch('/api/visitors');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const visitor = await response.json();
    console.log('Latest visitor fetched:', visitor);

    if (!visitor) {
      console.log('No visitor data available');
      return null;
    }

    return {
      city: visitor.city,
      region: visitor.region,
      country: visitor.country,
      country_code: visitor.countryCode
    };
  } catch (error) {
    console.error('Error getting latest visitor:', error);
    return null;
  }
}

export function getVisitors(): Visitor[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}
