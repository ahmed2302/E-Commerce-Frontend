import {
  faPen,
  faTrashCan,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./table.css";
import PaginatedItems from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import TransformDate from "../../helpers/TransformDate";
import { baseURL, imgBaseURL } from "../../Api/Api";

export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: "",
  };
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filtredData, setFiltredData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const filtredDataByDate =
    date.length !== 0
      ? props.data.filter((item) => TransformDate(item.created_at) === date)
      : props.data;

  const filterSearchByDate =
    date.length !== 0
      ? filtredData.filter((item) => TransformDate(item.created_at) === date)
      : filtredData;

  const showWhichData =
    search.length > 0 ? filterSearchByDate : filtredDataByDate;

  async function getSearchedData() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFiltredData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  // Wrap the delete function to handle spinner
  async function handleDelete(id) {
    setDeletingId(id);
    try {
      await props.delete(id);
    } finally {
      setDeletingId(null);
    }
  }

  // Header Show
  const headerShow = props.header.map((item, key) => (
    <th key={key} className="text-white f-cairo">
      {item.name}
    </th>
  ));
  // Body Show
  const dataShow = showWhichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "image" ? (
            // <img width="50px" src={item[item2.key]} alt="" />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "nowrap",
                gap: "10px",
                overflow: "auto",
                height: "50px",
                scrollbarWidth: "none",
              }}>
              <img
                className="catImage"
                src={imgBaseURL + item[item2.key]}
                alt="cat"
              />
            </div>
          ) : item2.key === "images" ? (
            // <div className="d-flex aling-items-center justify-content-start gap-2 flex-wrap">
            //   {item[item2.key].map((img, key3) => (
            //     <img
            //       key={key3}
            //       className=""
            //       width="50px"
            //       src={baseURL + img.image}
            //       alt="img"
            //     />
            //   ))}
            // </div>
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                gap: "10px",
                overflow: "auto",
                height: "50px",
                scrollbarWidth: "none",
                cursor: "all-scroll",
              }}>
              {item[item2.key].map((img, key) => (
                <img
                  key={key}
                  style={{ width: "60px" }}
                  className="productImage"
                  src={imgBaseURL + img.image}
                  alt="pro"
                />
              ))}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1996" ? (
            "Writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.name && " (You)"}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-4">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              fontSize={"19px"}
              icon={faPen}
              color="#0d6efd"
              title="Edit"
              style={{ cursor: "pointer" }}
            />
          </Link>
          {currentUser.name !== item.name && (
            <span
              style={{ display: "inline-block", minWidth: 22, minHeight: 22 }}>
              {deletingId === item.id ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  fontSize={"19px"}
                  color="#dc3545"
                  title="Deleting..."
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => handleDelete(item.id)}
                  fontSize={"19px"}
                  color="#dc3545"
                  style={{ cursor: "pointer" }}
                  icon={faTrashCan}
                  title="Delete"
                />
              )}
            </span>
          )}
        </div>
      </td>
    </tr>
  ));

  // Return Data
  return (
    <>
      <div className="d-flex align-items-center gap-2">
        <div className="flex-grow-1">
          <Form.Control
            className="my-2"
            type="search"
            aria-label="input example"
            placeholder="search"
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchLoading(true);
            }}
          />
        </div>
        <div className="flex-grow-1">
          <Form.Control
            className="my-2"
            type="date"
            aria-label="input example"
            placeholder="search"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="table-responsive custom-table-responsive">
        <Table
          className="table-shadow rounded overflow-hidden text-white"
          striped
          hover>
          <thead className="px-2">
            <tr>
              <th className="f-cairo text-white">id</th>
              {headerShow}
              <th className="f-cairo text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {props.loading ? (
              <tr className="text-center">
                <td colSpan={12}>Loading...</td>
              </tr>
            ) : searchLoading ? (
              <tr className="text-center">
                <td colSpan={12}>Searching...</td>
              </tr>
            ) : (
              dataShow
            )}
          </tbody>
        </Table>
      </div>
      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select
            className="custom-drop"
            onChange={(e) => props.setLimit(e.target.value)}
            aria-label="Default select example">
            <option
              style={{
                backgroundColor: "#0f3460",
                color: "whitesmoke",
              }}
              value="3">
              3
            </option>
            <option
              style={{
                backgroundColor: "#0f3460",
                color: "whitesmoke",
              }}
              value="5">
              5
            </option>
            <option
              style={{
                backgroundColor: "#0f3460",
                color: "whitesmoke",
              }}
              value="10">
              10
            </option>
            <option
              style={{
                backgroundColor: "#0f3460",
                color: "whitesmoke",
              }}
              value="15">
              15
            </option>
          </Form.Select>
        </div>
        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          data={props.data}
          total={props.total}
        />
      </div>
    </>
  );
}
