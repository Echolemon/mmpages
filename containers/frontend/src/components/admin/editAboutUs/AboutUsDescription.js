import React, { useState, useRef } from "react";
import { Box } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";

const AboutUsDescription = (props) => {
  const [about, setAbout] = useState(props.about);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleEditorChange = (content, editor) => {
    setAbout({ ...about, description: content });
    props.about.description = content;
  };

  return (
    <>
      <Box
        border={0.5}
        borderRadius={"5px"}
        borderColor={"lightgrey"}
        padding={"10px"}
      >
        <div
          style={{
            marginBottom: 10,
            color: "slategrey",
            fontFamily: "Roboto",
          }}
        >
          {" "}
          Description *{" "}
        </div>
        <Editor
          apiKey="d496jo1ebny2d6uzgktaguluekt5obp1dm9rpe0e1ul3w1j6"
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            selector: "textarea",
            toolbar:
              "a11ycheck addcomment showcomments casechange checklist code export formatpainter pageembed permanentpen table",
            toolbar_mode: "floating",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            font_formats:
              "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Lato Black=lato; Roboto=roboto; Open Sans=open sans; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
            content_style:
              "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap&family=Open+Sans:wght@300&display=swap'); body { font-family: 'Open Sans'; } h1,h2,h3,h4,h5,h6 { font-family: 'Open Sans'; }",
          }}
          value={about.description}
          onEditorChange={handleEditorChange}
        />
      </Box>
    </>
  );
};
export default AboutUsDescription;
