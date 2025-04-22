import Intro from "../../components/design/intro";
import NavbarElement from "../../components/design/navbar";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import { BsGlobeAmericas } from "react-icons/bs";
import { GiCctvCamera } from "react-icons/gi";
import { BiSolidDrink } from "react-icons/bi";

import History from "../../assets/img/history1.png";

export default function View() {
  return (
    <div>
      <NavbarElement />
      <Intro />
      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Nuestros Servicios</h2>
                <h5 className="description">
                  En nuestra marina ofrecemos una experiencia náutica completa,
                  combinando servicios de amarre, mantenimiento, abastecimiento
                  y confort, todo en un solo lugar. Pensado para navegantes
                  exigentes, contamos además con espacios de relajación como un
                  amplio bar con vista al mar.
                </h5>
                <br />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md="4">
                <div className="info">
                  <div className="icon ">
                    <i className="nc-icon ">
                      <BsGlobeAmericas />
                    </i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Muelles y rampas</h4>
                    <p className="description">
                      Ofrecemos espacios para el resguardo de embarcaciones por
                      horas, días o temporadas. Nuestras rampas de alta
                      capacidad permiten botar y retirar botes de cualquier
                      tamaño de forma rápida y segura.
                    </p>
                    {/* <Button className="btn-link" color="info" href="#pablo">
                      See more
                    </Button> */}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="info">
                  <div className="icon ">
                    <i className="nc-icon ">
                      <GiCctvCamera />
                    </i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Vigilancia y seguridad 24/7</h4>
                    <p>
                      Contamos con vigilancia 24/7 y una garita de seguridad,
                      respaldadas por un completo sistema de cámaras CCTV, para
                      garantizar la protección de su embarcación en todo
                      momento.
                    </p>
                    {/* <Button className="btn-link" color="info" href="#pablo">
                      See more
                    </Button> */}
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="info">
                  <div className="icon ">
                    <i className="nc-icon ">
                      <BiSolidDrink />
                    </i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Bar</h4>
                    <p>
                      Contamos con un amplio bar ideal para relajarse después de
                      una jornada en el mar. Ofrecemos una variada carta de
                      bebidas, cocteles, snacks y un ambiente náutico único con
                      vistas panorámicas al puerto. Ya sea para socializar con
                      otros navegantes o disfrutar de la puesta de sol, nuestro
                      bar es el punto de encuentro perfecto dentro de la marina.
                    </p>
                    {/* <Button className="btn-link" color="info" href="#pablo">
                      See more
                    </Button> */}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section section-dark text-center">
          <Container>
            <h2 className="title">Conoce un poco de nuestra historia</h2>
            <Row>
              <Col md="4">
                <Card className="card-profile card-plain">
                  <div className="">
                    <a href="/history">
                      <img src={History} alt="Historia del Club" />;
                    </a>
                  </div>
                  <CardBody>
                    <a href="/history">
                      <div className="author">
                        <CardTitle tag="h4">Desde 1954</CardTitle>
                        <h6 className="card-category">
                          Historia y Fundación del Club Náutico Caribe
                        </h6>
                      </div>
                    </a>
                    <p className="card-description text-center">
                      El Club Náutico Caribe fue fundado el 15 de septiembre de
                      1954 en la ciudad de Colón. Su constitución quedó
                      formalizada mediante la Resolución No. 36 del 8 de octubre
                      de 1957, con actas, estatutos y personería jurídica
                      avalados por el Ministerio de Gobierno y Justicia.
                    </p>
                    <br />
                    <a>Conoce mas...</a>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="text-center">Contactenos</h2>
                <p>Agregar mapa, link de whatsap, correo, etc</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
