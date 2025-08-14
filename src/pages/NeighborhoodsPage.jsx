import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NeighborhoodsPage.css";


// ---------- SAMPLE DATA ----------
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
    <div className="nb-page">
      {/* Hero */}
      <section className="nb-hero">
        <div className="nb-hero__inner">
          <h1 className="nb-hero__title">Explore Bay Area Neighborhoods</h1>
          <p className="nb-hero__subtitle">
            Compare schools, walkability, and pricing. Find the pocket that fits your lifestyle.
          </p>
          <div className="nb-hero__search">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, city, or vibe (e.g., 'walkable', 'nightlife')"
              className="nb-search__input"
            />
            <div className="nb-toggle">
              <button
                aria-pressed={mode === "buy"}
                onClick={() => setMode("buy")}
                className={`nb-toggle__btn ${mode === "buy" ? "nb-toggle__btn--active" : ""}`}
              >
                Buy
              </button>
              <button
                aria-pressed={mode === "rent"}
                onClick={() => setMode("rent")}
                className={`nb-toggle__btn ${mode === "rent" ? "nb-toggle__btn--active" : ""}`}
              >
                Rent
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="nb-filters-wrap">
        <div className="nb-filters">
          <label className="nb-filter">
            <span className="nb-label">City</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} className="nb-select">
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <div className="nb-price">
            <span className="nb-label">{mode === "buy" ? "Home Price ($)" : "Monthly Rent ($)"}</span>
            <div className="nb-price__inputs">
              <input
                type="number"
                min={0}
                step={mode === "buy" ? 50000 : 100}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value || 0))}
                placeholder="Min"
                className="nb-number"
              />
              <span className="nb-price__dash">—</span>
              <input
                type="number"
                min={0}
                step={mode === "buy" ? 50000 : 100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value || 0))}
                placeholder="Max"
                className="nb-number"
              />
            </div>
          </div>

          <label className="nb-filter">
            <span className="nb-label">Min School Rating</span>
            <select value={minSchool} onChange={(e) => setMinSchool(Number(e.target.value))} className="nb-select">
              {[0, 6, 7, 8, 9].map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? "Any" : `${n}+`}
                </option>
              ))}
            </select>
          </label>

          <label className="nb-filter">
            <span className="nb-label">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="nb-select">
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="school-desc">Schools: High → Low</option>
            </select>
          </label>
        </div>
      </section>

      {/* Results */}
      <section className="nb-results-wrap">
        <div className="nb-results__header">
          <h2 className="nb-results__title">{filtered.length} Neighborhood{filtered.length !== 1 ? "s" : ""}</h2>
          <button
            onClick={() => {
              setQ("");
              setCity("All");
              setMinPrice(0);
              setMaxPrice(99999999);
              setMinSchool(0);
              setSort("relevance");
            }}
            className="nb-btn nb-btn--clear"
          >
            Clear filters
          </button>
        </div>

        <div className="nb-grid">
          {filtered.map((n) => (
            <article key={n.id} className="nb-card">
              <div className="nb-card__image-wrap">
                <img src={n.image} alt={`${n.name} in ${n.city}`} className="nb-card__image" />
              </div>
              <div className="nb-card__body">
                <header className="nb-card__header">
                  <h3 className="nb-card__title">{n.name}</h3>
                  <div className="nb-card__sub">{n.city}</div>
                </header>
                <p className="nb-card__desc">{n.description}</p>

                {/* Chips */}
                {n.highlights?.length ? (
                  <div className="nb-chips">
                    {n.highlights.map((h) => (
                      <span key={h} className="nb-chip">
                        {h}
                      </span>
                    ))}
                  </div>
                ) : null}

                {/* Stats */}
                <ul className="nb-stats">
                  <li>
                    <span className="nb-stat__label">{mode === "buy" ? "Median Home" : "Median Rent"}</span>
                    <span className="nb-stat__value">
                      {mode === "buy" ? currency(n.medianHomePrice) : currency(n.medianRent)}
                    </span>
                  </li>
                  <li>
                    <span className="nb-stat__label">Schools</span>
                    <span className="nb-stat__value">{n.schoolRating ?? "—"}</span>
                  </li>
                  <li>
                    <span className="nb-stat__label">Walk / Transit</span>
                    <span className="nb-stat__value">
                      {n.walkScore ?? "—"} / {n.transitScore ?? "—"}
                    </span>
                  </li>
                </ul>

                {/* CTAs */}
                <div className="nb-ctas">
                  <button
                    className="nb-btn nb-btn--primary"
                    onClick={() =>
                      navigate(
                        `/rent?city=${encodeURIComponent(n.city)}&neighborhood=${encodeURIComponent(n.name)}`
                      )
                    }
                  >
                    View Listings
                  </button>
                  <a
                    href={toMapsUrl(n.name, n.city)}
                    target="_blank"
                    rel="noreferrer"
                    className="nb-btn nb-btn--ghost"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Lead-in */}
      <section className="nb-banner">
        <div className="nb-banner__inner">
          <h3>Not sure where to start?</h3>
          <p>
            Tell us your commute, budget, and must‑haves. We will recommend 3 neighborhoods tailored to you.
          </p>
          <button className="nb-btn nb-btn--primary" onClick={() => navigate("/contact")}>
            Get a custom shortlist
          </button>
        </div>
      </section>
    </div>
  );
}
