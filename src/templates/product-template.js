import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

const ProductTemplate = ({ data: { contentfulProduct: product }, location }) => {
    return (
        <Layout>
            <div style={{
                marginLeft: '0 auto',
                width: "100%",
                textAlign: 'center'
            }}>
                <h2>{product.name} - <span style={{ color: "#ccc" }}>Added on {product.createdAt}</span></h2>
                <h4>${product.price}</h4>
                <p>{product.description}</p>
                <button
                    style={{ background: "darkorange", color: "white", padding: "0.3em", borderRadius: "5px", cursor: "pointer" }}
                    className="snipcart-add-item"
                    data-item-id={product.id}
                    data-item-price={product.price}
                    data-item-image={product.image.file.url}
                    data-item-name={product.name}
                    data-item-url={location.pathname}
                >Add to cart</button>
                <Img
                    fluid={product.image.fluid}
                    style={{
                        margin: "0 auto",
                        maxWidth: "600px"
                    }}
                />
            </div>
        </Layout>
    )
}

export const query = graphql`
query($slug: String!) {
  contentfulProduct(slug : {eq: $slug}) {
    id
    name
    price
    description
    createdAt(formatString: "MMMM Do, YYYY")
    image {
        fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid
        }
        file {
            url
        }
    }
  }
}
`;

export default ProductTemplate;