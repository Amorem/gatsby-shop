import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect } from "react"
import netlifyIdentity from "netlify-identity-widget";

import gatsbyIcon from '../images/gatsby-icon.png';

const NavLink = props => <Link getProps={isActive} {...props} />

const isActive = ({ isCurrent }) => {
  return { className: isCurrent ? "active" : "navlink" }
}

const Header = ({ siteTitle }) => {
  useEffect(() => {
    netlifyIdentity.init();
  }, [])
  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <img src={gatsbyIcon} alt="Gastby Logo" style={{ width: '50px', margin: "0 5px", border: "3px solid orange", borderRadius: "50%" }} />
          <h1 style={{ margin: 0 }}>
            <NavLink
              to="/"
            >
              {siteTitle}
            </NavLink>
          </h1>
        </span>
        <NavLink to='/blog'>Blog</NavLink>
        <NavLink to='/products'>Store</NavLink>
        <div data-netlify-identity-menu></div>
        <div
          className="snipcart-summary snipcart-checkout"
          style={{ color: "white", cursor: "pointer" }}
        >
          <div>
            <strong>My Cart</strong>
          </div>
          <div>
            <span
              className="snipcart-total-items"
              style={{ fontWeight: "bold" }}
            ></span>{" "} items in cart
        </div>
          <div>
            Total Price {' '}<span className="snipcart-total-price" style={{ fontWeight: "bold" }}></span>
          </div>
        </div>
      </div>
    </header>
  )
}
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
