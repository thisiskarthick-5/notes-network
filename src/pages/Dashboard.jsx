import { useState } from "react";

/* ── Mock Data ─────────────────────────────────────────────────── */
const NOTES = [
  { id:1, title:"Calculus III – Surface Integrals", subject:"Mathematics", author:"Jane D.", avatar:"J", time:"2h ago", views:142, saves:34, tags:["Calc","Integration"], hot:true },
  { id:2, title:"Organic Chemistry Reaction Mechanisms", subject:"Chemistry", author:"Ravi K.", avatar:"R", time:"5h ago", views:98, saves:21, tags:["Orgo","Reactions"], hot:false },
  { id:3, title:"Macro Economics – Fiscal Policy Notes", subject:"Economics", author:"Sara M.", avatar:"S", time:"Yesterday", views:210, saves:67, tags:["Macro","Policy"], hot:true },
  { id:4, title:"Data Structures – AVL Trees Explained", subject:"Computer Science", author:"Leo T.", avatar:"L", time:"2d ago", views:305, saves:89, tags:["DSA","Trees"], hot:false },
  { id:5, title:"World History – Cold War Summary", subject:"History", author:"Priya N.", avatar:"P", time:"3d ago", views:77, saves:18, tags:["History","ColdWar"], hot:false },
  { id:6, title:"Linear Algebra – Eigenvalues Guide", subject:"Mathematics", author:"Chen W.", avatar:"C", time:"4d ago", views:189, saves:54, tags:["LinAlg","Eigen"], hot:true },
];

const TRENDING = [
  { rank:1, title:"Thermodynamics – 2nd Law", subject:"Physics", saves:203 },
  { rank:2, title:"Shakespeare's Tragedies", subject:"Literature", saves:167 },
  { rank:3, title:"Neural Networks Basics", subject:"CS / AI", saves:154 },
  { rank:4, title:"Keynesian Economics", subject:"Economics", saves:121 },
  { rank:5, title:"Cell Biology Revision", subject:"Biology", saves:98 },
];

const ACTIVITY = [
  { icon:"📥", text:"Ravi K. saved your Calculus note", time:"10 min ago", accent:"#ff6b35" },
  { icon:"💬", text:"New comment on Organic Chem post", time:"42 min ago", accent:"#0f3460" },
  { icon:"👥", text:"Sara M. started following you", time:"2h ago", accent:"#22c55e" },
  { icon:"⭐", text:"Your Data Structures note hit 300 views", time:"5h ago", accent:"#f59e0b" },
  { icon:"📤", text:"You shared Linear Algebra – Eigenvalues", time:"4d ago", accent:"#94a3b8" },
];

const SUBJECTS = ["All","Mathematics","Computer Science","Chemistry","Economics","Physics","History","Literature"];

const STATS = [
  { label:"Notes Saved", value:"24", delta:"+3 this week", icon:"📚" },
  { label:"Your Notes", value:"7", delta:"+1 this week", icon:"✍️" },
  { label:"Followers", value:"138", delta:"+12 this week", icon:"👥" },
  { label:"Total Views", value:"1.4K", delta:"+230 this week", icon:"👁️" },
];

/* ── NAV items ─────────────────────────────────────────────────── */
const NAV = [
  { icon:"⌂", label:"Home", id:"home" },
  { icon:"🔍", label:"Explore", id:"explore" },
  { icon:"📚", label:"My Notes", id:"mynotes" },
  { icon:"🔖", label:"Saved", id:"saved" },
  { icon:"👥", label:"Community", id:"community" },
  { icon:"⚙️", label:"Settings", id:"settings" },
];

/* ── Main Dashboard ─────────────────────────────────────────────── */
export default function Dashboard({ user = { name: "Jane Doe", role: "student", institution: "MIT" } }) {
  const [activeNav, setActiveNav] = useState("home");
  const [activeSub, setActiveSub] = useState("All");
  const [search, setSearch] = useState("");
  const [savedNotes, setSavedNotes] = useState(new Set([3,4]));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredNotes = NOTES.filter(n => {
    const matchesSub = activeSub === "All" || n.subject === activeSub;
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase());
    return matchesSub && matchesSearch;
  });

  const toggleSave = (id) => {
    setSavedNotes(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{ ...s.sidebar, width: sidebarOpen ? 240 : 72 }}>
        {/* Brand */}
        <div style={s.sidebarBrand}>
          <div style={s.brandMark}>N</div>
          {sidebarOpen && <span style={s.brandWord}>NoteNest</span>}
        </div>

        {/* Nav */}
        <nav style={s.nav}>
          {NAV.map(item => (
            <button
              key={item.id}
              style={{
                ...s.navItem,
                ...(activeNav === item.id ? s.navItemActive : {}),
                justifyContent: sidebarOpen ? "flex-start" : "center",
              }}
              className="nav-hover"
              onClick={() => setActiveNav(item.id)}
              title={!sidebarOpen ? item.label : ""}
            >
              <span style={s.navIcon}>{item.icon}</span>
              {sidebarOpen && <span style={s.navLabel}>{item.label}</span>}
              {activeNav === item.id && <div style={s.navActivePip} />}
            </button>
          ))}
        </nav>

        {/* User pill */}
        <div style={{ ...s.userPill, justifyContent: sidebarOpen ? "flex-start" : "center" }}>
          <div style={s.avatarSmall}>{user.name[0]}</div>
          {sidebarOpen && (
            <div style={s.userMeta}>
              <div style={s.userName}>{user.name}</div>
              <div style={s.userRole}>{user.role} · {user.institution}</div>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          style={s.collapseBtn}
          onClick={() => setSidebarOpen(p => !p)}
          title="Toggle sidebar"
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>
      </aside>

      {/* ── MAIN ── */}
      <main style={s.main}>

        {/* Top Bar */}
        <header style={s.topBar}>
          <div style={s.topLeft}>
            <div style={s.greeting}>
              <span style={s.greetingWave}>👋</span>
              <span style={s.greetingText}>Good morning, <strong>{user.name.split(" ")[0]}</strong></span>
            </div>
          </div>
          <div style={s.searchWrap}>
            <span style={s.searchIcon}>🔍</span>
            <input
              style={s.searchInput}
              placeholder="Search notes, subjects, people…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={s.topRight}>
            <button style={s.notifBtn} className="icon-btn">🔔<span style={s.notifDot}/></button>
            <button style={s.uploadBtn} className="upload-hover">+ Upload Note</button>
          </div>
        </header>

        {/* Scrollable content */}
        <div style={s.content}>

          {/* Stats Row */}
          <div style={s.statsRow}>
            {STATS.map(stat => (
              <div key={stat.label} style={s.statCard} className="stat-card">
                <div style={s.statIcon}>{stat.icon}</div>
                <div style={s.statVal}>{stat.value}</div>
                <div style={s.statLabel}>{stat.label}</div>
                <div style={s.statDelta}>{stat.delta}</div>
              </div>
            ))}
          </div>

          {/* Body grid */}
          <div style={s.bodyGrid}>

            {/* ── LEFT: Feed ── */}
            <div style={s.feedCol}>

              {/* Subject filter */}
              <div style={s.sectionHeader}>
                <h2 style={s.sectionTitle}>📖 Discover Notes</h2>
              </div>
              <div style={s.subjectRow}>
                {SUBJECTS.map(sub => (
                  <button
                    key={sub}
                    style={{
                      ...s.subChip,
                      ...(activeSub === sub ? s.subChipActive : {}),
                    }}
                    onClick={() => setActiveSub(sub)}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              {/* Note cards */}
              <div style={s.noteList}>
                {filteredNotes.length === 0 ? (
                  <div style={s.emptyState}>
                    <div style={{ fontSize: 40 }}>🗒️</div>
                    <p>No notes found. Try a different filter.</p>
                  </div>
                ) : filteredNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    saved={savedNotes.has(note.id)}
                    onToggleSave={() => toggleSave(note.id)}
                  />
                ))}
              </div>
            </div>

            {/* ── RIGHT: Sidebar panels ── */}
            <div style={s.rightCol}>

              {/* Trending */}
              <div style={s.panel}>
                <div style={s.panelHeader}>
                  <span style={s.panelTitle}>🔥 Trending This Week</span>
                </div>
                <div style={s.trendList}>
                  {TRENDING.map(t => (
                    <div key={t.rank} style={s.trendRow} className="trend-hover">
                      <div style={{ ...s.trendRank, color: t.rank <= 3 ? "#ff6b35" : "#94a3b8" }}>
                        {t.rank <= 3 ? ["🥇","🥈","🥉"][t.rank-1] : `#${t.rank}`}
                      </div>
                      <div style={s.trendInfo}>
                        <div style={s.trendTitle}>{t.title}</div>
                        <div style={s.trendSub}>{t.subject} · {t.saves} saves</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div style={s.panel}>
                <div style={s.panelHeader}>
                  <span style={s.panelTitle}>⚡ Recent Activity</span>
                </div>
                <div style={s.activityList}>
                  {ACTIVITY.map((a, i) => (
                    <div key={i} style={s.activityRow}>
                      <div style={{ ...s.activityDot, background: a.accent }} />
                      <div style={s.activityBody}>
                        <div style={s.activityText}>{a.text}</div>
                        <div style={s.activityTime}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Upload CTA */}
              <div style={s.ctaPanel}>
                <div style={s.ctaPanelEmoji}>✍️</div>
                <div style={s.ctaPanelTitle}>Share Your Notes</div>
                <div style={s.ctaPanelSub}>Help your peers by uploading your study materials.</div>
                <button style={s.ctaPanelBtn} className="upload-hover">Upload a Note →</button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Note Card ──────────────────────────────────────────────────── */
function NoteCard({ note, saved, onToggleSave }) {
  return (
    <div style={s.noteCard} className="note-card">
      {note.hot && <div style={s.hotBadge}>🔥 Hot</div>}
      <div style={s.noteTop}>
        <div style={s.noteAvatar}>{note.avatar}</div>
        <div style={s.noteMeta}>
          <div style={s.noteAuthor}>{note.author}</div>
          <div style={s.noteTime}>{note.subject} · {note.time}</div>
        </div>
        <button
          style={{ ...s.saveBtn, color: saved ? "#ff6b35" : "#cbd5e1" }}
          className="icon-btn"
          onClick={onToggleSave}
          title={saved ? "Unsave" : "Save"}
        >
          {saved ? "🔖" : "🏷️"}
        </button>
      </div>
      <div style={s.noteTitle}>{note.title}</div>
      <div style={s.noteTags}>
        {note.tags.map(t => <span key={t} style={s.noteTag}>{t}</span>)}
      </div>
      <div style={s.noteFooter}>
        <span style={s.noteStat}>👁️ {note.views}</span>
        <span style={s.noteStat}>🔖 {note.saves}</span>
        <button style={s.viewBtn} className="view-hover">View Note →</button>
      </div>
    </div>
  );
}

/* ── Styles ─────────────────────────────────────────────────────── */
const s = {
  root: {
    display: "flex", width: "100vw", height: "100vh",
    fontFamily: "'Georgia', serif", background: "#f0f4fa",
    overflow: "hidden",
  },

  /* Sidebar */
  sidebar: {
    background: "linear-gradient(180deg,#1a1a2e 0%,#0f3460 100%)",
    height: "100vh", flexShrink: 0,
    display: "flex", flexDirection: "column",
    padding: "28px 0 20px",
    transition: "width 0.3s cubic-bezier(0.22,1,0.36,1)",
    position: "relative", zIndex: 10,
    boxShadow: "4px 0 24px rgba(0,0,0,0.18)",
    overflow: "hidden",
  },
  sidebarBrand: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "0 20px 32px",
    whiteSpace: "nowrap",
  },
  brandMark: {
    width: 38, height: 38, borderRadius: 11,
    background: "linear-gradient(135deg,#ff6b35,#f7431a)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 900, fontSize: 18, flexShrink: 0,
    boxShadow: "0 4px 14px rgba(255,107,53,0.4)",
  },
  brandWord: { fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" },

  nav: { flex: 1, display: "flex", flexDirection: "column", gap: 2, padding: "0 12px" },
  navItem: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "11px 12px", borderRadius: 12,
    background: "transparent", border: "none",
    color: "rgba(255,255,255,0.5)", cursor: "pointer",
    fontFamily: "inherit", fontSize: 14, fontWeight: 600,
    transition: "all 0.2s", position: "relative",
    whiteSpace: "nowrap",
  },
  navItemActive: {
    background: "rgba(255,107,53,0.15)",
    color: "#ff6b35",
  },
  navIcon: { fontSize: 16, flexShrink: 0, width: 20, textAlign: "center" },
  navLabel: {},
  navActivePip: {
    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
    width: 6, height: 6, borderRadius: "50%", background: "#ff6b35",
  },

  userPill: {
    display: "flex", alignItems: "center", gap: 10,
    margin: "20px 12px 12px", padding: "12px",
    background: "rgba(255,255,255,0.06)", borderRadius: 12,
    overflow: "hidden",
  },
  avatarSmall: {
    width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
    background: "linear-gradient(135deg,#ff6b35,#0f3460)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 900, fontSize: 14,
  },
  userMeta: { minWidth: 0 },
  userName: { fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  userRole: { fontSize: 10, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap", textTransform: "capitalize" },

  collapseBtn: {
    background: "transparent", border: "none",
    color: "rgba(255,255,255,0.3)", fontSize: 11,
    cursor: "pointer", fontFamily: "inherit",
    padding: "8px", alignSelf: "center",
    transition: "color 0.2s",
  },

  /* Main */
  main: {
    flex: 1, display: "flex", flexDirection: "column",
    overflow: "hidden", minWidth: 0,
  },

  topBar: {
    display: "flex", alignItems: "center", gap: 16,
    padding: "20px 32px",
    background: "#fff",
    borderBottom: "1px solid #e8edf5",
    flexShrink: 0,
  },
  topLeft: { display: "flex", alignItems: "center" },
  greeting: { display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" },
  greetingWave: { fontSize: 20 },
  greetingText: { fontSize: 15, color: "#64748b", fontWeight: 400 },

  searchWrap: {
    flex: 1, display: "flex", alignItems: "center",
    gap: 10, background: "#f8faff",
    border: "1.5px solid #e2e8f0", borderRadius: 12,
    padding: "10px 16px", maxWidth: 480,
  },
  searchIcon: { fontSize: 14, opacity: 0.5, flexShrink: 0 },
  searchInput: {
    flex: 1, background: "transparent", border: "none",
    outline: "none", fontSize: 14, color: "#1a1a2e",
    fontFamily: "'Georgia',serif",
  },

  topRight: { display: "flex", alignItems: "center", gap: 10 },
  notifBtn: {
    position: "relative", background: "#f8faff",
    border: "1.5px solid #e2e8f0", borderRadius: 10,
    width: 38, height: 38, display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", fontSize: 16,
  },
  notifDot: {
    position: "absolute", top: 7, right: 7,
    width: 7, height: 7, borderRadius: "50%",
    background: "#ff6b35", border: "1.5px solid #fff",
  },
  uploadBtn: {
    padding: "9px 18px",
    background: "linear-gradient(90deg,#ff6b35,#f7431a)",
    border: "none", borderRadius: 10, color: "#fff",
    fontSize: 13, fontWeight: 800, cursor: "pointer",
    fontFamily: "inherit", whiteSpace: "nowrap",
    boxShadow: "0 4px 14px rgba(247,67,26,0.3)",
    transition: "all 0.2s",
  },

  content: {
    flex: 1, overflowY: "auto",
    padding: "28px 32px",
  },

  /* Stats */
  statsRow: {
    display: "grid", gridTemplateColumns: "repeat(4,1fr)",
    gap: 16, marginBottom: 28,
  },
  statCard: {
    background: "#fff", borderRadius: 16,
    padding: "20px 22px",
    border: "1px solid #e8edf5",
    transition: "all 0.22s",
    cursor: "default",
  },
  statIcon: { fontSize: 22, marginBottom: 10 },
  statVal: { fontSize: 28, fontWeight: 900, color: "#1a1a2e", letterSpacing: "-1px", lineHeight: 1 },
  statLabel: { fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.7px", marginTop: 4 },
  statDelta: { fontSize: 11, color: "#22c55e", fontWeight: 700, marginTop: 6 },

  /* Body grid */
  bodyGrid: {
    display: "grid", gridTemplateColumns: "1fr 300px",
    gap: 24, alignItems: "start",
  },

  feedCol: {},
  sectionHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.3px" },

  subjectRow: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  subChip: {
    padding: "7px 14px", background: "#fff",
    border: "1.5px solid #e2e8f0", borderRadius: 99,
    fontSize: 12, fontWeight: 700, color: "#64748b",
    cursor: "pointer", fontFamily: "inherit",
    transition: "all 0.18s",
  },
  subChipActive: {
    background: "#fff5f0", border: "1.5px solid #ff6b35",
    color: "#ff6b35", boxShadow: "0 2px 8px rgba(255,107,53,0.15)",
  },

  noteList: { display: "flex", flexDirection: "column", gap: 14 },
  emptyState: {
    textAlign: "center", padding: "50px 0",
    color: "#94a3b8", fontSize: 15,
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: 10,
  },

  /* Note card */
  noteCard: {
    background: "#fff", borderRadius: 16,
    border: "1px solid #e8edf5",
    padding: "18px 20px",
    position: "relative",
    transition: "all 0.22s",
    cursor: "default",
  },
  hotBadge: {
    position: "absolute", top: 14, right: 44,
    fontSize: 10, fontWeight: 800,
    background: "linear-gradient(90deg,#ff6b35,#f7431a)",
    color: "#fff", padding: "3px 8px", borderRadius: 99,
    letterSpacing: "0.5px",
  },
  noteTop: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 },
  noteAvatar: {
    width: 32, height: 32, borderRadius: "50%",
    background: "linear-gradient(135deg,#0f3460,#1a1a2e)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 900, fontSize: 13, flexShrink: 0,
  },
  noteMeta: { flex: 1, minWidth: 0 },
  noteAuthor: { fontSize: 13, fontWeight: 700, color: "#1a1a2e" },
  noteTime: { fontSize: 11, color: "#94a3b8" },
  saveBtn: {
    background: "transparent", border: "none",
    fontSize: 16, cursor: "pointer", padding: 0,
    transition: "transform 0.15s",
  },
  noteTitle: {
    fontSize: 15, fontWeight: 800, color: "#1a1a2e",
    letterSpacing: "-0.3px", marginBottom: 10, lineHeight: 1.4,
  },
  noteTags: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 },
  noteTag: {
    padding: "3px 9px", background: "#f0f4fa",
    borderRadius: 99, fontSize: 11, fontWeight: 700,
    color: "#64748b", border: "1px solid #e2e8f0",
  },
  noteFooter: { display: "flex", alignItems: "center", gap: 14 },
  noteStat: { fontSize: 12, color: "#94a3b8", fontWeight: 600 },
  viewBtn: {
    marginLeft: "auto", background: "transparent",
    border: "1.5px solid #e2e8f0", borderRadius: 8,
    padding: "6px 14px", fontSize: 12, fontWeight: 700,
    color: "#0f3460", cursor: "pointer", fontFamily: "inherit",
    transition: "all 0.18s",
  },

  /* Right col */
  rightCol: { display: "flex", flexDirection: "column", gap: 18 },
  panel: {
    background: "#fff", borderRadius: 16,
    border: "1px solid #e8edf5", overflow: "hidden",
  },
  panelHeader: {
    padding: "16px 18px 12px",
    borderBottom: "1px solid #f1f5f9",
  },
  panelTitle: { fontSize: 14, fontWeight: 800, color: "#1a1a2e" },

  trendList: { padding: "8px 0" },
  trendRow: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "10px 18px", cursor: "pointer",
    transition: "background 0.15s",
  },
  trendRank: { fontSize: 14, fontWeight: 800, width: 28, flexShrink: 0, textAlign: "center" },
  trendInfo: { minWidth: 0 },
  trendTitle: { fontSize: 13, fontWeight: 700, color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  trendSub: { fontSize: 11, color: "#94a3b8" },

  activityList: { padding: "8px 0" },
  activityRow: {
    display: "flex", alignItems: "flex-start", gap: 12,
    padding: "10px 18px",
  },
  activityDot: {
    width: 8, height: 8, borderRadius: "50%",
    flexShrink: 0, marginTop: 4,
  },
  activityBody: { minWidth: 0 },
  activityText: { fontSize: 12, fontWeight: 600, color: "#374151", lineHeight: 1.4 },
  activityTime: { fontSize: 10, color: "#94a3b8", marginTop: 2 },

  ctaPanel: {
    background: "linear-gradient(135deg,#1a1a2e 0%,#0f3460 100%)",
    borderRadius: 16, padding: "22px 18px",
    textAlign: "center",
  },
  ctaPanelEmoji: { fontSize: 28, marginBottom: 10 },
  ctaPanelTitle: { fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 },
  ctaPanelSub: { fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 16 },
  ctaPanelBtn: {
    width: "100%", padding: "10px",
    background: "linear-gradient(90deg,#ff6b35,#f7431a)",
    border: "none", borderRadius: 10, color: "#fff",
    fontSize: 13, fontWeight: 800, cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 14px rgba(247,67,26,0.35)",
    transition: "all 0.2s",
  },
};

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::placeholder { color: #b0b8cc !important; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }

  .nav-hover:hover {
    background: rgba(255,255,255,0.07) !important;
    color: rgba(255,255,255,0.85) !important;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    border-color: #ff6b35 !important;
  }

  .note-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.08);
    border-color: #e0e7ff !important;
  }

  .icon-btn:hover { transform: scale(1.15) !important; }

  .upload-hover:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(247,67,26,0.45) !important;
  }

  .view-hover:hover {
    background: #0f3460 !important;
    border-color: #0f3460 !important;
    color: #fff !important;
  }

  .trend-hover:hover { background: #f8faff !important; }
`;