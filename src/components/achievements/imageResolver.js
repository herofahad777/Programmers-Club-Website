/**
 * Dynamic resolver for achievement images located in src/assets/Achievements/
 * Uses Vite's import.meta.glob for compile-time bundling and safe production builds.
 */
const achievementImages = import.meta.glob('/src/assets/Achievements/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

/**
 * Resolves an image filename (e.g. "demo-sih-2025.svg") to its bundled asset URL.
 * Returns null if not found or empty, allowing cards to show fallback UI.
 */
export function getAchievementImage(imageName) {
  if (!imageName || typeof imageName !== 'string') return null;

  const cleanName = imageName.trim();
  if (!cleanName) return null;

  // External URLs or data URIs passed directly
  if (cleanName.startsWith('http://') || cleanName.startsWith('https://') || cleanName.startsWith('data:')) {
    return cleanName;
  }

  // Look for match by filename
  const matchedKey = Object.keys(achievementImages).find((path) => {
    return path.endsWith('/' + cleanName) || path.endsWith('\\' + cleanName) || path.endsWith(cleanName);
  });

  if (matchedKey && achievementImages[matchedKey]) {
    return achievementImages[matchedKey];
  }

  return null;
}

/**
 * Resolves a single image string or an array of image strings into an array of valid asset URLs.
 * Filters out any null, empty, or unresolvable items.
 */
export function getAchievementImages(imagesInput) {
  if (!imagesInput) return [];

  const rawList = Array.isArray(imagesInput)
    ? imagesInput
    : typeof imagesInput === 'string' && imagesInput.trim() !== ''
      ? [imagesInput]
      : [];

  return rawList
    .map((img) => getAchievementImage(img))
    .filter(Boolean);
}
