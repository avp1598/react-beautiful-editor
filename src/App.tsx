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
              resolve("https://picsum.photos/400/600");
            }, 1000);
          });
        }}
      />
    </div>
  );
}

export default App;
