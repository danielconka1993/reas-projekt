import { BrowserRouter, Routes, Route } from "react-router-dom"
import SharedLayaut from "./pages/strukturaStranky/SharedLayaut"
import Home from "./pages/Home"
import ChciNabidku from "./pages/ChciNabidku"

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<SharedLayaut />}>
        <Route index element={<Home />}></Route>
        <Route path="/chci-nabidku" element={<ChciNabidku />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App