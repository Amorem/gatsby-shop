import React, { useEffect, useState } from 'react';
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import netlifyIdentity from "netlify-identity-widget";

import Layout from "../components/layout";

const Products = ({ data: { allContentfulProduct } }) => {
    const [filteredProducts, setFilteredProducts] = useState([])
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = () => {
        const allProducts = allContentfulProduct.edges;
        setFilteredProducts(netlifyIdentity.currentUser() !== null ? allProducts : allProducts.filter(({ node: product }) => !product.private));
    }

    return (
        <Layout>
            <div>
                <h2>Products</h2>
                {filteredProducts.map(({ node: product }) => (
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
            private
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