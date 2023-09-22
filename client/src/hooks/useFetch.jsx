import React, { useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    console.log(response);
    setLoading(true);
    async function fetchData() {
      try {
        const res = axios.post(
          url,
          JSON.stringify({ credential: response.credential }),
          {
            headers: {
              accept: "application/json",
            },
          }
        );

        if (res) {
          setLoading(false);
          const data = res.data;
          if (data?.user) {
            localStorage.setItem("user", JSON.stringify(data?.user));
            window.location.reload();
          }
          throw new Error(data?.message || data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { loading, error, handleGoogle };
};

export default useFetch;
