import { Stack, Button } from "@mui/material";
function Mover(props) {
  const { continueBtnDisabled, backBtnDisabled } = props;

  const handleNext = () => {
    props.handleNext();
  };

  const handleBack = () => {
    props.handleBack();
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
      <Button
        variant="contained"
        sx={{ flexGrow: 1 }}
        disabled={continueBtnDisabled}
        onClick={handleNext}
        // type="submit"
      >
        Continue
      </Button>
      <Button
        variant="outlined"
        disabled={backBtnDisabled}
        sx={{ flexGrow: 1 }}
        onClick={handleBack}
      >
        Back
      </Button>
    </Stack>
  );
}
export default Mover;
