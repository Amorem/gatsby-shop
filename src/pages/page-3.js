import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Layout from "../components/layout";

export default () => {
    const data = useStaticQuery(graphql`
        {
        allFile {
            edges {
            node {
                name
            }
            }
        }
        }
        `);

    return (
        <Layout>
            <h1>Hello from page 3</h1>
            <Link to="/">Home</Link>
            {data.allFile.edges.map(({ node }, index) => <h2 key={index}>{node.name}</h2>)}
        </Layout >
    )
}
