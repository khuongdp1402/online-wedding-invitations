export function getDirectImageUrl(url) {
  if (!url) return url;
  
  // Check if it's a Google Drive URL
  // Matches formats like:
  // https://drive.google.com/file/d/1Xy_Z.../view
  // https://drive.google.com/open?id=1Xy_Z...
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=))([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  
  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  return url;
}
