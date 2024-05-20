import React, { useEffect, useState } from "react";
import { callApi } from "../../Axios";
import Swal from "sweetalert2";
import SupplyTable from "../../CommonFunction/SupplyTable";
import OrderTable from "../../CommonFunction/OrderTable";

export default function Transaction() {
  const [supplies, setSupplies] = useState([]);
  const [toggle, setToggle] = useState(false);
  let userId = localStorage.getItem("userId");
  useEffect(() => {
    let getSupplies = async () => {
      let result = await callApi("getSupply", "POST", { userId: userId });
      setSupplies(result.data);
    };
    if (userId) {
      getSupplies();
    }
  }, [toggle, userId]);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    let getOrders = async () => {
      console.log(userId);
      let result = await callApi("getOrder", "POST", { userId: userId });
      setOrders(result.data);
    };
    if (userId) {
      getOrders();
    }
  }, [toggle, userId]);

  const handleChangeSupplyStatus = async (supplyId, status) => {
    // Handle the logic for accepting the request
    let result = await callApi("changeStatusAdmin", "POST", {
      status,
      supplyId,
    });
    setToggle(!toggle);
    Swal.fire({
      title: result.message,
      icon: "success",
      timer: 3000,
    });
  };
  const handleChangeOrderStatus = async (orderId, status) => {
    // Handle the logic for accepting the request
    let result = await callApi("changeOrderStatusAdmin", "POST", {
      status,
      orderId,
    });
    setToggle(!toggle);
    Swal.fire({
      title: result.message,
      icon: "success",
      timer: 3000,
    });
  };

  const [page, setPage] = useState("Orders");

  console.log(page);
  return (
    <div style={{ padding: "15px" }}>
      Transaction
      <div>
        <div style={{ display: "flex", justifyContent: "", padding: "10px" }}>
          <button
            style={{ marginRight: "10px" }}
            className="btn btn-primary"
            onClick={() => setPage("Orders")}
          >
            Orders
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setPage("Supplies")}
          >
            Supplies
          </button>
        </div>
        {page == "Supplies" && (
          <SupplyTable
            action={true}
            supplies={supplies}
            handleChangeSupplyStatus={handleChangeSupplyStatus}
          />
        )}
        {page == "Orders" && (
          <OrderTable
            orders={orders}
            handleChangeOrderStatus={handleChangeOrderStatus}
            action={true}
          />
        )}
      </div>
    </div>
  );
}
