import React, { useState } from "react";
// The rich text area plugin
import slate from "@react-page/plugins-slate";
// image
import image from "@react-page/plugins-image";
// The editor core
import ReactEditor from "@react-page/editor";

import { Box } from "@material-ui/core";

const cellPlugins = [slate(), image];

const PageEditor = () => {
  const [editorState, setEditorState] = useState();
  
  return (
    <Box
        border={0.5}
        borderRadius={"5px"}
        borderColor={"lightgrey"}
        padding={"10px"}
        height={"100%"}
      >
      <ReactEditor 
      cellPlugins={cellPlugins} 
      value={editorState} 
      onChange={setEditorState} />
    </Box>
  );
};

export default PageEditor;
