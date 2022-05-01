import React from "react";
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@material-ui/core";

export function images (content){
    if (content.images && content.images.length > 0) {
        return (
          <Box>
            {content.images.map((img) => (
              <figure>
                <img src={img.location} key={img.key} />
                <figcaption>{img.caption}</figcaption>
              </figure>
            ))}
          </Box>
        );
    } else return;
}

export function audios (content) {
    if (content.audios && content.audios.length > 0) {
        return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Audios</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {content.audios.map((aud) => (
                <audio controls src={aud.location} key={aud.key} />
            ))}
            </AccordionDetails>
        </Accordion>
        );
    } else return;
}

export function videos (content) {
    if (content.videos && content.videos.length > 0) {
        return (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Videos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {content.videos.map((vid) => (
                <video width="100%" controls src={vid.location} key={vid.key} />
              ))}
            </AccordionDetails>
          </Accordion>
        );
    } else return;
}
