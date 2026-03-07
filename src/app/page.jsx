"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const LOGO = {
  php: "/screenshoots/logo/PHP-logo.png",
  laravel: "/screenshoots/logo/Laravel.png",
  mysql: "/screenshoots/logo/mysql-logo.png",
  sqlserver: "/screenshoots/logo/sql-server.png",
  dotnet: "/screenshoots/logo/asp.net-logo.png",
  flutter: "/screenshoots/logo/flutter.png",
  grafana: "/screenshoots/logo/grafana.png",
  figma: "/screenshoots/logo/figma.png",
  js: "/screenshoots/logo/jslogo.png",
  html: "/screenshoots/logo/html.png",
};

const CV_URL = "https://drive.google.com/file/d/1_O8T6IsFtBPIuFccF9-YluHy5Yd4ro8-/view?usp=sharing";

const TechBadge = ({ name, icon }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: "0.4rem",
    background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
    padding: "0.3rem 0.7rem", borderRadius: 2,
  }}>
    {LOGO[icon] && <img src={LOGO[icon]} alt={name} style={{ width: 14, height: 14, objectFit: "contain" }} />}
    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.1em", color: "#94a3b8", textTransform: "uppercase" }}>{name}</span>
  </span>
);

/* ═══ DATA ═══ */
const PROJECTS = [
  { id: "01", tag: "PHP · SQL Server", title: "Monitoring Subkon Bea Cukai", company: "Bea dan Cukai Purwakarta", desc: "Program pemantauan subkon internal dari bagian PDAD. Menampilkan data masuk dan keluar untuk seluruh perusahaan ekspor-impor di Purwakarta. Dibangun sebagai Full-Stack Developer.", tech: [{ name: "PHP", icon: "php" }, { name: "SQL Server", icon: "sqlserver" }, { name: "Laravel", icon: "laravel" }], screenshots: ["/screenshoots/beacukai/screen1.png", "/screenshoots/beacukai/screen2.png", "/screenshoots/beacukai/screen3.png"], color: "#0ea5e9" },
  { id: "02", tag: "ASP.NET · SQL Server", title: "Dashboard Hose, RVI & Molded", company: "PT. Velasto Indonesia", desc: "Dashboard pemantauan produksi harian untuk departemen digitalisasi. Mengintegrasikan data dari SQL, Excel, dan IoT ke dalam panel Grafana maupun ASP.NET menggunakan C#.", tech: [{ name: "ASP.NET", icon: "dotnet" }, { name: "SQL Server", icon: "sqlserver" }, { name: "Grafana", icon: "grafana" }], screenshots: ["/screenshoots/velasto/screen1.png", "/screenshoots/velasto/screen2.png", "/screenshoots/velasto/screen3.png"], color: "#3b82f6" },
  { id: "03", tag: "PHP · SQL Server", title: "Data Product System / ERP", company: "PT. Uwu Jump Indonesia", desc: "Prototype ERP System milik PT. Uwu Jump Indonesia. Membangun dashboard dengan Laravel dan SQL Server, merancang database untuk CRUD dan laporan, serta mengintegrasikan frontend-backend secara penuh.", tech: [{ name: "PHP", icon: "php" }, { name: "Laravel", icon: "laravel" }, { name: "SQL Server", icon: "sqlserver" }], screenshots: ["/screenshoots/erp/screen1.png", "/screenshoots/erp/screen2.png", "/screenshoots/erp/screen3.png"], color: "#2563eb" },
  { id: "04", tag: "PHP · MySQL", title: "People & Organizational Dev", company: "PT. Uwu Jump Indonesia", desc: "Aplikasi penilaian akhir tahun karyawan. Mengelola proses penilaian, rekapitulasi hasil, dan laporan kinerja seluruh departemen menggunakan PHP dan MySQL.", tech: [{ name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }, { name: "Laravel", icon: "laravel" }], screenshots: ["/screenshoots/pod/screen1.png", "/screenshoots/pod/screen2.png", "/screenshoots/pod/screen3.png"], color: "#1d4ed8" },
  { id: "05", tag: "PHP · MySQL", title: "Inspection Report QA", company: "PT. Uwu Jump Indonesia", desc: "Aplikasi inspeksi dan pengecekan barang untuk Quality Assurance. Tim QA mencatat hasil inspeksi, upload bukti foto, dan generate laporan inspeksi secara digital.", tech: [{ name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }], screenshots: ["/screenshoots/inspection/screen1.png", "/screenshoots/inspection/screen2.png", "/screenshoots/inspection/screen3.png"], color: "#0369a1" },
  { id: "06", tag: "Flutter · PHP · MySQL", title: "Smart Ride", company: "PT. Uwu Jump Indonesia", desc: "Aplikasi Android pemesanan kendaraan operasional. Frontend Flutter, backend REST API PHP, database MySQL. Fitur: booking, approval manager, dan tracking status kendaraan real-time.", tech: [{ name: "Flutter", icon: "flutter" }, { name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }], screenshots: ["/screenshoots/smartride/screen1.png", "/screenshoots/smartride/screen2.png", "/screenshoots/smartride/screen3.png"], color: "#0284c7", isMobile: true },
  { id: "07", tag: "PHP · MySQL", title: "Psikotest Online Papikostik", company: "PT. Uwu Jump Indonesia", desc: "Aplikasi psikotest online berbasis Papikostik untuk rekrutmen. Sistem otomatis menghitung dan menampilkan hasil analisis kepribadian setelah peserta menyelesaikan tes.", tech: [{ name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }, { name: "Laravel", icon: "laravel" }], screenshots: ["/screenshoots/psikotest/screen1.png", "/screenshoots/psikotest/screen2.png", "/screenshoots/psikotest/screen3.png", "/screenshoots/psikotest/screen4.png", "/screenshoots/psikotest/screen5.png"], color: "#0c4a6e" },
  { id: "08", tag: "PHP · MySQL · SMTP", title: "Blast Email THR", company: "PT. Uwu Jump Indonesia", desc: "Aplikasi blast email pengiriman THR ke seluruh karyawan. Konfigurasi SMTP, template dinamis, tracking status kirim, dan laporan pengiriman massal menggunakan PHPMailer.", tech: [{ name: "PHP", icon: "php" }, { name: "MySQL", icon: "mysql" }], screenshots: ["/screenshoots/blast-email/screen1.png", "/screenshoots/blast-email/screen2.png", "/screenshoots/blast-email/screen3.png"], color: "#1e40af" },
];

const CERTIFICATES = [
  { name: "Mikrotik Certified Network Associate (MTCNA)", issuer: "Mikrotik", year: "2022", icon: "🌐", category: "Teknis", images: ["/sertifikat/sertifikatmtcna.jpg"] },
  { name: "ACP #1 — Dasar-Dasar Perangkat Keras", issuer: "Axioo Class Program", year: "2021", icon: "💻", category: "Akademik", images: ["/sertifikat/sertifikat-acp1.jpg", "/sertifikat/sertifikat-acp1nilai.jpg"] },
  { name: "ACP #2 — Perawatan Komputer", issuer: "Axioo Class Program", year: "2021", icon: "🔧", category: "Akademik", images: ["/sertifikat/sertifikat-acp2.jpg", "/sertifikat/sertifikat-acp2-nilai.jpg"] },
  { name: "ACP #3 — Pemecahan Masalah Perangkat Keras", issuer: "Axioo Class Program", year: "2021", icon: "🛠️", category: "Akademik", images: ["/sertifikat/sertifikat-acp3.jpg", "/sertifikat/sertifikat-acp3nilai.jpg"] },
  { name: "ACP — Dasar-Dasar Desain Grafis", issuer: "Axioo Class Program", year: "2021", icon: "🎨", category: "Akademik", images: ["/sertifikat/sertifikat-acp-design.jpg", "/sertifikat/sertifikat-acp-design2.jpg"] },
  { name: "ACP — Dasar-Dasar Logika Makeblock", issuer: "Axioo Class Program", year: "2021", icon: "⚙️", category: "Akademik", images: ["/sertifikat/makeblock-sertifikat.jpg", "/sertifikat/makeblock-sertifikat-2.jpg"] },
  { name: "Uji Kompetensi Keahlian TKJ", issuer: "SMKN 1 Purwakarta", year: "2023", icon: "📜", category: "Akademik", images: ["/sertifikat/sertifikat-pkl.jpg"] },
  { name: "Praktik Kerja Lapangan Divisi Polyester", issuer: "PT. Indorama Synthetics", year: "2024", icon: "🏢", category: "Magang", images: ["/sertifikat/sertifikatmagangindorama.jpg"] },
  { name: "Magang Bea Cukai Purwakarta", issuer: "Kantor Bea dan Cukai Purwakarta", year: "2025", icon: "🏛️", category: "Magang", images: ["/sertifikat/sertifikatmagangbeacukai.png"] },
];

const CERT_CATEGORIES = ["Semua", "Akademik", "Magang", "Teknis"];

const EXPERIENCES = [
  { role: "Staff IT — Full Stack Developer", company: "PT. Uwu Jump Indonesia", period: "19 Agustus 2025 — Sekarang", type: "Full Time", active: true, desc: ["Mengimplementasikan aplikasi web berdasarkan mockup dan ERD dari tim analis", "Membangun dashboard Data Product System menggunakan Laravel & SQL Server", "Mengembangkan fitur backend (API, autentikasi) dan frontend interaktif", "Optimasi performa query SQL dan integrasi frontend-backend"] },
  { role: "Staf Departemen Digitalisasi", company: "PT. Velasto Indonesia", period: "19 Mei — 18 Agustus 2025", type: "Magang", active: false, desc: ["Membuat dashboard pemantauan produksi menggunakan Grafana", "Mengintegrasikan data dari SQL, Excel, IoT ke panel Grafana & ASP.NET", "Membangun Dashboard Monitoring Harian dengan C# dan ASP.NET"] },
  { role: "Front End & Full Stack Developer", company: "Bea dan Cukai Purwakarta", period: "1 Maret — 1 Mei 2025", type: "Magang", active: false, desc: ["Mengembangkan situs AlQuran-Journey, GPStracker, Puspa dengan Laravel", "Membuat program monitoring subkon internal PDAD (Full Stack)", "Membantu troubleshooting hardware & software komputer kantor"] },
  { role: "Administrator Finish Product Godown CP3", company: "PT. Indorama Synthetics", period: "1 Nov 2024 — 31 Jan 2025", type: "Magang", active: false, desc: ["Memasukkan catatan pengiriman ke sistem Oracle", "Mengarsipkan dokumen produksi"] },
];

const SKILLS_TECH = [
  { name: "PHP", icon: "php", level: 90 }, { name: "Laravel", icon: "laravel", level: 85 },
  { name: "JavaScript", icon: "js", level: 80 }, { name: "MySQL", icon: "mysql", level: 85 },
  { name: "SQL Server", icon: "sqlserver", level: 80 }, { name: "ASP.NET / C#", icon: "dotnet", level: 70 },
  { name: "Flutter", icon: "flutter", level: 65 }, { name: "HTML / CSS", icon: "html", level: 90 },
  { name: "Figma", icon: "figma", level: 75 }, { name: "Grafana", icon: "grafana", level: 70 },
];

/* ═══ LIGHTBOX ═══ */
function Lightbox({ project, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex || 0);
  const [imgError, setImgError] = useState({});
  const [zoom, setZoom] = useState(false);
  const touchStart = useRef(null);

  const prev = useCallback(() => setCurrent(c => (c - 1 + project.screenshots.length) % project.screenshots.length), [project]);
  const next = useCallback(() => setCurrent(c => (c + 1) % project.screenshots.length), [project]);

  useEffect(() => {
    const handler = e => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  const onTouchStart = e => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = e => {
    if (!touchStart.current) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStart.current = null;
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", animation: "fadeIn .2s ease" }}>
      {/* Header */}
      <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to bottom,rgba(0,0,0,0.85),transparent)" }}>
        <div>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.25em", color: project.color, textTransform: "uppercase", marginBottom: "0.2rem" }}>{project.id} — {project.tag}</p>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(0.85rem,3vw,1.1rem)", color: "#e2e8f0" }}>{project.title}</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.6rem", color: "#475569" }}>{current + 1}/{project.screenshots.length}</span>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>
      </div>

      {/* Image area — swipeable */}
      <div
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ position: "relative", width: "92vw", maxWidth: project.isMobile ? "340px" : "85vw", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {imgError[current] ? (
          <div style={{ width: "100%", height: "50vw", maxHeight: 440, background: `linear-gradient(135deg,#0a1628,${project.color}18)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", border: `1px solid ${project.color}20` }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "4rem", color: `${project.color}20` }}>{project.id}</span>
          </div>
        ) : (
          <img
            key={current}
            src={project.screenshots[current]}
            alt={`${project.title} ${current + 1}`}
            onClick={() => setZoom(z => !z)}
            style={{ maxWidth: "100%", maxHeight: "65vh", objectFit: "contain", borderRadius: 2, border: "1px solid rgba(255,255,255,0.06)", cursor: zoom ? "zoom-out" : "zoom-in", transform: zoom ? "scale(1.5)" : "scale(1)", transition: "transform .3s ease", animation: "slideUp .2s ease" }}
            onError={() => setImgError(prev => ({ ...prev, [current]: true }))}
          />
        )}

        {project.screenshots.length > 1 && (
          <>
            <button onClick={prev} className="lb-nav lb-nav-l">‹</button>
            <button onClick={next} className="lb-nav lb-nav-r">›</button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {project.screenshots.length > 1 && (
        <div onClick={e => e.stopPropagation()} style={{ display: "flex", gap: "0.4rem", marginTop: "1.25rem", padding: "0.6rem", background: "rgba(255,255,255,0.03)", borderRadius: 4, flexWrap: "wrap", justifyContent: "center" }}>
          {project.screenshots.map((src, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ width: 52, height: 34, padding: 0, border: `2px solid ${i === current ? project.color : "rgba(255,255,255,0.1)"}`, borderRadius: 2, overflow: "hidden", cursor: "pointer", background: "#0a1628", opacity: i === current ? 1 : 0.5, transition: "all .2s" }}>
              {!imgError[i] && <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setImgError(prev => ({ ...prev, [i]: true }))} />}
            </button>
          ))}
        </div>
      )}
      <p style={{ marginTop: "0.75rem", fontFamily: "'Space Mono',monospace", fontSize: "0.45rem", letterSpacing: "0.25em", color: "#1e293b", textTransform: "uppercase" }}>swipe or use ← → · ESC to close</p>
    </div>
  );
}

/* ═══ CERT MODAL ═══ */
function CertModal({ cert, onClose }) {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef(null);

  useEffect(() => {
    const handler = e => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && cert.images.length > 1) setCurrent(c => (c - 1 + cert.images.length) % cert.images.length);
      if (e.key === "ArrowRight" && cert.images.length > 1) setCurrent(c => (c + 1) % cert.images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, cert]);

  const onTouchStart = e => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = e => {
    if (!touchStart.current) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setCurrent(c => (c + 1) % cert.images.length);
      else setCurrent(c => (c - 1 + cert.images.length) % cert.images.length);
    }
    touchStart.current = null;
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", animation: "fadeIn .2s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to bottom,rgba(0,0,0,0.85),transparent)" }}>
        <div>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.45rem", letterSpacing: "0.2em", color: "#3b82f6", textTransform: "uppercase", background: "rgba(59,130,246,0.1)", padding: "0.15rem 0.5rem", border: "1px solid rgba(59,130,246,0.2)" }}>{cert.category}</span>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(0.8rem,3vw,1rem)", color: "#e2e8f0", marginTop: "0.4rem" }}>{cert.name}</h3>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.5rem", color: "#475569", marginTop: "0.15rem" }}>{cert.issuer} · {cert.year}</p>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
      </div>

      <div onClick={e => e.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ position: "relative", width: "92vw", maxWidth: "80vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          key={current}
          src={cert.images[current]}
          alt={cert.name}
          style={{ maxWidth: "100%", maxHeight: "68vh", objectFit: "contain", borderRadius: 2, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 30px 80px rgba(0,0,0,0.8)", animation: "slideUp .2s ease" }}
          onError={e => { e.target.style.display = "none"; }}
        />
        {cert.images.length > 1 && (
          <>
            <button onClick={() => setCurrent(c => (c - 1 + cert.images.length) % cert.images.length)} className="lb-nav lb-nav-l">‹</button>
            <button onClick={() => setCurrent(c => (c + 1) % cert.images.length)} className="lb-nav lb-nav-r">›</button>
          </>
        )}
      </div>

      {cert.images.length > 1 && (
        <div onClick={e => e.stopPropagation()} style={{ display: "flex", gap: "0.4rem", marginTop: "1.25rem" }}>
          {cert.images.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 22 : 7, height: 7, borderRadius: 4, border: "none", background: i === current ? "#3b82f6" : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "all .2s", padding: 0 }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══ CURSOR — desktop only ═══ */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const m = e => {
      if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
      setTimeout(() => { if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; } }, 80);
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);
  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ position: "fixed", width: 8, height: 8, background: "#3b82f6", borderRadius: "50%", pointerEvents: "none", zIndex: 10000, transform: "translate(-50%,-50%)" }} />
      <div ref={ring} className="cursor-ring" style={{ position: "fixed", width: 30, height: 30, border: "1px solid rgba(59,130,246,0.5)", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", transition: "all .15s" }} />
    </>
  );
}

/* ═══ SPLASH ═══ */
function Splash({ onDone }) {
  const [exit, setExit] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { setExit(true); setTimeout(onDone, 700); }, 3400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{ position: "fixed", inset: 0, background: "#030712", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem", opacity: exit ? 0 : 1, transition: "opacity .7s ease", pointerEvents: exit ? "none" : "all" }}>
      <div style={{ width: 1, height: 0, background: "linear-gradient(to bottom,#3b82f6,#60a5fa)", animation: "growV 1s ease forwards" }} />
      <div style={{ textAlign: "center", opacity: 0, animation: "splashUp .9s ease .9s forwards" }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,5vw,4rem)", fontWeight: 300, letterSpacing: "0.12em", color: "#f0f9ff", lineHeight: 1.15 }}>Welcome to My</p>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,5vw,4rem)", fontWeight: 500, fontStyle: "italic", letterSpacing: "0.08em", color: "#60a5fa", lineHeight: 1.15 }}>Portfolio Website</p>
      </div>
      <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#38bdf8", textTransform: "uppercase", opacity: 0, animation: "splashUp .8s ease 1.4s forwards" }}>Adha Raka Firmansyah</p>
      <div style={{ width: 200, height: 1, background: "rgba(255,255,255,0.1)", overflow: "hidden", opacity: 0, animation: "splashUp .5s ease 1.8s forwards" }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg,#3b82f6,#60a5fa)", width: "0%", animation: "barFill 1.4s ease 2s forwards" }} />
      </div>
    </div>
  );
}

/* ═══ PROJECT CARD ═══ */
function ProjectCard({ p, onOpenLightbox }) {
  const [slide, setSlide] = useState(0);
  const [errors, setErrors] = useState({});
  const [hovered, setHovered] = useState(false);
  const touchStart = useRef(null);

  const onTouchStart = e => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = e => {
    if (!touchStart.current) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && slide < p.screenshots.length - 1) setSlide(s => s + 1);
      if (diff < 0 && slide > 0) setSlide(s => s - 1);
    }
    touchStart.current = null;
  };

  return (
    <div
      style={{ background: "#0f172a", border: `1px solid ${hovered ? "rgba(59,130,246,0.35)" : "rgba(59,130,246,0.12)"}`, overflow: "hidden", transition: "transform .3s,border-color .3s,box-shadow .3s", transform: hovered ? "translateY(-4px)" : "translateY(0)", boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.5),0 0 0 1px ${p.color}15` : "none", display: "flex", flexDirection: "column" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ position: "relative", aspectRatio: p.isMobile ? "9/16" : "16/9", background: "#0a1628", overflow: "hidden", flexShrink: 0 }}
      >
        {errors[slide] ? (
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg,#0a1628,${p.color}15)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "4rem", color: `${p.color}25`, lineHeight: 1 }}>{p.id}</span>
          </div>
        ) : (
          <img
            key={`${p.id}-${slide}`}
            src={p.screenshots[slide]}
            alt={`${p.title} ${slide + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .4s", transform: hovered ? "scale(1.03)" : "scale(1)" }}
            onError={() => setErrors(prev => ({ ...prev, [slide]: true }))}
          />
        )}

        {/* Hover overlay — only on non-touch */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(3,7,18,0.55)", opacity: hovered ? 1 : 0, transition: "opacity .3s", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
          <button
            onClick={() => onOpenLightbox(p, slide)}
            style={{ background: "rgba(59,130,246,0.9)", border: "none", color: "#fff", padding: "0.6rem 1.4rem", fontFamily: "'Space Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", boxShadow: "0 8px 24px rgba(59,130,246,0.4)" }}
          >⊞ View Screenshots</button>
        </div>

        {/* Mobile tap-to-view button */}
        <button
          onClick={() => onOpenLightbox(p, slide)}
          className="mobile-view-btn"
          style={{ display: "none" }}
        >⊞ View</button>

        <div style={{ position: "absolute", bottom: "0.6rem", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "0.35rem", zIndex: 2 }}>
          {p.screenshots.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{ width: slide === i ? 18 : 5, height: 5, borderRadius: 3, border: "none", background: slide === i ? p.color : "rgba(255,255,255,0.25)", padding: 0, cursor: "pointer", transition: "all .2s" }} />
          ))}
        </div>

        {slide > 0 && <button onClick={() => setSlide(s => s - 1)} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>}
        {slide < p.screenshots.length - 1 && <button onClick={() => setSlide(s => s + 1)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>}

        <div style={{ position: "absolute", top: "0.6rem", left: "0.6rem", background: "rgba(0,0,0,0.65)", padding: "0.15rem 0.5rem", fontFamily: "'Space Mono',monospace", fontSize: "0.55rem", color: p.color, letterSpacing: "0.2em", zIndex: 2 }}>{p.id}</div>
      </div>

      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: p.color }}>{p.tag}</p>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1rem,2.5vw,1.25rem)", fontWeight: 500, color: "#e2e8f0", lineHeight: 1.2 }}>{p.title}</h3>
        <p style={{ fontSize: "0.68rem", color: "#475569", fontFamily: "'Space Mono',monospace", letterSpacing: "0.05em" }}>— {p.company}</p>
        <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.75, flex: 1 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.4rem", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>{p.tech.map(t => <TechBadge key={t.name} name={t.name} icon={t.icon} />)}</div>
          <button
            onClick={() => onOpenLightbox(p, 0)}
            style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.1em", textTransform: "uppercase", color: p.color, background: "transparent", border: `1px solid ${p.color}40`, padding: "0.3rem 0.6rem", cursor: "pointer", transition: "all .2s", flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = `${p.color}15`; e.currentTarget.style.borderColor = p.color; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = `${p.color}40`; }}
          >{p.screenshots.length} foto →</button>
        </div>
      </div>
    </div>
  );
}

/* ═══ SECTION HEAD ═══ */
function SectionHead({ label, title, italic }) {
  return (
    <div className="rv" style={{ marginBottom: "3rem" }}>
      <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ width: 40, height: 1, background: "#3b82f6", display: "inline-block" }} />{label}
      </p>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,6vw,3.8rem)", fontWeight: 400, lineHeight: 1.1 }}>
        {title} <em style={{ color: "#60a5fa" }}>{italic}</em>
      </h2>
    </div>
  );
}

/* ═══ HAMBURGER MENU ═══ */
function HamburgerMenu({ active, onClose }) {
  const NAV_ITEMS = ["home", "about", "experience", "project", "sertifikat", "contact"];
  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 199, backdropFilter: "blur(4px)", animation: "fadeIn .2s ease" }} />
      {/* Drawer */}
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(320px,85vw)", background: "#0a1628", zIndex: 200, borderLeft: "1px solid rgba(59,130,246,0.2)", display: "flex", flexDirection: "column", padding: "5rem 2rem 2rem", animation: "slideInRight .3s ease", gap: "0.25rem" }}>
        {NAV_ITEMS.map((id, i) => (
          <a
            key={id} href={`#${id}`} onClick={onClose}
            style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: active === id ? "#60a5fa" : "#64748b", padding: "1rem 0", borderBottom: "1px solid rgba(59,130,246,0.08)", display: "flex", alignItems: "center", gap: "1rem", transition: "color .2s", animationDelay: `${i * 0.05}s` }}
          >
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.7rem", color: "rgba(59,130,246,0.4)", fontStyle: "italic" }}>0{i + 1}</span>
            {id}
          </a>
        ))}
        <a
          href={CV_URL} target="_blank" rel="noopener noreferrer" onClick={onClose}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "2rem", background: "#3b82f6", color: "#fff", padding: "0.875rem 1.5rem", fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", justifyContent: "center" }}
        >↓ Download CV</a>
      </div>
    </>
  );
}

/* ═══ MAIN PAGE ═══ */
export default function Portfolio() {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState("home");
  const [lightbox, setLightbox] = useState(null);
  const [certModal, setCertModal] = useState(null);
  const [certFilter, setCertFilter] = useState("Semua");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const ids = ["home", "about", "experience", "project", "sertifikat", "contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -40% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ready]);

  useEffect(() => {
    if (lightbox || certModal || menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox, certModal, menuOpen]);

  const filteredCerts = certFilter === "Semua" ? CERTIFICATES : CERTIFICATES.filter(c => c.category === certFilter);

  const C = {
    bg: "#030712", bg2: "#0f172a", bg3: "#1e293b",
    blue: "#3b82f6", blueL: "#60a5fa", blueD: "#1d4ed8",
    text: "#e2e8f0", muted: "#64748b", faint: "#94a3b8",
    border: "rgba(59,130,246,0.15)",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:#030712;color:#e2e8f0;font-family:'DM Sans',sans-serif;overflow-x:hidden}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#030712}::-webkit-scrollbar-thumb{background:#3b82f6;border-radius:2px}

        /* Cursor — desktop only */
        @media(hover:hover){*{cursor:none}.cursor-dot,.cursor-ring{display:block!important}}
        @media(hover:none){.cursor-dot,.cursor-ring{display:none!important}}

        .rv{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease}
        .rv.vis{opacity:1;transform:translateY(0)}
        .d1.rv.vis{transition-delay:.1s}.d2.rv.vis{transition-delay:.2s}.d3.rv.vis{transition-delay:.3s}.d4.rv.vis{transition-delay:.4s}

        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes breathe{0%,100%{opacity:.7}50%{opacity:.2}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes growV{to{height:80px}}
        @keyframes splashUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes barFill{to{width:100%}}
        @keyframes slideInRight{from{transform:translateX(100%)}to{transform:translateX(0)}}

        a{text-decoration:none}

        /* Navbar links — hidden on mobile */
        .nav-links{display:flex;gap:2.25rem;list-style:none;align-items:center}
        .nav-link{font-family:'Space Mono',monospace;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;transition:color .25s;padding-bottom:2px}
        .nav-link:hover{color:#3b82f6!important}

        /* Hamburger — hidden on desktop */
        .hamburger{display:none;flex-direction:column;gap:5px;background:transparent;border:none;padding:6px;cursor:pointer}
        .hamburger span{width:22px;height:2px;background:#94a3b8;border-radius:2px;transition:all .25s;display:block}

        .cert-card{transition:transform .25s,border-color .25s,box-shadow .25s}
        .cert-card:hover{transform:translateY(-3px);border-color:rgba(59,130,246,0.4)!important;box-shadow:0 12px 40px rgba(0,0,0,0.4)}

        .social-link{display:flex;align-items:center;gap:1.25rem;padding:1rem 1.5rem;background:#030712;border:1px solid rgba(59,130,246,0.15);transition:all .25s}
        .social-link:hover{border-color:#3b82f6;padding-left:2rem}

        input,textarea{background:#0f172a;border:1px solid rgba(59,130,246,0.15);color:#e2e8f0;padding:.875rem 1rem;font-family:'DM Sans',sans-serif;font-size:.9rem;outline:none;transition:border-color .25s;width:100%}
        input:focus,textarea:focus{border-color:#3b82f6}textarea{resize:none}

        .exp-card{background:#0f172a;border:1px solid rgba(59,130,246,0.15);padding:2rem;transition:border-color .25s}
        .exp-card:hover{border-color:rgba(59,130,246,0.4)}

        .filter-btn{font-family:'Space Mono',monospace;font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;border:1px solid rgba(59,130,246,0.2);background:transparent;color:#64748b;padding:0.4rem 1rem;cursor:pointer;transition:all .2s}
        .filter-btn:hover{border-color:#3b82f6;color:#3b82f6}
        .filter-btn.active{background:rgba(59,130,246,0.12);border-color:#3b82f6;color:#60a5fa}

        /* Lightbox nav buttons */
        .lb-nav{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#e2e8f0;width:44px;height:44px;border-radius:50%;cursor:pointer;font-size:1.3rem;display:flex;align-items:center;justify-content:center;position:absolute;top:50%;transform:translateY(-50%);transition:background .2s}
        .lb-nav:hover{background:rgba(59,130,246,0.2)}
        .lb-nav-l{left:-58px}
        .lb-nav-r{right:-58px}

        /* ═══════════════════════════════════════════
           TABLET — max-width: 1024px
        ═══════════════════════════════════════════ */
        @media(max-width:1024px){
          .projects-grid{grid-template-columns:1fr!important}
          .about-grid{grid-template-columns:1fr!important;gap:3rem!important}
          .about-photo{max-width:280px}
          .edu-grid{grid-template-columns:repeat(2,1fr)!important}
          .cert-grid{grid-template-columns:repeat(2,1fr)!important}
          .contact-grid{grid-template-columns:1fr!important;gap:3rem!important}
        }

        /* ═══════════════════════════════════════════
           MOBILE — max-width: 768px
        ═══════════════════════════════════════════ */
        @media(max-width:768px){
          /* Navbar */
          .nav-links{display:none!important}
          .hamburger{display:flex!important}
          nav{padding:0.875rem 1.25rem!important}
          .nav-cv-btn{display:none!important}

          /* Sections padding */
          section{padding-left:1.25rem!important;padding-right:1.25rem!important;padding-top:5rem!important;padding-bottom:3rem!important}
          footer{padding:1.5rem 1.25rem!important;flex-direction:column!important;text-align:center!important}

          /* Hero */
          .hero-section{padding:0 1.25rem!important;padding-top:0!important}
          .hero-inner{padding-top:5rem!important}
          .hero-btns{flex-direction:column!important;align-items:flex-start!important;gap:0.875rem!important}
          .hero-btns a{width:100%!important;text-align:center!important;justify-content:center!important}
          .scroll-indicator{display:none!important}

          /* About */
          .about-grid{grid-template-columns:1fr!important;gap:2.5rem!important}
          .about-photo{display:none!important}
          .stats-grid{grid-template-columns:repeat(3,1fr)!important}

          /* Experience */
          .edu-grid{grid-template-columns:1fr!important}
          .exp-header{flex-direction:column!important;align-items:flex-start!important}
          .exp-card{padding:1.25rem!important}

          /* Projects */
          .projects-grid{grid-template-columns:1fr!important}

          /* Certificates */
          .cert-grid{grid-template-columns:1fr!important}

          /* Contact */
          .contact-grid{grid-template-columns:1fr!important;gap:2.5rem!important}

          /* Section head font */
          .section-head h2{font-size:clamp(1.8rem,7vw,2.8rem)!important}

          /* Lightbox nav on mobile — hide side buttons, show below */
          .lb-nav{display:none!important}

          /* Show mobile view button on project cards */
          .mobile-view-btn{display:flex!important;position:absolute;bottom:50px;left:50%;transform:translateX(-50%);background:rgba(59,130,246,0.85);border:none;color:#fff;padding:0.5rem 1.2rem;font-family:'Space Mono',monospace;font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;align-items:center;gap:0.35rem;z-index:4;white-space:nowrap}
        }

        /* ═══════════════════════════════════════════
           SMALL MOBILE — max-width: 480px
        ═══════════════════════════════════════════ */
        @media(max-width:480px){
          .stats-grid{grid-template-columns:1fr!important;gap:1rem!important}
          .filter-row{gap:0.35rem!important}
          .filter-btn{padding:0.35rem 0.7rem!important;font-size:0.5rem!important}
          .logo-strip{gap:0.4rem!important}
          .logo-strip > div{width:44px!important;height:44px!important}
          .cert-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      <Cursor />
      {!ready && <Splash onDone={() => setReady(true)} />}
      {lightbox && <Lightbox project={lightbox.project} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />}
      {certModal && <CertModal cert={certModal} onClose={() => setCertModal(null)} />}
      {menuOpen && <HamburgerMenu active={active} onClose={() => setMenuOpen(false)} />}

      {ready && (
        <div style={{ animation: "fadeUp .5s ease forwards" }}>

          {/* ── NAVBAR ── */}
          <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "1.1rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(3,7,18,0.92)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", border: `2px solid ${C.blue}`, flexShrink: 0, background: C.bg3 }}>
                <img src="/logoprofile.jpeg" alt="ARF" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML += "<span style='font-family:Playfair Display,serif;color:#3b82f6;font-size:.7rem;display:flex;align-items:center;justify-content:center;width:100%;height:100%'>AR</span>"; }}
                />
              </div>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.75rem", letterSpacing: "0.15em", color: C.blueL }}>ARF<span style={{ color: C.blue }}>.</span></span>
            </div>

            <ul className="nav-links">
              {["home", "about", "experience", "project", "sertifikat", "contact"].map(id => (
                <li key={id}>
                  <a href={`#${id}`} className="nav-link" style={{ color: active === id ? C.blue : C.muted, borderBottom: active === id ? `1px solid ${C.blue}` : "1px solid transparent" }}>{id}</a>
                </li>
              ))}
              <li>
                <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="nav-cv-btn"
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Space Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", background: C.blue, padding: "0.45rem 1rem", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.blueD}
                  onMouseLeave={e => e.currentTarget.style.background = C.blue}
                >↓ CV</a>
              </li>
            </ul>

            {/* Hamburger */}
            <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </button>
          </nav>

          {/* ── HERO ── */}
          <section id="home" className="hero-section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 3rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.035) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
            <div style={{ position: "absolute", top: "25%", right: "8%", width: 520, height: 520, background: "radial-gradient(circle,rgba(59,130,246,.07) 0%,transparent 65%)", pointerEvents: "none" }} />

            <div className="hero-inner" style={{ position: "relative", zIndex: 2, maxWidth: 940, paddingTop: "6rem", width: "100%" }}>
              <div className="rv" style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem" }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: `3px solid ${C.blue}`, background: C.bg3 }}>
                    <img src="/logoprofile.jpeg" alt="Adha Raka" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ position: "absolute", bottom: 3, right: 3, width: 13, height: 13, background: "#22c55e", borderRadius: "50%", border: "2px solid #030712" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.35em", color: C.blue, textTransform: "uppercase", marginBottom: "0.2rem" }}>Available for Work</p>
                  <p style={{ fontSize: "0.82rem", color: C.faint }}>Full Stack Developer · Purwakarta, ID</p>
                </div>
              </div>

              <p className="rv d1" style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.4em", color: C.blue, textTransform: "uppercase", marginBottom: "0.875rem" }}>Hello, I'm</p>
              <h1 className="rv d2" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,9vw,6.5rem)", fontWeight: 400, lineHeight: 1, marginBottom: "0.3rem" }}>Adha Raka</h1>
              <h1 className="rv d3" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,9vw,6.5rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1, color: C.blueL, marginBottom: "1.25rem" }}>Firmansyah</h1>
              <p className="rv d3" style={{ fontSize: "clamp(0.85rem,2.5vw,1.05rem)", color: C.faint, letterSpacing: "0.08em", marginBottom: "1.5rem" }}>Front End · Full Stack Developer</p>
              <p className="rv d4" style={{ maxWidth: 560, lineHeight: 1.85, color: "#94a3b8", fontSize: "clamp(0.82rem,2vw,0.93rem)", marginBottom: "2.25rem" }}>
                Mahasiswa Teknik Perangkat Lunak / Sistem Informasi berpengalaman sebagai Full-Stack Developer. Mahir dalam PHP, Laravel, ASP.NET, C#, dan pengelolaan database SQL Server & MySQL.
              </p>

              <div className="rv d4 hero-btns" style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", marginBottom: "3.5rem" }}>
                <a href="#project" style={{ background: C.blue, color: "#fff", padding: "0.875rem 2rem", fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "background .25s" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.blueD}
                  onMouseLeave={e => e.currentTarget.style.background = C.blue}
                >Lihat Project</a>
                <a href={CV_URL} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "transparent", color: C.blueL, border: `1px solid ${C.blue}`, padding: "0.875rem 1.75rem", fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                ><span>↓</span> Download CV</a>
                <a href="#contact" style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.faint, transition: "color .25s" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.blue}
                  onMouseLeave={e => e.currentTarget.style.color = C.faint}
                >Hubungi Saya →</a>
              </div>

              <div className="rv logo-strip" style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
                {Object.entries(LOGO).map(([key, src]) => (
                  <div key={key} title={key} style={{ width: 54, height: 54, display: "flex", alignItems: "center", justifyContent: "center", background: C.bg2, border: `1px solid ${C.border}`, padding: "0.5rem", transition: "border-color .25s,background .25s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = C.bg3; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg2; }}
                  >
                    <img src={src} alt={key} style={{ width: 24, height: 24, objectFit: "contain" }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-indicator" style={{ position: "absolute", bottom: "2.5rem", left: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: 1, height: 50, background: `linear-gradient(to bottom,${C.blue},transparent)`, animation: "breathe 2s infinite" }} />
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: C.muted, textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
            </div>
          </section>

          {/* ── ABOUT ── */}
          <section id="about" style={{ padding: "8rem 3rem 5rem", background: C.bg2 }}>
            <SectionHead label="About Me" title="Tentang" italic="Saya" />
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "310px 1fr", gap: "5rem", alignItems: "start" }}>
              <div className="about-photo rv" style={{ position: "relative" }}>
                <div style={{ border: `1px solid ${C.border}`, overflow: "hidden", background: C.bg3 }}>
                  <img src="/logoprofile.jpeg" alt="Adha Raka Firmansyah" style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "3/4" }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                </div>
                <div style={{ position: "absolute", top: 16, left: 16, right: -16, bottom: -16, border: `1px solid ${C.blue}18`, zIndex: -1 }} />
                <div style={{ background: C.bg, border: `1px solid ${C.border}`, padding: "1.25rem", marginTop: "1.5rem" }}>
                  {[["📧", "rakafirmansyah292@gmail.com"], ["📱", "085280554501"], ["📍", "Purwakarta, Jawa Barat"], ["🌐", "adharaka.netlify.app"]].map(([icon, val]) => (
                    <div key={val} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: "0.85rem", flexShrink: 0 }}>{icon}</span>
                      <span style={{ fontSize: "0.75rem", color: C.faint, wordBreak: "break-all", lineHeight: 1.5 }}>{val}</span>
                    </div>
                  ))}
                  <a href={CV_URL} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1rem", padding: "0.7rem", background: "rgba(59,130,246,0.08)", border: `1px solid ${C.border}`, fontFamily: "'Space Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.blueL, transition: "all .25s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.15)"; e.currentTarget.style.borderColor = C.blue; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,0.08)"; e.currentTarget.style.borderColor = C.border; }}
                  >↓ Download CV</a>
                </div>
              </div>

              <div>
                {/* Mobile: show contact info inline */}
                <div className="rv mobile-contact" style={{ display: "none", background: C.bg, border: `1px solid ${C.border}`, padding: "1rem", marginBottom: "1.5rem", borderRadius: 2 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {[["📧", "rakafirmansyah292@gmail.com"], ["📱", "085280554501"], ["📍", "Purwakarta, Jawa Barat"], ["🌐", "adharaka.netlify.app"]].map(([icon, val]) => (
                      <div key={val} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "0.8rem", flexShrink: 0 }}>{icon}</span>
                        <span style={{ fontSize: "0.7rem", color: C.faint, wordBreak: "break-all", lineHeight: 1.4 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                  <a href={CV_URL} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.875rem", padding: "0.65rem", background: "rgba(59,130,246,0.08)", border: `1px solid ${C.border}`, fontFamily: "'Space Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.blueL }}
                  >↓ Download CV</a>
                </div>

                <div className="rv d1" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "0" }}>
                  <p style={{ lineHeight: 1.9, color: "#94a3b8" }}>Halo! Saya <strong style={{ color: C.blueL }}>Adha Raka Firmansyah</strong>, mahasiswa Teknik Perangkat Lunak / Sistem Informasi yang dinamis dan bersemangat.</p>
                  <p style={{ lineHeight: 1.9, color: "#94a3b8" }}>Mahir dalam PHP, C#, JavaScript, serta pengelolaan database SQL Server, MySQL, dan integrasi Grafana & Oracle. Pengalaman magang solid di digitalisasi dan pengembangan sistem informasi.</p>
                  <p style={{ lineHeight: 1.9, color: "#94a3b8" }}>Mampu bekerja mandiri maupun dalam tim dengan kemampuan teknis dan komunikasi yang kuat.</p>
                </div>

                <div className="rv d2 stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", margin: "2.5rem 0", padding: "2rem 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
                  {[["4+", "Pengalaman Magang"], ["8+", "Project Selesai"], ["11+", "Sertifikat"]].map(([n, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,6vw,3rem)", fontWeight: 400, color: C.blue, lineHeight: 1 }}>{n}</div>
                      <div style={{ fontSize: "0.72rem", color: C.muted, marginTop: "0.25rem" }}>{l}</div>
                    </div>
                  ))}
                </div>

                <div className="rv d3">
                  <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: C.blue, textTransform: "uppercase", marginBottom: "1.5rem" }}>Tech Skills</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                    {SKILLS_TECH.map(s => (
                      <div key={s.name}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: C.faint }}>
                            {LOGO[s.icon] && <img src={LOGO[s.icon]} alt={s.name} style={{ width: 16, height: 16, objectFit: "contain" }} />}
                            {s.name}
                          </span>
                          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.6rem", color: C.muted }}>{s.level}%</span>
                        </div>
                        <div style={{ height: 3, background: C.bg3, borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${s.level}%`, background: `linear-gradient(90deg,${C.blue},${C.blueL})`, borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile contact card — shown on mobile */}
          <style>{`
            @media(max-width:768px){
              .about-photo{display:none!important}
              .mobile-contact{display:block!important}
            }
          `}</style>

          {/* ── EXPERIENCE ── */}
          <section id="experience" style={{ padding: "8rem 3rem 5rem" }}>
            <SectionHead label="Experience" title="Pengalaman" italic="Kerja" />
            <div style={{ position: "relative", paddingLeft: "2rem" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom,${C.blue},transparent)` }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {EXPERIENCES.map((exp, i) => (
                  <div key={i} className={`rv d${(i % 3) + 1}`} style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: -2 - 8, top: 10, width: 15, height: 15, borderRadius: "50%", background: exp.active ? C.blue : C.bg2, border: `2px solid ${C.blue}` }} />
                    <div className="exp-card">
                      <div className="exp-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.875rem" }}>
                        <div>
                          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(0.95rem,2.5vw,1.15rem)", fontWeight: 500, marginBottom: "0.2rem" }}>{exp.role}</h3>
                          <p style={{ fontSize: "0.82rem", color: C.blueL, fontWeight: 500 }}>{exp.company}</p>
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.55rem", color: C.muted, marginBottom: "0.35rem" }}>{exp.period}</p>
                          <span style={{ background: "rgba(59,130,246,0.1)", border: `1px solid ${C.border}`, padding: "0.12rem 0.5rem", fontFamily: "'Space Mono',monospace", fontSize: "0.5rem", color: C.blue, textTransform: "uppercase", letterSpacing: "0.1em" }}>{exp.type}</span>
                        </div>
                      </div>
                      <ul style={{ paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        {exp.desc.map((d, j) => <li key={j} style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.7 }}>{d}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "4rem" }}>
              <p className="rv" style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: C.blue, textTransform: "uppercase", marginBottom: "1.5rem" }}>Riwayat Pendidikan</p>
              <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
                {[
                  { school: "Universitas Siber Asia", major: "PJJ S1 Sistem Informasi", period: "Sep 2025 – Sep 2027" },
                  { school: "LP3I College Purwakarta", major: "Application Software Engineering", period: "Sep 2023 – Sep 2025" },
                  { school: "SMKN 1 Purwakarta", major: "Teknik Komputer & Jaringan (Axioo)", period: "Mar 2020 – Mar 2023" },
                ].map((ed, i) => (
                  <div key={i} className={`rv d${i + 1}`} style={{ background: C.bg2, border: `1px solid ${C.border}`, padding: "1.5rem" }}>
                    <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.52rem", letterSpacing: "0.12em", color: C.blue, textTransform: "uppercase", marginBottom: "0.6rem" }}>{ed.period}</p>
                    <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.4rem" }}>{ed.school}</h4>
                    <p style={{ fontSize: "0.76rem", color: C.faint }}>{ed.major}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── PROJECTS ── */}
          <section id="project" style={{ padding: "8rem 3rem 5rem", background: C.bg2 }}>
            <SectionHead label="Portfolio" title="Project" italic="Unggulan" />
            <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.25rem" }}>
              {PROJECTS.map(p => (
                <ProjectCard key={p.id} p={p} onOpenLightbox={(proj, idx) => setLightbox({ project: proj, index: idx })} />
              ))}
            </div>
          </section>

          {/* ── CERTIFICATES ── */}
          <section id="sertifikat" style={{ padding: "8rem 3rem 5rem" }}>
            <SectionHead label="Achievements" title="Sertifikat &" italic="Penghargaan" />
            <div className="rv filter-row" style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
              {CERT_CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCertFilter(cat)} className={`filter-btn${certFilter === cat ? " active" : ""}`}>{cat}</button>
              ))}
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.5rem", letterSpacing: "0.2em", color: C.muted, alignSelf: "center", marginLeft: "0.25rem" }}>{filteredCerts.length} sertifikat</span>
            </div>

            <div className="cert-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
              {filteredCerts.map((c, i) => (
                <div
                  key={i}
                  className={`cert-card rv d${(i % 3) + 1}`}
                  onClick={() => setCertModal(c)}
                  style={{ background: C.bg2, border: `1px solid ${C.border}`, padding: "1.25rem", cursor: "pointer", position: "relative", overflow: "hidden" }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${C.blue},transparent)` }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.875rem" }}>
                    <div style={{ width: 40, height: 40, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", background: C.bg3 }}>{c.icon}</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.52rem", color: C.blue, letterSpacing: "0.1em" }}>{c.year}</span>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.42rem", letterSpacing: "0.08em", color: "#475569", background: "rgba(59,130,246,0.06)", border: `1px solid ${C.border}`, padding: "0.1rem 0.35rem", textTransform: "uppercase" }}>{c.category}</span>
                    </div>
                  </div>
                  <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(0.8rem,2vw,0.95rem)", fontWeight: 400, marginBottom: "0.3rem", color: "#e2e8f0", lineHeight: 1.3 }}>{c.name}</h4>
                  <p style={{ fontSize: "0.7rem", color: C.muted, marginBottom: "0.875rem" }}>{c.issuer}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", paddingTop: "0.6rem", borderTop: `1px solid ${C.border}` }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.48rem", letterSpacing: "0.12em", color: C.blue, textTransform: "uppercase" }}>View</span>
                    {c.images.length > 1 && <span style={{ fontSize: "0.65rem", color: C.blue }}>({c.images.length})</span>}
                    <span style={{ marginLeft: "auto", color: C.blue, fontSize: "0.85rem" }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section id="contact" style={{ padding: "8rem 3rem 5rem", background: C.bg2 }}>
            <SectionHead label="Contact" title="Mari" italic="Berkolaborasi" />
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
              <div className="rv">
                <a href="mailto:rakafirmansyah292@gmail.com" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(0.9rem,2.5vw,1.4rem)", color: C.blueL, display: "block", marginBottom: "1.5rem", paddingBottom: "1.25rem", borderBottom: `1px solid ${C.border}`, wordBreak: "break-all" }}>rakafirmansyah292@gmail.com</a>
                <p style={{ color: "#94a3b8", lineHeight: 1.85, marginBottom: "2rem", fontSize: "0.9rem" }}>Terbuka untuk freelance, kolaborasi project, dan kesempatan kerja baru. Jangan ragu untuk menghubungi saya!</p>
                <a href={CV_URL} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem 1.5rem", background: "rgba(59,130,246,0.06)", border: `1px solid ${C.border}`, marginBottom: "1.25rem", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.12)"; e.currentTarget.style.borderColor = C.blue; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(59,130,246,0.06)"; e.currentTarget.style.borderColor = C.border; }}
                >
                  <span style={{ color: C.blue, fontSize: "1.1rem" }}>⬇</span>
                  <div>
                    <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.faint, marginBottom: "0.1rem" }}>Curriculum Vitae</p>
                    <p style={{ fontSize: "0.72rem", color: C.muted }}>Adha Raka Firmansyah — PDF</p>
                  </div>
                  <span style={{ marginLeft: "auto", fontFamily: "'Space Mono',monospace", fontSize: "0.48rem", color: C.blue, letterSpacing: "0.08em" }}>OPEN →</span>
                </a>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[{ name: "GitHub", handle: "@adharaka", icon: "◈" }, { name: "LinkedIn", handle: "Adha Raka Firmansyah", icon: "◉" }, { name: "Portfolio", handle: "adharaka.netlify.app", icon: "◍" }, { name: "WhatsApp", handle: "085280554501", icon: "◎" }].map(s => (
                    <a key={s.name} href="#" className="social-link">
                      <span style={{ color: C.blue, fontSize: "1rem" }}>{s.icon}</span>
                      <div>
                        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.faint, marginBottom: "0.1rem" }}>{s.name}</p>
                        <p style={{ fontSize: "0.72rem", color: C.muted }}>{s.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer style={{ padding: "2rem 3rem", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", color: C.muted }}>© 2025 <span style={{ color: C.blueL }}>Adha Raka Firmansyah</span>. All rights reserved.</p>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", color: C.muted }}>Built with <span style={{ color: C.blue }}>Next.js</span> · <span style={{ color: C.blue }}>TailwindCSS</span></p>
          </footer>

        </div>
      )}
    </>
  );
}