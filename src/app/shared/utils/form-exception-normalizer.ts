export const formExceptionNormalize = (errors: any): any => {
  if (errors.error && errors.error.errors && errors.error.errors.children) {
    return errors.error.errors.children;
  }
  return null;
};
