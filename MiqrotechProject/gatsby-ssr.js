const React = require('react')
const Layout = require('@components/Layout').default

exports.wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>
}
