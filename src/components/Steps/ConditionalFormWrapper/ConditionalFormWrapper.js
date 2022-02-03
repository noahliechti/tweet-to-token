function ConditionalFormWrapper({ condition, children }) {
  return condition ? (
    <form autoComplete="off" onSubmit={(e) => e.preventDefault}>
      {children}
    </form>
  ) : (
    children
  );
}

export default ConditionalFormWrapper;
