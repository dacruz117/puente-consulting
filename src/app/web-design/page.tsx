"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WebDesignRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/business-startup");
  }, [router]);

  return null;
}
