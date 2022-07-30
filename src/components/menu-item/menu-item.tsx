import React from "react";
import Link from "next/link";
// styles
import classes from "./menu-item.module.css";
// types
import { IRoute } from "@/pages/settings/[pid]";
interface IProps {
  route: IRoute;
  pId: string;
}
export default function MenuItem({ route, pId }: IProps) {
  const isActiveRoute = pId === route.query;

  const classNames = `${classes.wrapper} ${isActiveRoute && classes.active}`;
  return (
    <Link href={route.path} passHref>
      <div className={classNames}>
        <span>{route.icon}</span>
        {route.name}
      </div>
    </Link>
  );
}
