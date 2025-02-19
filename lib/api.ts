export async function uploadFile(file: File, type: 'image' | 'video' = 'image') {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`/api/upload?type=${type}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
    },
    body: formData
  })

  if (!response.ok) {
    throw new Error('Upload failed')
  }

  return response.json()
}
