import changeCamelNames from "./changeCamelNames";


const interpretMetrics = (metrics) => {
  let goal = metrics?.goal;
  let highestValue = 0;
  let interpretation;

  if (metrics.metricsqueue.length < 10) {
    return `You need to read more articles before we can evaluate your goal progress.`
  }

  if (goal !== 'all') {
    // calculate highest and lowest category reads
    for (let category in metrics) {
      if (category !== 'goal' && category !== 'metricsqueue') {
        console.log(category)
        if (metrics[category] > highestValue) {
          highestValue = metrics[category];
          
          if (goal !== category && goal !== 'all') {
            interpretation = `You've been reading a lot of ${changeCamelNames(category)} lately. To keep on track, you should read more ${changeCamelNames(goal)}.`
          } else {
            interpretation = `You're meeting your goal of reading more ${changeCamelNames(category)} lately. Good job!`
          }
        }
      }
    }
  } else if (goal === 'all') {
    interpretation = calculateValueDeviation(metrics, highestValue);
  }

  return interpretation;
}


const calculateValueDeviation = (metrics, highestValue) => {
  // creates a values array and filters the string 'all'.
  const categoryValues = Object.values(metrics).filter(val => typeof val === 'number');
  highestValue = Math.max(...categoryValues);

  // creates an entries array and filters the goal entry.
  const categoryEntries = Object.entries(metrics).filter(val => (val[1] !== 'all' && val[0] !== 'metricsqueue'));

  let deficientCategories = []
  let displayName;

  for (let i = 0; i < categoryEntries.length; i++) {
    if (categoryEntries[i][1] < (highestValue - 1)) {
      displayName = changeCamelNames(categoryEntries[i][0])
      deficientCategories.push(displayName);
    }
  }
  
  if (deficientCategories.length >= 4) {
    return `Your reading has been imbalanced lately. Be sure to browse all sorts of articles to meet your goal!`
  } else if (deficientCategories.length === 3) {
    return `Take a closer look at your consumption. Read more ${deficientCategories[0]}, 
    ${deficientCategories[1]}, and ${deficientCategories[2]} articles to get closer to your goal!`
  } else if (deficientCategories.length === 2) {
    return `You're almost at your goal. Be sure to include more ${deficientCategories[0]} and ${deficientCategories[1]} articles!`
  }
  
  return `Great job! You're meeting your goal. Keep up the good reading!`
}


export default interpretMetrics;