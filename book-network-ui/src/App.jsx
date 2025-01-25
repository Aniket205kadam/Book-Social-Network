import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  return (
    <div className=''>
        <div className=''>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
  )
}

export default App
