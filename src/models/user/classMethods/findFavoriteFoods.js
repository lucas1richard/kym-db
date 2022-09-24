async function findFavoriteFoods({ uuid, Abbrev, UserRecordFavorites }) {
  const recordFavorites = await UserRecordFavorites.findAll({
    where: { userUuid: uuid },
    order: [['meal', 'desc']],
  });

  const abbrevsArray = await Abbrev.findAll({
    where: {
      id: recordFavorites.map(({ abbrevId }) => abbrevId),
    },
    distinct: true,
  });

  const abbrevsMap = Object.fromEntries(
    abbrevsArray.map((abbrev) => [abbrev.id, abbrev]),
  );

  return {
    recordFavorites,
    abbrevs: abbrevsMap,
  };
}

export default findFavoriteFoods;
