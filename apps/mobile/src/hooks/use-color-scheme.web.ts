import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

// Nothing external ever changes here, so there is nothing to subscribe to.
const subscribe = () => () => {};

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  // false while rendering statically and hydrating, true once running on the client. Read this
  // way rather than set inside an effect, which would render the tree a second time.
  const hasHydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const colorScheme = useRNColorScheme();

  return hasHydrated ? colorScheme : 'light';
}
