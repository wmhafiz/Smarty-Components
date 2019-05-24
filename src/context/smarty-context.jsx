import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect
} from "react";
import axios from "axios";

const baseUrl = "https://smartmap-api.tk/api";
const SmartyContext = createContext();

const SmartyProvider = props => {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNEY3dmxHa0I3X0JrT1g5bVQwbjEiLCJ1c2VybmFtZSI6IndtaGFmaXoiLCJ1c2VyX3R5cGUiOiJ1c2VyIn0sImlhdCI6MTU1MzU3MTk1MCwiZXhwIjoxNTg1MTI5NTUwfQ.wz_s0ef7OkizBIztv_6MZp6Uaooapwd6xGukcyBwIEg"
  );
  const value = useMemo(() => ({ token, setToken }), [token]);
  return <SmartyContext.Provider value={value} {...props} />;
};

const useQuery = props => {
  const context = useContext(SmartyContext);
  if (!context) {
    throw new Error("useQuery must be used within SmartyProvider");
  }
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { token } = context;
  const { entity, keyword, stateFilter } = props;

  useEffect(() => {
    setIsLoading(true);
    axios(
      `${baseUrl}/${entity}?api_key=${token}&name=${keyword}&stateFilter=${stateFilter}`
    ).then(result => {
      setData(result.data);
      setIsLoading(false);
    });
  }, [token, entity, keyword, stateFilter]);

  return { data, isLoading };
};

export { SmartyProvider, useQuery };
