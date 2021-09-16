import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import PropertiesList from "./PropertiesList";
import LeaseDetails from "./LeaseDetails";
import LoadingSpinner from "../../common/loading/LoadingSpinner";
import styles from "./properties.module.scss";

const Properties = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
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

  const $loadingState = () => {
    return <LoadingSpinner />;
  };

  const selectedProperty = properties.data.find(
    (property) => property.id === selectedPropertyId
  );

  const $loadableContent = () => {
    if (properties.loading) return $loadingState();
    return (
      <>
        <PropertiesList
          setSelectedPropertyId={setSelectedPropertyId}
          properties={properties}
          selectedPropertyId={selectedPropertyId}
        />
        <LeaseDetails
          selectedPropertyId={selectedPropertyId}
          selectedProperty={selectedProperty}
        />
      </>
    );
  };

  return <div className={styles.container}>{$loadableContent()}</div>;
};

export default Properties;
