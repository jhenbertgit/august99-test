"use client";

import { Container, Row } from "reactstrap";
import Card from "@/component/Card";

export default function Home() {
  return (
    <>
      <Container className="m-auto my-3">
        <Row>
          <Card />
        </Row>
      </Container>
    </>
  );
}
