"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DidYouKnowRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/faq");
  }, [router]);

  return null;
}
