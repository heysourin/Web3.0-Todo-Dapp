import "../styles/globals.css";
//? internal import
import { ToDoListProvider } from "../context/ToDolistApp";

const MyApp = ({ Component, pageProps }) => (
  <ToDoListProvider>
    <Component {...pageProps} />
  </ToDoListProvider>
);

export default MyApp;
