import React from 'react';
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

const Products = ({ data: { allContentfulProduct } }) => {
    return (
        <Layout>
            <div>
                <h2>Products</h2>
                {allContentfulProduct.edges.map(({ node: product }) => (
                    <div key={product.id}>

                        <Link to={`/products/${product.slug}`} style={{ textDecoration: "none", color: "#551a8b" }}>
                            <h3>{product.name} - {" "} <span style={{ fontSize: "1.3rem", fontWeight: 300, color: "#f60" }}>${product.price}</span></h3>
                        </Link>
                        <Img fluid={product.image.fluid} style={{ maxWidth: 250 }} />
                    </div>
                )

                )}
            </div>
        </Layout>
    )
}

export const query = graphql`
{
allContentfulProduct {
    edges {
        node {
            id
            slug
            name
            price
            image {
                fluid(maxWidth: 800) {
                    ...GatsbyContentfulFluid_tracedSVG
                }
            }
        }
    }
}
}
`;

export default Products;