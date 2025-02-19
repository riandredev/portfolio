export async function getIpInfo(ip: string) {
  try {
    // Using ipapi.co for IP geolocation (free tier)
    const response = await fetch(`https://ipapi.co/${ip}/json/`)
    const data = await response.json()

    return {
      ip,
      location: `${data.city}, ${data.country_name}`,
      country: data.country_name,
      city: data.city,
      region: data.region
    }
  } catch (error) {
    return {
      ip,
      location: 'Unknown',
      country: 'Unknown',
      city: 'Unknown',
      region: 'Unknown'
    }
  }
}
