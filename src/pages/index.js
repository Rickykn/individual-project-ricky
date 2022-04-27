import { Spinner } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Home.module.css";

export default function Home() {
  const authSelector = useSelector((state) => state.auth);
  const Router = useRouter();

  useEffect(() => {
    if (authSelector.id) {
      Router.push("/posts");
    } else {
      Router.push("/login");
    }
  }, [authSelector.id]);

  return <Spinner></Spinner>;
}
