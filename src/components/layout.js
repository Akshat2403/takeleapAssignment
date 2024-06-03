import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  page: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
});
export default function Layout({ children }) {
  const classes = styles();
  return <div className={classes.page}>{children}</div>;
}
