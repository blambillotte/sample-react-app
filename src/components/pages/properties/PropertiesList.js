import styles from "./properties.module.scss";
import PropertyCard from "./PropertyCard";

const PropertiesList = ({
  setSelectedPropertyId,
  selectedPropertyId,
  properties,
}) => {
  const $loading = () => <div id="properties-list--loading">loading</div>;

  const { data, loading } = properties;
  if (loading) return $loading();

  return (
    <div id="properties-list" className={styles["properties-list"]}>
      {data.map((property) => (
        <PropertyCard
          property={property}
          key={property.id}
          isSelected={selectedPropertyId === property.id}
          setSelectedPropertyId={setSelectedPropertyId}
        />
      ))}
    </div>
  );
};

export default PropertiesList;
