import { NavLink } from "react-router-dom";

const Breadcrumbs = ({ parentLabel, currentLabel, parentPath }) => {
  return (
    <ul className="breadcrumbs d-flex gap-2 p-0 mb-50">
      <li>
        <NavLink className="text-decoration-none fw-medium fs-6 breadcrumb-link" to="/">Home</NavLink>
      </li>

      <li className="fs-6 text-secondary">/</li>

      {currentLabel ? (
        <li>
          <NavLink className="text-decoration-none fw-medium fs-6 breadcrumb-link" to={`/${parentPath}`}>
            {parentLabel}
          </NavLink>
        </li>
      ) : (
        <li className="fs-6 text-secondary">{parentLabel}</li>
      )}

      {currentLabel && (
        <>
          <li className="fs-6 text-secondary">/</li>
          <li className="fs-6 text-secondary">{currentLabel}</li>
        </>
      )}
    </ul>
  );
};

export default Breadcrumbs;
