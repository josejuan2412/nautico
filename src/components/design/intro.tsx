import { Container, Button } from "reactstrap";

export default function Intro() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage: "../../assets/banner.jpg",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="motto text-center">
              <h1>Club Náutico Caribe</h1>
              <h3>Start designing your landing page here.</h3>
              <br />
              <Button
                href=""
                className="btn-round mr-1"
                color="neutral"
                target="_blank"
                outline
              >
                <i className="fa fa-play" />
                Torneo de Pesca
              </Button>
              <Button
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
    </>
  );
}
