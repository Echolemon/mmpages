import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Box,
} from "@material-ui/core";
import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const states = [
  {
    value: "1",
    label: "Australia",
  },
  {
    value: "2",
    label: "Poland",
  },
  {
    value: "3",
    label: "Germany",
  },
];
export default function StoryInfo(props) {
  const [story, setStory] = useState(props.story);

  const onStoryChange = (newValue, id) => {
    setStory({ ...story, [id]: newValue });
    props.story[id] = newValue;
  };
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const [contentEditor, setContentEditor] = useState();
  const handleEditorChange = (content, editor) => {
    setStory({ ...story, detailedDescription: content });
    props.story.detailedDescription = content;
    //setContentEditor(content);
    //onStoryChange(content, "detailedDescription")
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader
          title={
            story.id
              ? `Edit ${props.resourceTypeSingular} Story`
              : `New ${props.resourceTypeSingular} Story`
          }
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Family name"
                name="familyName"
                id="familyName"
                value={story.familyName}
                onChange={(e) => onStoryChange(e.target.value, e.target.id)}
                variant="outlined"
                required
              />
            </Grid>
            {props.resourceType == "Flowers" ? (
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select Country"
                  name="Country"
                  id="flowerType"
                  value={story.flowerType}
                  onChange={(e) => onStoryChange(e.target.value, e.target.id)}
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {states.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            ) : null}
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Family Members"
                name="familyMembers"
                id="familyMembers"
                value={story.familyMembers}
                onChange={(e) => onStoryChange(e.target.value, e.target.id)}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Flower Address"
                name="Address"
                id="address"
                value={story.address}
                onChange={(e) => onStoryChange(e.target.value, e.target.id)}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Brief Description"
                name="briefDescription"
                id="briefDescription"
                multiline
                rows={4}
                required
                value={story.briefDescription}
                onChange={(e) => onStoryChange(e.target.value, e.target.id)}
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
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
                    fontFamily: "Open Sans",
                  }}
                >
                  {" "}
                  Detailed Description *{" "}
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
                  value={story.detailedDescription}
                  onEditorChange={handleEditorChange}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
}
