import classnames from "classnames";
import styles from "./properties.module.scss";
import { getPricePerSquareFoot } from "./square_foot_utils";

const PropertyCard = ({ property, setSelectedPropertyId, isSelected }) => {
  const { name, address1, address2, baseRent, sqft, id } = property;

  const $address = () => (
    <div className={classnames(styles["detail-item"], styles.address)}>
      <p>{address1}</p>
      <p>{address2}</p>
    </div>
  );

  const formatCurrency = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const sqFtPerMonth = getPricePerSquareFoot({ sqft, baseRent });

  const $detailItem = (content) => (
    <div className={styles["detail-item"]}>{content}</div>
  );

  return (
    <div
      className={classnames(styles.card, { [styles.selected]: isSelected })}
      onClick={() => setSelectedPropertyId(id)}
    >
      <div className={styles.header}>
        <h2>{name}</h2>
      </div>
      <div className={styles.details}>
        <div className={styles["detail-row"]}>
          {$address()}
          <div className={styles["detail-item"]}>{baseRent}</div>
        </div>
        <div className={styles["detail-row"]}>
          {$detailItem(`${sqft.toLocaleString()} sqft.`)}
          {$detailItem(`${formatCurrency(sqFtPerMonth)} sqft/mo`)}
          {$detailItem(`${formatCurrency(sqFtPerMonth / 12)} sqft/year`)}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
