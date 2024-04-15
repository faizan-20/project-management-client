import { SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import Quill styles

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState("");

  const handleChange = (html: SetStateAction<string>) => {
    setEditorHtml(html);
  };

  return (
    <div>
      <ReactQuill
        theme="snow" // specify theme ('snow' or 'bubble')
        value={editorHtml}
        onChange={handleChange}
      />
    </div>
  );
};

export default Editor;
