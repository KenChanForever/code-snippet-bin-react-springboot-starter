import React from "react";
import OrigAceEditor from "react-ace";
require("brace/mode/yaml");
require("brace/mode/sh");
require("brace/mode/python");
require("brace/theme/github");
require("brace/theme/monokai");

const aceEditorReadOnlyProps = {
  theme: "github",
  fontSize: 20,
  wrapEnabled: true,
  readOnly: true,
  setOptions: {
    showLineNumbers: true
  },
  highlightActiveLine: false,
  width: "100%",
  minheight: 600
};

export default class AceEditor extends React.Component {
  render() {
    const {
      fileType,
      value,
      styles,
      readOnly,
      onChange,
      ...others
    } = this.props;

    const aceEditorEditProps = {
      theme: "monokai",
      fontSize: 20,
      editorProps: { $blockScrolling: true },
      wrapEnabled: true,
      setOptions: {
        showLineNumbers: true,
        tabSize: 2,
        enableSnippets: true,
        useSoftTabs: true
      },
      width: "100%"
    };

    let defaultProps;
    if (readOnly) {
      defaultProps = aceEditorReadOnlyProps;
    } else {
      defaultProps = aceEditorEditProps;
    }
    return (
      <OrigAceEditor
        mode={fileType}
        value={value}
        defaultValue={value}
        style={styles}
        onChange={onChange}
        {...defaultProps}
        {...others}
      />
    );
  }
}
