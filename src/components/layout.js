const styles = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
};
export default function Layout({ children }) {
  return <div style={styles}>{children}</div>;
}
