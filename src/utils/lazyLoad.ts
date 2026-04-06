import { lazy } from 'react';

export const lazyLoad = (path, namedExport: string) => {
  return lazy(() => {
    const promise = path();
    if (namedExport === null) {
      return promise;
    } else {
      return promise.then(module => ({ default: module[namedExport] }));
    }
  });
};
