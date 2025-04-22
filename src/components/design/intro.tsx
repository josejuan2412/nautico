import { Container, Button } from "reactstrap";

export default function Intro() {
  return (
    <>
      <div>
        <div className="page-header section-dark main-header">
          <div className="filter" />
          <div className="content-center">
            <Container>
              <div className="motto text-center">
                <h1>Club Náutico Caribe</h1>
                <h3>
                  Punto de encuentro para amantes del mar y la Pesca Deportiva
                </h3>
                <br />
                <Button
                  href="/tournaments"
                  className="btn-round mr-1"
                  color="neutral"
                  outline
                >
                  <i className="fa fa-play" />
                  Torneo de Pesca
                </Button>
                <Button
                  href="/departures"
                  className="btn-round"
                  color="neutral"
                  type="button"
                  outline
                >
                  Registro de Salidas
                </Button>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
