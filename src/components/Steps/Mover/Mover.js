import { Stack, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function Mover({
  handleNext,
  handleBack,
  backBtnDisabled,
  nextBtnDisabled,
  isForm,
  nextBtnName,
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
      {isForm ? (
        <LoadingButton
          variant="contained"
          name={nextBtnName}
          sx={{ flexGrow: 1 }}
          disabled={nextBtnDisabled}
          onClick={handleClick}
          type="submit"
          size="small"
          loading={isLoading}
        >
          {nextBtnText}
        </LoadingButton>
      ) : (
        <Button
          variant="contained"
          name={nextBtnName}
          sx={{ flexGrow: 1 }}
          disabled={nextBtnDisabled}
          onClick={handleClick}
          size="default"
        >
          {nextBtnText}
        </Button>
      )}
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
