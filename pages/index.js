import Head from "next/head";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Forms from "@/components/forms";
import Login from "@/pages/auth/login";


export default function Home() {
  return <Login />;
}
