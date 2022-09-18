import React, { useEffect, useState } from "react";
import Routes from "./components/routes";
import axios from "axios";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  //je definie useEffect avec une requéte axios
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((ere) => console.log(err));
    };
    fetchToken();
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, dispatch]);
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
