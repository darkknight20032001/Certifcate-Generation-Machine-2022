import "./App.css";
import Certificate from "./Certificate.jpg";
import { useEffect, useRef, useState } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
import myDatabase from "./Components/myDatabase";
function App() {
  const Wrapper = useRef(null);
  const [Title, setTitle] = useState(``);
  function DownloadHandler(event) {
    event.preventDefault();
    exportComponentAsJPEG(Wrapper);
    console.log(Wrapper.current);
  }
  console.log(myDatabase);
  const [Name, setName] = useState(``);
  const [Link, setLink] = useState(``);
  return (
    <div className="App">
      <div className="NavBar">
        <h1>CERTIFICATE GENERATOR</h1>
        <select
          onChange={(event) => {
            setLink(event.target.value);
            setName(``);
            setTitle(``);
          }}
        >
          <option value="">Select the type of Certificate</option>
          {myDatabase.map((certificates, key) => {
            return (
              <option value={certificates.ImageLink}>
                {certificates.ImageName}
              </option>
            );
          })}
        </select>
      </div>

      {Link ? (
        <div className="Meta">
          <label>
            Name:
            <select
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            >
              <option value="">{Title ? `${Title}` : `Select`}</option>
              <option value="None">None</option>
              <option value="Master">Master</option>
              <option value="Baby">Baby</option>
              <option value="Miss">Miss</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Mr.">Mr.</option>
              <option value="Dr.">Dr.</option>
              <option value="M.L.A.">MLA</option>
              <option value="M.P.">MP</option>
              <option value="Advocate">Adv.</option>
            </select>
            <input
              className="EntryList"
              type="text"
              placeholder="Enter your name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={Name}
            />
          </label>
        </div>
      ) : (
        <div className="Greetings">
          <h1>🙏NAMASKAR🙏</h1>
          <p>Please Select Your Certificate from above.</p>
        </div>
      )}

      {Name && Title && (
        <button type="submit" onClick={DownloadHandler}>
          Download
        </button>
      )}
      <div id="DownloadWrapper">
        <div id="certificateWrapper" ref={Wrapper}>
          {Link && Title && Name && (
            <span>{Title == "None" ? `${Name}` : `${Title} ${Name}`}</span>
          )}
          {Link && <img src={Link} />}
        </div>
      </div>
    </div>
  );
}

export default App;
