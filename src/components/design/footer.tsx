import { Row, Container } from "reactstrap";

function Footer() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <div className="credits ml-auto text-right">
            <span className="copyright">
              © {new Date().getFullYear()}, made by: Fennex Dev.
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
