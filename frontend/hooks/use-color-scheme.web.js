import { useEffect, useState } from 'react';
import { useColorScheme as useColorSchemeReactNative } from 'react-native';

export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useColorSchemeReactNative();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
