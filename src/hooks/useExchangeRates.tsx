import { useExchangeRateContext } from '../context/FetchCurrencyContext';

const useExchangeRates = () => {
  const { data, loading, error } = useExchangeRateContext();
  return { data, loading, error };
};

export default useExchangeRates;
