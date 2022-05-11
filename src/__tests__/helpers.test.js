import categoryFilter from "../helpers/categoryFilter";
import changeCamelNames from '../helpers/changeCamelNames';
import interpretMetrics from "../helpers/interpretMetrics";



describe('categoryFilter', () => {
  it('matches defined section ids', function() {
    expect(categoryFilter('commentisfree')).toBe('opinion')
  });

  it('returns undefined for undefined section ids', function() {
    expect(categoryFilter('blah')).toBe(undefined)
  });
})


describe('changeCamelNames', () => {
  it('changes defined input to expected all', function() {
    expect(changeCamelNames('all')).toBe('of everything')
  });

  it('returns default of first character capitalized', function() {
    expect(changeCamelNames('blah')).toBe('Blah');
  })
})


describe('interpretMetrics', () => {
  const mockMetricsShort = {
    goal: 'all',
    metricsqueue: ['cat1', 'cat2', 'cat2', 'cat3', 'cat3', 'cat3'],
    cat1: 1,
    cat2: 2,
    cat3: 3
  };
  
  const mockMetricsRegular = {
    goal: 'all',
    metricsqueue: ['cat1', 'cat1', 'cat2', 'cat2', 'cat2', 'cat2', 'cat2', 'cat3', 'cat3', 'cat3', 'cat3', 'cat3', 'cat3', 'cat3'],
    cat1: 2,
    cat2: 5,
    cat3: 7
  }

  it('confirms not enough data points', function() {
    expect(interpretMetrics(mockMetricsShort)).toBe(`You need to read more articles before we can evaluate your goal progress.`);
  })

  it('shows deficient categories for all goal', function() {
    const interpretation = interpretMetrics(mockMetricsRegular);
    expect(interpretation).toContain('Cat1');
    expect(interpretation).toContain('Cat2');
  })

  it('congratulates you on meeting your goal', function() {
    mockMetricsRegular.goal = 'cat3';
    const interpretation = interpretMetrics(mockMetricsRegular);
    expect(interpretation).toBe(`You're meeting your goal of reading more Cat3 lately. Good job!`)
  })
})