// /src/api/getTopSongs.js
export const getTopSongs = async () => {
  try {
    const response = await fetch(
      'https://itunes.apple.com/us/rss/topsongs/limit=10/json'
    );
    const data = await response.json();

    return data.feed.entry.map((entry) => ({
      id: entry.id.attributes['im:id'],
      title: entry['im:name'].label,
      artist: { name: entry['im:artist'].label },
      genre: entry.category.attributes.label,
      albumArt: entry['im:image'][2].label,
      previewUrl: null, // RSS feed doesn't include preview
    }));
  } catch (error) {
    console.error("Top songs fetch error:", error);
    return [];
  }
};
