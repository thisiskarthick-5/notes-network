import { useState, useRef } from "react";

const TOTAL = 5;

const STEP_META = [
  { label: "Welcome",  icon: "✦" },
  { label: "Role",     icon: "✦" },
  { label: "Details",  icon: "✦" },
  { label: "Photo",    icon: "✦" },
  { label: "Review",   icon: "✦" },
];

const LEFT_CONTENT = [
  {
    eyebrow: "STEP 1 OF 5",
    title: "Let's build\nyour profile.",
    sub: "A few quick steps to personalize your NoteNest experience and connect you with the right community.",
    decorLine: "Your identity on NoteNest",
  },
  {
    eyebrow: "STEP 2 OF 5",
    title: "Who are\nyou here?",
    sub: "Your role shapes everything — from the notes you see to the people you connect with.",
    decorLine: "Student or Staff — both matter",
  },
  {
    eyebrow: "STEP 3 OF 5",
    title: "Tell us\nwhere you're\nfrom.",
    sub: "Your institution and details help others find and trust your notes.",
    decorLine: "Connect with your peers",
  },
  {
    eyebrow: "STEP 4 OF 5",
    title: "Put a\nface to the\nname.",
    sub: "Profiles with photos get 3× more engagement. Make yourself known.",
    decorLine: "First impressions matter",
  },
  {
    eyebrow: "STEP 5 OF 5",
    title: "Looking\ngood. Ready\nto launch?",
    sub: "Review your profile one last time before joining the community.",
    decorLine: "Almost there",
  },
];

export default function ProfileSetup({ onSuccess }) {
  const [step, setStep]   = useState(1);
  const [role, setRole]   = useState("");
  const [form, setForm]   = useState({
    displayName: "", bio: "",
    institution: "", course: "", year: "",
    department: "", position: "",
    photo: null, photoPreview: null,
  });
  const [done, setDone]   = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();

  const update = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.displayName.trim()) e.displayName = "Name is required";
    }
    if (step === 2) {
      if (!role) e.role = "Please select a role";
    }
    if (step === 3 && role === "student") {
      if (!form.institution.trim()) e.institution = "Institution is required";
      if (!form.course.trim()) e.course = "Course is required";
    }
    if (step === 3 && role === "staff") {
      if (!form.institution.trim()) e.institution = "Institution is required";
      if (!form.position.trim()) e.position = "Position is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < TOTAL) setStep(s => s + 1);
    else { setDone(true); }
  };

  const back = () => { setStep(s => s - 1); setErrors({}); };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    update("photo", file);
    const reader = new FileReader();
    reader.onload = ev => update("photoPreview", ev.target.result);
    reader.readAsDataURL(file);
  };

  const lc = LEFT_CONTENT[step - 1];
  const progress = ((step - 1) / (TOTAL - 1)) * 100;

  if (done) return <SuccessScreen name={form.displayName} role={role} onSuccess={onSuccess} />;

  return (
    <div style={s.root}>
      <style>{css}</style>

      {/* ambient */}
      <div style={s.orb1} /><div style={s.orb2} />
      <div style={s.grid} />

      {/* ── LEFT PANEL ── */}
      <div style={s.leftPanel}>
        <div style={s.leftInner}>

          {/* Brand */}
          <div style={s.brand}>
            <div style={s.brandMark}>N</div>
            <span style={s.brandWord}>NoteNest</span>
          </div>

          {/* Dynamic left content */}
          <div className="lc-swap" key={step} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={s.leftEyebrow}>{lc.eyebrow}</div>
            <h2 style={s.leftTitle}>{lc.title.split("\n").map((l, i) => (
              <span key={i}>{i > 0 && <br />}{i === 1
                ? <span style={s.leftAccent}>{l}</span>
                : l}
              </span>
            ))}</h2>
            <p style={s.leftSub}>{lc.sub}</p>
            <div style={s.leftDecor}>
              <div style={s.leftDecorLine} />
              <span style={s.leftDecorTxt}>{lc.decorLine}</span>
            </div>
          </div>

          {/* Step dots */}
          <div style={s.dotsRow}>
            {STEP_META.map((_, i) => (
              <div key={i} style={{
                ...s.dot,
                background: i + 1 === step
                  ? "#ff6b35"
                  : i + 1 < step
                    ? "rgba(255,107,53,0.5)"
                    : "rgba(255,255,255,0.15)",
                width: i + 1 === step ? 24 : 8,
              }} />
            ))}
          </div>

        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={s.rightPanel}>

        {/* Top bar */}
        <div style={s.topBar}>
          {step > 1 ? (
            <button style={s.backBtn} className="back-hover" onClick={back}>
              ← Back
            </button>
          ) : <div />}

          {/* Progress bar */}
          <div style={s.progressTrack}>
            <div style={{ ...s.progressFill, width: `${progress}%` }} />
          </div>

          <span style={s.stepCount}>{step} / {TOTAL}</span>
        </div>

        {/* Form area */}
        <div style={s.formArea}>
          <div className="step-slide" key={step}>

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div>
                <StepHeader
                  icon="👋"
                  title="Welcome! Let's get started."
                  sub="Tell us your name and a little about yourself."
                />
                <FormField
                  label="Display Name"
                  error={errors.displayName}
                  required
                >
                  <Input
                    placeholder="e.g. Jane Doe"
                    value={form.displayName}
                    onChange={e => update("displayName", e.target.value)}
                    hasError={!!errors.displayName}
                  />
                </FormField>
                <FormField label="Short Bio" hint="Optional · max 160 chars">
                  <textarea
                    placeholder="A sentence about what you study or teach..."
                    value={form.bio}
                    onChange={e => update("bio", e.target.value)}
                    maxLength={160}
                    rows={3}
                    style={s.textarea}
                  />
                  <div style={s.charCount}>{form.bio.length}/160</div>
                </FormField>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <div>
                <StepHeader
                  icon="🏫"
                  title="What's your role?"
                  sub="This shapes your feed, connections, and note recommendations."
                />
                {errors.role && <ErrorBanner msg={errors.role} />}
                <div style={s.roleGrid}>
                  {[
                    {
                      id: "student",
                      emoji: "🎓",
                      label: "Student",
                      desc: "I'm enrolled in a course, program, or university.",
                      perks: ["Peer notes", "Study groups", "Course feed"],
                    },
                    {
                      id: "staff",
                      emoji: "🧑‍💼",
                      label: "Staff / Faculty",
                      desc: "I work at an institution or educational organization.",
                      perks: ["Share resources", "Engage students", "Department feed"],
                    },
                  ].map(r => (
                    <button
                      key={r.id}
                      style={{
                        ...s.roleCard,
                        ...(role === r.id ? s.roleCardActive : {}),
                      }}
                      className="role-card-hover"
                      onClick={() => { setRole(r.id); setErrors({}); }}
                    >
                      {role === r.id && <div style={s.roleCheck}>✓</div>}
                      <div style={s.roleEmoji}>{r.emoji}</div>
                      <div style={s.roleLabel}>{r.label}</div>
                      <div style={s.roleDesc}>{r.desc}</div>
                      <div style={s.rolePerks}>
                        {r.perks.map(p => (
                          <span key={p} style={s.rolePerk}>· {p}</span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && role === "student" && (
              <div>
                <StepHeader
                  icon="🎓"
                  title="Your academic details"
                  sub="Help peers discover your notes and connect with you."
                />
                <FormField label="Institution / University" required error={errors.institution}>
                  <Input placeholder="e.g. MIT, Anna University"
                    value={form.institution} onChange={e => update("institution", e.target.value)}
                    hasError={!!errors.institution} />
                </FormField>
                <FormField label="Course / Major" required error={errors.course}>
                  <Input placeholder="e.g. Computer Science, MBA"
                    value={form.course} onChange={e => update("course", e.target.value)}
                    hasError={!!errors.course} />
                </FormField>
                <FormField label="Year of Study">
                  <div style={s.chipRow}>
                    {["1st Year","2nd Year","3rd Year","4th Year","5th Year+","Postgrad"].map(y => (
                      <button key={y}
                        style={{ ...s.chip, ...(form.year === y ? s.chipActive : {}) }}
                        onClick={() => update("year", y)}
                      >{y}</button>
                    ))}
                  </div>
                </FormField>
              </div>
            )}

            {step === 3 && role === "staff" && (
              <div>
                <StepHeader
                  icon="🧑‍💼"
                  title="Your professional details"
                  sub="Let students and peers know your expertise."
                />
                <FormField label="Institution / Organization" required error={errors.institution}>
                  <Input placeholder="e.g. IIT Madras, Coursera"
                    value={form.institution} onChange={e => update("institution", e.target.value)}
                    hasError={!!errors.institution} />
                </FormField>
                <FormField label="Department">
                  <Input placeholder="e.g. Computer Science Dept."
                    value={form.department} onChange={e => update("department", e.target.value)} />
                </FormField>
                <FormField label="Position / Title" required error={errors.position}>
                  <Input placeholder="e.g. Associate Professor, TA"
                    value={form.position} onChange={e => update("position", e.target.value)}
                    hasError={!!errors.position} />
                </FormField>
              </div>
            )}

            {step === 3 && !role && (
              <div style={s.noRoleMsg}>
                <span style={{ fontSize: 40 }}>⬅️</span>
                <p>Go back and select your role first.</p>
              </div>
            )}

            {/* ── STEP 4 ── */}
            {step === 4 && (
              <div>
                <StepHeader
                  icon="📸"
                  title="Add a profile photo"
                  sub="Profiles with photos get significantly more connections. You can always change this later."
                />
                <div style={s.photoSection}>
                  <div
                    style={s.photoRing}
                    className="photo-ring-hover"
                    onClick={() => fileRef.current.click()}
                  >
                    {form.photoPreview ? (
                      <img src={form.photoPreview} alt="preview" style={s.photoImg} />
                    ) : (
                      <div style={s.photoPlaceholder}>
                        <span style={s.photoPlaceholderIcon}>+</span>
                        <span style={s.photoPlaceholderTxt}>Upload Photo</span>
                      </div>
                    )}
                    <div style={s.photoOverlay}>
                      <span style={{ fontSize: 20 }}>📷</span>
                    </div>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*"
                    style={{ display: "none" }} onChange={handlePhoto} />
                  <div style={s.photoMeta}>
                    <p style={s.photoMetaTitle}>
                      {form.photoPreview ? "Photo uploaded ✓" : "No photo selected"}
                    </p>
                    <p style={s.photoMetaSub}>JPG, PNG or GIF · Max 5MB</p>
                    {form.photoPreview && (
                      <button style={s.removePhotoBtn}
                        onClick={() => { update("photo", null); update("photoPreview", null); }}>
                        Remove photo
                      </button>
                    )}
                  </div>
                </div>
                <div style={s.skipNote}>
                  You can skip this step and add a photo later from your profile settings.
                </div>
              </div>
            )}

            {/* ── STEP 5 ── */}
            {step === 5 && (
              <div>
                <StepHeader
                  icon="✅"
                  title="Review your profile"
                  sub="This is how others will see you on NoteNest."
                />
                <div style={s.reviewCard}>
                  {/* Avatar */}
                  <div style={s.reviewAvatarWrap}>
                    {form.photoPreview
                      ? <img src={form.photoPreview} alt="avatar" style={s.reviewAvatar} />
                      : (
                        <div style={s.reviewAvatarBlank}>
                          {form.displayName?.[0]?.toUpperCase() || "?"}
                        </div>
                      )
                    }
                    <div style={s.reviewRoleBadge}>
                      {role === "student" ? "🎓" : role === "staff" ? "🧑‍💼" : "👤"}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={s.reviewInfo}>
                    <div style={s.reviewName}>{form.displayName || "—"}</div>
                    {form.bio && <div style={s.reviewBio}>{form.bio}</div>}

                    <div style={s.reviewTags}>
                      {role && (
                        <span style={s.reviewTag}>
                          {role === "student" ? "Student" : "Staff / Faculty"}
                        </span>
                      )}
                      {form.institution && <span style={s.reviewTag}>{form.institution}</span>}
                      {role === "student" && form.course && <span style={s.reviewTag}>{form.course}</span>}
                      {role === "student" && form.year   && <span style={s.reviewTag}>{form.year}</span>}
                      {role === "staff"   && form.position  && <span style={s.reviewTag}>{form.position}</span>}
                      {role === "staff"   && form.department && <span style={s.reviewTag}>{form.department}</span>}
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div style={s.checklist}>
                  {[
                    ["Display name", !!form.displayName],
                    ["Bio added", !!form.bio],
                    ["Role selected", !!role],
                    ["Institution", !!form.institution],
                    ["Profile photo", !!form.photoPreview],
                  ].map(([lbl, done]) => (
                    <div key={lbl} style={s.checkRow}>
                      <span style={{ ...s.checkIcon, color: done ? "#22c55e" : "#cbd5e1" }}>
                        {done ? "✓" : "○"}
                      </span>
                      <span style={{ ...s.checkLbl, color: done ? "#1a1a2e" : "#94a3b8" }}>{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* CTA */}
        <div style={s.ctaBar}>
          <button
            style={{
              ...s.ctaBtn,
              ...(step === 2 && !role ? s.ctaBtnDisabled : {}),
            }}
            className="cta-hover"
            onClick={next}
            disabled={step === 2 && !role}
          >
            {step === TOTAL ? "🚀 Launch My Profile" : "Continue →"}
          </button>
          {(step === 4 || (step === 1 && !form.bio)) && (
            <button style={s.skipBtn} onClick={next}>Skip for now</button>
          )}
        </div>

      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────── */

function StepHeader({ icon, title, sub }) {
  return (
    <div style={sh.wrap}>
      <div style={sh.iconBox}>{icon}</div>
      <h3 style={sh.title}>{title}</h3>
      <p style={sh.sub}>{sub}</p>
    </div>
  );
}
const sh = {
  wrap: { marginBottom: 28 },
  iconBox: { fontSize: 32, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: 900, color: "#1a1a2e", letterSpacing: "-0.5px", marginBottom: 6 },
  sub: { fontSize: 14, color: "#64748b", lineHeight: 1.65 },
};

function FormField({ label, children, error, hint, required }) {
  return (
    <div style={ff.wrap}>
      <div style={ff.labelRow}>
        <label style={ff.label}>
          {label}
          {required && <span style={ff.req}>*</span>}
        </label>
        {hint && <span style={ff.hint}>{hint}</span>}
      </div>
      {children}
      {error && <span style={ff.error}>⚠ {error}</span>}
    </div>
  );
}
const ff = {
  wrap: { marginBottom: 18 },
  labelRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 },
  label: { fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.7px" },
  req: { color: "#ff6b35", marginLeft: 3 },
  hint: { fontSize: 11, color: "#94a3b8" },
  error: { display: "block", fontSize: 12, color: "#ef4444", marginTop: 5, fontWeight: 600 },
};

function Input({ placeholder, value, onChange, hasError }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        ...inp.base,
        ...(hasError ? inp.errState : {}),
      }}
      onFocus={e => { if (!hasError) e.target.style.cssText += "border-color:#0f3460;box-shadow:0 0 0 3px rgba(15,52,96,0.08);background:#fff;"; }}
      onBlur={e => { e.target.style.cssText = ""; }}
    />
  );
}
const inp = {
  base: {
    width: "100%", padding: "13px 16px",
    background: "#f8faff", border: "1.5px solid #e2e8f0",
    borderRadius: 12, fontSize: 15, color: "#1a1a2e",
    outline: "none", boxSizing: "border-box",
    fontFamily: "'Georgia',serif",
    transition: "border 0.2s, box-shadow 0.2s, background 0.2s",
  },
  errState: { border: "1.5px solid #ef4444", background: "#fff5f5" },
};

function ErrorBanner({ msg }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8,
      background:"#fff0f0", border:"1px solid #fecaca", color:"#dc2626",
      borderRadius:10, padding:"10px 14px", fontSize:13,
      marginBottom:16, fontWeight:500 }}>
      <span style={{ width:7,height:7,borderRadius:"50%",background:"#ef4444",flexShrink:0,display:"inline-block" }} />
      {msg}
    </div>
  );
}

function SuccessScreen({ name, role, onSuccess }) {
  return (
    <div style={{ minHeight:"100vh",
      background:"linear-gradient(158deg,#1a1a2e 0%,#16213e 55%,#0f3460 100%)",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontFamily:"'Georgia',serif" }}>
      <style>{css}</style>
      <div style={{ textAlign:"center", padding:40 }} className="step-slide">
        <div style={{ fontSize:72, marginBottom:20 }}>🎉</div>
        <div style={{ fontSize:11, fontWeight:800, letterSpacing:"3px", color:"#ff6b35", marginBottom:12 }}>
          PROFILE COMPLETE
        </div>
        <h2 style={{ fontSize:36, fontWeight:900, color:"#fff", letterSpacing:"-1px", marginBottom:10 }}>
          You're all set, {name || "friend"}!
        </h2>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.5)", marginBottom:40, lineHeight:1.7 }}>
          Your {role || "profile"} profile is live.<br />Start exploring and sharing notes.
        </p>
        <button
          style={{ padding:"15px 40px",
            background:"linear-gradient(90deg,#ff6b35,#f7431a)",
            border:"none", borderRadius:99, color:"#fff",
            fontSize:16, fontWeight:800, cursor:"pointer",
            fontFamily:"inherit",
            boxShadow:"0 6px 24px rgba(247,67,26,0.4)" }}
          className="cta-hover"
          onClick={onSuccess}
        >
          Go to Dashboard →
        </button>
      </div>
    </div>
  );
}

/* ── Styles ────────────────────────────────────────────────────────── */
const s = {
  root: {
    display: "flex", width: "100vw", height: "100vh",
    fontFamily: "'Georgia',serif", overflow: "hidden",
    background: "#0d1117",
  },
  orb1: {
    position: "fixed", width: 600, height: 600, borderRadius: "50%",
    background: "radial-gradient(circle,rgba(255,107,53,0.11) 0%,transparent 65%)",
    top: -150, left: -100, pointerEvents: "none", zIndex: 0,
  },
  orb2: {
    position: "fixed", width: 500, height: 500, borderRadius: "50%",
    background: "radial-gradient(circle,rgba(15,52,96,0.45) 0%,transparent 65%)",
    bottom: -100, right: -80, pointerEvents: "none", zIndex: 0,
  },
  grid: {
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
    backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
    backgroundSize: "60px 60px",
  },

  /* Left panel */
  leftPanel: {
    width: "40%", height: "100%",
    background: "linear-gradient(158deg,#1a1a2e 0%,#16213e 55%,#0f3460 100%)",
    position: "relative", zIndex: 2, flexShrink: 0,
    display: "flex", flexDirection: "column",
  },
  leftInner: {
    padding: "44px 48px", flex: 1,
    display: "flex", flexDirection: "column",
  },
  brand: { display: "flex", alignItems: "center", gap: 12, marginBottom: 52 },
  brandMark: {
    width: 40, height: 40, borderRadius: 12,
    background: "linear-gradient(135deg,#ff6b35,#f7431a)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 900, fontSize: 20,
    boxShadow: "0 4px 16px rgba(255,107,53,0.4)",
  },
  brandWord: { fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.4px" },
  leftEyebrow: { fontSize: 10, fontWeight: 800, letterSpacing: "3px", color: "#ff6b35", marginBottom: 18 },
  leftTitle: {
    fontSize: "clamp(28px,3vw,42px)", fontWeight: 900, color: "#fff",
    lineHeight: 1.12, marginBottom: 18, letterSpacing: "-1px",
  },
  leftAccent: {
    background: "linear-gradient(90deg,#ff6b35,#ffab76)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  leftSub: { fontSize: 14, color: "rgba(255,255,255,0.42)", lineHeight: 1.75, marginBottom: 36 },
  leftDecor: { display: "flex", alignItems: "center", gap: 12 },
  leftDecorLine: { width: 32, height: 2, background: "#ff6b35", borderRadius: 99 },
  leftDecorTxt: { fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: "0.5px" },
  dotsRow: { display: "flex", alignItems: "center", gap: 6, paddingTop: 40 },
  dot: {
    height: 8, borderRadius: 99,
    transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
  },

  /* Right panel */
  rightPanel: {
    flex: 1, background: "#fff",
    display: "flex", flexDirection: "column",
    overflow: "hidden", position: "relative", zIndex: 1,
  },
  topBar: {
    display: "flex", alignItems: "center",
    gap: 16, padding: "24px 48px 0",
  },
  backBtn: {
    background: "transparent", border: "none",
    color: "#94a3b8", fontSize: 13, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
    transition: "color 0.2s", whiteSpace: "nowrap",
    padding: 0,
  },
  progressTrack: {
    flex: 1, height: 4, background: "#f1f5f9",
    borderRadius: 99, overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg,#ff6b35,#f7431a)",
    borderRadius: 99,
    transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)",
    boxShadow: "0 0 8px rgba(255,107,53,0.4)",
  },
  stepCount: { fontSize: 12, fontWeight: 700, color: "#94a3b8", whiteSpace: "nowrap" },

  formArea: {
    flex: 1, overflowY: "auto",
    padding: "32px 48px 0",
    maxWidth: 540, width: "100%", margin: "0 auto",
    alignSelf: "stretch",
  },

  textarea: {
    width: "100%", padding: "13px 16px",
    background: "#f8faff", border: "1.5px solid #e2e8f0",
    borderRadius: 12, fontSize: 15, color: "#1a1a2e",
    outline: "none", resize: "none", boxSizing: "border-box",
    fontFamily: "'Georgia',serif",
    transition: "border 0.2s",
  },
  charCount: { textAlign: "right", fontSize: 11, color: "#94a3b8", marginTop: 4 },

  chipRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: {
    padding: "8px 16px", background: "#f8faff",
    border: "1.5px solid #e2e8f0", borderRadius: 99,
    fontSize: 13, fontWeight: 600, color: "#64748b",
    cursor: "pointer", fontFamily: "inherit",
    transition: "all 0.2s",
  },
  chipActive: {
    background: "#fff5f0", border: "1.5px solid #ff6b35",
    color: "#ff6b35", boxShadow: "0 2px 8px rgba(255,107,53,0.2)",
  },

  roleGrid: { display: "flex", gap: 14, marginTop: 4 },
  roleCard: {
    flex: 1, padding: "22px 18px",
    background: "#f8faff", border: "2px solid #e2e8f0",
    borderRadius: 16, cursor: "pointer",
    display: "flex", flexDirection: "column",
    alignItems: "flex-start", gap: 6,
    position: "relative", transition: "all 0.22s",
    fontFamily: "inherit", textAlign: "left",
  },
  roleCardActive: {
    border: "2px solid #ff6b35",
    background: "#fff8f5",
    boxShadow: "0 0 0 4px rgba(255,107,53,0.1)",
  },
  roleCheck: {
    position: "absolute", top: 12, right: 12,
    width: 22, height: 22, borderRadius: "50%",
    background: "#ff6b35", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 900,
  },
  roleEmoji: { fontSize: 28 },
  roleLabel: { fontSize: 16, fontWeight: 800, color: "#1a1a2e" },
  roleDesc: { fontSize: 12, color: "#64748b", lineHeight: 1.5 },
  rolePerks: { display: "flex", flexDirection: "column", gap: 2, marginTop: 4 },
  rolePerk: { fontSize: 11, color: "#94a3b8", fontWeight: 600 },

  photoSection: {
    display: "flex", alignItems: "center",
    gap: 28, padding: "8px 0 24px",
  },
  photoRing: {
    width: 100, height: 100, borderRadius: "50%",
    border: "2.5px dashed rgba(255,107,53,0.4)",
    overflow: "hidden", cursor: "pointer",
    position: "relative", flexShrink: 0,
    background: "#fff8f5",
    transition: "border-color 0.2s",
  },
  photoImg: { width: "100%", height: "100%", objectFit: "cover" },
  photoPlaceholder: {
    width: "100%", height: "100%",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 4,
  },
  photoPlaceholderIcon: { fontSize: 24, color: "rgba(255,107,53,0.5)" },
  photoPlaceholderTxt: { fontSize: 10, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.5px" },
  photoOverlay: {
    position: "absolute", inset: 0,
    background: "rgba(255,107,53,0.7)",
    display: "flex", alignItems: "center", justifyContent: "center",
    opacity: 0, transition: "opacity 0.2s",
  },
  photoMeta: { display: "flex", flexDirection: "column", gap: 4 },
  photoMetaTitle: { fontSize: 15, fontWeight: 700, color: "#1a1a2e" },
  photoMetaSub: { fontSize: 12, color: "#94a3b8" },
  removePhotoBtn: {
    background: "transparent", border: "none",
    color: "#ef4444", fontSize: 12, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit", padding: 0,
    marginTop: 4,
  },
  skipNote: {
    fontSize: 12, color: "#94a3b8", lineHeight: 1.6,
    padding: "12px 16px", background: "#f8faff",
    borderRadius: 10, border: "1px solid #e2e8f0",
  },

  noRoleMsg: {
    textAlign: "center", padding: "60px 0",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: 12, color: "#94a3b8", fontSize: 15,
  },

  reviewCard: {
    display: "flex", gap: 20,
    background: "#f8faff", border: "1.5px solid #e2e8f0",
    borderRadius: 16, padding: "22px",
    marginBottom: 20,
  },
  reviewAvatarWrap: { position: "relative", flexShrink: 0 },
  reviewAvatar: {
    width: 68, height: 68, borderRadius: "50%",
    objectFit: "cover", border: "2.5px solid #ff6b35",
  },
  reviewAvatarBlank: {
    width: 68, height: 68, borderRadius: "50%",
    background: "linear-gradient(135deg,#ff6b35,#0f3460)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 26, fontWeight: 900, color: "#fff",
  },
  reviewRoleBadge: {
    position: "absolute", bottom: -2, right: -2,
    width: 24, height: 24, borderRadius: "50%",
    background: "#fff", border: "2px solid #e2e8f0",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12,
  },
  reviewInfo: { flex: 1, minWidth: 0 },
  reviewName: { fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 4, letterSpacing: "-0.3px" },
  reviewBio: { fontSize: 13, color: "#64748b", lineHeight: 1.55, marginBottom: 10 },
  reviewTags: { display: "flex", flexWrap: "wrap", gap: 6 },
  reviewTag: {
    padding: "4px 10px", background: "#fff5f0",
    border: "1px solid rgba(255,107,53,0.25)",
    borderRadius: 99, fontSize: 11, fontWeight: 700,
    color: "#ff6b35",
  },

  checklist: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "10px 20px",
  },
  checkRow: { display: "flex", alignItems: "center", gap: 8 },
  checkIcon: { fontSize: 14, fontWeight: 900, flexShrink: 0 },
  checkLbl: { fontSize: 13, fontWeight: 600 },

  ctaBar: {
    padding: "20px 48px 28px",
    maxWidth: 540, width: "100%",
    margin: "0 auto", alignSelf: "stretch",
    display: "flex", flexDirection: "column", gap: 8,
  },
  ctaBtn: {
    width: "100%", padding: "15px",
    background: "linear-gradient(90deg,#ff6b35,#f7431a)",
    border: "none", borderRadius: 14, color: "#fff",
    fontSize: 15, fontWeight: 800, cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 6px 24px rgba(247,67,26,0.35),inset 0 1px 0 rgba(255,255,255,0.15)",
    transition: "all 0.25s", letterSpacing: "0.3px",
  },
  ctaBtnDisabled: { opacity: 0.4, cursor: "not-allowed", boxShadow: "none" },
  skipBtn: {
    background: "transparent", border: "none",
    color: "#94a3b8", fontSize: 13, fontWeight: 600,
    cursor: "pointer", fontFamily: "inherit",
    textAlign: "center",
  },
};

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::placeholder { color: #b0b8cc !important; }

  .lc-swap {
    animation: lcswap 0.5s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes lcswap {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .step-slide {
    animation: stepslide 0.4s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes stepslide {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .cta-hover:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(247,67,26,0.5),
                inset 0 1px 0 rgba(255,255,255,0.2) !important;
  }
  .cta-hover:active:not(:disabled) { transform: scale(0.99); }

  .back-hover:hover { color: #1a1a2e !important; }

  .role-card-hover:hover:not([style*="border: 2px solid rgb(255, 107, 53)"]) {
    border-color: #cbd5e1 !important;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    transform: translateY(-1px);
  }

  .photo-ring-hover:hover .photo-overlay,
  .photo-ring-hover:hover > div:last-child {
    opacity: 1 !important;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }
`;