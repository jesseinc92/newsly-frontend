
const sectionLabels = {
    usNews: ['us-news'],
    worldNews: ['world', 'uk-news', 'australia-news', 'cardiff'],
    business: ['business'],
    opinion: ['commentisfree'],
    sport: ['sport', 'football'],
    culture: ['culture', 'film', 'books', 'music', 'artanddesign', 'tv-and-radio', 'stage', 'games', 'media'],
    science: ['science', 'technology', 'environment', 'animals-farmed'],
    lifestyle: ['lifeandstyle', 'fashion', 'food', 'travel', 'society', 'law']
}

// cross reference incoming article category, update the relevant
// metrics in db and local storage, and returns the metrics info
const updateMetrics = (sectionId, savedMetrics) => {

  if (sectionId) {
    const sectionEntries = Object.entries(sectionLabels);

    for (let id of sectionEntries) {
      if (id[1].includes(sectionId)) {
        savedMetrics[id[0]] += 1;
        savedMetrics.metricsqueue.push(id[0]);

        // Instead of simply adding to an ceiling-less tally,
        // keep a predefined moving count using a queue (array push/pop).
        // Removes the oldest sectionId and decrements that metric by 1.
        if (savedMetrics.metricsqueue.length > 80) {
          const expiredSectionMetric = savedMetrics.metricsqueue.shift();
          savedMetrics[expiredSectionMetric] -= 1;
        }
      }
    }
  }
  
  return savedMetrics;
}

export default updateMetrics;