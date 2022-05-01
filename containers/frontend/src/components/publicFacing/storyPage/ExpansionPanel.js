import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import parser from "html-react-parser";

export default function ExpansionPanel(props) {
  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Story</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap&family=Open+Sans:wght@300&display=swap');
          </style>
          <div> {parser(props.story.detailedDescription)} </div>
        </AccordionDetails>
      </Accordion>

      {(props.story.audios && props.story.audios.length > 0) ?
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Audios</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {props.story.audios.map((aud) => (
              <audio controls src={aud.location} key={aud.key} />
            ))}
          </AccordionDetails>
        </Accordion>
        : null}

      {/* assert null */}
      {(props.story.videos && props.story.videos.length > 0) ?
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Videos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {props.story.videos.map((vid) => (
              <video width="100%" controls src={vid.location} key={vid.key} />
            ))}
          </AccordionDetails>
        </Accordion>
        : null}

    </Box>
  );
}