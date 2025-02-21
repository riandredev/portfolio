export async function uploadFile(file: File, type: 'image' | 'video' = 'image') {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`/api/upload?type=${type}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    return response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}
