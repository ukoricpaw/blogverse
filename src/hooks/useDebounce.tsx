import { useEffect, useState } from 'react'

interface useDebounceProps {
  value: string;
  ms: number;
}

function useDebounce({ value, ms }: useDebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, ms)

    return () => {
      clearTimeout(handler);
    }

  }, [value, ms])

  return debouncedValue;
}

export default useDebounce