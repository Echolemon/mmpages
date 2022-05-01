import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import MainBanner from "src/components/publicFacing/layout/MainBanner";
import { Box, TextField, Grid, Button } from "@material-ui/core";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const submit = () => {
    if (name && email && message) {
      const serviceId = "service_v0yfzrp";
      const templateId = "template_jwscl4o";
      const userId = "user_52o4GDMhdi8aZB1lVoUNM";
      const templateParams = {
        from_name: name,
        to_name: "Admin",
        message: message,
        from_email: email,
      };

      emailjs
        .send(serviceId, templateId, templateParams, userId)
        .then((response) => console.log(response))
        .then((error) => console.log(error));

      setName("");
      setEmail("");
      setMessage("");
      setEmailSent(true);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const isValidEmail = (email) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <MainBanner
        title={"Contact Us"}
        imageSrc={"/static/images/missing_header.png"}
      />
      <Box
        sx={{
          paddingTop: "18px",
          paddingLeft: "18px",
          paddingRight: "18px",
        }}
      >
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap&family=Open+Sans:wght@300&display=swap');
        </style>

        <div id="contact-form">
          <Grid fullWidth style={{ textAlign: "center", marginTop: 25 }}>
            <TextField
              style={{ width: 350 }}
              alignItems="center"
              label="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              variant="outlined"
            />
          </Grid>
          <Grid fullWidth style={{ textAlign: "center", marginTop: 25 }}>
            <TextField
              style={{ width: 350 }}
              alignItems="center"
              label="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
            />
          </Grid>
          <Grid fullWidth style={{ textAlign: "center", marginTop: 25 }}>
            <TextField
              style={{ width: 350 }}
              alignItems="center"
              label="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              variant="outlined"
              multiline={true}
              rows={5}
            />
          </Grid>

          <Grid fullWidth style={{ textAlign: "center", marginTop: 25 }}>
            <Button onClick={submit} color="primary" variant="outlined">
              Send Message
            </Button>
          </Grid>
          <Grid fullWidth style={{ textAlign: "center", marginTop: 25 }}>
            {emailSent ? (
              <div>
                Thank you for your message, we will be in touch in no time!
              </div>
            ) : null}
          </Grid>
        </div>

        <br />
      </Box>
    </>
  );
}
