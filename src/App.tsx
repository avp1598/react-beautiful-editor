import "../lib/Editor.css";
import "./App.css";
import { Editor } from "../lib";

function App() {
  return (
    <div className="App">
      <Editor
        theme="dark"
        value={``}
        onChange={() => {}}
        placeholder="Enter the description in the richest text possible"
        uploadImage={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                "https://ik.imagekit.io/spectcdn/spect_VPStWGRNc.png?updatedAt=1680286554361&tr=w-1080%2Ch-1080%2Cfo-auto"
              );
            }, 1000);
          });
        }}
      />
    </div>
  );
}

export default App;
