import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout";

export const query = graphql`
query ($slug: String) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
  html
    fields {
      slug
    }
    frontmatter {
      title
    }
  }
}
`

export default ({ data: post }) => {

    return (
        <Layout>
            <h1>{post.markdownRemark.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
        </Layout>
    )
}
