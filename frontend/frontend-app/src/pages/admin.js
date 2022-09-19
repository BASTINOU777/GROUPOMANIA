import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Helmet } from "react-helmet";

const Moderation = () => {
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminNotification, setAdminNotification] = useState("");
  const [isReportedPosts, setIsReportedPosts] = useState(null);

  const getReports = () => {
    if (isAdmin === true) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}api/post/getReports`,
        withCredentials: true,
        data: {
          isAdmin,
        },
      })
        .then((res) => {
          setAdminNotification(res.data[0].total);
          if (res.data[0].total === 0) {
            setIsReportedPosts(true);
          } else {
            setIsReportedPosts(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("user_info")) {
      navigate("/login");
      return;
    }
    const checkUserId = JSON.parse(localStorage.getItem("user_info")).user
      .user_id;
    const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;

    if (admin === 1) {
      setIsAdmin(true);
    }
    setUserId(checkUserId);
  }, []);

  useEffect(() => {
    getReports();
  });

  return (
    <>
      <Helmet>
        <title>Groupomania - Modération</title>
      </Helmet>
      <Navbar isAdmin={isAdmin} localUserId={userId} />
      <div className="container-bloc">
        {isReportedPosts && <NoReportedPosts navigate={navigate} />}
        <Reports userId={userId} isAdmin={isAdmin} getReports={getReports} />
      </div>
    </>
  );
};

export default Moderation;
