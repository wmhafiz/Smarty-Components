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

// top level context provider to handle all shared global states
const SmartyProvider = ({ token: givenToken, defaultKeyword, ...props }) => {
  const [token, setToken] = useState(givenToken);
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [filters, setFilters] = useState([{
    field: 'state',
    value: 'Selangor'
  }]);
  const addFilter = (newFilter) => {
    if (newFilter.field === 'category') {
      setFilters([
        ...filters,
        {
          field: newFilter.field,
          value: `[${newFilter.value}]`
        },
      ])
    }
    else {
      setFilters([
        ...filters,
        newFilter,
      ])
    }
  }
  const removeFilter = (field) => setFilters(filters.filter(v => v.field !== field))
  const clearFilters = () => setFilters([])
  const value = useMemo(
    () => ({
      token, setToken,
      keyword, setKeyword,
      filters, setFilters,
      addFilter, clearFilters, removeFilter
    }),
    [keyword, filters, token]
  );
  return <SmartyContext.Provider value={value} {...props} />;
};

// re-usable fetch hook to lbd api
const useSmartyFetch = ({ url, defaultValue }) => {
  const [data, setData] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios(url).then(result => {
      setData(result.data);
      setIsLoading(false);
    });
  }, [url]);
  return { data, isLoading };
};

// execute search api
const useQuery = ({ entity, keywordField }) => {
  const context = useContext(SmartyContext);
  if (!context) {
    throw new Error("useQuery must be used within SmartyProvider");
  }
  const { token, keyword, filters } = context;
  let url = `${baseUrl}/${entity}?${keywordField}=${keyword}`;
  filters.forEach(({ field, value }) => url += `&${field}=${value}`)
  // console.log('url', url)
  url += `&api_key=${token}`
  return useSmartyFetch({ url, defaultValue: {} });
};

// execute count api
const useAggregation = ({ entity, keywordField, keys }) => {
  const context = useContext(SmartyContext);
  if (!context) {
    throw new Error("useAggregation must be used within SmartyProvider");
  }
  const { token, keyword, filters } = context;
  let url = `${baseUrl}/${entity}/count?api_key=${token}&${keywordField}=${keyword}&group_by=${keys}`;
  filters.forEach(({ field, value }) => url += `&${field}=${value}`)
  return useSmartyFetch({ url, defaultValue: [] });
};

export { SmartyProvider, SmartyContext, useAggregation, useQuery };
