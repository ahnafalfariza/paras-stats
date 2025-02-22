import db from 'repositories/database'

export default async function collectionsAPI(req, res) {
  if (!db.ready) {
    await db.init()
  }

  const collectionStats = await db.root
    .collection('collection_stats')
    .find({})
    .project({
      owner_ids: 0,
    })
    .sort({
      volume_usd: -1,
    })
    .limit(100)
    .toArray()
  res.status(200).json(collectionStats)
}
