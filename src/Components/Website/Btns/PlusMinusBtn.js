import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function PlusMinusBtn(props) {
  const [btn, setBtn] = useState(1);

  useEffect(() => {
    props.setCount(btn);

    if (props.changeCount) {
      props.changeCount(props.id, btn);
    }
  }, [btn]);

  useEffect(() => {
    if (props.count) {
      setBtn(props.count);
    }
  }, [props.count]);

  return (
    <div className="input-group d-flex align-items-center gap-2">
      <span
        className="input-group-btn"
        onClick={(e) => {
          if (btn > 1) {
            setBtn((prev) => prev - 1);
          } else {
            setBtn(1);
          }
        }}>
        <button
          type="button"
          className="btn btn-danger btn-number"
          data-type="minus"
          data-field="quant[2]">
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </span>
      <div
        style={{
          width: "38px",
          height: "38px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ddd",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "1.1rem",
          background: "#f8f9fa",
        }}>
        {btn}
      </div>
      <span
        className="input-group-btn"
        onClick={() => setBtn((prev) => ++prev)}>
        <button
          type="button"
          className="btn btn-success btn-number"
          data-type="plus"
          data-field="quant[2]">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </span>
    </div>
  );
}
