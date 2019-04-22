import React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";

export const query = graphql`
query($skip: Int!, $limit: Int!){
  allMarkdownRemark(skip: $skip, limit: $limit, sort: {fields: frontmatter___date, order: DESC}) {
    edges {
      node {
        id
        frontmatter { title date(fromNow: true) }
        excerpt 
        timeToRead
        fields {
            slug
        }
      }
    }
  }
}
`;


const Blog = ({ data, pageContext }) => {
    const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext;
    const nextPage = `/blog/${String(currentPage + 1)}`;
    const prevPage = currentPage - 1 === 1 ? "/blog" : `/blog/${String(currentPage - 1)}`;

    return (
        <Layout>

            <h1 style={{ display: "inlineBlock", borderBottom: "1px solid" }}>My blog</h1>
            {data.allMarkdownRemark.edges.map(({ node }) => {
                return (
                    <div key={node.id}>
                        <Link to={`/posts${node.fields.slug}`}>
                            <h2>{node.frontmatter.title} <span style={{ color: "#bbb", fontSize: "0.8rem" }}>{node.frontmatter.date}</span></h2>

                        </Link>
                        <h4>({node.timeToRead} min read)</h4>
                        <h4>{node.excerpt}</h4>
                    </div>
                )
            })}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                maxWidth: 300,
                margin: "0 auto"
            }}>
                {!isFirstPage && (
                    <Link to={prevPage} rel="prev">
                        Prev Page
                    </Link>
                )}
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
                            {index + 1}
                        </Link>
                    ))
                }
                {!isLastPage && (
                    <Link to={nextPage} rel="next">
                        Next Page
                    </Link>
                )}
            </div>

        </Layout>
    )
}

export default Blog;