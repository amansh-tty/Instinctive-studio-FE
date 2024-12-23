import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/Customcomp/Layout";
import StudentsPage from "./Page";

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<StudentsPage />} />
          </Route>  
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
