import { useState } from "react";
import PropertiesList from "./PropertiesList";
import LeaseDetails from "./LeaseDetails";
import styles from "./properties.module.scss";

const Properties = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  return (
    <div className={styles.container}>
      <PropertiesList setSelectedPropertyId={setSelectedPropertyId} />
      <LeaseDetails selectedPropertyId={selectedPropertyId} />
    </div>
  );
};

export default Properties;
