const { createFilePath } = require('gatsby-source-filesystem');
const path = require("path");

const PostTemplate = path.resolve("./src/templates/post-template.js");
const BlogTemplate = path.resolve("./src/templates/blog-template.js");
const ProductTemplate = path.resolve("./src/templates/product-template.js");

module.exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === "MarkdownRemark") {
        const slug = createFilePath({ node, getNode, basePath: 'posts' })
        createNodeField({
            node,
            name: "slug",
            value: slug
        })
    }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
{
  allMarkdownRemark {
    edges {
      node {
         fields {
          slug
        }
       }
    }
  }
  allContentfulProduct {
    edges {
      node {        
        slug
      }
    }
  }
}
`);

    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach(({ node: post }) => {
        createPage({
            path: `posts${post.fields.slug}`,
            component: PostTemplate,
            context: {
                slug: post.fields.slug
            }
        })
    })
    const postsPerPage = 1;
    const totalPages = Math.ceil(posts.length / postsPerPage);
    Array.from({ length: totalPages }).forEach((_, index) => {

        let currentPage = index + 1;
        const isFirstPage = index === 0;
        const isLastPage = currentPage === totalPages;
        createPage({
            path: isFirstPage ? "/blog" : `/blog/${currentPage}`,
            component: BlogTemplate,
            context: {
                limit: postsPerPage,
                skip: index * postsPerPage,
                isFirstPage,
                isLastPage,
                currentPage,
                totalPages
            }
        })
    })

    const products = result.data.allContentfulProduct.edges.forEach(({node: product})=> {
        createPage({
            path: `/products/${product.slug}`,
            component: ProductTemplate,
            context: {
                slug: product.slug
            }
        })
    })
}