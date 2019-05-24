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
  const [keyword, setKeyword] = useState(props.defaultKeyword);
  const [filters, setFilters] = useState({});

  const value = useMemo(
    () => ({ token, setToken, keyword, setKeyword, filters, setFilters }),
    [keyword, filters, token]
  );
  return <SmartyContext.Provider value={value} {...props} />;
};

const useQuery = props => {
  const context = useContext(SmartyContext);
  if (!context) {
    throw new Error("useQuery must be used within SmartyProvider");
  }
  const { token, keyword } = context;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { entity, keywordField } = props;

  useEffect(() => {
    setIsLoading(true);
    const searchUrl = `${baseUrl}/${entity}?api_key=${token}&${keywordField}=${keyword}`;
    // console.log("searchUrl", searchUrl, " for ", entity);
    // console.log(searchUrl);
    axios(searchUrl).then(result => {
      setData(result.data);
      setIsLoading(false);
    });
  }, [keywordField, token, entity, keyword]);

  return { data, isLoading };
};

const useAggregation = props => {
  const context = useContext(SmartyContext);
  if (!context) {
    throw new Error("useQuery must be used within SmartyProvider");
  }
  const { token, keyword } = context;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { entity, keywordField, keys } = props;

  useEffect(() => {
    setIsLoading(true);
    const searchUrl = `${baseUrl}/${entity}/count?api_key=${token}&${keywordField}=${keyword}&group_by=${keys}`;
    // console.log("searchUrl", searchUrl, " for ", entity);
    axios(searchUrl).then(result => {
      setData(result.data);
      // console.log("data", result.data);
      setIsLoading(false);
    });
  }, [keywordField, token, entity, keyword, keys]);

  return { data, isLoading };
};

export { SmartyProvider, SmartyContext, useAggregation, useQuery };
