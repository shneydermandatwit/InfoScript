import { Filters } from './filters';

describe('Filters', () => {
  it('should create an instance', () => {
    const filters :Filters = {
      searchTerm : "s",
      fromDate : "w",
      toDate : "d",
      orderBy: "s",
      orderDirection : "w",
      summaryFilter : "w"
    }
   expect(filters).toBeTruthy();
  });
});
