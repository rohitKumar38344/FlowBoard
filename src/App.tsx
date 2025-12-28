import "./App.css";
import { Columns } from "./components/column/Column";
// import { Board } from "./components/Board/Board";
import { Header } from "./components/Header/Header";
import { Layout } from "./components/Layout/Layout";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <Layout>
      <Header />
      <Sidebar />
      <Columns />
    </Layout>
  );
}

export default App;
