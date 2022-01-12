import { Stack, Button } from "@mui/material";
function Mover({
  handleNext,
  handleBack,
  backBtnDisabled,
  nextBtnDisabled,
  isForm,
  nextBtnName,
  nextBtnText,
}) {
  const handleClick = (e) => {
    switch (e.target.name) {
      case "next":
        console.log("click");
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
      <Button
        variant="contained"
        name={nextBtnName}
        sx={{ flexGrow: 1 }}
        disabled={nextBtnDisabled}
        onClick={handleClick}
        type={isForm ? "submit" : "button"}
        size={isForm ? "small" : "default"}
      >
        {nextBtnText}
      </Button>
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
