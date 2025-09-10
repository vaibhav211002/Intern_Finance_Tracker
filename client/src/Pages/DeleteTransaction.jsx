import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function DeleteTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const del = async () => {
      if (!confirm("Delete this transaction?")) {
        navigate("/");
        return;
      }
      try {
        await api.delete(`/api/transactions/${id}`);
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Delete failed");
        navigate("/");
      }
    };
    del();
  }, [id]);

  return <p>Deleting...</p>;
}
