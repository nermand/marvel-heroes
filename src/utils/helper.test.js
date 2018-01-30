import * as helper from './helper';

const fullHero = {
  id: 1009551,
  name: 'Russian',
  thumbnail: {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/8/10/4c003c4af200f',
    extension: 'jpg'
  },
  urls: [
    {
      type: 'detail',
      url: 'http://marvel.com/characters/1964/russian?utm_campaign=apiRef&utm_source=7f8d60cb47d5550dceace155296625e4'
    }
  ]
};

const simplifiedHero = {
  id: 1009551,
  name: 'Russian',
  avatar: 'http://i.annihil.us/u/prod/marvel/i/mg/8/10/4c003c4af200f.jpg',
  detailsUrl: 'http://marvel.com/characters/1964/russian?utm_campaign=apiRef&utm_source=7f8d60cb47d5550dceace155296625e4'
};

describe('utils/helper', () => {
  it('should have formatHero method', () => {
    expect(helper.formatHero).toBeDefined();
  });

  it('should return siplified hero object from the complex one', () => {
    expect(helper.formatHero(fullHero)).toEqual(simplifiedHero);
  });
});
