import { BrowserRouter, Routes, Route } from "react-router-dom"
import SharedLayaut from "./pages/strukturaStranky/SharedLayaut"
import Home from "./pages/Home"
import ChciNabidku from "./pages/ChciNabidku"
import VypsatVyber from "./pages/VypsatVyber"
import Error from "./pages/Error"

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<SharedLayaut />}>
        <Route index element={<Home />}></Route>
        <Route path="/chci-nabidku" element={<ChciNabidku />}></Route>
        <Route path="/vypsat-nabidky" element={<VypsatVyber />}></Route>
        <Route path="*" element={<Error />}/>
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App