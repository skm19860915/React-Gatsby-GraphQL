import faunadb from "faunadb"

const client = new faunadb.Client({
  secret: "fnADmiCdPEACC7gsNDFnNHLrHyOimjKml1SVY81f",
})
const q = faunadb.query

export { client, q }
