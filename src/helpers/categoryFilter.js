
const sectionLabels = {
  usNews: ['us-news'],
  worldNews: ['world', 'uk-news', 'australia-news', 'cardiff'],
  business: ['business'],
  opinion: ['commentisfree'],
  sport: ['sport', 'football'],
  culture: ['culture', 'film', 'books', 'music', 'artanddesign', 'tv-and-radio', 'stage', 'games', 'media', 'politics', 'education'],
  science: ['science', 'technology', 'environment', 'animals-farmed'],
  lifestyle: ['lifeandstyle', 'fashion', 'food', 'travel', 'society', 'law']
}


const categoryFilter = (sectionId) => {
  const sectionEntries = Object.entries(sectionLabels);

  for (let id of sectionEntries) {
    if (id[1].includes(sectionId)) {
      return id[0];
    }
  }
}


export default categoryFilter;