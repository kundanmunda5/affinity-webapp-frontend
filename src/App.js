// import logo from './logo.svg';
import './App.css';
import Header from "./components/Header.js";
import ControlFiles from "./components/FileController.js";
// import Container from "./components/ViewContainer.js";       [work in progress]
import FooterContainer from "./components/FooterContainer.js";


function App() {
  return (
    <div className="appContainer">
      <Header />
      <ControlFiles /> 
      {/* <Container />     couldn't; resolve a proper view table */}
      <FooterContainer />
    </div>
  );
}

export default App;
