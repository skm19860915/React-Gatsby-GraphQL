const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const ExecutivePage = path.resolve("./src/templates/ExecutivePage.tsx");
  const BlogPage = path.resolve("./src/templates/BlogPage.tsx");

  const executivesQuery = await graphql(`
    {
      allContentfulExecutive {
        nodes {
          fullName
          headshot {
            file {
              url
            }
          }
          linkedin
          title
          bio {
            bio
          }
        }
      }
    }
  `)
  .then((result) => {
    if (result.errors) {
      console.error(result.errors);
      return reject(result.errors);
    }

    const pageData = result.data.allContentfulExecutive.nodes;
    pageData.forEach((item, index, arr) => {
      const pathName = item.fullName.replace(/\s/, "-").toLowerCase().trim();

      createPage({
        path: `/about/${pathName}`,
        component: ExecutivePage,
        context: {
          executive: item,
        },
      });
    });
  })
  .catch(error => {
    console.error(error)
  })

  const blogPostsQuery = await graphql(`
    {
      allContentfulBlogPost {
        tagList: distinct(field: moreTags___tagName)
        nodes {
          id
          mainBlogImage {
            file {
              url
              fileName
            }
          }
          moreTags {
            tagName
          }
          title
          date(locale: "", formatString: "")
          body {
            childMarkdownRemark {
              html
            }
          }
          description
          mediaFile {
            file {
              url
              fileName
            }
          }
        }
      }
    }
  `)
  .then((result) => {
    if (result.errors) {
      console.error(result.errors);
      return reject(result.errors);
    }

    const pageData = result.data.allContentfulBlogPost.nodes;

      pageData.forEach((page, index, arr) => {

        let pathName = page.title
          .split(" ")
          .filter((e) => e !== "/")
          .join(" ")
          .toLowerCase()
          .replace(/\s+/g, "-");

        console.info(`building ${pathName}`)

        createPage({
          path: `/blog/${pathName}`,
          component: BlogPage,
          context: { allArticles: arr, articleData: page },
        });
      });
    
  })
  .catch(error => {
    console.error(error)
  })

};

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  if (stage === "build-html" || stage === "devleop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\.(gltf)$/i,
            use: [
              {
                loader: "url-loader",
              },
            ],
          },
          {
            test: /\@justinribeiro\/lite-youtube/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.(gltf)$/i,
          use: [
            {
              loader: "url-loader",
            },
          ],
        }
      ],
    },
  });
};

