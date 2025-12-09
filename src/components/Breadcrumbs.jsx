import { NavLink } from "react-router-dom";

const Breadcrumbs = ({ page2, page3, navigate }) => {
  return (
    <ul className="breadcrumbs d-flex gap-2 p-0">
      <li>
        <NavLink className="text-decoration-none fw-medium fs-6 breadcrumb-link" to="/">Home</NavLink>
      </li>

      <li className="fs-6 text-secondary">/</li>

      {page3 ?
        <li>
          <NavLink className="text-decoration-none fw-medium fs-6 breadcrumb-link" to={`/${navigate}`}>{page2}</NavLink>
        </li>
        :
        <li className="fs-6 text-secondary">{page2}</li>
      }

      {page3 &&
        <>
          <li className="fs-6 text-secondary">/</li>
          <li className="fs-6 text-secondary">{page3}</li>
        </>
      }
    </ul>
  );
};

export default Breadcrumbs;
