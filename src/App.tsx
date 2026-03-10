
import { Header } from "./components/Header/Header";
import { Layout } from "./components/Layout/Layout";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Board } from "./components/Board/Board";

function App() {
  return (
    <Layout>
      <Header/>
      <Sidebar/>
      <Board/>
    </Layout>
  );
}

export default App;
