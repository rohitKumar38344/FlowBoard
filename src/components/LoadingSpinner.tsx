import { Spinner } from './ui/spinner';

export const LoadingSpinner = () => {
  return (
    <div className="grid place-content-center min-h-screen">
      <Spinner className="size-8" />
    </div>
  );
};
