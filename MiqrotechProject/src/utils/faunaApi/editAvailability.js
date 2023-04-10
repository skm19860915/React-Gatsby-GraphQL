import { client, q } from "../faunadb"

const editAvailability = (noteId, newText) =>
  client
    .query(
      q.Update(q.Ref(q.Collection("apartmentavailability"), noteId), {
        data: { text: newText },
      })
    )
    .then(ret => console.log(ret))
    .catch(err => console.warn(err))

export default editAvailability
