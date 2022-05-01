// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { get } from "src/utils/http";
import { Box, Container, Grid, Card } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import AnimationListToolbar from "src/components/admin/animations/AnimationToolbar";
import AnimationCard from "src/components/admin/animations/AnimationCard";
import { post } from "src/utils/http";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Loading from "src/components/Loading";

const WebAnimation = (props) => {
  var [animations, setAnimations] = useState({});
  const [loading, setLoading] = useState(true);

  const loadAnimations = () => {
    get("media").then((res) => {
      res.data.message.sort(function (a, b) {
        return a.orderIndex - b.orderIndex;
      });
      setAnimations(res.data.message);
      setLoading(false);
      console.log(res.data.message);
    });
  };

  useEffect(() => {
    loadAnimations();
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    if (
      result.destination.droppableId == result.source.droppableId &&
      result.destination.index == result.source.index
    )
      return;

    const items = Array.from(animations);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    animations = items;
    console.log("\nanimations: ");
    console.log(animations);

    for (let i = 0; i < items.length; i++) animations[i].orderIndex = i;

    /* for (let i = 0; i < items.length; i++)
            for (let j = 0; j < animations.length; j++)
                if (items[i].id == animations[j].id)
                    animations[j].orderIndex = i; */

    console.log("\nanimations: ");
    console.log(animations);

    animations.map(
      (animation, index) => (
        (animation.index = index),
        post("admin/media", animation).then((res) => {
          if ((res.status = 200)) {
            console.log("success");
          } else {
            console.log("An error has occured");
            console.log(res);
          }
        })
      )
    );
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Flowers | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
        }}
      >
        <Container maxWidth={false}>
          <AnimationListToolbar
            animations={animations}
            setAnimations={setAnimations}
          />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <Box
                  sx={{ pt: 3, flexDirection: "column" }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Grid container spacing={3}>
                    {animations.map((animation, index) => (
                      <Draggable
                        key={animation.id}
                        draggableId={animation.id}
                        index={index}
                      >
                        {(provided) => (
                          <Grid
                            item
                            xs={12}
                            key={animation.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <AnimationCard
                              animations={animations}
                              setAnimations={setAnimations}
                              animation={animation}
                            />
                            {provided.placeholder}
                          </Grid>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Grid>
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Container>
      </Box>
    </>
  );
};

export default WebAnimation;
