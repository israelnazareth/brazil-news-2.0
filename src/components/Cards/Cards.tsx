/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useMyContext } from "../../context/MyContext";
import "./Cards.css";

export default function Cards() {
  const { articles } = useMyContext();

  return (
    <>
      {React.Children.toArray(
        articles?.map((article) => {
          return (
            <a href={article.url} target="blank">
              <div
                className="card"
                style={{ backgroundImage: `url("${article.image}"` }}
              >
                <p className="cardSource">
                  {article.source.name.toUpperCase()}
                </p>
                <div className="cardTexts">
                  <h1 className="cardTitle">{article.title}</h1>
                  <p className="cardDescription">{article.description}</p>
                </div>
              </div>
            </a>
          );
        })
      )}
    </>
  );
}
