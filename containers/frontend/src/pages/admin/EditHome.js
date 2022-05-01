import { Helmet } from "react-helmet";
import React, { useState, useEffect, StrictMode } from "react";
import { get, post } from "src/utils/http";
import { useParams, Navigate } from "react-router-dom";
import PageEditor from "src/components/admin/pageEditor/PageEditor";
import Loading from "src/components/Loading";
import "@react-page/editor/lib/index.css";

const EditHome = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState();

  const loadAboutUs = () => {
    get("about/" + id).then((res) => {
      setAbout(res.data.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadAboutUs();
  }, []);

//   if (loading) {
//     return <Loading />;
//   }

  return (
    <>
      <Helmet>
        <title>{"Edit Home Page"}</title>
      </Helmet>
      <PageEditor />

    </>
  );
};
export default EditHome;
