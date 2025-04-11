import { Container } from "reactstrap";

export default function Intro() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage: "../../assets/img/antoine-barres.jpg",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Club Nautico Caribe</h1>
              <div className="fog-low">
                <img alt="..." src={"../../assets/img/fog-low.png"} />
              </div>
              <div className="fog-low right">
                <img alt="..." src={""} />
              </div>
            </div>
            <h2 className="presentation-subtitle text-center">
              Introduccion texto
            </h2>
          </Container>
        </div>
      </div>
    </>
  );
}
