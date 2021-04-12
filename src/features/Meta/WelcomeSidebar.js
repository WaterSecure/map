import snarkdown from "snarkdown";
import React, { useState, useEffect } from "react";
import "./Welcome.css";

function WelcomeSidebar() {
  const [html, setData] = useState("");

  useEffect(() => {
    async function getWelcomePage() {
      const res = await fetch(`./data/welcome.md`).then((res) => res.text());

      setData(snarkdown(res));
    }
    getWelcomePage();
  }, []);

  return (
    <div
      className="sidebar welcome"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default WelcomeSidebar;
