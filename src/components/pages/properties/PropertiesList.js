import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import styles from "./properties.module.scss";
import PropertyCard from "./PropertyCard";

const PropertiesList = ({ setSelectedPropertyId }) => {
  const [properties, setProperties] = useState({ data: [], loading: true });

  useEffect(() => {
    api
      .post({ method: "POST", path: "fe-challenge/properties" })
      .then((data) => {
        setProperties({ loading: false, data });
        // pre-select the first property for the user
        if (data.length) setSelectedPropertyId(data[0].id);
      });
  }, [setSelectedPropertyId]);

  const $loading = () => <div id="properties-list--loading">loading</div>;

  const { data, loading } = properties;
  if (loading) return $loading();

  return (
    <div id="properties-list" className={styles["properties-list"]}>
      {data.map((property) => (
        <PropertyCard
          property={property}
          key={property.id}
          setSelectedPropertyId={setSelectedPropertyId}
        />
      ))}
    </div>
  );
};

export default PropertiesList;
