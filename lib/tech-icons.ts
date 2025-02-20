// Helper function to get default tech icons
export async function getDefaultTechIcon(techName: string): Promise<string | null> {
  // Lowercase and remove special characters for searching
  const searchTerm = techName.toLowerCase().replace(/[^a-z0-9]/g, '')

  try {
    // Try to fetch from Simple Icons API first
    const response = await fetch(`https://cdn.simpleicons.org/${searchTerm}`)
    if (response.ok) {
      const svgText = await response.text()
      // Convert SVG to black color for light mode
      const blackSvg = svgText.replace(/fill="[^"]*"/, 'fill="black"')
      // Convert SVG to data URL
      const dataUrl = `data:image/svg+xml;base64,${Buffer.from(blackSvg).toString('base64')}`
      return dataUrl
    }
    return null
  } catch (error) {
    console.error('Error fetching default tech icon:', error)
    return null
  }
}
