import React, { useEffect, useState, useRef } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert, AlertTitle } from "@material-ui/lab";
import { CgSoftwareDownload as SaveIcon } from "react-icons/cg";
import { MdContentCopy as CopyIcon } from "react-icons/md";
import { MdDelete as CleanIcon } from "react-icons/md";
import placeholder from "./placeholder";
import { Tooltip } from "@material-ui/core";
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import useClipboard from "react-use-clipboard";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/snippets/latex";
import "ace-builds/src-noconflict/ext-language_tools";

function Editor({ content, changeContent, isCompiled, compiled }) {
  const [open, setOpen] = useState(false);
  const editorRef = useRef(null);
  const [isCopied, setCopied] = useClipboard(content);

  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    if (content === "") {
      localStorage.setItem("latex", placeholder);
    } else {
      localStorage.setItem("latex", content);
    }
  }, [content]);

  useEffect(() => {
    if (content === "") {
      var encodedString = new Buffer(placeholder).toString("base64");
    } else {
      var encodedString = new Buffer(content).toString("base64");
    }

    const formData = new FormData();
    formData.append("tex", encodedString);

    fetch("/compile", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setAnnotations(response);
        isCompiled(false);
      })
      .catch((error) => console.log(error));
  }, [compiled]);

  const handleEditorChange = (value, event) => {
    changeContent(value);
  };

  const handleClearClick = () => {
    changeContent("");
    editorRef.current.focus();
  };

  const handleDownloadClick = () => {
    let blob = new Blob([content], {
      type: "text/plain",
    });
    let a = document.createElement("a");
    a.download = "latex.tex";
    a.href = window.URL.createObjectURL(blob);
    a.click();
  };

  const handleCopyClick = () => {
    setCopied(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="tex-editor scroll">
      <div className="section-title">
        <h3>Editor</h3>
        <div className="right-section">
          <Tooltip title="Download Latex">
            <button onClick={handleDownloadClick} className="btn">
              <SaveIcon />
            </button>
          </Tooltip>
          <Tooltip title="Copy to Clipboard">
            <button onClick={handleCopyClick} className="btn">
              <CopyIcon />
            </button>
          </Tooltip>
          <Tooltip title="Clean">
            <button onClick={handleClearClick} className="btn">
              <CleanIcon />
            </button>
          </Tooltip>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          <AlertTitle>Copied</AlertTitle>
          The latex is copied to your clipboard
        </Alert>
      </Snackbar>
      <AceEditor
        mode="latex"
        value={content}
        theme="dracula"
        className="editable editor"
        onChange={handleEditorChange}
        onValidate={setAnnotations}
        name="editor"
        height="96%"
        width="100%"
        fontSize="15px"
        ref={editorRef}
        annotations={annotations}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
}
export default Editor;
