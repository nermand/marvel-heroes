export const formatHero = hero => {
  const {id, name } = hero;
  const avatar = hero.thumbnail.path + '.' + hero.thumbnail.extension;
  const details = hero.urls.filter((c) => {
    return c.type === 'detail';
  })[0];

  const detailsUrl = details && details.url

  return {
    id,
    name,
    avatar,
    detailsUrl
  }
}
