import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * NeighborhoodsPage – drop-in page for your /neighborhoods route
 *
 * ✅ No extra libraries required
 * ✅ Works with your existing Router / Header / Footer
 * ✅ Replace the SAMPLE_DATA with your real neighborhoods (or pass in via props later)
 *
 * How to use:
 * 1) Save this file as src/pages/NeighborhoodsPage.jsx
 * 2) In src/App.js, import it: `import NeighborhoodsPage from './pages/NeighborhoodsPage';`
 * 3) Remove the temporary inline NeighborhoodsPage and keep your <Route path="/neighborhoods" element={<NeighborhoodsPage />} />
 */

// ---------- SAMPLE DATA (Replace with your own) ----------
const SAMPLE_DATA = [
  {
    id: "willow-glen",
    name: "Willow Glen",
    city: "San Jose",
    image:
      "https://images.unsplash.com/photo-1565182999561-18d7fce6f47b?q=80&w=1600&auto=format&fit=crop",
    description:
      "Tree-lined streets, charming downtown on Lincoln Ave, and classic craftsman homes. Popular with families seeking a neighborhood feel close to tech hubs.",
    highlights: ["Family-friendly", "Walkable", "Dining"],
    medianHomePrice: 1550000,
    medianRent: 3800,
    schoolRating: 7.8,
    walkScore: 74,
    transitScore: 51,
  },
  {
    id: "cupertino",
    name: "Cupertino (Rancho Rinconada)",
    city: "Cupertino",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
    description:
      "Top-rated schools, quiet residential streets, and quick access to Apple Park. Competitive market and strong single‑family inventory.",
    highlights: ["Top Schools", "Quiet", "Single‑Family"],
    medianHomePrice: 2400000,
    medianRent: 4200,
    schoolRating: 9.6,
    walkScore: 55,
    transitScore: 38,
  },
  {
    id: "downtown-mountain-view",
    name: "Downtown Mountain View",
    city: "Mountain View",
    image:
      "https://images.unsplash.com/photo-1515266591878-f93e32bc5937?q=80&w=1600&auto=format&fit=crop",
    description:
      "Vibrant Castro Street corridor with restaurants, Caltrain, and tech shuttle access. Mix of condos, townhomes, and SFHs nearby.",
    highlights: ["Nightlife", "Transit", "Condos"],
    medianHomePrice: 1900000,
    medianRent: 3600,
    schoolRating: 8.7,
    walkScore: 92,
    transitScore: 64,
  },
  {
    id: "fremont-mission",
    name: "Mission San Jose",
    city: "Fremont",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop",
    description:
      "Known for exceptional schools and suburban calm. Larger lots, newer builds in surrounding tracts, and hiking access in the foothills.",
    highlights: ["Great Schools", "Parks", "Suburban"],
    medianHomePrice: 1850000,
    medianRent: 3300,
    schoolRating: 9.2,
    walkScore: 49,
    transitScore: 34,
  },
  {
    id: "palo-alto-midtown",
    name: "Midtown",
    city: "Palo Alto",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
    description:
      "Central Palo Alto with Eichlers, strong schools, and easy access to tech campuses. Premium pricing with enduring demand.",
    highlights: ["Eichlers", "Top Schools", "Central"],
    medianHomePrice: 3400000,
    medianRent: 5200,
    schoolRating: 9.4,
    walkScore: 68,
    transitScore: 50,
  },
];

// ---------- SMALL UTILITIES ----------
const currency = (n) =>
  n?.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const toMapsUrl = (name, city) =>
  `https://www.google.com/maps/search/${encodeURIComponent(`${name}, ${city}`)}`;

// ---------- PAGE ----------
export default function NeighborhoodsPage({ neighborhoods = SAMPLE_DATA }) {
  const navigate = useNavigate();

  // UI State
  const [mode, setMode] = useState("buy"); // "buy" | "rent"
  const [q, setQ] = useState("");
  const [city, setCity] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999999);
  const [minSchool, setMinSchool] = useState(0);
  const [sort, setSort] = useState("relevance");

  const cities = useMemo(() => ["All", ...Array.from(new Set(neighborhoods.map((n) => n.city)))], [
    neighborhoods,
  ]);

  const filtered = useMemo(() => {
    return neighborhoods
      .filter((n) => (city === "All" ? true : n.city === city))
      .filter((n) =>
        q.trim()
          ? `${n.name} ${n.city} ${n.description} ${n.highlights?.join(" ")}`
              .toLowerCase()
              .includes(q.trim().toLowerCase())
          : true
      )
      .filter((n) => (mode === "buy" ? n.medianHomePrice : n.medianRent))
      .filter((n) => (mode === "buy" ? n.medianHomePrice >= minPrice : n.medianRent >= minPrice))
      .filter((n) => (mode === "buy" ? n.medianHomePrice <= maxPrice : n.medianRent <= maxPrice))
      .filter((n) => (minSchool ? (n.schoolRating || 0) >= minSchool : true))
      .sort((a, b) => {
        if (sort === "price-asc") {
          const av = mode === "buy" ? a.medianHomePrice : a.medianRent;
          const bv = mode === "buy" ? b.medianHomePrice : b.medianRent;
          return (av || 0) - (bv || 0);
        }
        if (sort === "price-desc") {
          const av = mode === "buy" ? a.medianHomePrice : a.medianRent;
          const bv = mode === "buy" ? b.medianHomePrice : b.medianRent;
          return (bv || 0) - (av || 0);
        }
        if (sort === "school-desc") {
          return (b.schoolRating || 0) - (a.schoolRating || 0);
        }
        // relevance = no-op (original order)
        return 0;
      });
  }, [neighborhoods, city, q, mode, minPrice, maxPrice, minSchool, sort]);

  return (
    <div style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <h1 style={styles.title}>Explore Bay Area Neighborhoods</h1>
          <p style={styles.subtitle}>
            Compare schools, walkability, and pricing. Find the pocket that fits your lifestyle.
          </p>
          <div style={styles.searchRow}>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, city, or vibe (e.g., 'walkable', 'nightlife')"
              style={styles.searchInput}
            />
            <div style={styles.modeToggle}>
              <button
                aria-pressed={mode === "buy"}
                onClick={() => setMode("buy")}
                style={{
                  ...styles.toggleBtn,
                  ...(mode === "buy" ? styles.toggleBtnActive : {}),
                }}
              >
                Buy
              </button>
              <button
                aria-pressed={mode === "rent"}
                onClick={() => setMode("rent")}
                style={{
                  ...styles.toggleBtn,
                  ...(mode === "rent" ? styles.toggleBtnActive : {}),
                }}
              >
                Rent
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={styles.filtersWrap}>
        <div style={styles.filters}>
          <label style={styles.filterItem}>
            <span style={styles.label}>City</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} style={styles.select}>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <div style={styles.priceGroup}>
            <span style={styles.label}>{mode === "buy" ? "Home Price ($)" : "Monthly Rent ($)"}</span>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="number"
                min={0}
                step={mode === "buy" ? 50000 : 100}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value || 0))}
                placeholder="Min"
                style={styles.number}
              />
              <span style={{ alignSelf: "center", color: "#64748b" }}>—</span>
              <input
                type="number"
                min={0}
                step={mode === "buy" ? 50000 : 100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value || 0))}
                placeholder="Max"
                style={styles.number}
              />
            </div>
          </div>

          <label style={styles.filterItem}>
            <span style={styles.label}>Min School Rating</span>
            <select value={minSchool} onChange={(e) => setMinSchool(Number(e.target.value))} style={styles.select}>
              {[0, 6, 7, 8, 9].map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? "Any" : `${n}+`}
                </option>
              ))}
            </select>
          </label>

          <label style={styles.filterItem}>
            <span style={styles.label}>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="school-desc">Schools: High → Low</option>
            </select>
          </label>
        </div>
      </section>

      {/* Results */}
      <section style={styles.resultsWrap}>
        <div style={styles.resultsHeader}>
          <h2 style={styles.resultsTitle}>{filtered.length} Neighborhood{filtered.length !== 1 ? "s" : ""}</h2>
          <button
            onClick={() => {
              setQ("");
              setCity("All");
              setMinPrice(0);
              setMaxPrice(99999999);
              setMinSchool(0);
              setSort("relevance");
            }}
            style={styles.clearBtn}
          >
            Clear filters
          </button>
        </div>

        <div style={styles.grid}>
          {filtered.map((n) => (
            <article key={n.id} style={styles.card}>
              <div style={styles.imageWrap}>
                <img src={n.image} alt={`${n.name} in ${n.city}`} style={styles.image} />
              </div>
              <div style={styles.cardBody}>
                <header style={{ marginBottom: 8 }}>
                  <h3 style={styles.cardTitle}>{n.name}</h3>
                  <div style={styles.cardSub}>{n.city}</div>
                </header>
                <p style={styles.desc}>{n.description}</p>

                {/* Chips */}
                {n.highlights?.length ? (
                  <div style={styles.chips}>
                    {n.highlights.map((h) => (
                      <span key={h} style={styles.chip}>
                        {h}
                      </span>
                    ))}
                  </div>
                ) : null}

                {/* Stats */}
                <ul style={styles.stats}>
                  <li>
                    <span style={styles.statLabel}>{mode === "buy" ? "Median Home" : "Median Rent"}</span>
                    <span style={styles.statValue}>
                      {mode === "buy" ? currency(n.medianHomePrice) : currency(n.medianRent)}
                    </span>
                  </li>
                  <li>
                    <span style={styles.statLabel}>Schools</span>
                    <span style={styles.statValue}>{n.schoolRating ?? "—"}</span>
                  </li>
                  <li>
                    <span style={styles.statLabel}>Walk / Transit</span>
                    <span style={styles.statValue}>
                      {n.walkScore ?? "—"} / {n.transitScore ?? "—"}
                    </span>
                  </li>
                </ul>

                {/* CTAs */}
                <div style={styles.ctas}>
                  <button
                    style={styles.primaryBtn}
                    onClick={() => navigate(`/rent?city=${encodeURIComponent(n.city)}&neighborhood=${encodeURIComponent(n.name)}`)}
                  >
                    View Listings
                  </button>
                  <a href={toMapsUrl(n.name, n.city)} target="_blank" rel="noreferrer" style={styles.ghostBtn}>
                    View on Map
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Lead-in */}
      <section style={styles.banner}>
        <div style={styles.bannerInner}>
          <h3 style={{ margin: 0 }}>Not sure where to start?</h3>
          <p style={{ margin: "8px 0 16px", color: "#0f172a" }}>
            Tell us your commute, budget, and must‑haves. We will recommend 3 neighborhoods tailored to you.
          </p>
          <button style={styles.primaryBtn} onClick={() => navigate("/contact")}>Get a custom shortlist</button>
        </div>
      </section>
    </div>
  );
}

// ---------- STYLES ----------
const styles = {
  page: { display: "grid", gap: 24 },
  hero: {
    background: "linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)",
    color: "white",
    borderRadius: 20,
    margin: 16,
    padding: "48px 24px",
  },
  heroInner: { maxWidth: 1100, margin: "0 auto" },
  title: { fontSize: 36, fontWeight: 800, margin: 0 },
  subtitle: { marginTop: 8, fontSize: 16, opacity: 0.95 },
  searchRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 12,
    alignItems: "center",
    marginTop: 20,
  },
  searchInput: {
    width: "100%",
    borderRadius: 12,
    border: "none",
    padding: "14px 16px",
    fontSize: 16,
    outline: "none",
  },
  modeToggle: {
    display: "inline-flex",
    background: "rgba(255,255,255,0.2)",
    borderRadius: 999,
    padding: 4,
    gap: 4,
  },
  toggleBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    padding: "10px 14px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 700,
  },
  toggleBtnActive: { background: "white", color: "#0f172a" },

  filtersWrap: { background: "#f8fafc", padding: "8px 16px" },
  filters: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 12,
    alignItems: "end",
  },
  filterItem: { display: "grid", gap: 6 },
  label: { fontSize: 12, color: "#475569", fontWeight: 700, letterSpacing: 0.3 },
  select: {
    width: "100%",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    padding: "10px 12px",
    background: "white",
  },
  number: {
    width: 140,
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    padding: "10px 12px",
    background: "white",
  },
  priceGroup: { display: "grid", gap: 6 },

  resultsWrap: { padding: 16 },
  resultsHeader: {
    maxWidth: 1100,
    margin: "0 auto 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultsTitle: { margin: 0, fontSize: 20 },
  clearBtn: {
    background: "transparent",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    padding: "8px 10px",
    cursor: "pointer",
    color: "#334155",
  },

  grid: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
  },
  card: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
    display: "grid",
  },
  imageWrap: { position: "relative", aspectRatio: "16/9", overflow: "hidden" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  cardBody: { padding: 16, display: "grid", gap: 10 },
  cardTitle: { margin: 0, fontSize: 18 },
  cardSub: { color: "#64748b", fontSize: 13, marginTop: 2 },
  desc: { color: "#334155", fontSize: 14, lineHeight: 1.5, margin: 0 },
  chips: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 },
  chip: {
    fontSize: 12,
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    color: "#0f172a",
    padding: "6px 10px",
    borderRadius: 999,
  },
  stats: {
    listStyle: "none",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    padding: 0,
    margin: 0,
    gap: 8,
  },
  statLabel: { display: "block", fontSize: 11, color: "#64748b" },
  statValue: { display: "block", fontWeight: 800, fontSize: 14, color: "#0f172a" },
  ctas: { display: "flex", gap: 8, marginTop: 8 },
  primaryBtn: {
    background: "#0ea5e9",
    color: "white",
    border: "none",
    borderRadius: 10,
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 700,
  },
  ghostBtn: {
    display: "inline-block",
    textDecoration: "none",
    background: "white",
    color: "#0f172a",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    padding: "10px 14px",
    fontWeight: 700,
  },

  banner: {
    background: "#e2f2ff",
    border: "1px solid #bfdbfe",
    borderRadius: 16,
    margin: 16,
  },
  bannerInner: { maxWidth: 1100, margin: "0 auto", padding: 16 },
};
