import * as api from './api';

const search = 'Spider';
const offset = 20;

describe('utils/api', () => {
  it('should return valid url', () => {
    const url = api.createSearchUrl(search, offset);
    expect(url).not.toEqual('');

    const regexp = new RegExp(`^https://.*${search}`);
    expect(url).toEqual(expect.stringMatching(regexp));
  });

  it('should return valid url when offset param is not provided', () => {
    const url = api.createSearchUrl(search);
    expect(url).not.toEqual('');

    const regexp = new RegExp('^https://.*' + search);
    expect(url).toEqual(expect.stringMatching(regexp));
  });

  it('should return url containing apikey', () => {
    const url = api.createSearchUrl(search);
    expect(url).toContain('apikey');
  });

  it('should return url without nameStartsWith param when search is empty', () => {
    const url = api.createSearchUrl('');
    expect(url).not.toContain('nameStartsWith');
  });

  it('should return url without specified offset', () => {
    const url = api.createSearchUrl(search, offset);
    expect(url).toContain(`&offset=${offset}`);
  });
});
