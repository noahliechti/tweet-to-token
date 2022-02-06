import { FormControl, FormHelperText } from "@mui/material";

function ConditionalFormWrapper({ condition, children, error }) {
  return condition ? (
    <form autoComplete="off" onSubmit={(e) => e.preventDefault}>
      <FormControl sx={{ width: 1 }}>
        {children}
        <FormHelperText error>{error}</FormHelperText>
      </FormControl>
    </form>
  ) : (
    children
  );
}

export default ConditionalFormWrapper;
