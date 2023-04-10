import { client, q } from "../faunadb"

const getAllNotes = client
  .query(q.Paginate(q.Match(q.Ref("indexes/all_apartmentavailability"))))
  .then(response => {
    const productRefs = response.data
    console.log("fauna", productRefs)
    // create new query out of todo refs.
    // https://docs.fauna.com/fauna/current/api/fql/
    const getAllProductDataQuery = productRefs.map(ref => {
      return q.Get(ref)
    })
    // query the refs
    return client.query(getAllProductDataQuery).then(data => data)
  })
  .catch(error => console.log("error", error.message))

export default getAllNotes
