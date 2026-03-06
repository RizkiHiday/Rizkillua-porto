import "remixicon/fonts/remixicon.css";
import { useEffect, useMemo, useState } from "react";
import Dock from "./Dock/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";

const Footer = () => {
  const [visitors, setVisitors] = useState(null);
  const [visitorError, setVisitorError] = useState(false);

  const counterUrl = useMemo(() => {
    const workspace = "rizki-portofolio";
    const counterName = "visits";

    const isLocalhost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

    // Local dev: jangan increment, hanya baca.
    const action = isLocalhost ? "" : "/up";
    return `https://api.counterapi.dev/v2/${workspace}/${counterName}${action}`;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const token = import.meta.env.VITE_COUNTERAPI_TOKEN;

    fetch(counterUrl, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(r => r.json())
      .then(data => {
        // CounterAPI V2: hasil umumnya { data: { value: number } }
        const value = Number(data?.data?.value ?? data?.value);
        if (cancelled) return;
        if (Number.isFinite(value)) setVisitors(value);
        else setVisitorError(true);
      })
      .catch(() => {
        if (cancelled) return;
        setVisitorError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [counterUrl]);

  const items = [
    { icon: <VscHome size={18} />, label: "Home", onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscAccount size={18} />, label: "About Me", onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscArchive size={18} />, label: "Project", onClick: () => document.getElementById("project")?.scrollIntoView({ behavior: "smooth" }) },
  ];

  return (
    <div className="mt-32 pb-8 flex flex-col items-center relative z-10">
      {/* Flex container adaptif */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-6">

        {/* Judul - paling atas di mobile */}
        <h1 className="text-2xl font-bold order-1 md:order-none">
          Portofolio
        </h1>

        {/* Ikon Sosmed - di tengah di mobile */}
        <div className="flex flex-col items-center gap-2 order-2 md:order-none">
          <div className="flex gap-3">
            <a href="https://www.instagram.com/ulatngesot/"><i className="ri-instagram-fill ri-2x"></i></a>
            <a href="https://www.youtube.com/@Rizkillua"><i className="ri-youtube-fill ri-2x"></i></a>
          </div>

          <div className="text-xs opacity-70">
            {visitorError ? (
              <span>Visitors: —</span>
            ) : visitors == null ? (
              <span>Visitors: ...</span>
            ) : (
              <span>Visitors: {visitors.toLocaleString("id-ID")}</span>
            )}
          </div>
        </div>

        {/* Dock - paling bawah di mobile */}
        <div className="order-3 md:order-none mt-15 md:mt-0  md:mb-0">
          <Dock
            items={items}
            panelHeight={30}
            baseItemSize={60}
            magnification={100}
          />
        </div>

      </div>
    </div>
  );
};

export default Footer;
