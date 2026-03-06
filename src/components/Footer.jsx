import "remixicon/fonts/remixicon.css";
import { useEffect, useMemo, useState } from "react";
import Dock from "./Dock/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";

const Footer = () => {
  const [visitors, setVisitors] = useState(null);
  const [visitorError, setVisitorError] = useState(false);

  const counterUrl = useMemo(() => {
    // Static site: pakai layanan counter publik (tanpa backend).
    // Namespace + key harus stabil supaya hit tersimpan konsisten.
    const namespace = "rizki-portofolio";
    const key = "visits";

    const isLocalhost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

    // Local dev: jangan increment, hanya baca.
    const endpoint = isLocalhost ? "get" : "hit";
    return `https://api.countapi.xyz/${endpoint}/${namespace}/${key}`;
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(counterUrl)
      .then(r => r.json())
      .then(data => {
        const value = Number(data?.value);
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
