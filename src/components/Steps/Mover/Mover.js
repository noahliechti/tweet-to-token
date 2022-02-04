import { Stack, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function Mover({
  handleNext,
  handleBack,
  backBtnDisabled,
  nextBtnDisabled,
  isForm,
  nextBtnText,
  isLoading,
}) {
  const handleClick = (e) => {
    switch (e.target.name) {
      case "next":
        handleNext();
        break;
      case "back":
        handleBack();
        break;
      default:
        break;
    }
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
      <LoadingButton
        variant="contained"
        name="next"
        sx={{ flexGrow: 1 }}
        disabled={nextBtnDisabled}
        onClick={handleClick}
        type={isForm ? "submit" : "button"}
        loading={isLoading}
      >
        {nextBtnText}
      </LoadingButton>
      <Button
        variant="outlined"
        name="back"
        disabled={backBtnDisabled}
        sx={{ flexGrow: 1 }}
        onClick={handleClick}
      >
        Back
      </Button>
    </Stack>
  );
}
export default Mover;
