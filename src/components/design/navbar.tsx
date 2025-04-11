import React from "react";

import classnames from "classnames";

import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

export default function NavbarElement() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            title="Club Nautico Caribe"
          >
            Inicio
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink data-placement="bottom" href="/departures" title="">
                <p>Registro de Salidas</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-placement="bottom" href="/tournaments" title="">
                <p>Torneo De Pesca</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-placement="bottom" href="/events" title="">
                <p>Fotos de Eventos</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-placement="bottom" href="/history" title="">
                <p>Historia del Club</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">
                {" "}
                <p>Nuestros Servicios</p>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
