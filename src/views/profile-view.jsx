import React, { useEffect, useState } from "react";
// local
import { getGists } from "../backend-utils/code-utils/getGists";
// components
import Gist from "../components/gist/gist";
import CenterLoading from "../components/center-loading";

export default function ProfileView() {
  const [isLoading, setIsLoading] = useState(true);
  const [gists, setGists] = useState([]);

  useEffect(() => {
    getGists()
      .then((data) => {
        if (data.success) setGists(data.gists);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <CenterLoading height="50vh" width="40vw" />;
  if (Object.entries(gists).length === 0) return <p>No Data</p>;

  return (
    <div>
      {gists.map((gist, i) => (
        <Gist key={i} gist={gist} />
      ))}
    </div>
  );
}
