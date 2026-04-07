import { lazy, type ComponentType } from 'react';

type ReactComponent = ComponentType<unknown>;

export const lazyLoad = <T extends Record<string, unknown>>(
  path: () => Promise<T>,
  namedExport?: keyof T
) => {
  return lazy(async () => {
    const module = await path();

    // 1. If a named export is provided, validate it exists
    if (namedExport) {
      const Component = module[namedExport] as ReactComponent;
      return { default: Component };
    }

    // 2. If no name, check if 'default' exists in the module keys
    // This avoids 'any' by using a safe property check
    if ('default' in module) {
      return { default: module.default as ReactComponent };
    }

    // 3. Fallback error if the module is malformed
    throw new Error(`Module does not have a default or named export: ${String(namedExport)}`);
  });
};
