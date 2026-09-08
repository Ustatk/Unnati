import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, ArrowUp, Bell, BookOpen, BriefcaseBusiness,
  Check, ChevronDown, FileText, Languages, MapPin, Mic, Phone,
  Plus, Search, Send, ShieldAlert, Siren, X, MoreHorizontal,
  Sparkles, Activity, Award, ZoomIn, ZoomOut, RotateCcw,
  Calendar, Heart, Edit3, Download, Volume2, RefreshCw, Trash2, Navigation
} from 'lucide-react';
import abhayaImg from './abhaya_illustration.png';
import './styles.css';

/* ─── constants ─────────────────────────────────────────── */
const LANGUAGES = [
  ['English','English'],['Hindi','हिन्दी'],['Bengali','বাংলা'],['Telugu','తెలుగు'],
  ['Marathi','मराठी'],['Tamil','தமிழ்'],['Urdu','اردو'],['Gujarati','ગુજરાતી'],
  ['Kannada','ಕನ್ನಡ'],['Odia','ଓଡ଼ିଆ'],['Malayalam','മലയാളം'],['Punjabi','ਪੰਜਾਬੀ'],
  ['Assamese','অসমীয়া'],['Maithili','मैथिली'],['Santali','ᱥᱟᱱᱛᱟᱲᱤ'],['Kashmiri','كأشُر'],
  ['Nepali','नेपाली'],['Konkani','कोंकणी'],['Manipuri','মৈতৈলোन्'],['Bodo','बड़ो'],
  ['Dogri','डोगरी'],['Sindhi','سنڌي'],['Sanskrit','संस्कृतम्']
];

const NAV = [
  ['home','Home'],['health','Health'],['wealth','Wealth'],
  ['livelihood','Livelihood'],['finance','Finance'],['safety','Safety'],['rights','Rights']
];

const AI_STUBS = [
  'I can guide you step-by-step. What specific help or information do you need today?',
  'You may qualify for government and local support schemes. Let me summarize the requirements clearly for you.',
  'I am here to assist in your preferred language. How can I help you feel more empowered today?',
];

const WEALTH_NUDGES = [
  { title: "Start Small, Grow Steady", desc: "Joining a local Self-Help Group (SHG) opens access to zero-collateral micro-loans up to ₹50,000." },
  { title: "Build Emergency Savings First", desc: "Setting aside just ₹50 a week creates a safety net for sudden healthcare or family needs." },
  { title: "Skill Development Grants", desc: "Free vocational training programs under PMKVY offer travel stipends and job placement support." },
  { title: "Separate Personal & Business Funds", desc: "Keeping a dedicated savings account for your enterprise makes qualifying for Mudra loans seamless." },
  { title: "Micro-Insurance Protection", desc: "Government micro-insurance (PMSBY) provides ₹2 Lakh accident coverage for just ₹20/year." }
];

/* Detailed Regional Support Centers Dataset */
const REGIONAL_SUPPORT_DATA = {
  'All India': [
    { name: '181 Women Emergency Helpline', cat: 'Helpline', phone: '181', address: 'Pan-India 24/7 Emergency Toll-Free Line', hours: '24/7 Active', officer: 'National Dispatch Controller', tags: ['Emergency Support', 'Discreet Help', 'Zero Cost'], distance: 'Pan-India Coverage', type: 'police', x: '45%', y: '50%' },
    { name: '112 ERSS Integrated Response', cat: 'Emergency Dispatch', phone: '112', address: 'All States & UTs Central Emergency Network', hours: '24/7 Active', officer: 'State Police Command Center', tags: ['Police', 'Fire', 'Ambulance'], distance: 'Nationwide Net', type: 'police', x: '55%', y: '40%' },
    { name: 'National Commission for Women (NCW)', cat: 'Legal & Rights', phone: '011-26944880', address: 'Plot 21, Jasola Institutional Area, New Delhi', hours: 'Mon - Fri 9:00 AM - 5:30 PM', officer: 'Member Secretary / Legal Cell', tags: ['Legal Grievances', 'POSH Cases', 'Rights Protection'], distance: 'National HQ', type: 'ngo', x: '38%', y: '30%' },
    { name: 'National Legal Services Authority (NALSA)', cat: 'Free Legal Aid', phone: '15100', address: 'Department of Justice, New Delhi', hours: 'Mon - Sat 9:30 AM - 6:00 PM', officer: 'Member Secretary NALSA', tags: ['Free Advocate', 'Court Representation', 'Legal Guidance'], distance: 'National Net', type: 'hospital', x: '40%', y: '32%' },
  ],
  'Delhi NCR': [
    { name: 'AIIMS Maternity & Trauma Center', cat: 'Hospital', phone: '011-26588500', address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi', hours: '24/7 Emergency ICU', officer: 'Chief Medical Officer (CMO)', tags: ['Maternity Unit', '24/7 ICU', 'Blood Bank'], distance: '4.2 km away', type: 'hospital', x: '48%', y: '35%' },
    { name: 'Delhi Police Women Safety Desk', cat: 'Police Desk', phone: '1091', address: 'Nanakpura, Moti Bagh, New Delhi', hours: '24/7 Emergency Cell', officer: 'Special Police Officer In-Charge', tags: ['Female Officers', 'Zero FIR Desk', 'Escort Cell'], distance: '2.8 km away', type: 'police', x: '52%', y: '45%' },
    { name: 'Sakhi One Stop Center New Delhi', cat: 'Crisis Support', phone: '011-23381617', address: 'Pandara Road, New Delhi', hours: '24/7 Shelter & Care', officer: 'Center Administrator', tags: ['Temporary Shelter', 'Medical Aid', 'Counseling'], distance: '5.1 km away', type: 'ngo', x: '35%', y: '55%' },
    { name: 'Saheli Women Legal Resource Center', cat: 'NGO Desk', phone: '011-24616485', address: 'Nizamuddin East, New Delhi', hours: 'Mon - Sat 10 AM - 6 PM', officer: 'Senior Legal Counselor', tags: ['Domestic Violence Aid', 'Rights Workshops'], distance: '6.4 km away', type: 'ngo', x: '62%', y: '65%' },
  ],
  'Maharashtra': [
    { name: 'KEM Hospital Emergency & Maternity', cat: 'Hospital', phone: '022-24107000', address: 'Acharya Donde Marg, Parel, Mumbai', hours: '24/7 Emergency ICU', officer: 'Medical Superintendent', tags: ['Maternity Ward', 'Emergency Trauma', 'Free Care'], distance: '3.5 km away', type: 'hospital', x: '30%', y: '40%' },
    { name: 'Mumbai Police Special Women Cell', cat: 'Police Desk', phone: '103', address: 'Commissioner Office, Crawford Market, Mumbai', hours: '24/7 Active', officer: 'Assistant Commissioner of Police', tags: ['Crime Cell', 'Immediate Dispatch', 'Legal Escort'], distance: '1.9 km away', type: 'police', x: '50%', y: '30%' },
    { name: 'Sneha Women & Child Health NGO', cat: 'NGO Desk', phone: '022-24040045', address: 'Chota Sion Hospital Campus, Dharavi, Mumbai', hours: 'Mon - Sat 9:30 AM - 6 PM', officer: 'Program Director', tags: ['Maternal Health', 'Community Aid', 'Legal Clinic'], distance: '4.8 km away', type: 'ngo', x: '42%', y: '62%' },
    { name: 'Pune Sakhi One Stop Center', cat: 'Crisis Support', phone: '020-26123456', address: 'District Collectorate Office, Pune', hours: '24/7 Active', officer: 'District Women Protection Officer', tags: ['Shelter', 'Legal Aid', 'Psychological Care'], distance: 'District HQ', type: 'ngo', x: '68%', y: '70%' },
  ],
  'Rajasthan': [
    { name: 'SMS Government Medical Hospital', cat: 'Hospital', phone: '0141-2560291', address: 'Jawaharlal Nehru Marg, Jaipur', hours: '24/7 Emergency', officer: 'Duty Medical Officer', tags: ['Maternal Care', 'Pediatric ICU', 'Free Meds'], distance: '3.1 km away', type: 'hospital', x: '45%', y: '38%' },
    { name: 'Rajasthan Women Helpline (Abhaya)', cat: 'Police Desk', phone: '1090', address: 'Police Headquarters, Lalkothi, Jaipur', hours: '24/7 Active Desk', officer: 'Abhaya Cell Inspector', tags: ['Rapid Response Vehicle', 'Female Constables'], distance: '2.4 km away', type: 'police', x: '35%', y: '55%' },
    { name: 'Vimarsh Women Rights Collective', cat: 'NGO Desk', phone: '0141-2204561', address: 'C-Scheme, Ashok Nagar, Jaipur', hours: 'Mon - Sat 10 AM - 5:30 PM', officer: 'Executive Director', tags: ['SHG Mentorship', 'Legal Aid', 'Vocational Aid'], distance: '4.0 km away', type: 'ngo', x: '60%', y: '48%' },
    { name: 'Jodhpur One Stop Crisis Center', cat: 'Crisis Support', phone: '0291-2541234', address: 'Umaid Hospital Campus, Jodhpur', hours: '24/7 Emergency Desk', officer: 'Center In-Charge', tags: ['Safe Stay', 'Legal Counsel', 'Medical Help'], distance: 'Regional HQ', type: 'ngo', x: '25%', y: '65%' },
  ],
  'Karnataka': [
    { name: 'Victoria Hospital Emergency Hub', cat: 'Hospital', phone: '080-26701150', address: 'Fort Road, Near City Market, Bengaluru', hours: '24/7 Emergency', officer: 'Senior Medical Officer', tags: ['Maternity Care', 'Trauma Care', 'Free Services'], distance: '3.8 km away', type: 'hospital', x: '55%', y: '42%' },
    { name: 'Vanitha Sahayavani Police Desk', cat: 'Police Desk', phone: '080-22943225', address: 'Infantry Road, Bengaluru Central Police HQ', hours: '24/7 Active Desk', officer: 'Police Inspector In-Charge', tags: ['Crisis Helpline', 'Counseling Unit', 'FIR Filing'], distance: '2.1 km away', type: 'police', x: '38%', y: '32%' },
    { name: 'Parihar Women Rehabilitation Center', cat: 'NGO Desk', phone: '080-22863636', address: 'Infantry Road Campus, Bengaluru', hours: 'Mon - Sat 9:30 AM - 6 PM', officer: 'Chief Counselor', tags: ['Family Counseling', 'Legal Aid', 'Rehabilitation'], distance: '4.5 km away', type: 'ngo', x: '62%', y: '68%' },
  ],
  'West Bengal': [
    { name: 'SSKM Government Hospital & Trauma', cat: 'Hospital', phone: '033-22231589', address: 'AJC Bose Road, Bhowanipore, Kolkata', hours: '24/7 Emergency', officer: 'Medical Superintendent', tags: ['Maternity ICU', 'Emergency Surgery', 'Free Medicine'], distance: '2.9 km away', type: 'hospital', x: '42%', y: '38%' },
    { name: 'Kolkata Women Police Helpline', cat: 'Police Desk', phone: '1091', address: 'Lalbazar Police HQ, BBD Bagh, Kolkata', hours: '24/7 Emergency', officer: 'Women Cell Officer', tags: ['24/7 Patrol Unit', 'Discreet Complaint Desk'], distance: '3.6 km away', type: 'police', x: '58%', y: '52%' },
    { name: 'Swayam Women Legal Rights Collective', cat: 'NGO Desk', phone: '033-24863364', address: 'Southern Avenue, Lake Market, Kolkata', hours: 'Mon - Sat 10 AM - 6 PM', officer: 'Legal Director', tags: ['Legal Defense', 'Counseling', 'Skill Training'], distance: '5.2 km away', type: 'ngo', x: '30%', y: '66%' },
  ],
  'Uttar Pradesh': [
    { name: 'KGMU Hospital Lucknow Emergency', cat: 'Hospital', phone: '0522-2257450', address: 'Chowk, Shah Mina Road, Lucknow', hours: '24/7 Emergency ICU', officer: 'Duty Chief Medical Officer', tags: ['Trauma Center', 'Maternal Health', 'Zero Fee'], distance: '4.1 km away', type: 'hospital', x: '48%', y: '35%' },
    { name: 'UP 1090 Women Power Line HQ', cat: 'Police Desk', phone: '1090', address: 'Gomti Nagar, Lucknow', hours: '24/7 National Line', officer: '1090 Command Director', tags: ['Cyber Harassment', 'Stalking Desk', 'Immediate Dispatch'], distance: '3.0 km away', type: 'police', x: '36%', y: '58%' },
    { name: 'Sakhi One Stop Center Noida', cat: 'Crisis Support', phone: '0120-2456789', address: 'Sector 39, District Hospital, Noida', hours: '24/7 Open', officer: 'District Protection Officer', tags: ['Protective Shelter', 'Free Legal Aid', 'Medical Care'], distance: '5.8 km away', type: 'ngo', x: '64%', y: '42%' },
  ]
};

/* ─── main app component ─────────────────────────────────── */
export default function App() {
  const [page, setPage]         = useState('landing');
  const [subPage, setSubPage]   = useState(null);
  const [lang, setLang]         = useState(() => localStorage.getItem('unnati-lang') || 'English');
  const [langOpen, setLangOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authStep, setAuthStep] = useState('login');
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('unnati-loggedin') === '1');
  const [chat, setChat]         = useState([]);
  const [query, setQuery]       = useState('');
  const [guide, setGuide]       = useState(null);
  const [sos, setSos]           = useState(false);
  const [toast, setToast]       = useState('');

  useEffect(() => { localStorage.setItem('unnati-lang', lang); }, [lang]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3800);
    return () => clearTimeout(t);
  }, [toast]);

  const navigate = (p) => { setPage(p); setSubPage(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const openSub  = (s)  => setSubPage(s);
  const closeSub = ()   => setSubPage(null);

  const sendChat = (e) => {
    e?.preventDefault();
    const txt = query.trim();
    if (!txt) return;
    const userMsgs = chat.filter(m => m.from === 'user').length;
    const next = [...chat, { from: 'user', text: txt }, { from: 'ai', text: AI_STUBS[userMsgs % AI_STUBS.length] }];
    setChat(next);
    setQuery('');
    if (!loggedIn && next.filter(m => m.from === 'user').length >= 3) {
      setTimeout(() => setAuthOpen(true), 500);
    }
  };

  const completeAuth = () => {
    localStorage.setItem('unnati-loggedin', '1');
    setLoggedIn(true);
    setAuthOpen(false);
    setAuthStep('login');
    setToast('Welcome to Unnati! Your account is active.');
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setToast('Location access granted. Nearby services updated.'),
        () => setToast('Location preference saved.')
      );
    } else {
      setToast('Location preference saved.');
    }
  };

  return (
    <div className="shell">
      <Header
        page={page} onNav={navigate}
        lang={lang} setLang={setLang} langOpen={langOpen} setLangOpen={setLangOpen}
        loggedIn={loggedIn}
        onAuthOpen={() => setAuthOpen(true)}
        onSos={() => setSos(true)}
      />

      {page === 'landing'
        ? <Landing chat={chat} query={query} setQuery={setQuery} onSend={sendChat} onNav={navigate} />
        : (
          <div className="inner">
            <div className={`workspace ${subPage ? 'pushed' : ''}`}>
              <AiBar onToast={setToast}/>
              {
                {
                  home:       <HomePage       onToast={setToast}/>,
                  health:     <HealthPage     onGuide={setGuide} onSub={() => openSub('period')} onToast={setToast}/>,
                  wealth:     <WealthPage     onToast={setToast}/>,
                  livelihood: <LivelihoodPage onSub={openSub} onToast={setToast}/>,
                  finance:    <FinancePage    onToast={setToast}/>,
                  safety:     <SafetyPage     onSos={() => setSos(true)} onToast={setToast}/>,
                  rights:     <RightsPage     onGuide={setGuide} onToast={setToast}/>,
                }[page] || <HomePage onToast={setToast}/>
              }
            </div>
            <div className={`subpage ${subPage ? 'open' : ''}`}>
              {subPage === 'period'    && <PeriodPage    onClose={closeSub} onToast={setToast}/>}
              {subPage === 'resume'    && <ResumePage    onClose={closeSub} onToast={setToast}/>}
              {subPage === 'interview' && <InterviewPage onClose={closeSub} onToast={setToast}/>}
            </div>
          </div>
        )
      }

      {guide    && <GuideDrawer kind={guide} onClose={() => setGuide(null)} />}
      {authOpen && <AuthModal lang={lang} setLang={setLang} step={authStep} setStep={setAuthStep} onClose={() => { setAuthOpen(false); setAuthStep('login'); }} onDone={completeAuth} onLocation={requestLocation} />}
      {sos      && <SosModal onClose={() => setSos(false)} onToast={setToast} />}
      {toast    && <div className="toast"><Check size={14}/>{toast}</div>}
    </div>
  );
}

/* ─── header ─────────────────────────────────────────────── */
function Header({ page, onNav, lang, setLang, langOpen, setLangOpen, loggedIn, onAuthOpen, onSos }) {
  const ref = useRef(null);
  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [setLangOpen]);

  return (
    <header className="topbar">
      <button className="brand" onClick={() => onNav('landing')}>
        <span className="brand-dot"/>
        unnati
      </button>

      <nav className="topnav">
        {NAV.map(([id, label]) => (
          <button key={id} className={page === id ? 'active' : ''} onClick={() => onNav(id)}>
            {label}
          </button>
        ))}
      </nav>

      <div className="top-end">
        <div className="lang-wrap" ref={ref}>
          <button className="lang-btn" onClick={() => setLangOpen(v => !v)}>
            <Languages size={13}/>{lang}<ChevronDown size={11}/>
          </button>
          {langOpen && (
            <div className="lang-menu">
              {LANGUAGES.map(([name, native]) => (
                <button key={name} className={lang === name ? 'sel' : ''} onClick={() => { setLang(name); setLangOpen(false); }}>
                  <span>{native}</span><small>{name}</small>
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="sos-top-btn" onClick={onSos}>
          <span className="sos-pulse-dot"/> SOS
        </button>

        {loggedIn
          ? <button className="avatar-btn" onClick={onAuthOpen} title="Account Profile">U</button>
          : <button className="signin-btn" onClick={onAuthOpen}>Sign in</button>
        }
      </div>
    </header>
  );
}

/* ─── landing page ───────────────────────────────────────── */
function Landing({ chat, query, setQuery, onSend, onNav }) {
  const streamRef = useRef(null);
  useEffect(() => {
    if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
  }, [chat.length]);

  return (
    <section className="landing">
      <div className="land-glow g1"/>
      <div className="land-glow g2"/>

      <div className="land-hero-glass">
        <div className="land-card">
          <div className="land-card-img-wrap">
            <img src={abhayaImg} alt="Unnati Abhaya Guidance" className="land-card-img"/>
          </div>
          <div className="land-card-body">
            <div className="land-card-tag">
              <span className="land-card-dot"/>
              <span>EMPOWERING WOMEN</span>
            </div>
            <p className="land-card-title">360° Personal Guidance</p>
            <p className="land-card-sub">Health, financial growth, safety, and legal rights.</p>
          </div>
        </div>

        <div className="land-copy">
          <div className="land-badge">
            <Sparkles size={13}/>
            <span>AI-Powered Guidance in 23 Languages</span>
          </div>

          <h1 className="land-h1">
            Hello, welcome to<br/>
            <em>unnati</em>
          </h1>

          <p className="land-desc">
            Talk to Unnati in your language and get clear, personalized guidance —
            from health & financial support to opportunities, safety, and legal rights.
          </p>

          <button className="land-cta" onClick={() => onNav('home')}>
            Explore support near you <ArrowRight size={15}/>
          </button>
        </div>

        <div className="land-bottom">
          {chat.length > 0 && (
            <div className="land-stream" ref={streamRef}>
              {chat.map((m, i) => (
                <div key={i} className={`lbubble ${m.from}`}>{m.text}</div>
              ))}
            </div>
          )}
          <form className="land-bar" onSubmit={onSend}>
            <button type="button" className="land-bar-plus" aria-label="Attach file"><Plus size={18}/></button>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask Unnati anything in your language…"
            />
            <button type="button" className="land-bar-icon" aria-label="Voice input"><Mic size={17}/></button>
            <button type="submit" className="land-bar-send" aria-label="Send query"><ArrowUp size={17}/></button>
          </form>

          <div className="land-chips">
            {[
              ['Find a scheme', 'home'],
              ['Health support', 'health'],
              ['Prepare for work', 'livelihood'],
              ['Know my rights', 'rights']
            ].map(([t, target]) => (
              <button key={t} onClick={() => onNav(target)}>
                <ArrowRight size={12}/>{t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── AI search bar ─────────────────────────────────────── */
function AiBar({ onToast }) {
  const [q, setQ] = useState('');
  const [result, setResult] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    const stubs = [
      'Based on your query, you may qualify for PM Matru Vandana Yojana (up to ₹6,000) and local SHG micro-loans. Would you like step-by-step guidance?',
      'I found 3 relevant government programs for your situation. The PMKVY scheme provides free certified training with a monthly travel stipend. Shall I walk you through the application?',
      'Under the POSH Act, you have the right to a safe workplace. I can help you draft a formal complaint or find the nearest legal aid center at zero cost.',
    ];
    const idx = q.length % stubs.length;
    setResult(stubs[idx]);
    setQ('');
  };
  return (
    <div className="ai-bar-wrap">
      <form className="ai-bar" onSubmit={submit}>
        <Search size={16} className="ai-icon"/>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Ask Unnati AI about schemes, health, or career guidance…"/>
        <button type="submit" className="ai-bar-send" aria-label="Submit">
          <ArrowRight size={15}/>
        </button>
      </form>
      {result && (
        <div className="ai-bar-result">
          <div className="ai-result-badge"><Sparkles size={12}/> Unnati AI</div>
          <p>{result}</p>
          <button className="link-btn small" onClick={() => setResult('')}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

/* ─── scheme panel ──────────────────────────────────────── */
const ALL_SCHEMES = [
  { name: 'PM Matru Vandana Yojana', desc: 'Maternity benefit & nutrition support.', tag: '₹6,000 Benefit', area: ['health','government'] },
  { name: 'Mudra Yojana – Shishu', desc: 'Micro-loan for small home enterprises.', tag: 'Up to ₹50,000', area: ['wealth','financial','enterprise'] },
  { name: 'PMKVY Skill Training', desc: 'Free certified vocational courses with stipend.', tag: 'Free + Stipend', area: ['livelihood','work','skill'] },
  { name: 'Beti Bachao Beti Padhao', desc: 'Education and welfare support for girls.', tag: 'Education Aid', area: ['rights','education','legal'] },
  { name: 'Sukanya Samriddhi Yojana', desc: 'High-interest savings account for daughters.', tag: '8.2% Interest', area: ['financial','wealth'] },
  { name: 'National Legal Services (NALSA)', desc: 'Free legal counsel and court representation.', tag: 'Zero Cost', area: ['rights','legal'] },
];

function SchemePanel({ area = 'government schemes', onToast }) {
  const [filter, setFilter] = useState('');
  const filtered = ALL_SCHEMES.filter(s =>
    !filter ||
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.desc.toLowerCase().includes(filter.toLowerCase()) ||
    s.area.some(a => a.includes(filter.toLowerCase()))
  );

  return (
    <aside className="scheme-panel card">
      <div className="panel-tag"><Sparkles size={12}/> Eligible Schemes</div>
      <h3>Programs for You</h3>
      <p className="muted small">Verified government programs matching your profile.</p>

      <label className="search-field" style={{margin:'12px 0'}}>
        <Search size={13}/>
        <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search schemes…"/>
      </label>

      <div className="scheme-list-stack">
        {filtered.slice(0,4).map(s => (
          <div key={s.name} className="scheme-list-item" onClick={() => onToast && onToast(`${s.name} — details loaded.`)}>
            <span className="scheme-item-tag">{s.tag}</span>
            <strong>{s.name}</strong>
            <small>{s.desc}</small>
          </div>
        ))}
        {filtered.length === 0 && <p className="muted small" style={{padding:'8px 0'}}>No programs matched. Try a different keyword.</p>}
      </div>

      <button className="link-btn" style={{marginTop:12}} onClick={() => onToast && onToast('Full scheme directory opened.')}>
        View all programs <ArrowRight size={13}/>
      </button>
    </aside>
  );
}

/* ─── home page with state search & emergency directory ──── */
function HomePage({ onToast }) {
  const [zoom, setZoom]             = useState(1);
  const [selectedState, setSelectedState] = useState('All India');
  const [searchQuery, setSearchQuery]     = useState('');
  const [selectedPin, setSelectedPin]     = useState(null);

  const handleZoomIn  = () => setZoom(z => Math.min(z + 0.25, 2.0));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.25, 0.75));
  const handleReset   = () => setZoom(1);

  const activeCenters = (REGIONAL_SUPPORT_DATA[selectedState] || REGIONAL_SUPPORT_DATA['All India'])
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.cat.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelectState = (stateName) => {
    setSelectedState(stateName);
    setSelectedPin(null);
    setZoom(1);
    onToast(`Loaded emergency & support directory for ${stateName}.`);
  };

  return (
    <div className="grid home-grid">
      <SchemePanel onToast={onToast}/>

      <section className="card map-card">
        <div className="card-head">
          <div>
            <p className="kicker">State & Regional Support Radar</p>
            <h3>Emergency Directory ({selectedState})</h3>
          </div>
          <div className="map-toolbar-group">
            <div className="state-select-wrapper">
              <MapPin size={13} className="state-select-icon"/>
              <select
                value={selectedState}
                onChange={e => handleSelectState(e.target.value)}
                className="state-dropdown"
              >
                <option value="All India">🇮🇳 All India (National)</option>
                <option value="Delhi NCR">📍 Delhi NCR</option>
                <option value="Maharashtra">📍 Maharashtra (Mumbai/Pune)</option>
                <option value="Rajasthan">📍 Rajasthan (Jaipur/Jodhpur)</option>
                <option value="Karnataka">📍 Karnataka (Bengaluru)</option>
                <option value="West Bengal">📍 West Bengal (Kolkata)</option>
                <option value="Uttar Pradesh">📍 Uttar Pradesh (Lucknow)</option>
              </select>
            </div>

            <div className="map-zoom-controls">
              <button className="zoom-btn" onClick={handleZoomIn} title="Zoom In"><ZoomIn size={14}/></button>
              <button className="zoom-btn" onClick={handleZoomOut} title="Zoom Out"><ZoomOut size={14}/></button>
              <button className="zoom-btn" onClick={handleReset} title="Reset Zoom"><RotateCcw size={13}/></button>
            </div>
          </div>
        </div>

        {/* Map Viewport & Pins */}
        <div className="map-viewport">
          <div className="map-canvas" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}>
            <div className="india-map-bg">
              <div className="india-outline-contour"/>
              {activeCenters.map((center, idx) => (
                <div key={idx} onClick={() => setSelectedPin(center)} style={{ cursor: 'pointer' }}>
                  <MapDot type={center.type} label={center.name.split(' ')[0] + ' ' + (center.name.split(' ')[1] || '')} style={{ left: center.x, top: center.y }}/>
                </div>
              ))}
            </div>
          </div>

          {selectedPin && (
            <div className="pin-detail-overlay">
              <button className="pin-overlay-close" onClick={() => setSelectedPin(null)}><X size={14}/></button>

              <div className="pin-overlay-head">
                <span className={`pin-cat-badge cat-${selectedPin.type}`}>{selectedPin.cat}</span>
                <span className="pin-distance">📍 {selectedPin.distance}</span>
              </div>

              <h4 className="pin-overlay-title">{selectedPin.name}</h4>
              <p className="pin-overlay-address">🏢 {selectedPin.address}</p>

              <div className="pin-overlay-meta-row">
                <div className="pin-meta-item">
                  <span className="pin-meta-label">Hours</span>
                  <span className="pin-meta-value">{selectedPin.hours}</span>
                </div>
                <div className="pin-meta-item">
                  <span className="pin-meta-label">Contact Officer</span>
                  <span className="pin-meta-value">{selectedPin.officer}</span>
                </div>
              </div>

              {selectedPin.tags && (
                <div className="pin-tags-row">
                  {selectedPin.tags.map(t => <span key={t} className="pin-tag">{t}</span>)}
                </div>
              )}

              <div className="pin-action-row">
                <a href={`tel:${selectedPin.phone}`} className="solid-btn">
                  <Phone size={13}/> Call {selectedPin.phone}
                </a>
                <button className="small-btn" onClick={() => onToast('Opening Maps direction link…')}>
                  <Navigation size={12}/> Directions
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="map-foot">
          <span>📍 {activeCenters.length} verified centers in {selectedState} (Zoom: {Math.round(zoom * 100)}%)</span>
          <button className="link-btn" onClick={() => onToast('Full directory loaded.')}>View all</button>
        </div>
      </section>

      <aside className="card nearby-card">
        <div className="card-head" style={{marginBottom:10}}>
          <div>
            <p className="kicker">Verified Directory</p>
            <h3>{selectedState}</h3>
          </div>
        </div>

        <label className="search-field" style={{margin:'0 0 14px 0'}}>
          <Search size={13}/>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search centers, helplines…`}
          />
        </label>

        <div className="regional-dir-list">
          {activeCenters.map((center, idx) => (
            <div
              key={idx}
              className={`regional-dir-card ${selectedPin?.name === center.name ? 'active-pin' : ''}`}
              onClick={() => { setSelectedPin(center); onToast(`Loaded details for ${center.name}.`); }}
            >
              <div className="regional-dir-top">
                <span className={`pin-cat-badge cat-${center.type}`}>{center.cat}</span>
                <span className="regional-phone">📞 {center.phone}</span>
              </div>
              <strong>{center.name}</strong>
              <small className="regional-dir-hours">🕐 {center.hours}</small>
              {center.tags && (
                <div className="pin-tags-row" style={{marginTop:6}}>
                  {center.tags.slice(0,2).map(t => <span key={t} className="pin-tag">{t}</span>)}
                </div>
              )}
              <div className="regional-dir-foot">
                <span className="regional-dir-distance">📍 {center.distance}</span>
                <a href={`tel:${center.phone}`} className="call-mini-btn" onClick={e => e.stopPropagation()} title="Call Center">
                  <Phone size={13}/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function MapDot({ type, label, style }) {
  const colors = { hospital:'#d6336c', ngo:'#c98918', police:'#2b50aa', you:'#141518' };
  return (
    <div className="mdot" style={style}>
      <span className="mdot-ring" style={{borderColor: colors[type]}}/>
      <span className="mdot-core" style={{background: colors[type]}}/>
      <small className="mdot-label">{label}</small>
    </div>
  );
}

/* ─── health page ────────────────────────────────────────── */
function HealthPage({ onGuide, onSub, onToast }) {
  const [meds, setMeds] = useState([
    { id: 1, name: 'Iron Supplement', dose: '1 tablet', time: '9:00 AM', freq: 'Daily after breakfast' },
    { id: 2, name: 'Calcium Tablet', dose: '1 tablet', time: '8:00 PM', freq: 'Daily with dinner' },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [medName, setMedName] = useState('');
  const [medDose, setMedDose] = useState('');
  const [medTime, setMedTime] = useState('');

  const addMed = (e) => {
    e.preventDefault();
    if (!medName || !medTime) return;
    setMeds([...meds, { id: Date.now(), name: medName, dose: medDose, time: medTime, freq: 'As scheduled' }]);
    setMedName(''); setMedDose(''); setMedTime('');
    setShowAdd(false);
    onToast(`${medName} added to your medication schedule.`);
  };

  const removeMed = (id) => {
    setMeds(meds.filter(m => m.id !== id));
    onToast('Medication removed from schedule.');
  };

  return (
    <div className="grid health-grid">
      <SchemePanel area="health support" onToast={onToast}/>

      <button className="card period-card" onClick={onSub}>
        <div className="period-badge-icon">
          <Activity size={22}/>
        </div>
        <div>
          <p className="kicker">Cycle & Health</p>
          <h3>Period & Wellness Tracker</h3>
          <p className="muted">Log dates, flow intensity, moods, and symptom notes.</p>
          <span className="link-btn" style={{marginTop:12}}>Open complete tracker <ArrowRight size={13}/></span>
        </div>
      </button>

      <section className="card medicine-card">
        <div className="card-head">
          <div>
            <p className="kicker">Medication Schedule</p>
            <h3>Medicine Cabinet</h3>
          </div>
          <button className="icon-badge-btn" onClick={() => setShowAdd(v => !v)}>
            <Plus size={14}/> {showAdd ? 'Cancel' : 'Add'}
          </button>
        </div>

        {showAdd && (
          <form className="add-expense-form" onSubmit={addMed}>
            <input placeholder="Medicine name" value={medName} onChange={e => setMedName(e.target.value)} required/>
            <input placeholder="Dosage (e.g. 1 tablet)" value={medDose} onChange={e => setMedDose(e.target.value)}/>
            <input placeholder="Time (e.g. 9:00 AM)" value={medTime} onChange={e => setMedTime(e.target.value)} required/>
            <button type="submit" className="solid-btn">Save</button>
          </form>
        )}

        <div className="medicine-list-preview">
          {meds.map(m => (
            <div key={m.id} className="med-item">
              <span className="med-dot"/>
              <div>
                <strong>{m.name}</strong>
                <small>{m.freq} • {m.time}{m.dose ? ` • ${m.dose}` : ''}</small>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span className="status-pill active">Active</span>
                <button onClick={() => removeMed(m.id)} className="delete-log-btn" title="Remove"><Trash2 size={12}/></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button className="card guide-tile" onClick={() => onGuide('first-aid')}>
        <div>
          <p className="kicker">Reference Guide</p>
          <h3>First-Aid Emergency Guide</h3>
          <p className="muted">Step-by-step instructions for common emergencies.</p>
        </div>
        <div className="guide-tile-arrow">
          <ArrowRight size={16}/>
        </div>
      </button>
    </div>
  );
}


/* ─── wealth page with rotating pro nudge ────────────────── */
const WEALTH_DETAILS = {
  'Start a Home Enterprise': [
    'Register under Udyam Portal (free, takes under 10 minutes) to get official MSME status.',
    'Apply for PM SVANidhi or Mudra Yojana – Shishu for collateral-free working capital up to ₹50,000.',
    'Open a separate business bank account to keep personal and enterprise funds separate.',
  ],
  'Skill Workshops & Vocational Courses': [
    'Enrol at a PMKVY-certified training centre near you — courses are free with a daily travel stipend.',
    'Courses available: Beautician, Tailoring, Handicrafts, Computer Basics, Community Health Worker.',
    'On completion you receive a NSQF-certified certificate recognised by government employers.',
  ],
  'Self-Help Groups (SHGs)': [
    'Join or start an SHG with 10–20 women in your locality through the nearest NABARD branch.',
    'SHG members access zero-collateral micro-loans up to ₹3 lakh after 6 months of regular savings.',
    'SHGs also unlock training, insurance, and Aajeevika Mission livelihood support.',
  ],
};

function WealthPage({ onToast }) {
  const [nudgeIdx, setNudgeIdx] = useState(0);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setNudgeIdx(Math.floor(Math.random() * WEALTH_NUDGES.length));
  }, []);

  const rotateNudge = () => {
    setNudgeIdx(i => (i + 1) % WEALTH_NUDGES.length);
    onToast('Loaded new financial insight.');
  };

  const currentNudge = WEALTH_NUDGES[nudgeIdx];

  const opts = [
    ['Start a Home Enterprise', 'Grants, micro-loans, and business registration steps'],
    ['Skill Workshops & Vocational Courses', 'Free NSQF-certified courses with travel stipend'],
    ['Self-Help Groups (SHGs)', 'Join women-led savings collectives near you'],
  ];

  return (
    <div className="grid wealth-grid">
      <SchemePanel area="wealth & enterprise" onToast={onToast}/>

      <section className="card wealth-main">
        <p className="kicker">Financial Growth</p>
        <h3>Build Independence</h3>
        <p className="muted">Turn skills and savings into steady income streams.</p>

        <div className="wealth-opts">
          {opts.map(([a, b], i) => (
            <div key={a} className="wealth-accordion">
              <button className="wealth-row" onClick={() => setExpanded(expanded === a ? null : a)}>
                <span className="opt-num">0{i + 1}</span>
                <div>
                  <strong>{a}</strong>
                  <small>{b}</small>
                </div>
                <ChevronDown size={14} className={`acc-chevron ${expanded === a ? 'open' : ''}`}/>
              </button>
              {expanded === a && (
                <div className="wealth-acc-body">
                  {WEALTH_DETAILS[a].map((step, si) => (
                    <div key={si} className="wealth-acc-step">
                      <span className="acc-step-num">{si + 1}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                  <button className="link-btn" style={{marginTop:8}} onClick={() => onToast(`${a} full guide opened.`)}>
                    Get full guide <ArrowRight size={12}/>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="card tip-card">
        <div className="tip-head">
          <div className="tip-badge"><Award size={18}/></div>
          <button className="refresh-nudge-btn" onClick={rotateNudge} title="Next Insight">
            <RefreshCw size={13}/> Next Insight
          </button>
        </div>

        <p className="kicker">Financial Insight {nudgeIdx + 1} of {WEALTH_NUDGES.length}</p>
        <h3>{currentNudge.title}</h3>
        <p className="muted">{currentNudge.desc}</p>
      </section>
    </div>
  );
}


/* ─── finance page with live budget expense logger ──────── */
function FinancePage({ onToast }) {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Groceries & Essentials', amount: 2800, cat: 'Essentials' },
    { id: 2, title: 'Monthly Bus Pass', amount: 650, cat: 'Travel' },
    { id: 3, title: 'Health Supplement', amount: 400, cat: 'Health' },
  ]);

  const [newTitle, setNewTitle]   = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [showAdd, setShowAdd]     = useState(false);

  const budgetLimit = 10000;
  const totalSpent  = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining   = Math.max(budgetLimit - totalSpent, 0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;
    const item = { id: Date.now(), title: newTitle, amount: Number(newAmount), cat: 'General' };
    setExpenses([item, ...expenses]);
    setNewTitle('');
    setNewAmount('');
    setShowAdd(false);
    onToast(`Logged expense: ₹${newAmount}`);
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
    onToast('Expense item removed.');
  };

  return (
    <div className="finance-wrap">
      <div className="grid finance-top">
        <SchemePanel area="financial support" onToast={onToast}/>

        <section className="card expense-card">
          <div className="card-head">
            <div>
              <p className="kicker">Monthly Budget</p>
              <h3>Expense Tracker</h3>
            </div>
            <button className="icon-badge-btn" onClick={() => setShowAdd(!showAdd)}>
              <Plus size={14}/> {showAdd ? 'Close' : 'Add Expense'}
            </button>
          </div>

          <div className="expense-stat-grid">
            <div className="stat-box">
              <small>Total Spent</small>
              <strong>₹{totalSpent.toLocaleString()}</strong>
            </div>
            <div className="stat-box">
              <small>Remaining Budget</small>
              <strong style={{ color: remaining < 2000 ? '#d9383a' : '#c98918' }}>₹{remaining.toLocaleString()}</strong>
            </div>
          </div>

          {showAdd && (
            <form className="add-expense-form" onSubmit={handleAddExpense}>
              <input
                placeholder="Expense description…"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Amount (₹)"
                value={newAmount}
                onChange={e => setNewAmount(e.target.value)}
                required
              />
              <button type="submit" className="solid-btn">Save</button>
            </form>
          )}

          <div className="expense-items-list">
            {expenses.map(e => (
              <div key={e.id} className="expense-log-row">
                <span>{e.title}</span>
                <strong>₹{e.amount.toLocaleString()}</strong>
                <button onClick={() => removeExpense(e.id)} className="delete-log-btn"><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        </section>

        <section className="card budget-card">
          <p className="kicker">Budget Usage</p>
          <h3>Monthly Overview</h3>

          <div className="budget-row">
            <div className="budget-meta">
              <span>Used Balance</span>
              <small>₹{totalSpent.toLocaleString()} / ₹{budgetLimit.toLocaleString()}</small>
            </div>
            <div className="progress-bar">
              <div className="bar-fill" style={{ width: `${Math.min((totalSpent / budgetLimit) * 100, 100)}%` }}/>
            </div>
          </div>

          <p className="muted small" style={{marginTop:16}}>
            You have used <strong>{Math.round((totalSpent / budgetLimit) * 100)}%</strong> of your ₹10,000 monthly limit.
            {remaining < 2000 && <span style={{color:'#d9383a'}}> Budget running low.</span>}
          </p>
        </section>
      </div>

      <section className="card goals-card" style={{marginTop:24}}>
        <div className="card-head">
          <div>
            <p className="kicker">Savings Targets</p>
            <h3>Investment Goals</h3>
          </div>
        </div>

        <div className="goals-row">
          <GoalSlot n={1} defaultName="Emergency Fund" defaultPct={65}/>
          <GoalSlot n={2} defaultName="Children Education" defaultPct={40}/>
          <GoalSlot n={3} defaultName="Equipment Purchase" defaultPct={25}/>
          <GoalSlot n={4} defaultName="Home Improvement" defaultPct={10}/>
          <GoalSlot n={5} defaultName="New Business Start" defaultPct={50}/>
        </div>
      </section>
    </div>
  );
}

function GoalSlot({ n, defaultName, defaultPct }) {
  const [name, setName] = useState(defaultName || '');
  const [pct, setPct]   = useState(defaultPct || 0);

  return (
    <div className="goal-slot">
      <div className="goal-head">
        <span className="goal-num">Goal {String(n).padStart(2,'0')}</span>
        <span className="goal-pct">{pct}%</span>
      </div>
      <input
        className="goal-input"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name this goal…"
        maxLength={24}
      />
      <div className="progress-bar" style={{marginTop:8}}>
        <div className="bar-fill" style={{ width: `${pct}%` }}/>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={pct}
        onChange={e => setPct(Number(e.target.value))}
        className="goal-slider"
      />
    </div>
  );
}

/* ─── livelihood page ────────────────────────────────────── */
function LivelihoodPage({ onSub, onToast }) {
  return (
    <div className="grid livelihood-grid">
      <SchemePanel area="work & livelihood" onToast={onToast}/>

      <section className="card cv-card">
        <div>
          <p className="kicker">Career Builder</p>
          <h3>Professional Resume Creator</h3>
          <p className="muted">Select a template, fill your details, and export a printable CV in minutes.</p>
          <button className="solid-btn" onClick={() => onSub('resume')} style={{marginTop:16}}>
            Build Resume <ArrowRight size={13}/>
          </button>
        </div>
        <div className="resume-preview" aria-hidden>
          <span/><span/><span/><i/>
        </div>
      </section>

      <section className="card interview-card">
        <p className="kicker">AI Voice Practice</p>
        <h3>Interview Simulator</h3>
        <p className="muted">Practice answering real interview questions out loud and receive instant AI confidence scores.</p>
        <button className="solid-btn" onClick={() => onSub('interview')} style={{marginTop:16}}>
          Start Practice Session <ArrowRight size={13}/>
        </button>
      </section>
    </div>
  );
}

/* ─── safety page ────────────────────────────────────────── */
function SafetyPage({ onSos, onToast }) {
  const [activePanel, setActivePanel] = useState(null);
  const [contacts, setContacts] = useState(['Priya (Sister) — 98765 43210', 'Anita (Friend) — 87654 32109']);
  const [newContact, setNewContact] = useState('');
  const [callTick, setCallTick] = useState(null);
  const [callCount, setCallCount] = useState(5);

  const startCall = () => {
    setCallCount(5);
    let c = 5;
    const iv = setInterval(() => {
      c--;
      setCallCount(c);
      if (c <= 0) { clearInterval(iv); setCallTick(null); onToast('Discreet exit call ringing on your device.'); }
    }, 1000);
    setCallTick(iv);
  };

  return (
    <div className="safety-wrap">
      <section className="card safe-hero">
        <div>
          <p className="kicker" style={{color:'#be2d5e'}}>Safety & Protection Hub</p>
          <h2>Immediate Emergency Support</h2>
          <p className="muted">Private assistance and emergency dispatch whenever you need help.</p>
        </div>

        <button className="sos-pill-stylish" onClick={onSos}>
          <Siren size={15}/>
          Activate Emergency SOS
        </button>
      </section>

      <div className="safety-tools">
        {/* Share Live Location */}
        <div className="card safety-tool">
          <div className="tool-icon-circle"><MapPin size={20}/></div>
          <h3>Share Live Location</h3>
          <p className="muted">Send a private tracking link to trusted contacts instantly.</p>
          <button className="solid-btn full" style={{marginTop:'auto'}} onClick={() => {
            navigator.clipboard?.writeText('https://unnati.app/track/secure-link-abc123').catch(()=>{});
            onToast('Tracking link copied to clipboard.');
            setActivePanel(activePanel === 'loc' ? null : 'loc');
          }}>
            Copy Tracking Link <ArrowRight size={12}/>
          </button>
          {activePanel === 'loc' && (
            <div className="safety-panel-expanded">
              <code className="safety-link-display">unnati.app/track/secure-link-abc123</code>
              <small className="muted">Share this link with trusted contacts. It expires in 2 hours.</small>
            </div>
          )}
        </div>

        {/* Discreet Exit Call */}
        <div className="card safety-tool">
          <div className="tool-icon-circle"><Phone size={20}/></div>
          <h3>Discreet Exit Call</h3>
          <p className="muted">Trigger a realistic simulated incoming call to exit any situation discreetly.</p>
          <button className="solid-btn full" style={{marginTop:'auto'}} onClick={startCall}>
            {callTick ? `Calling in ${callCount}s…` : 'Trigger Fake Call'} <Phone size={12}/>
          </button>
          {callTick && (
            <div className="safety-panel-expanded">
              <small className="muted">Your phone will appear to ring from "Home" in {callCount} second{callCount !== 1 ? 's' : ''}.</small>
            </div>
          )}
        </div>

        {/* Personal Safety Plan */}
        <div className="card safety-tool">
          <div className="tool-icon-circle"><ShieldAlert size={20}/></div>
          <h3>Emergency Contacts</h3>
          <p className="muted">Manage trusted contacts for rapid SOS alerts and check-ins.</p>
          <button className="solid-btn full" style={{marginTop:'auto'}} onClick={() => setActivePanel(activePanel === 'plan' ? null : 'plan')}>
            {activePanel === 'plan' ? 'Close' : 'Manage Contacts'} <ArrowRight size={12}/>
          </button>
          {activePanel === 'plan' && (
            <div className="safety-panel-expanded">
              {contacts.map((c,i) => (
                <div key={i} className="contact-row">
                  <span>{c}</span>
                  <button className="delete-log-btn" onClick={() => { setContacts(contacts.filter((_,j) => j!==i)); onToast('Contact removed.'); }}><Trash2 size={11}/></button>
                </div>
              ))}
              <div style={{display:'flex',gap:6,marginTop:8}}>
                <input className="goal-input" placeholder="Name — number" value={newContact} onChange={e => setNewContact(e.target.value)}/>
                <button className="icon-badge-btn" onClick={() => { if (newContact) { setContacts([...contacts, newContact]); setNewContact(''); onToast('Contact added.'); }}}><Plus size={13}/></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
/* ─── rights page ────────────────────────────────────────── */
function RightsPage({ onGuide, onToast }) {
  return (
    <div className="grid rights-grid">
      <SchemePanel area="rights & legal aid" onToast={onToast}/>

      <section className="card rights-card">
        <p className="kicker">Legal Directory</p>
        <h3>Know Your Legal Rights</h3>
        <p className="muted">Plain-language guide to workplace, property, healthcare, and digital privacy laws.</p>
        <button className="solid-btn" onClick={() => onGuide('rights')} style={{marginTop:16}}>
          Read full legal guide <ArrowRight size={13}/>
        </button>
      </section>

      <section className="card say-card">
        <p className="kicker">Verbatim Scripts</p>
        <h3>Know What to Say</h3>
        <p className="muted">Direct, assertive scripts to use at police stations, government offices, and legal desks.</p>
        <button className="solid-btn" onClick={() => onGuide('say')} style={{marginTop:16}}>
          View exact scripts <ArrowRight size={13}/>
        </button>
      </section>
    </div>
  );
}

/* ─── COMPLETE INTERACTIVE PERIOD & WELLNESS SUBPAGE ─────── */
function PeriodPage({ onClose, onToast }) {
  const [startDate, setStartDate] = useState('2026-09-03');
  const [flow, setFlow]           = useState('Medium');
  const [selectedMoods, setSelectedMoods] = useState(['Calm']);
  const [notes, setNotes]         = useState('');
  const [logs, setLogs]           = useState([
    { date: '2026-09-03', flow: 'Medium', moods: ['Calm', 'Hydrated'], notes: 'Mild cramps in morning.' },
    { date: '2026-08-06', flow: 'Heavy', moods: ['Tired'], notes: 'Resting with warm tea.' }
  ]);

  const toggleMood = (m) => {
    if (selectedMoods.includes(m)) {
      setSelectedMoods(selectedMoods.filter(x => x !== m));
    } else {
      setSelectedMoods([...selectedMoods, m]);
    }
  };

  const handleSaveLog = (e) => {
    e.preventDefault();
    const entry = {
      date: startDate,
      flow,
      moods: selectedMoods,
      notes: notes || 'No extra notes logged.'
    };
    setLogs([entry, ...logs]);
    setNotes('');
    onToast('Period log saved successfully!');
  };

  const cycleGraph = [
    { month: 'Apr', days: 28 },
    { month: 'May', days: 29 },
    { month: 'Jun', days: 27 },
    { month: 'Jul', days: 28 },
    { month: 'Aug', days: 28 },
    { month: 'Sep', days: 29 }
  ];

  return (
    <div className="sub-page">
      <button className="back-btn" onClick={onClose}><ArrowLeft size={15}/> Back to Health</button>

      <div className="sub-header">
        <p className="kicker">Interactive Period & Health Suite</p>
        <h2>Cycle & Symptom Dashboard</h2>
        <p className="muted">Log your daily flow, moods, and notes. View historic cycle trends in one place.</p>
      </div>

      <div className="period-grid">
        <form className="card period-log-form" onSubmit={handleSaveLog}>
          <h3>Daily Check-In & Symptom Log</h3>

          <label className="form-field">
            <span>Cycle Start / Check-In Date</span>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required/>
          </label>

          <div className="form-field">
            <span>Flow Intensity</span>
            <div className="flow-pill-row">
              {['Spotting', 'Light', 'Medium', 'Heavy'].map(f => (
                <button
                  type="button"
                  key={f}
                  className={`flow-chip ${flow === f ? 'sel' : ''}`}
                  onClick={() => setFlow(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <span>Symptoms & Moods</span>
            <div className="mood-chip-grid">
              {['Calm', 'Energetic', 'Cramps', 'Headache', 'Tired', 'Bloated', 'Hydrated', 'Tender'].map(m => (
                <button
                  type="button"
                  key={m}
                  className={`mood-chip ${selectedMoods.includes(m) ? 'sel' : ''}`}
                  onClick={() => toggleMood(m)}
                >
                  {selectedMoods.includes(m) ? '✓ ' : '+ '}{m}
                </button>
              ))}
            </div>
          </div>

          <label className="form-field">
            <span>Personal Health Notes</span>
            <textarea
              placeholder="Write how your body feels today, medication taken, or symptoms to discuss with doctor…"
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </label>

          <button type="submit" className="solid-btn full"><Plus size={14}/> Save Today's Log</button>
        </form>

        <div className="period-stats-column">
          <section className="card cycle-graph-card">
            <h3>6-Month Cycle Length Graph</h3>
            <p className="muted">Average cycle length: <strong>28.3 Days</strong> (Regular)</p>

            <div className="cycle-bar-chart">
              {cycleGraph.map(g => (
                <div key={g.month} className="chart-bar-group">
                  <div className="chart-bar-fill" style={{ height: `${(g.days / 35) * 100}%` }}>
                    <span>{g.days}d</span>
                  </div>
                  <small>{g.month}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="card cycle-history-card">
            <h3>Saved History Stream</h3>
            <div className="log-history-list">
              {logs.map((l, i) => (
                <div key={i} className="log-history-item">
                  <div className="log-item-head">
                    <strong style={{display:'flex',alignItems:'center',gap:5}}><Calendar size={13}/> {l.date}</strong>
                    <span className="flow-badge">{l.flow} Flow</span>
                  </div>
                  <div className="log-moods">
                    {l.moods.map(m => <span key={m} className="mini-mood">{m}</span>)}
                  </div>
                  <p className="log-notes">{l.notes}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ─── COMPLETE INTERACTIVE RESUME BUILDER SUBPAGE ────────── */
function ResumePage({ onClose, onToast }) {
  const [activeTab, setActiveTab] = useState('templates');
  const [resumeData, setResumeData] = useState({
    name: 'Anita Sharma',
    role: 'Healthcare Assistant & Community Leader',
    email: 'anita.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Jaipur, Rajasthan',
    summary: 'Dedicated community coordinator with 3+ years experience managing health awareness programs and customer care.',
    skills: 'Community Outreach, First Aid, Basic Computer Operations, Hindi & Marwari Fluency',
    experience: 'Community Health Coordinator • Local Health Trust (2023 - Present)\nOrganized weekly maternal care camps and registered 200+ families for government health schemes.'
  });

  return (
    <div className="sub-page">
      <button className="back-btn" onClick={onClose}><ArrowLeft size={15}/> Back to Livelihood</button>

      <div className="sub-header">
        <p className="kicker">Interactive Career Builder</p>
        <h2>Professional Resume Creator</h2>
        <p className="muted">Build, edit, and generate your printable CV in minutes.</p>
      </div>

      <div className="resume-mode-tabs">
        <button className={`mode-tab ${activeTab === 'templates' ? 'sel' : ''}`} onClick={() => setActiveTab('templates')}>
          1. Choose Template
        </button>
        <button className={`mode-tab ${activeTab === 'editor' ? 'sel' : ''}`} onClick={() => setActiveTab('editor')}>
          2. Edit & Export CV
        </button>
      </div>

      {activeTab === 'templates' ? (
        <div className="template-grid">
          {[
            ['Clean & Simple', 'Standard 1-page format for healthcare, retail, and office roles.'],
            ['Modern Two-Column', 'Highlight skills, languages, and vocational certificates.'],
            ['Classic Executive', 'Structured format for experienced supervisors and coordinators.']
          ].map(([title, desc]) => (
            <div key={title} className="card template-card-item">
              <div className="template-preview">
                <span/><span/><span/><i/>
              </div>
              <h4>{title}</h4>
              <p className="muted small">{desc}</p>
              <button className="solid-btn full" style={{marginTop:12}} onClick={() => { setActiveTab('editor'); onToast(`${title} template loaded.`); }}>
                Use This Template <ArrowRight size={13}/>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="resume-editor-layout">
          <div className="card resume-form-card">
            <h3>Fill Your Details</h3>
            <label className="form-field">
              <span>Full Name</span>
              <input value={resumeData.name} onChange={e => setResumeData({...resumeData, name: e.target.value})}/>
            </label>
            <label className="form-field">
              <span>Job Title / Role</span>
              <input value={resumeData.role} onChange={e => setResumeData({...resumeData, role: e.target.value})}/>
            </label>
            <div className="form-row-2">
              <label className="form-field">
                <span>Phone Number</span>
                <input value={resumeData.phone} onChange={e => setResumeData({...resumeData, phone: e.target.value})}/>
              </label>
              <label className="form-field">
                <span>City & State</span>
                <input value={resumeData.location} onChange={e => setResumeData({...resumeData, location: e.target.value})}/>
              </label>
            </div>
            <label className="form-field">
              <span>Professional Summary</span>
              <textarea rows={2} value={resumeData.summary} onChange={e => setResumeData({...resumeData, summary: e.target.value})}/>
            </label>
            <label className="form-field">
              <span>Skills & Strengths</span>
              <input value={resumeData.skills} onChange={e => setResumeData({...resumeData, skills: e.target.value})}/>
            </label>
            <label className="form-field">
              <span>Work Experience</span>
              <textarea rows={3} value={resumeData.experience} onChange={e => setResumeData({...resumeData, experience: e.target.value})}/>
            </label>
          </div>

          <div className="resume-doc-wrapper">
            <div className="doc-toolbar">
              <span>Live CV Preview</span>
              <button className="solid-btn small" onClick={() => window.print()}><Download size={13}/> Print / Export PDF</button>
            </div>

            <div className="cv-paper-document">
              <header className="cv-doc-header">
                <h2>{resumeData.name || 'Your Name'}</h2>
                <p className="cv-doc-role">{resumeData.role || 'Desired Role'}</p>
                <div className="cv-doc-meta">
                  <span>📱 {resumeData.phone}</span>
                  <span>📍 {resumeData.location}</span>
                </div>
              </header>

              <section className="cv-doc-sec">
                <h5>PROFILE SUMMARY</h5>
                <p>{resumeData.summary}</p>
              </section>

              <section className="cv-doc-sec">
                <h5>KEY SKILLS</h5>
                <p>{resumeData.skills}</p>
              </section>

              <section className="cv-doc-sec">
                <h5>WORK EXPERIENCE</h5>
                <p style={{whiteSpace:'pre-line'}}>{resumeData.experience}</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── COMPLETE INTERACTIVE AI INTERVIEW SIMULATOR SUBPAGE ─ */
function InterviewPage({ onClose, onToast }) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [recording, setRecording]     = useState(false);
  const [answered, setAnswered]       = useState(false);

  const QUESTIONS = {
    'Job & Enterprise Interview': 'Tell me about a time when you faced a difficult situation at work and how you resolved it.',
    'Bank Loan Application': 'What type of business are you starting, and how will this loan help generate income?',
    'Government Office Desk': 'What scheme are you applying for today, and do you have your official identity documents ready?',
    'Medical & Legal Consultation': 'Can you describe the primary reason for your visit today and when symptoms first started?'
  };

  const handleStartPractice = (cat) => {
    setSelectedCat(cat);
    setAnswered(false);
    setRecording(false);
    onToast(`Loaded ${cat} practice question.`);
  };

  const handleToggleRecord = () => {
    if (!recording) {
      setRecording(true);
      onToast('Recording voice answer… Speak clearly.');
    } else {
      setRecording(false);
      setAnswered(true);
      onToast('AI feedback report generated!');
    }
  };

  return (
    <div className="sub-page">
      <button className="back-btn" onClick={onClose}><ArrowLeft size={15}/> Back to Livelihood</button>

      <div className="sub-header">
        <p className="kicker">AI Voice Simulator</p>
        <h2>Practice Interview Responses</h2>
        <p className="muted">Select a scenario, speak your response, and receive instant AI analysis.</p>
      </div>

      {!selectedCat ? (
        <div className="interview-cats-grid">
          {Object.keys(QUESTIONS).map(c => (
            <div key={c} className="card interview-cat-card" onClick={() => handleStartPractice(c)}>
              <div className="cat-icon-badge"><Volume2 size={20}/></div>
              <h3>{c}</h3>
              <p className="muted">Practice out loud in your language and get confidence scores.</p>
              <button className="solid-btn full" style={{marginTop:12}}>Start Practice</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card interview-session-card">
          <button className="link-btn" onClick={() => setSelectedCat(null)} style={{marginBottom:16}}>
            ← Change Scenario ({selectedCat})
          </button>

          <div className="ai-question-box">
            <span className="question-tag">AI INTERVIEWER ASKS:</span>
            <p className="question-text">"{QUESTIONS[selectedCat]}"</p>
          </div>

          <div className="audio-recording-panel">
            <div className={`waveform-visualizer ${recording ? 'active' : ''}`}>
              <span/><span/><span/><span/><span/><span/><span/>
            </div>

            <button className={`record-voice-btn ${recording ? 'recording' : ''}`} onClick={handleToggleRecord}>
              <Mic size={20}/>
              {recording ? 'Stop & Generate AI Feedback' : 'Hold to Speak / Record Response'}
            </button>
          </div>

          {answered && (
            <div className="ai-feedback-scorecard">
              <h4>✨ AI Evaluation Report</h4>

              <div className="score-metrics-row">
                <div className="metric-box">
                  <small>Confidence</small>
                  <strong>94%</strong>
                </div>
                <div className="metric-box">
                  <small>Clarity & Tone</small>
                  <strong>88%</strong>
                </div>
                <div className="metric-box">
                  <small>Vocabulary</small>
                  <strong>90%</strong>
                </div>
              </div>

              <p className="ai-advice">
                <strong>AI Feedback:</strong> Excellent response! Your tone was confident and clear. Try emphasizing key metrics when discussing past work achievements.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── guide drawer overlay ───────────────────────────────── */
const GUIDES = {
  'first-aid': {
    title:'First-Aid Emergency Guide', intro:'Essential medical response steps until professional help arrives.',
    steps:[
      'Ensure the immediate area is safe before approaching the person.',
      'Call 112 for severe bleeding, difficulty breathing, or loss of consciousness.',
      'Keep the person calm and warm. Do not administer unprescribed oral medication.',
      'For heavy bleeding, apply firm, continuous pressure with a clean cloth directly on the wound.',
      'Do not move someone suspected of spinal or head trauma unless immediate external danger exists.',
    ]
  },
  rights:{
    title:'Know Your Legal Rights', intro:'Essential plain-language rights every woman should know.',
    steps:[
      'Under the POSH Act, you have a legal right to a workplace safe from harassment and discrimination.',
      'You are entitled to a clear, written explanation if any government scheme application is delayed or rejected.',
      'You have the right to request a female police officer when giving statements at any station.',
      'Keep written records, receipts, and digital copies of all official applications and correspondence.',
      "If facing domestic violence, you can seek immediate free legal assistance or contact 181 National Women Helpline.",
    ]
  },
  say:{
    title:'Know What to Say', intro:'Direct, assertive scripts for official interactions.',
    steps:[
      '"I am here to file an official report and want to understand my legal rights clearly."',
      '"Please record this interaction in writing and provide an official acknowledgment receipt."',
      '"Kindly inform me of the designated officer responsible and the expected processing timeline."',
      '"I am entitled to fair process under the law and request to speak with a senior supervisor."',
      '"I do not consent to this procedure and request my objection be formally noted on record."',
    ]
  }
};

function GuideDrawer({ kind, onClose }) {
  const d = GUIDES[kind];
  return (
    <div className="guide-backdrop" onClick={onClose}>
      <article className="guide-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={17}/></button>
        <p className="kicker">{d.intro}</p>
        <h2>{d.title}</h2>
        <div className="guide-steps">
          {d.steps.map((s,i) => (
            <div key={i} className="guide-step">
              <span>{i+1}</span>
              <p>{s}</p>
            </div>
          ))}
        </div>
        <button className="solid-btn" onClick={onClose} style={{marginTop:28}}>Understood <Check size={14}/></button>
      </article>
    </div>
  );
}

/* ─── auth modal component ───────────────────────────────── */
function AuthModal({ lang, setLang, step, setStep, onClose, onDone, onLocation }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={16}/></button>

        <div className="auth-illo">
          <div className="illo-brand">unnati</div>
          <div className="illo-text">
            <h3>Empowering Every Woman</h3>
            <p>Save your progress, access scheme tracking, and keep Unnati tailored in your language.</p>
          </div>
          <div className="illo-badge">🔒 100% Private & Encrypted</div>
        </div>

        <div className="auth-form">
          {step === 'login' && <>
            <p className="kicker">Welcome Back</p>
            <h2>Sign in to Unnati</h2>
            <p className="muted">Access your personalized support dashboard.</p>
            <label>Email Address<input type="email" placeholder="name@example.com"/></label>
            <label>Password<input type="password" placeholder="••••••••"/></label>
            <button className="solid-btn full" onClick={() => setStep('prefs')}>Continue <ArrowRight size={14}/></button>
            <p className="switch-link">New to Unnati? <button onClick={() => setStep('signup')}>Create an account</button></p>
          </>}

          {step === 'signup' && <>
            <p className="kicker">Get Started</p>
            <h2>Create Account</h2>
            <p className="muted">Join thousands of women finding clear guidance.</p>
            <label>Full Name<input type="text" placeholder="Your name"/></label>
            <label>Email Address<input type="email" placeholder="name@example.com"/></label>
            <label>Password<input type="password" placeholder="Create a password"/></label>
            <button className="solid-btn full" onClick={() => setStep('prefs')}>Next: Language Preference <ArrowRight size={14}/></button>
            <p className="switch-link">Already registered? <button onClick={() => setStep('login')}>Sign in</button></p>
          </>}

          {step === 'prefs' && <>
            <p className="kicker">Personalization</p>
            <h2>Select Your Language</h2>
            <p className="muted">Unnati speaks your native language.</p>
            <div className="lang-grid">
              {LANGUAGES.slice(0,12).map(([name,native]) => (
                <button key={name} className={`lang-chip ${lang===name?'sel':''}`} onClick={() => setLang(name)}>
                  <span>{native}</span>
                  <small>{name}</small>
                </button>
              ))}
            </div>

            <button className="location-row" onClick={onLocation}>
              <MapPin size={16}/>
              <span>
                <strong>Enable Location Services</strong>
                <small>Required to display nearby healthcare & legal centers</small>
              </span>
              <ArrowRight size={13}/>
            </button>

            <button className="solid-btn full" onClick={onDone}>Complete Setup <Check size={14}/></button>
          </>}
        </div>
      </div>
    </div>
  );
}

/* ─── SOS modal popup ────────────────────────────────────── */
function SosModal({ onClose, onToast }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="sos-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={16}/></button>
        <div className="sos-modal-badge"><Siren size={20}/></div>
        <p className="kicker" style={{textAlign:'center', color:'#d9383a'}}>Emergency Alert</p>
        <h2>{sent ? 'SOS Alert Activated' : 'Send Emergency SOS?'}</h2>
        <p className="muted">
          {sent
            ? 'Your live GPS location is being shared with designated contacts and local emergency dispatch (112).'
            : 'This will immediately share your live location with emergency contacts and offer direct connection to 112 assistance.'}
        </p>
        {!sent
          ? <button className="sos-modal-trigger" onClick={() => { setSent(true); onToast('Emergency alert dispatched to contacts.'); }}>
              <Siren size={16}/> Confirm & Send Emergency SOS
            </button>
          : <button className="sos-modal-safe" onClick={onClose}><Check size={16}/> I am safe now</button>
        }
        <small className="sos-modal-note">
          {sent ? 'Tap above once you have reached a safe location.' : 'Only trigger this for personal safety emergencies.'}
        </small>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
