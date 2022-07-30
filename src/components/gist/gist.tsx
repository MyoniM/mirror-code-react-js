import React from "react";
import { formatDistance } from "date-fns";
import { FiShare2, FiCheck } from "react-icons/fi";
import { Button } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";

// styles
import classes from "./gist.module.css";

export default function Gist({ gist }: any) {
  const {
    html_url,
    public: pblc,
    description,
    files,
    updated_at,
    owner,
  } = gist;
  const clipboard = useClipboard({ timeout: 1000 });

  const file = Object.keys(files);
  const { language } = files[file.toString()];

  return (
    <div className={classes.wrapper}>
      <img src={owner.avatar_url} alt="avatar" />
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.header}>
            <p>{owner.login}</p> <pre>{" / "}</pre>
            <a href={html_url} target="_blank" rel="noreferrer">
              {file}
            </a>
          </div>
          <div className={classes.statusWrapper}>
            <p
              className={`${pblc ? classes.public : classes.private} ${
                classes.status
              }`}
            ></p>
            {pblc ? "public" : "private"}
          </div>
        </div>
        <div>
          <small>
            Created{" "}
            {formatDistance(Date.parse(updated_at), new Date(), {
              addSuffix: true,
            })}
          </small>
          <br />
          <small style={{ maxWidth: "30vw" }}>{description}</small>
          <br />
          <div className={classes.footer}>
            <div className={classes.meta}>{language ?? "Plain text"}</div>
            <Button
              className={classes.shareBtn}
              variant="subtle"
              onClick={() => clipboard.copy(html_url)}
            >
              {clipboard.copied ? <FiCheck /> : <FiShare2 />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
