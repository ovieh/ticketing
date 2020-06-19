import axios from "axios";
import { useState } from "react";

export function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState([]);

  const doRequest = async (props = {})=> {
    try {
      setErrors([]);
      const response = await axios({method, url, data: {...body, ...props }});
      onSuccess && onSuccess(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    }
  };
  return [doRequest, errors] as const;
}
