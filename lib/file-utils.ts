import fs from 'fs/promises'
import path from 'path'

export async function deleteMediaFile(fileUrl: string) {
  try {
    if (!fileUrl) return

    // Only handle local files
    if (fileUrl.startsWith('http')) return

    // Get the relative path from the URL
    const urlPath = new URL(fileUrl, 'http://base').pathname
    const filePath = path.join(process.cwd(), 'public', urlPath)

    // Check if file exists before attempting deletion
    try {
      await fs.access(filePath)
      await fs.unlink(filePath)
      console.log(`Deleted file: ${filePath}`)
    } catch (error) {
      // File doesn't exist, just log it
      console.log(`File not found: ${filePath}`)
    }
  } catch (error) {
    console.error('Error deleting media file:', error)
  }
}
