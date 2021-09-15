import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import styles from "./leases.module.scss";

const LeaseDetails = ({ selectedPropertyId }) => {
  const [leases, setLeases] = useState({ data: [], loading: false });

  useEffect(() => {
    if (selectedPropertyId) {
      setLeases({ loading: true, data: [] });
      api
        .post({
          method: "POST",
          path: `fe-challenge/properties/${selectedPropertyId}/leases`,
        })
        .then((data) => {
          setLeases({ loading: false, data });
          console.log(data);
        });
    }
  }, [selectedPropertyId]);

  if (leases.loading || !selectedPropertyId) return null;

  const primaryContact = ({ contacts }) => {
    const contactsArr = Object.keys(contacts).map((contactName) => ({
      name: contactName,
      ...contacts[contactName],
    }));

    return contactsArr.find((contact) => contact.tags.includes("PRIMARY"));
  };

  const $primaryContact = (lease) => {
    const primary = primaryContact(lease);
    if (!primary) return "N/A";

    return (
      <>
        <span>{primary.name}</span>
        <span className={styles["contact-item"]}>{primary.phone}</span>
        <span className={styles["contact-item"]}>
          <a href={`mailto:${primary.email}`}>{primary.email}</a>
        </span>
      </>
    );
  };

  const $tableRow = (lease) => (
    <tr key={lease.id}>
      <td>{lease.companyName}</td>
      <td>{lease.startDate}</td>
      <td>{lease.inclusiveEndDate}</td>
      <td>{lease.status}</td>
      <td>{$primaryContact(lease)}</td>
    </tr>
  );

  const $nullStateRow = () => (
    <tr>
      <td colSpan="5">No leases for this property</td>
    </tr>
  );

  const $tableRows = () => {
    if (!leases.data.length) return $nullStateRow();

    return leases.data.map((lease) => $tableRow(lease));
  };

  return (
    <div className={styles.leases}>
      <table>
        <thead>
          <tr>
            <th>Tenant</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Lease Status</th>
            <th>Primary Contact</th>
          </tr>
        </thead>
        <tbody>{$tableRows()}</tbody>
      </table>
    </div>
  );
};

export default LeaseDetails;
