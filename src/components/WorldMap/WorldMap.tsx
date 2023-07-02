import React, { useState, useEffect } from "react";
import { VectorMap } from "@south-paw/react-vector-maps";
import { worldMap } from "../../data/worldMap";
import styles from "./WorldMap.module.css";
import styled from "@emotion/styled";

interface WorldMapProps {
  countries?: {
    id?: string;
    country: any;
    amount: any;
    percentage: any;
  }[];
  handleClick?: (country: string) => void;
}

export const WorldMap = ({ countries, handleClick }: WorldMapProps) => {
  const [country, setCountry] = useState<string>("us");
  const [countriesMarkers, setCountriesMarkers] = useState<string>();
  const layerProps = {
    onClick: ({ target }: any) => {
      const country = target?.attributes?.name?.value;
      setCountry(target?.attributes?.id?.value);
      handleClick?.(country);
    },
  };

  useEffect(() => {
    if (countries) {
      const values = countries
        .map((country) => country.id)
        .filter(Boolean)
        .map(
          (id) => `[id="${id}"] {
        fill: rgba(56,43,168,0.${
          countries.find((item) => item.id === id)?.percentage
        });
      }`
        )
        .join(",");

      setCountriesMarkers(values);
    }
  }, [countries]);

  const StyledContainer = styled.div`
    ${countriesMarkers}
  `;

  return (
    <StyledContainer>
      <VectorMap
        {...worldMap}
        className={styles.map}
        layerProps={layerProps}
        checkedLayers={[country]}
      ></VectorMap>
    </StyledContainer>
  );
};
