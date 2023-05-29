import React, { useState, useEffect, useRef } from "react";
import { Col } from "reactstrap";
import Loading from "./Loading";

const Card = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.spacexdata.com/v4/launches/`);
      const jsonData = await response.json();
      setIsLoading(true);
      setData(jsonData);
    } catch (error) {
      console.error("Error: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let content = data.map((dataObj, index) => (
    <Col
      key={index}
      id={`card-${index}`}
      md={12}
      className="d-md-flex align-items-center justify-content-center my-3"
    >
      <Col md={4}>
        <img
          className="img-thumbnail img-fluid"
          src={dataObj.links.patch.small}
          alt="img"
          loading="lazy"
        />
      </Col>
      <Col md={8}>
        <h2>
          {dataObj.flight_number}: {dataObj.name} (
          {new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
            new Date(dataObj.date_utc)
          )}
          )
        </h2>
        <p>Details: {dataObj.details}</p>
      </Col>
    </Col>
  ));

  if (isLoading) {
    content = <Loading />;
  }

  return <>{content}</>;
};

export default Card;
