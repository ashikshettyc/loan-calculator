import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
type ExchangeRateData = {
  base_code: string;
  conversion_rates: Record<string, number>;
};

type ExchangeRateContextType = {
  data: ExchangeRateData | null;
  loading: boolean;
  error: string | null;
};
const ExchangeRateContext = createContext<ExchangeRateContextType>({
  data: null,
  loading: false,
  error: null,
});

export const ExchangeRateProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ExchangeRateData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://v6.exchangerate-api.com/v6/6686a2de26d35fa445f1f68b/latest/USD'
        );

        const data = response.data;

        if (data.result === 'success') {
          setData(data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('Server error');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <ExchangeRateContext.Provider value={{ data, loading, error }}>
      {children}
    </ExchangeRateContext.Provider>
  );
};
export const useExchangeRateContext = () => useContext(ExchangeRateContext);
