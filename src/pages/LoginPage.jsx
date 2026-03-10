import { useState, useEffect } from "react";

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  dur: Math.random() * 6 + 5,
}));

const STICKY_NOTES = [
  { text: "Meeting notes...", rotate: -8,  top: "18%", delay: "0s",   color: "#fff9c4" },
  { text: "Ideas 💡",         rotate:  6,  top: "36%", delay: "0.6s", color: "#c8f7c5" },
  { text: "Lecture recap",    rotate: -4,  top: "56%", delay: "1.2s", color: "#d4eaff" },
  { text: "Quotes ✨",        rotate:  9,  top: "74%", delay: "0.3s", color: "#e8d5ff" },
];

export default function LoginPage({ onLoginSuccess, onSignupSuccess }) {
  const [mode, setMode]         = useState("login");
  const [form, setForm]         = useState({ name: "", email: "", password: "" });
  const [focused, setFocused]   = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const isLogin = mode === "login";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const switchMode = (m) => {
    setMode(m);
    setError("");
    setForm({ name: "", email: "", password: "" });
  };

  const handleSubmit = () => {
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isLogin) onLoginSuccess?.();
      else onSignupSuccess?.();
    }, 1600);
  };

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* Animated particles */}
      <div style={s.particleLayer}>
        {PARTICLES.map(p => (
          <div key={p.id} className="particle" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }} />
        ))}
      </div>

      {/* Ambient orbs */}
      <div style={s.orb1} /><div style={s.orb2} /><div style={s.orb3} />

      {/* Subtle grid */}
      <div style={s.grid} />

      {/* ── LEFT DARK PANEL ── */}
      <div className={`panel-l ${isLogin ? "pl-login" : "pl-signup"}`}>
        {STICKY_NOTES.map((n, i) => (
          <div key={i} className="sticky" style={{
            top: n.top, background: n.color,
            animationDelay: n.delay,
            transform: `rotate(${n.rotate}deg)`,
          }}>{n.text}</div>
        ))}

        <div style={s.leftInner}>
          {/* Brand */}
          <div style={s.brand}>
            <div style={s.brandMark}>N</div>
            <span style={s.brandWord}>NoteNest</span>
          </div>

          {/* Hero */}
          <div className="fade-swap" key={mode + "hero"}>
            <div style={s.eyebrow}>{isLogin ? "YOUR KNOWLEDGE HUB" : "START YOUR JOURNEY"}</div>
            <h1 style={s.heroTitle}>
              {isLogin ? <>Share your<br /><span style={s.accent}>notes</span> with<br />the world.</> 
                       : <>Join the<br /><span style={s.accent}>community</span><br />today.</>}
            </h1>
            <p style={s.heroSub}>
              {isLogin
                ? "Organize, discover, and share notes\nwith your community."
                : "Create an account and unlock\na world of shared knowledge."}
            </p>
          </div>

          {/* Stats */}
          <div style={s.statsRow}>
            {[["12K+","Notes"],["4.8K","Users"],["98%","Happy"]].map(([v,l]) => (
              <div key={l} style={s.stat}>
                <span style={s.statVal}>{v}</span>
                <span style={s.statLbl}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT WHITE PANEL ── */}
      <div className={`panel-r ${isLogin ? "pr-login" : "pr-signup"}`}>

        {/* Top nav */}
        <div style={s.topNav}>
          <div style={s.topBrand}>
            <div style={s.topMark}>N</div>
            <span style={s.topWord}>NoteNest</span>
          </div>
          <button style={s.topBtn} className="top-btn-hover"
            onClick={() => switchMode(isLogin ? "signup" : "login")}>
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>

        {/* Form */}
        <div style={s.formBox}>
          <div className="fade-swap" key={mode + "hd"}>
            <div style={s.formEyebrow}>{isLogin ? "WELCOME BACK" : "GET STARTED"}</div>
            <h2 style={s.formTitle}>{isLogin ? "Sign in to your account" : "Create your account"}</h2>
            <p style={s.formSub}>
              {isLogin ? "Enter your credentials to continue."
                       : "Join thousands of note-sharing students & staff."}
            </p>
          </div>

          {error && (
            <div style={s.errBox}>
              <span style={s.errDot} />
              {error}
            </div>
          )}

          <div className="fade-swap" key={mode + "fields"} style={{ marginTop: 26 }}>
            {!isLogin && (
              <InputField name="name" type="text" placeholder="Full Name" icon="👤"
                value={form.name} onChange={handleChange}
                focused={focused} setFocused={setFocused} />
            )}
            <InputField name="email" type="email" placeholder="Email address" icon="✉️"
              value={form.email} onChange={handleChange}
              focused={focused} setFocused={setFocused} />
            <div style={{ position: "relative" }}>
              <InputField name="password" type={showPass ? "text" : "password"}
                placeholder="Password" icon="🔒"
                value={form.password} onChange={handleChange}
                focused={focused} setFocused={setFocused} extraRight />
              <button style={s.eyeBtn} onClick={() => setShowPass(v => !v)}>
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {isLogin && (
            <div style={s.forgotRow}>
              <span style={s.forgotLink}>Forgot password?</span>
            </div>
          )}

          <button
            style={{ ...s.submitBtn, ...(loading ? s.submitDisabled : {}) }}
            className="submit-hover" onClick={handleSubmit} disabled={loading}
          >
            {loading ? (
              <span style={s.loadRow}><span className="ring" />{isLogin ? "Signing in..." : "Creating..."}</span>
            ) : (
              <span style={s.btnRow}>{isLogin ? "Sign In" : "Create Account"} <span style={s.btnArrow}>→</span></span>
            )}
          </button>

          <div style={s.orRow}>
            <div style={s.orLine} /><span style={s.orTxt}>or continue with</span><div style={s.orLine} />
          </div>

          <div style={s.socialRow}>
            <button style={s.socialBtn} className="social-hover">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Google
            </button>
            <button style={s.socialBtn} className="social-hover">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1a1a2e">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          <p style={s.switchTxt}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span style={s.switchLink} onClick={() => switchMode(isLogin ? "signup" : "login")}>
              {isLogin ? "Sign up free →" : "Sign in →"}
            </span>
          </p>
        </div>

        <div style={s.footer}>
          <span>© 2025 NoteNest Inc.</span>
          <div style={{ display:"flex", gap:20 }}>
            {["Privacy","Terms","Contact"].map(t => (
              <span key={t} style={s.footerLink}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable input field ──────────────────────────────────────── */
function InputField({ name, type, placeholder, icon, value, onChange, focused, setFocused, extraRight }) {
  const active = focused === name;
  return (
    <div style={{ position: "relative", marginBottom: 13 }}>
      <span style={inp.icon}>{icon}</span>
      <input
        name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange}
        onFocus={() => setFocused(name)} onBlur={() => setFocused("")}
        style={{
          ...inp.base,
          ...(active ? inp.active : {}),
          paddingRight: extraRight ? 68 : 16,
        }}
      />
      {active && <span style={inp.bar} />}
    </div>
  );
}
const inp = {
  icon: {
    position:"absolute", left:14, top:"50%",
    transform:"translateY(-50%)", fontSize:15,
    pointerEvents:"none", zIndex:2,
  },
  base: {
    width:"100%", padding:"14px 16px 14px 44px",
    background:"#f5f7ff", border:"1.5px solid #eaecf5",
    borderRadius:14, fontSize:15, color:"#1a1a2e",
    outline:"none", boxSizing:"border-box",
    fontFamily:"'Georgia',serif",
    transition:"border 0.25s, background 0.25s, box-shadow 0.25s",
  },
  active: {
    background:"#fff", border:"1.5px solid #0f3460",
    boxShadow:"0 0 0 4px rgba(15,52,96,0.07)",
  },
  bar: {
    position:"absolute", bottom:0, left:"8%", right:"8%",
    height:2,
    background:"linear-gradient(90deg,#ff6b35,#f7431a)",
    borderRadius:99, animation:"barSlide 0.3s ease",
  },
};

/* ── Styles ───────────────────────────────────────────────────── */
const s = {
  root:{
    display:"flex", width:"100vw", height:"100vh",
    fontFamily:"'Georgia',serif", overflow:"hidden",
    background:"#0d1117", position:"relative",
  },
  particleLayer:{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 },
  orb1:{
    position:"fixed", width:600, height:600, borderRadius:"50%",
    background:"radial-gradient(circle,rgba(255,107,53,0.13) 0%,transparent 65%)",
    top:-150, left:-100, pointerEvents:"none", zIndex:0,
  },
  orb2:{
    position:"fixed", width:500, height:500, borderRadius:"50%",
    background:"radial-gradient(circle,rgba(15,52,96,0.4) 0%,transparent 65%)",
    bottom:-100, right:-80, pointerEvents:"none", zIndex:0,
  },
  orb3:{
    position:"fixed", width:300, height:300, borderRadius:"50%",
    background:"radial-gradient(circle,rgba(255,107,53,0.07) 0%,transparent 70%)",
    top:"40%", left:"25%", pointerEvents:"none", zIndex:0,
  },
  grid:{
    position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
    backgroundImage:"linear-gradient(rgba(255,255,255,0.023) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.023) 1px,transparent 1px)",
    backgroundSize:"60px 60px",
  },
  leftInner:{
    padding:"52px 48px", width:"100%", position:"relative", zIndex:3,
    display:"flex", flexDirection:"column", height:"100%", justifyContent:"center",
  },
  brand:{ display:"flex", alignItems:"center", gap:12, marginBottom:60 },
  brandMark:{
    width:42, height:42, borderRadius:13,
    background:"linear-gradient(135deg,#ff6b35,#f7431a)",
    display:"flex", alignItems:"center", justifyContent:"center",
    color:"#fff", fontWeight:900, fontSize:22,
    boxShadow:"0 4px 18px rgba(255,107,53,0.45)",
  },
  brandWord:{ fontSize:22, fontWeight:800, color:"#fff", letterSpacing:"-0.5px" },
  eyebrow:{ fontSize:10, fontWeight:800, letterSpacing:"3px", color:"#ff6b35", marginBottom:16 },
  heroTitle:{
    fontSize:"clamp(34px,3.8vw,56px)", fontWeight:900,
    color:"#fff", lineHeight:1.1, marginBottom:18, letterSpacing:"-1.5px",
  },
  accent:{
    background:"linear-gradient(90deg,#ff6b35,#ffab76)",
    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
  },
  heroSub:{ fontSize:15, color:"rgba(255,255,255,0.42)", lineHeight:1.75, marginBottom:52, whiteSpace:"pre-line" },
  statsRow:{ display:"flex", gap:32, borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:28 },
  stat:{ display:"flex", flexDirection:"column", gap:3 },
  statVal:{ fontSize:22, fontWeight:900, color:"#fff", letterSpacing:"-0.5px" },
  statLbl:{ fontSize:10, color:"rgba(255,255,255,0.32)", fontWeight:700, letterSpacing:"1.5px" },

  topNav:{
    display:"flex", alignItems:"center",
    justifyContent:"space-between", padding:"28px 48px 0",
  },
  topBrand:{ display:"flex", alignItems:"center", gap:10 },
  topMark:{
    width:34, height:34, borderRadius:10,
    background:"linear-gradient(135deg,#ff6b35,#f7431a)",
    display:"flex", alignItems:"center", justifyContent:"center",
    color:"#fff", fontWeight:900, fontSize:16,
  },
  topWord:{ fontSize:17, fontWeight:800, color:"#1a1a2e", letterSpacing:"-0.3px" },
  topBtn:{
    padding:"9px 24px", background:"transparent",
    border:"1.5px solid #1a1a2e", borderRadius:99,
    fontSize:13, fontWeight:700, color:"#1a1a2e",
    cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s",
  },
  formBox:{
    flex:1, display:"flex", flexDirection:"column",
    justifyContent:"center", padding:"0 48px",
    maxWidth:460, width:"100%", margin:"0 auto",
  },
  formEyebrow:{ fontSize:10, fontWeight:800, letterSpacing:"3px", color:"#ff6b35", marginBottom:10 },
  formTitle:{ fontSize:29, fontWeight:900, color:"#1a1a2e", letterSpacing:"-0.8px", marginBottom:6, lineHeight:1.2 },
  formSub:{ fontSize:14, color:"#8a92a6", lineHeight:1.65 },
  errBox:{
    display:"flex", alignItems:"center", gap:8,
    background:"#fff0f0", border:"1px solid #ffd0cc",
    color:"#c0392b", borderRadius:10,
    padding:"11px 16px", fontSize:13,
    marginTop:16, fontWeight:500,
  },
  errDot:{
    width:7, height:7, borderRadius:"50%",
    background:"#e74c3c", flexShrink:0, display:"inline-block",
  },
  eyeBtn:{
    position:"absolute", right:14, top:"50%",
    transform:"translateY(-50%)", background:"transparent",
    border:"none", fontSize:12, color:"#8a92a6",
    cursor:"pointer", fontWeight:700, fontFamily:"inherit",
  },
  forgotRow:{ textAlign:"right", marginBottom:4, marginTop:-4 },
  forgotLink:{ fontSize:13, color:"#ff6b35", cursor:"pointer", fontWeight:700 },
  submitBtn:{
    width:"100%", padding:"15px",
    background:"linear-gradient(90deg,#ff6b35 0%,#f7431a 100%)",
    border:"none", borderRadius:14, color:"#fff",
    fontSize:15, fontWeight:800, cursor:"pointer",
    marginTop:20, fontFamily:"inherit",
    boxShadow:"0 6px 24px rgba(247,67,26,0.38),inset 0 1px 0 rgba(255,255,255,0.15)",
    transition:"all 0.25s", letterSpacing:"0.3px",
  },
  submitDisabled:{ opacity:0.75, cursor:"not-allowed" },
  loadRow:{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 },
  btnRow:{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 },
  btnArrow:{ fontSize:18 },
  orRow:{ display:"flex", alignItems:"center", gap:12, margin:"18px 0" },
  orLine:{ flex:1, height:1, background:"#eaecf5" },
  orTxt:{ fontSize:12, color:"#aab0c0", fontWeight:600, whiteSpace:"nowrap" },
  socialRow:{ display:"flex", gap:12 },
  socialBtn:{
    flex:1, padding:"12px", background:"#f5f7ff",
    border:"1.5px solid #eaecf5", borderRadius:12,
    fontSize:14, fontWeight:700, color:"#1a1a2e",
    cursor:"pointer", display:"flex", alignItems:"center",
    justifyContent:"center", gap:8,
    fontFamily:"inherit", transition:"all 0.2s",
  },
  switchTxt:{ textAlign:"center", fontSize:13, color:"#8a92a6", marginTop:20 },
  switchLink:{ color:"#ff6b35", fontWeight:800, cursor:"pointer" },
  footer:{
    display:"flex", alignItems:"center",
    justifyContent:"space-between",
    padding:"0 48px 26px", fontSize:12, color:"#b0b8cc",
  },
  footerLink:{ cursor:"pointer" },
};

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::placeholder { color: #b0b8cc !important; }

  .panel-l {
    position: absolute; top: 0; bottom: 0; overflow: hidden; z-index: 2;
    transition: left 0.72s cubic-bezier(0.76,0,0.24,1),
                width 0.72s cubic-bezier(0.76,0,0.24,1);
    background: linear-gradient(158deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%);
  }
  .pl-login  { left: 0;   width: 46%; }
  .pl-signup { left: 54%; width: 46%; }

  .panel-r {
    position: absolute; top: 0; bottom: 0; background: #fff; z-index: 1;
    display: flex; flex-direction: column;
    transition: left 0.72s cubic-bezier(0.76,0,0.24,1),
                width 0.72s cubic-bezier(0.76,0,0.24,1);
    overflow: hidden;
  }
  .pr-login  { left: 46%; width: 54%; }
  .pr-signup { left: 0;   width: 54%; }

  .sticky {
    position: absolute; right: 32px;
    padding: 10px 15px; font-size: 12px; color: #444;
    border-radius: 3px;
    box-shadow: 3px 4px 14px rgba(0,0,0,0.2), inset 0 -2px 0 rgba(0,0,0,0.06);
    white-space: nowrap; pointer-events: none; font-family: Georgia, serif;
    animation: noteFloat 4s ease-in-out infinite alternate;
  }
  @keyframes noteFloat {
    0%   { opacity: 0.55; transform: translateY(0); }
    100% { opacity: 0.9;  transform: translateY(-10px); }
  }

  .particle {
    position: absolute; border-radius: 50%;
    background: rgba(255,107,53,0.3);
    animation: pdrift linear infinite;
  }
  @keyframes pdrift {
    0%   { transform: translateY(0) scale(1); opacity: 0.6; }
    50%  { opacity: 0.15; }
    100% { transform: translateY(-90px) scale(0.3); opacity: 0; }
  }

  .fade-swap { animation: fswap 0.42s cubic-bezier(0.22,1,0.36,1) both; }
  @keyframes fswap {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes barSlide {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  .submit-hover:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.008);
    box-shadow: 0 14px 36px rgba(247,67,26,0.52),
                inset 0 1px 0 rgba(255,255,255,0.2) !important;
  }
  .submit-hover:active:not(:disabled) { transform: scale(0.99); }

  .top-btn-hover:hover { background: #1a1a2e !important; color: #fff !important; }

  .social-hover:hover {
    background: #fff !important;
    border-color: #0f3460 !important;
    box-shadow: 0 4px 16px rgba(15,52,96,0.1);
    transform: translateY(-1px);
  }

  .ring {
    display: inline-block; width: 18px; height: 18px;
    border: 2.5px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;