export async function checkGPUSupport(): Promise<boolean> {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      return false;
    }

    // Get GPU info
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) {
      return true; // Default to true if we can't get detailed info but WebGL works
    }

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();

    // Less strict GPU detection
    const lowEndGPUs = [
      'swiftshader',
      'llvmpipe',
      'software'
    ];

    const isLowEnd = lowEndGPUs.some((gpu) => renderer.includes(gpu));

    // Check device memory
    if ('deviceMemory' in navigator) {
      const memory = (navigator as Navigator & { deviceMemory: number }).deviceMemory;
      if (memory && memory < 2) {
        return false;
      }
    }

    return !isLowEnd;
  } catch (e) {
    console.warn('GPU detection failed:', e);
    return true; // Default to enabling if detection fails
  }
}
