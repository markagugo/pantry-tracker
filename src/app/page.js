import { Button } from "@mui/material";
import Link from "next/link";
import './page.module.css'

export default function Home() {
  return (
    <Link href="/sign-in">Sign In</Link>
  );
}
