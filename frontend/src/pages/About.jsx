import React from "react";
import "../styles/About.css";

const About = ({ navigateToMap }) => {
  const openEmailInNewTab = () => {
    window.open("mailto:dpupke10@gmail.com", "_blank");
  };

  return (
    <div className="about-container">
      <h1>About the Greater Boston Trash Map</h1>
      <p>
        This site provides a live trash map of the metropolitan region of New
        England. While the city of Boston covers 48.4 square miles (125 km²) and
        has 675,647 residents as of the 2020 census, urbanization has extended
        well into the surrounding areas. The Combined Statistical Area, which
        includes Providence, Rhode Island; Manchester, New Hampshire; Cape Cod;
        and Worcester, has a population of over 8.4 million people, making it
        one of the most populous regions in the U.S.
      </p>
      <p>
        With such a large population, a significant amount of trash inevitably
        accumulates. While mapping every single piece of litter is impractical,
        the goal of this site is to highlight high-density areas of trash
        through a heat map, making it easier to identify and prioritize cleanup
        efforts. The live map allows users to contribute in real time by adding
        trash logs based on their current location, while the live dashboard
        keeps track of newly submitted logs.
      </p>
      <p>
        If you are part of an organization in or around the Boston Metropolitan
        Area and have any interest or inquiries, please reach out:{" "}
        <a
          href="mailto:dpupke10@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          dpupke10@gmail.com
        </a>
        .
      </p>
      <p>
        If you encounter any bugs or have suggestions for features or
        optimizations, submit a form{" "}
        <a
          href="https://docs.google.com/forms/d/1mtI3ygFLvpcjIHI4nbiGqyIQo6qZokoHNNbSs26ThDM/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>{" "}
        and let me know!
      </p>
      <p>
        If you are interested in supporting the development and maintenance of
        this service, consider donating{" "}
        <a
          href="https://buymeacoffee.com/dpupke10"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        —any amount is appreciated!
      </p>
      <button onClick={navigateToMap} className="back-button">
        Back to Map
      </button>
    </div>
  );
};

export default About;
