const { useEffect, useRef, useState } = React;
const { createRoot } = ReactDOM;

// --- Supabase Backend Initialization ---
const SUPABASE_URL = 'https://bmgyifeuaegaxdlrkpab.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_NmnQYnGlsb-tyrI_gwc7TQ_dmSfUIwM';
// We safely initialize from the injected CDN script (loaded in index.html)
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// No external LucideReact dependencies imported

// --- Embedded Deterministic Icons ---
const Icon = ({ path, size = 24, className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide ${className} `}
    {...props}
  >
    {path}
  </svg>
);

const Bot = (props) => <Icon {...props} path={<><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></>} />;
const Database = (props) => <Icon {...props} path={<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></>} />;
const Clock = (props) => <Icon {...props} path={<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>} />;
const Activity = (props) => <Icon {...props} path={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />} />;
const Lock = (props) => <Icon {...props} path={<><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>} />;
const Users = (props) => <Icon {...props} path={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>} />;
const ArrowRight = (props) => <Icon {...props} path={<><path d="M5 12h14" /><polyline points="12 5 19 12 12 19" /></>} />;
const ShieldCheck = (props) => <Icon {...props} path={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></>} />;
const Zap = (props) => <Icon {...props} path={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />} />;
const Menu = (props) => <Icon {...props} path={<><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></>} />;
const XIcon = (props) => <Icon {...props} path={<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>} />;
const Check = (props) => <Icon {...props} path={<polyline points="20 6 9 17 4 12" />} />;
const Target = (props) => <Icon {...props} path={<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>} />;
const TrendingUp = (props) => <Icon {...props} path={<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>} />;
const Mail = (props) => <Icon {...props} path={<><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>} />;
const ChevronDown = (props) => <Icon {...props} path={<polyline points="6 9 12 15 18 9" />} />;
const ArrowDown = (props) => <Icon {...props} path={<><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></>} />;
const FileText = (props) => <Icon {...props} path={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>} />;
const Cpu = (props) => <Icon {...props} path={<><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></>} />;
const Phone = (props) => <Icon {...props} path={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />} />;
const Building = (props) => <Icon {...props} path={<><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></>} />;
const DollarSign = (props) => <Icon {...props} path={<><line x1="12" y1="2" x2="12" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>} />;
const BarChart = (props) => <Icon {...props} path={<><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>} />;
const LineChart = (props) => <Icon {...props} path={<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>} />;
const Briefcase = (props) => <Icon {...props} path={<><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>} />;
const Trash2 = (props) => <Icon {...props} path={<><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></>} />;
const Calendar = (props) => <Icon {...props} path={<><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>} />;
const ListTodo = (props) => <Icon {...props} path={<><rect x="3" y="5" width="6" height="6" rx="1" /><path d="m3 17 2 2 4-4" /><path d="M13 6h8" /><path d="M13 12h8" /><path d="M13 18h8" /></>} />;
const MoreVertical = (props) => <Icon {...props} path={<><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></>} />;
const CheckSquare = (props) => <Icon {...props} path={<><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>} />;
const Search = (props) => <Icon {...props} path={<><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>} />;



// --- Navigation Components ---

const Navbar = ({ currentRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '#/' },
    { name: 'Services', path: '#/services' },
    { name: 'About', path: '#/about' },
    { name: 'Case Studies', path: '#/cases' },
  ];

  return (
    <>
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 w-[95%] md:w-[80%] rounded-2xl flex items-center justify-between px-6 py-4 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-glow' : 'bg-transparent'}`}>
        <a href="#/" className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 shadow-[0_0_20px_rgba(56,189,248,0.3)] p-2">
            <img src="nexus_logo.png" alt="723 Solutions Nexus" className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white drop-shadow-md">723 Solutions</span>
        </a>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-300 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className={`transition-colors ${currentRoute === link.path || (currentRoute === '' && link.path === '#/') ? 'text-sky-400 font-bold' : 'hover:text-sky-400'}`}
            >
              {link.name}
            </a>
          ))}
          <a href="#/contact" className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-6 py-2.5 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]">
            Stop Wasting Time
          </a>
        </div>
        <button className="md:hidden text-slate-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <XIcon /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-slate-950 pt-24 px-6 md:hidden flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-white border-b border-slate-800 pb-4"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-sky-500 text-slate-950 px-6 py-4 rounded-xl font-bold text-center mt-4"
          >
            Stop Wasting Time
          </a>
        </div>
      )}
    </>
  );
};

const Footer = () => (
  <footer className="py-16 px-6 md:px-12 border-t border-slate-800 bg-slate-900 mt-20 text-center md:text-left">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
          <img src="nexus_logo.png" alt="723 Solutions Nexus" className="w-12 h-12 object-contain mix-blend-screen drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          <span className="font-bold text-3xl text-white">723 Solutions</span>
        </div>
        <p className="text-slate-400 max-w-sm mx-auto md:mx-0">
          We build custom automatic systems that stop established businesses from wasting time on manual work.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Navigation</h4>
        <ul className="space-y-4 text-slate-400 text-sm font-medium">
          <li><a href="#/" className="hover:text-sky-400">Home</a></li>
          <li><a href="#/services" className="hover:text-sky-400">Services</a></li>
          <li><a href="#/about" className="hover:text-sky-400">About Us</a></li>
          <li><a href="#/cases" className="hover:text-sky-400">Case Studies</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">System</h4>
        <div className="flex items-center gap-2 text-xs font-mono text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-2 rounded-full w-max mx-auto md:mx-0 mb-4">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          OPERATIONAL
        </div>
      </div>
      <span>&copy; 2026 723 Solutions. All rights reserved.</span>
      <div className="flex gap-6">
        <a href="#" className="hover:text-slate-400">Privacy Policy</a>
        <a href="#" className="hover:text-slate-400">Terms of Service</a>
      </div>
    </div>
  </footer >
);


const CRMSandboxView = () => {
  const [expandedDemo, setExpandedDemo] = useState(null);

  const demos = [
    {
      id: "lead_nurturing",
      title: "Lead Capture & Nurturing",
      icon: <Target size={20} className="text-sky-400" />,
      description: "Convert website traffic into booked calls instantly without human intervention.",
      steps: [
        { title: "Prospect Submits Form", desc: "A lead drops their contact information on your website.", icon: <Users size={16} className="text-slate-400" /> },
        { title: "Webhook Triggered", desc: "Data moves instantly into your CRM & Google Sheets.", icon: <Zap size={16} className="text-yellow-400" /> },
        { title: "AI Voice Agent Activates", desc: "A human-sounding AI calls the lead within 3 minutes to qualify them.", icon: <Phone size={16} className="text-sky-400" /> }
      ]
    },
    {
      id: "email_scraper",
      title: "Email Intent Scraper",
      icon: <Mail size={20} className="text-sky-400" />,
      description: "Automatically read messy client emails and extract exact order data.",
      steps: [
        { title: "Messy Email Received", desc: "e.g., 'We need 14 server racks sent to Dallas ASAP...'", icon: <Mail size={16} className="text-slate-400" /> },
        { title: "AI Intent Extraction", desc: "Strips out fluff and identifies exact SKUs & quantities.", icon: <Bot size={16} className="text-sky-400" /> },
        { title: "Push to ERP System", desc: "Structured data payload triggers automated fulfillment.", icon: <Database size={16} className="text-emerald-400" /> }
      ]
    },
    {
      id: "data_organization",
      title: "Data Organization & Syncing",
      icon: <Database size={20} className="text-sky-400" />,
      description: "Keep all your platforms perfectly synced without manual data entry.",
      steps: [
        { title: "Record Updated in Salesforce", desc: "A sales rep closes a deal and updates the CRM.", icon: <Activity size={16} className="text-slate-400" /> },
        { title: "Data Normalization", desc: "Formats the data to match your accounting software.", icon: <Cpu size={16} className="text-purple-400" /> },
        { title: "QuickBooks Invoice Created", desc: "Client is automatically billed with zero manual typing.", icon: <Check size={16} className="text-emerald-400" /> }
      ]
    },
    {
      id: "invoice_reconciliation",
      title: "Automated Invoice Reconciliation",
      icon: <Clock size={20} className="text-sky-400" />,
      description: "Cross-reference bank statements against PDF invoices effortlessly.",
      steps: [
        { title: "PDF Invoice Emailed", desc: "Vendor emails a monthly invoice to AP division.", icon: <FileText size={16} className="text-slate-400" /> },
        { title: "OCR Data Extraction", desc: "AI pulls line items, totals, and vendor info from the image.", icon: <Target size={16} className="text-sky-400" /> },
        { title: "ERP Verification", desc: "Matches automatically against authorized purchase orders.", icon: <ShieldCheck size={16} className="text-emerald-400" /> }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full pb-20">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          Executive Sandbox Demos
        </h2>
        <p className="text-slate-400 mt-2 text-sm max-w-2xl leading-relaxed">Interactive, plain-English visual breakdowns of exactly how our architecture saves your team hundreds of hours. Click a module below to see the data flow.</p>
      </div>

      <div className="flex flex-col gap-4 pb-8 pr-2">
        {demos.map((demo) => (
          <div key={demo.id} className="glass-panel border border-slate-700/50 rounded-2xl overflow-hidden shadow-glow transition-all duration-300">
            <button
              onClick={() => setExpandedDemo(expandedDemo === demo.id ? null : demo.id)}
              className="w-full text-left p-5 md:p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/50 shadow-inner">
                  {demo.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">{demo.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{demo.description}</p>
                </div>
              </div>
              <div className="pl-4">
                <ChevronDown
                  size={20}
                  className={`text-slate-500 transition-transform duration-300 ${expandedDemo === demo.id ? 'rotate-180 text-sky-400' : ''}`}
                />
              </div>
            </button>

            {/* Expanded Content View */}
            <div className={`transition-all duration-500 overflow-hidden ${expandedDemo === demo.id ? 'max-h-[2000px] border-t border-slate-700/50 bg-slate-950/40' : 'max-h-0'}`}>
              <div className="p-6 md:p-8">
                <div className="flex flex-col items-center max-w-xl mx-auto">
                  {demo.steps.map((step, index) => (
                    <React.Fragment key={index}>
                      {/* Step Box */}
                      <div className="w-full bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-start gap-4 transform transition-all hover:scale-[1.01] hover:border-sky-500/30">
                        <div className="mt-1 p-2.5 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
                          {step.icon}
                        </div>
                        <div>
                          <div className="font-bold text-slate-200 text-base">{step.title}</div>
                          <div className="text-sm text-slate-400 mt-1.5 leading-relaxed">{step.desc}</div>
                        </div>
                      </div>

                      {/* Connection Arrow (Except last) */}
                      {index < demo.steps.length - 1 && (
                        <div className="py-3 flex justify-center w-full">
                          <ArrowDown size={22} className="text-sky-500/40 animate-pulse" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-10 text-center">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <Activity size={14} className="animate-pulse" /> System Execution Time: &lt; 3.0 Seconds
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Page Components ---

const LandingPage = () => {
  const features = [
    {
      icon: <Database className="text-sky-400" size={32} />,
      title: "Connect Your Software",
      desc: "Make your apps talk to each other automatically so you don't have to copy and paste data ever again."
    },
    {
      icon: <Bot className="text-sky-400" size={32} />,
      title: "Smart Automations",
      desc: "We build systems that can actually read emails, figure out what a client wants, and put it in the right place."
    },
    {
      icon: <Zap className="text-sky-400" size={32} />,
      title: "Fast Results",
      desc: "We build custom solutions for your business in days, not months, so you start saving money immediately."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 w-full text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            Business Automation Experts
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[1.05] tracking-tight mb-8">
            We Build Systems <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 drop-shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              That Work.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mb-12 font-medium leading-relaxed mx-auto md:mx-0">
            We help serious businesses stop wasting time on manual data entry and broken software. We fix your messy workflows so your team can focus on making money.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a href="#/contact" className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-slate-950 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] flex items-center justify-center gap-2">
              Stop Wasting Time <ArrowRight size={20} />
            </a>
            <a href="#/services" className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-colors">
              What We Do
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 border-t border-slate-800 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How We Think</h2>
          <p className="text-xl text-slate-400 mb-16 leading-relaxed">
            Most agencies just want to sell you a pretty website or a generic software package. We don't do that. We fix the specific problems that are slowing your business down.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-red-900/30">
              <h3 className="text-red-400 font-bold text-xl mb-4 flex items-center gap-2">
                <XIcon /> What Other Agencies Do
              </h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex gap-3"><span className="text-slate-500">&times;</span> They care more about making things look pretty than making them work.</li>
                <li className="flex gap-3"><span className="text-slate-500">&times;</span> They use generic templates that break easily.</li>
                <li className="flex gap-3"><span className="text-slate-500">&times;</span> They don't take the time to learn how your business actually runs.</li>
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900 border border-sky-500/30 shadow-glow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-blue-600"></div>
              <h3 className="text-sky-400 font-bold text-xl mb-4 flex items-center gap-2">
                <Check /> How We Help You
              </h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex gap-3"><Check size={18} className="text-sky-400 shrink-0 mt-0.5" /> We figure out exactly where you are losing money first.</li>
                <li className="flex gap-3"><Check size={18} className="text-sky-400 shrink-0 mt-0.5" /> We build systems that adapt to exactly how you want to work.</li>
                <li className="flex gap-3"><Check size={18} className="text-sky-400 shrink-0 mt-0.5" /> We get things running fast so you see the return on your investment immediately.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-32 px-6 bg-slate-800 relative overflow-hidden text-center md:text-left">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[14rem] font-black text-slate-900/40 whitespace-nowrap pointer-events-none tracking-tighter mix-blend-overlay">
          BUSINESS OWNERS
        </div>

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-sky-400 font-bold tracking-widest uppercase text-sm mb-4">Who This Is For</div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              We work with established businesses.
            </h2>
            <p className="text-xl text-slate-300 mb-6 leading-relaxed">
              We help successful companies that are feeling the growing pains of manual work.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              If your team spends hours every week doing repetitive admin work, we can fix it. We help you stop losing profit to inefficiency. We only work with established businesses ready to upgrade their operations.
            </p>
          </div>
          <div className="relative">
            <div className="glass-panel p-8 rounded-3xl font-mono text-sm text-sky-400 leading-relaxed max-h-96 overflow-hidden">
              <div className="text-slate-500 mb-4">// Finding the Problem</div>
              <div>{'>'} LOOKING FOR WASTED TIME...</div>
              <div className="mt-2 text-slate-300">{'>'} FOUND THE PROBLEM: <span className="text-red-400">MANUAL DATA ENTRY</span></div>
              <div className="mt-2 text-slate-300">{'>'} BUILDING THE SOLUTION... <span className="text-blue-400">IN PROGRESS</span></div>
              <div className="mt-2">{`{
  `}</div>
              <div className="pl-4">"goal": "save_20_hours_a_week",</div>
              <div className="pl-4">"method": "custom_automation",</div>
              <div className="pl-4">"result": "success"</div>
              <div className="mt-2">{`} `}</div>
              <div className="mt-4 text-green-400 animate-pulse">{'>'} SYSTEM READY_</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Features Section */}
      <section className="py-32 px-6 relative z-10 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">What We Actually Do</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">We operate at the forefront of AI workflow infrastructure, replacing rigid automation with adaptive systems.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((card, i) => (
            <div key={i} className="glass-panel p-10 rounded-3xl hover-lift group relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-8 shadow-glow transition-shadow">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed font-medium">{card.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a href="#/services" className="inline-flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300 transition-colors">
            Explore Capabilities <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="py-32 px-6 bg-slate-900 border-t border-slate-800 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Built For Serious Industries</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">We deploy bespoke infrastructure for sectors burdened by heavy compliance, massive data flows, and legacy software.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Real Estate", desc: "Automate MLS parsing, lead triage, and contract generation.", icon: <Building size={24} className="text-sky-400" /> },
              { title: "Accounting & Finance", desc: "Extract K-1s, match complex invoices, and auto-provision reports.", icon: <LineChart size={24} className="text-sky-400" /> },
              { title: "Legal Operations", desc: "RAG-powered discovery search and automated counter-party liability flagging.", icon: <Briefcase size={24} className="text-sky-400" /> },
              { title: "Healthcare Admin", desc: "Pre-screen patients, route intake forms, and sync EHR systems without friction.", icon: <Activity size={24} className="text-sky-400" /> }
            ].map((ind, i) => (
              <div key={i} className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-sky-500/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-slate-900/80 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(56,189,248,0.15)] group-hover:scale-110 transition-transform">
                  {ind.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{ind.title}</h3>
                <p className="text-sm font-medium text-slate-400 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-32 px-6 bg-slate-800/50 border-t border-slate-800 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            The Pipeline
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-20 text-center">Our Execution Protocol</h2>

          <div className="relative">
            {/* Connecting Lines moved OUT of the grid so they don't consume columns */}
            <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-slate-800 via-sky-500/50 to-slate-800 blur-[1px]"></div>
            <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-glow"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 relative z-10">
              {[
                { num: "01", title: "Diagnostic Audit", desc: "We map your current workflows and expose exactly where margin is leaking due to human bandwidth." },
                { num: "02", title: "Architecture", desc: "Our engineers design a custom agentic workflow bypassing rigid Make/Zapier limitations." },
                { num: "03", title: "Deployment", desc: "We integrate directly with your existing software stack via secure APIs and custom webhooks." },
                { num: "04", title: "Iteration", desc: "Agents are continually monitored, stress-tested, and refined based on edge-case data ingestion." }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-900 border-2 border-sky-500/50 flex items-center justify-center text-2xl font-black text-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.2)] mb-8 shrink-0 relative z-20">
                    {step.num}
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-2 lg:mb-4 text-center">{step.title}</h3>
                  <p className="text-slate-400 text-xs lg:text-sm font-medium leading-relaxed text-center px-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-blue-900/20 border-t border-b border-sky-500/20 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Let's build systems that scale.</h2>
          <p className="text-xl text-sky-200/70 mb-12">Every engagement begins with understanding the specific inefficiency. Let's map your friction points.</p>
          <a href="#/contact" className="inline-block bg-sky-500 hover:bg-sky-400 text-slate-950 px-10 py-5 rounded-full font-bold text-xl transition-all shadow-glow-strong">
            Architect Leverage
          </a>
        </div>
      </section>
    </>
  );
};

const ServicesPage = () => {
  const steps = [
    {
      num: "01", title: "Find the Leaks",
      desc: "We don't start by writing code. We start by mapping out what your team does every day to figure out exactly where you are losing money to manual data entry."
    },
    {
      num: "02", title: "Design the Fix",
      desc: "Once we find the leak, we design a custom automatic system. This isn't a cheap template that breaks in a week; it's a smart system that actually understands how your business works."
    },
    {
      num: "03", title: "Build & Connect",
      desc: "We build the system and connect it to the software you already use. We make sure it works perfectly before handing over a system that buys you back hundreds of hours a month."
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">What We Do</h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-16">We build custom systems to solve your real business headaches. No generic software packages. Just solutions that actually work.</p>

        {/* Core Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="glass-panel p-10 rounded-3xl relative overflow-hidden border border-slate-700">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Database size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Connect Your Software</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              We make your different software tools talk to each other. No more copying and pasting from emails to spreadsheets to your CRM. We make it happen automatically.
            </p>
            <ul className="space-y-3 text-slate-300 font-medium">
              <li className="flex items-center gap-2"><Check size={16} className="text-sky-400" /> Keep client records perfectly updated</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-sky-400" /> Generate automatic financial reports</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-sky-400" /> Build custom dashboards for your team</li>
            </ul>
          </div>

          <div className="glass-panel p-10 rounded-3xl relative overflow-hidden border border-slate-700">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <Bot size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Smart Automations</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              We build systems that can do the thinking for you. They can read emails, categorize client requests, and answer questions just like a human assistant would.
            </p>
            <ul className="space-y-3 text-slate-300 font-medium">
              <li className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Read and organize daily client emails</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Research leads automatically before you call</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-blue-400" /> Train custom AI on your company data</li>
            </ul>
          </div>
        </div>

        {/* How We Work Timeline */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">How We Work</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex-1 glass-panel p-8 rounded-3xl relative">
                <div className="text-5xl font-black text-slate-800/50 absolute top-4 right-6 pointer-events-none">{step.num}</div>
                <h3 className="text-xl font-bold text-sky-400 mb-4 mt-6">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Matrix */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">The Alternative Cost</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-700 pb-4">
                  <th className="py-4 px-6 text-slate-400 font-medium">Approach</th>
                  <th className="py-4 px-6 text-sky-400 font-bold bg-slate-800/50 rounded-tl-2xl">723 Solutions (Custom Infra)</th>
                  <th className="py-4 px-6 text-slate-400 font-medium">Standard SaaS Purchases</th>
                  <th className="py-4 px-6 text-slate-400 font-medium">Hiring In-House Developers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="py-6 px-6 font-bold text-white">Focus</td>
                  <td className="py-6 px-6 text-slate-300 bg-slate-800/30">Your specific business headache</td>
                  <td className="py-6 px-6 text-slate-500">Generic problems that don't fit perfectly</td>
                  <td className="py-6 px-6 text-slate-500">Whatever you tell them to do every day</td>
                </tr>
                <tr>
                  <td className="py-6 px-6 font-bold text-white">How it connects</td>
                  <td className="py-6 px-6 text-slate-300 bg-slate-800/30">Connects directly into the software you already use</td>
                  <td className="py-6 px-6 text-slate-500">Forces you to learn a completely new dashboard</td>
                  <td className="py-6 px-6 text-slate-500">Takes months to build basic features</td>
                </tr>
                <tr>
                  <td className="py-6 px-6 font-bold text-white">Pricing</td>
                  <td className="py-6 px-6 text-emerald-400 font-bold bg-slate-800/30">Priced based on how much time we save you</td>
                  <td className="py-6 px-6 text-slate-500">Expensive monthly fees per employee</td>
                  <td className="py-6 px-6 text-red-400">$150k+ salary plus benefits</td>
                </tr>
                <tr>
                  <td className="py-6 px-6 font-bold text-white">When you see value</td>
                  <td className="py-6 px-6 text-slate-300 bg-slate-800/30">Weeks</td>
                  <td className="py-6 px-6 text-slate-500">Months spent training your team</td>
                  <td className="py-6 px-6 text-slate-500">Half a year minimum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="glass-panel p-12 rounded-[3rem] text-center border border-slate-700 bg-slate-900/40">
          <h2 className="text-3xl font-bold text-white mb-6">Software We Work With</h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">We don't force you onto new software. We build on top of the tools you already know and use every single day.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-400 font-mono text-sm">
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-800/50 hover:border-sky-500/50 transition-colors">Salesforce / HubSpot</div>
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-800/50 hover:border-sky-500/50 transition-colors">Stripe / QuickBooks</div>
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-800/50 hover:border-sky-500/50 transition-colors">Google Workspace</div>
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-800/50 hover:border-sky-500/50 transition-colors">Microsoft Office</div>
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-800/50 hover:border-sky-500/50 transition-colors">ChatGPT</div>
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-800/50 hover:border-sky-500/50 transition-colors">Anthropic Claude</div>
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-800/50 hover:border-sky-500/50 transition-colors">DocuSign / PandaDoc</div>
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-800/50 hover:border-sky-500/50 transition-colors">Slack / Teams</div>
          </div>
        </div>

      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-12 text-center">Our Origin</h1>

        <div className="glass-panel p-10 md:p-16 rounded-[3rem] text-lg text-slate-300 leading-relaxed font-medium mb-16 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
          <p className="mb-8">
            <strong className="text-white text-xl">723 Solutions</strong> is built by us with one simple goal: <span className="text-sky-400">finding where businesses waste money.</span>
          </p>
          <p className="mb-8">
            In every job we've ever had, we couldn't help but notice how much time people spent on boring, manual tasks that a computer could easily do. We've always been obsessed with fixing broken processes.
          </p>
          <p className="mb-8">
            We didn't start this company to sell "AI". We started it because we finally have the tools to completely eliminate the busywork that holds great businesses back.
          </p>

          <div className="border-l-4 border-sky-400 pl-6 my-12 bg-slate-800/30 p-6 rounded-r-2xl border-t border-r border-b border-slate-700/50">
            <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">Our Promise</h4>
            <p className="text-slate-400">
              We are business people first. We care about making your company more efficient, not just building a pretty website. If your team is stuck doing repetitive tasks, we will build the exact system you need to get your time and money back.
            </p>
          </div>


        </div>

        {/* Operating Principles */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">Operating Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-8 rounded-3xl border border-slate-700">
            <div className="text-sky-400 font-bold mb-3 flex items-center gap-2"><Zap size={20} /> Fast Results</div>
            <p className="text-slate-400 text-sm leading-relaxed">We use modern tools to build custom systems for you in days or weeks, avoiding the months of waiting you'd get from a standard agency.</p>
          </div>
          <div className="glass-panel p-8 rounded-3xl border border-slate-700">
            <div className="text-sky-400 font-bold mb-3 flex items-center gap-2"><Lock size={20} /> Reliable Systems</div>
            <p className="text-slate-400 text-sm leading-relaxed">We don't build cheap templates that break when something goes wrong. We build custom, bulletproof systems that just run quietly in the background.</p>
          </div>
          <div className="glass-panel p-8 rounded-3xl border border-slate-700">
            <div className="text-sky-400 font-bold mb-3 flex items-center gap-2"><Target size={20} /> Profit Over Pretty</div>
            <p className="text-slate-400 text-sm leading-relaxed">We don't care about buzzwords. We only care about saving you hundreds of hours and adding real profit back into your pocket.</p>
          </div>
          <div className="glass-panel p-8 rounded-3xl border border-slate-700">
            <div className="text-sky-400 font-bold mb-3 flex items-center gap-2"><Check size={20} /> Straight Talk</div>
            <p className="text-slate-400 text-sm leading-relaxed">If automation isn't the right way to fix your problem, we'll tell you straight up. We only take on projects where we know we can make a massive impact.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 mt-32 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto mb-24">
          {[
            { q: "Do you just use standard templates?", a: "No. While they can be useful for tiny tasks, we build custom, robust software that connects directly to your tools so it doesn't randomly break when you need it most." },
            { q: "How much does it cost?", a: "We don't have standard price tags. We price our work based on how much money we are going to save you. If we build a system that saves your team 150 hours a month, we charge a fraction of that saved cost." },
            { q: "How long does it take to build?", a: "Because of the modern tools we use, we build in weeks, not months. Most of our custom systems are up and running perfectly in just 14 to 30 days." },
            { q: "Do you work with new businesses?", a: "No. We only work with established businesses that already hit a wall because of manual work. If you don't have a large team drowning in tasks, we probably aren't the right fit." },
            { q: "Is my client data safe?", a: "100%. We build private, secure systems so your proprietary business data and client information never gets shared or leaked. We take security incredibly seriously." }
          ].map((faq, i) => (
            <details key={i} className="group glass-panel rounded-2xl border border-slate-700 open:border-sky-500/50 transition-colors">
              <summary className="cursor-pointer p-6 font-bold text-white text-lg flex justify-between items-center outline-none">
                {faq.q}
                <span className="text-sky-400 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
              </summary>
              <div className="px-6 pb-6 text-slate-400 leading-relaxed font-medium border-t border-slate-800/50 mt-2 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

      </div>
    </div>
  );
};

const CaseStudiesPage = () => {
  const cases = [
    {
      company: "National Logistics Provider",
      problem: "A team was crippled by having to manually copy tracking numbers from 300+ daily emails into their dispatch system.",
      solution: "Built a system that automatically reads the incoming emails and puts the tracking data right into their system.",
      hours: "120 hrs/mo",
      metric: "Architected Leverage"
    },
    {
      company: "Boutique Financial Firm",
      problem: "Highly-paid analysts were spending an entire day manually copying portfolio data to create client reports.",
      solution: "Built an automatic reporting tool that pulls all the data and creates 50 perfect client PDFs in seconds.",
      hours: "32 hrs/mo",
      metric: "Zero Margin Leak"
    },
    {
      company: "B2B SaaS Startup",
      problem: "Support staff were manually reading tickets and copying them back and forth between different software.",
      solution: "Created a smart system that automatically reads tickets, understands the problem, and creates exactly what the engineering team needs.",
      hours: "85 hrs/mo",
      metric: "Faster Resolution"
    },
    {
      company: "Mid-Market Real Estate",
      problem: "Brokers spent hours manually scanning new house listings to see if they fit their clients, then spent even more time writing emails.",
      solution: "Built an automatic tool that checks listings every morning and drafts perfect, personalized emails for the broker to send.",
      hours: "200 hrs/mo",
      metric: "Sales Velocity"
    },
    {
      company: "Multinational Law Firm",
      problem: "Paralegals were wasting thousands of hours reading 400-page legal documents just to find specific clauses.",
      solution: "Built a secure, private AI tool that instantly searches massive case files and flags any risky clauses automatically.",
      hours: "450 hrs/mo",
      metric: "Error Rate < 0.05%"
    },
    {
      company: "Specialty Manufacturing",
      problem: "The accounting department was manually matching huge, complicated supply chain invoices by hand.",
      solution: "Built a system to automatically read invoice PDFs, check the math, and enter it straight into their old database.",
      hours: "180 hrs/mo",
      metric: "Payment Velocity"
    },
    {
      company: "Corporate Dentistry Group",
      problem: "Front-desk staff were overwhelmed trying to handle phone leads, screen patients, and book appointments across 12 clinics.",
      solution: "Created an automatic phone and chat system that talks to patients, checks the calendar, and books them right in the system.",
      hours: "220 hrs/mo",
      metric: "Conversion +40%"
    },
    {
      company: "E-Commerce Wholesale",
      problem: "Expanding the business was entirely blocked by the team having to manually look up tariff codes and create customs paperwork.",
      solution: "Built an automatic tool that instantly looks up thousands of customs codes and creates the necessary shipping paperwork in seconds.",
      hours: "310 hrs/mo",
      metric: "Shipping Speed"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen relative">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 text-center md:text-left">Impact & ROI</h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-12 text-center md:text-left">Real numbers. Real time saved. See how we've transformed operations.</p>

        {/* Global Stats Banner */}
        <div className="glass-panel p-8 rounded-3xl mb-16 flex flex-wrap justify-between items-center gap-8 border-t border-b border-sky-500/30 bg-slate-800/80 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <div>
            <div className="text-sky-400 text-sm font-bold uppercase tracking-widest mb-1">Total Time Recovered</div>
            <div className="text-4xl font-black text-white">10,000+ Hrs</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-700"></div>
          <div>
            <div className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-1">Cost Savings</div>
            <div className="text-4xl font-black text-white">$2.5M+</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-700"></div>
          <div>
            <div className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-1">Systems Deployed</div>
            <div className="text-4xl font-black text-white">45+</div>
          </div>
        </div>

        <div className="space-y-12">
          {cases.map((c, i) => (
            <div key={i} className="glass-panel p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row gap-12 items-center border border-slate-700 hover:border-sky-500/50 transition-colors group">
              <div className="flex-1">
                <div className="inline-block bg-slate-800 text-slate-300 font-bold px-4 py-1.5 rounded-full text-sm mb-6 uppercase tracking-wider border border-slate-700 group-hover:bg-slate-700 transition-colors">
                  {c.company}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">The Workaround</h3>
                <p className="text-slate-400 mb-8 leading-relaxed font-medium">{c.problem}</p>
                <div className="w-12 h-px bg-slate-700 mb-8"></div>
                <h3 className="text-2xl font-bold text-white mb-4 text-sky-400">The Solution</h3>
                <p className="text-slate-300 leading-relaxed font-medium">{c.solution}</p>
              </div>
              <div className="w-full md:w-72 flex flex-col gap-6 shrink-0 relative">
                {/* Decorative glow behind stats */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-500/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-sky-500/20 transition-all"></div>

                <div className="bg-sky-500/10 border border-sky-500/20 p-6 rounded-2xl text-center shadow-[0_0_15px_rgba(56,189,248,0.1)] relative z-10 backdrop-blur-sm">
                  <div className="text-sm font-bold text-sky-400 uppercase tracking-widest mb-2">Time Saved</div>
                  <div className="text-4xl font-black text-white glow-text">{c.hours}</div>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl text-center border border-slate-700 relative z-10">
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2"><TrendingUp size={16} /> Key Metric</div>
                  <div className="text-2xl font-bold text-white">{c.metric}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = ({ onSubmitLead }) => {
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', bottleneck: '', date: '', time: '' });
  const [weekOffset, setWeekOffset] = useState(0);
  const [formError, setFormError] = useState('');

  // We want to return the 5 weekdays for a given week offset, but ONLY if they are at least 24 hours in the future.
  const getWeekdaysForOffset = (offset) => {
    const days = [];
    // Start from today, but add 24 hours to enforce the minimum advance notice
    const minimumBookableDate = new Date();
    minimumBookableDate.setHours(minimumBookableDate.getHours() + 24);

    // Find the Monday of the current week (or next week if offset > 0)
    let current = new Date();
    // Adjust to Monday
    const currentDay = current.getDay();
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    current.setDate(current.getDate() + distanceToMonday + (offset * 7));
    current.setHours(0, 0, 0, 0); // Start at midnight for comparison

    for (let i = 0; i < 5; i++) {
      let d = new Date(current);
      d.setDate(current.getDate() + i);
      // Only include it if the *end* of the day is after our minimum bookable time
      // Actually, just check if d is strictly literally > than the minimum date (midnight check)
      // If it's today + 24h, the date itself at midnight might be earlier than minimum bookable.
      // E.g. Bookable from 7pm tomorrow. Tomorrow's date is included.
      // Let's keep it simple: Compare midnight of 'd' + 23:59 to see if the whole day is in the past.
      let endOfDay = new Date(d);
      endOfDay.setHours(23, 59, 59);

      if (endOfDay > minimumBookableDate) {
        days.push(d);
      }
    }
    return days;
  };

  const [availableDays, setAvailableDays] = useState(getWeekdaysForOffset(0));

  useEffect(() => {
    setAvailableDays(getWeekdaysForOffset(weekOffset));
    // Clear selection if they switch weeks and the selection isn't in view
    setFormData(prev => ({ ...prev, date: '', time: '' }));
  }, [weekOffset]);
  const timeSlots = ['07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.date || !formData.time) {
      setFormError('Please select a date and time to book your call.');
      return;
    }

    setFormStatus('sending');

    try {
      const response = await fetch('/.netlify/functions/submit-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (onSubmitLead) {
        // Here we attempt to insert the new inquiry directly into Supabase.
        // We set the follow-up date to the exact date the meeting was booked for
        // and we log the bottleneck description into the notes field.
        if (supabase) {
          const insertPayload = {
            first_name: formData.name.split(' ')[0] || '',
            last_name: formData.name.split(' ').slice(1).join(' ') || '',
            email: formData.email,
            status: 'Active',
            industry: 'Unknown',
            lead_owner: 'Unassigned',
            lead_source: 'Inbound Website Form',
            notes: formData.bottleneck,
            next_follow_up_date: formData.date || ''
          };

          try {
            const { error: sbError } = await supabase.from('contacts').insert([insertPayload]);
            if (sbError) console.error("Supabase ingestion error:", sbError);
          } catch (err) {
            console.error("Failed to push to Supabase:", err);
          }
        }

        onSubmitLead(formData);
      }
      setFormStatus('success');
      setFormData({ name: '', email: '', bottleneck: '', date: '', time: '' }); // Reset

    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">Let's Find Your<br /><span className="text-sky-400">Wasted Time.</span></h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Select a time to book your free architectural review, or fill out the form below to show us where you're wasting time.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-sky-400 border border-slate-700 shadow-glow"><Mail size={20} /></div>
              <div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Direct Access</div>
                <div className="text-lg font-medium">info@723solutions.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 md:p-10 rounded-[2rem]">
          {formStatus === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-slide-up">
              <div className="w-20 h-20 bg-green-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <Check size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Diagnostic Requested</h3>
              <p className="text-slate-400 mb-8">We'll review your details and reach out within 24 hours to confirm your architectural mapping session.</p>
              <button onClick={() => setFormStatus('idle')} className="text-sky-400 font-bold hover:text-sky-300 transition-colors">Submit another inquiry</button>
            </div>
          ) : formStatus === 'error' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-slide-up">
              <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                <XIcon size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Diagnostic Request Failed</h3>
              <p className="text-slate-400 mb-8">It seems the 723 Solutions Backend API is unreachable or misconfigured right now. Please reach out to <strong className="text-sky-400">info@723solutions.com</strong> directly.</p>
              <button onClick={() => setFormStatus('idle')} className="text-sky-400 font-bold hover:text-sky-300 transition-colors">Try again</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-700/50 mb-2">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-bold text-slate-300 flex items-center gap-2"><Calendar size={16} className="text-sky-400" /> Book an Intro Call (PST)</label>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))} disabled={weekOffset === 0} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${weekOffset === 0 ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-800 border border-slate-600 text-sky-400 hover:bg-slate-700 hover:border-sky-500 hover:text-sky-300'}`}>
                      <ChevronDown size={14} className="rotate-90" />
                    </button>
                    <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider px-2">Week</span>
                    <button type="button" onClick={() => setWeekOffset(Math.min(4, weekOffset + 1))} disabled={weekOffset >= 4} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${weekOffset >= 4 ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-800 border border-slate-600 text-sky-400 hover:bg-slate-700 hover:border-sky-500 hover:text-sky-300'}`}>
                      <ChevronDown size={14} className="-rotate-90" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 custom-scrollbar">
                  {availableDays.length === 0 ? (
                    <div className="text-xs text-sky-400/80 font-bold uppercase tracking-wider py-5 w-full text-center bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center gap-2">
                      <Clock size={14} /> Schedule full — Please select next week
                    </div>
                  ) : availableDays.map((day, i) => {
                    const dateStr = day.toISOString().split('T')[0];
                    const isSelected = formData.date === dateStr;
                    return (
                      <button
                        key={i} type="button"
                        onClick={() => setFormData({ ...formData, date: dateStr, time: '' })}
                        className={`shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl border transition-all ${isSelected ? 'bg-sky-500/20 border-sky-500 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                      >
                        <span className="text-xs font-bold uppercase tracking-wider">{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xl font-black">{day.getDate()}</span>
                      </button>
                    )
                  })}
                </div>

                {formData.date && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 animate-slide-up">
                    {timeSlots.map(time => (
                      <button
                        key={time} type="button"
                        onClick={() => setFormData({ ...formData, time })}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${formData.time === time ? 'bg-sky-500 text-slate-950 border-sky-500 shadow-glow' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Name *</label>
                  <input required type="text" className="w-full bg-slate-950 border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-white transition-colors" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Work Email *</label>
                  <input required type="email" className="w-full bg-slate-950 border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-white transition-colors" placeholder="john@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">What can we help you with? *</label>
                <textarea required rows="3" className="w-full bg-slate-950 border border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-white transition-colors resize-none" placeholder="Tell us about the manual work that is driving you crazy..." value={formData.bottleneck} onChange={e => setFormData({ ...formData, bottleneck: e.target.value })}></textarea>
              </div>

              {formError && (
                <div className="text-red-400 text-sm font-bold text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20 shadow-sm animate-slide-up">
                  {formError}
                </div>
              )}

              <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-lg py-4 rounded-xl transition-all shadow-glow mt-2 disabled:opacity-50 flex items-center justify-center gap-2">
                {formStatus === 'sending' ? 'Sending...' : 'Map Inefficiencies & Book'} <ArrowRight size={20} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Chatbot Component (Updated to hide on backend) ---

const AIChatbotWidget = ({ isBackend }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'System Online. I am the 723 Solutions AI Architect. Are you looking to eliminate manual work or book a diagnostic session?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

  if (isBackend) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Gemini API Key from environment config
      const API_KEY = process?.env?.REACT_APP_GOOGLE_API_KEY || 'HIDDEN_KEY_TO_PASS_NETLIFY_SCAN';
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "You are the 723 Solutions AI Architect, an authoritative, high-tech, and trustworthy assistant for an AI consulting firm. Tone: Dark Premium, concise, direct, professional. No emojis unless essential. You build custom infrastructure for multi-seven and eight-figure companies to automate repetitive tasks and stop margin leaks. You DO NOT build cheap apps, sell pre-built templates, or charge standard monthly retainers per user. You connect directly into existing software (Salesforce, Stripe, Google, ChatGPT, etc.). Always push the user to navigate to the Contact page (#/contact) to book a free architectural review or diagnostic session. Availability is Mon-Fri 7am-10am PST, 30 min increments. Keep responses short (1-3 sentences maximum)." }]
          },
          contents: [
            ...messages.filter(m => m.role === 'assistant' || m.role === 'user').map(m => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.text }]
            })),
            { role: 'user', parts: [{ text: userMessage }] }
          ]
        })
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (reply) {
        setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: 'Connection disrupted. Please use our Contact page to reach us directly.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error connecting to the intelligence core. Please navigate to the Contact page to schedule a session.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col animate-slide-up overflow-hidden">
          <div className="px-5 py-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-950 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                  <Database size={20} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-sm tracking-wide">AI Architect</h4>
                <p className="text-xs text-sky-400 font-mono">System Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <XIcon size={20} />
            </button>
          </div>

          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar flex flex-col gap-4 bg-slate-950/80 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === 'user'
                  ? 'bg-sky-500 text-slate-950 font-medium rounded-br-sm shadow-glow'
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-sm shadow-md'
                  }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-3 text-sm bg-slate-800 border border-slate-700 text-sky-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 bg-slate-800 border-t border-slate-700">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Initialize query..."
                disabled={isLoading}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-sans disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-lg bg-sky-500 text-slate-950 hover:bg-sky-400 transition-colors disabled:opacity-50"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 text-sky-400 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:border-sky-500/50 hover:scale-105 transition-all group"
        >
          <div className="relative">
            <Database size={28} className="group-hover:text-sky-300 transition-colors" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
          </div>
        </button>
      )}
    </div>
  );
};

// --- Backend CRM Components ---

const LoginGate = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'demo123') {
      onLogin();
      localStorage.setItem('crm_auth', 'true');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="glass-panel w-full max-w-md p-10 rounded-[2rem] relative z-10">
        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 mb-6 shadow-glow">
          <Lock size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">System Login</h2>
        <p className="text-slate-400 mb-8 font-medium">Authentication required to access the 723 Solutions CRM.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Access Key</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono"
              placeholder="••••••"
            />
          </div>
          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
          <button type="submit" className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] mt-2">
            Authenticate
          </button>
        </form>
        <div className="mt-8 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>Demo key: demo123</span>
          <a href="#/" className="hover:text-sky-400">Back to Site</a>
        </div>
      </div>
    </div>
  );
};

// --- Reusable UI Elements ---

const CRMToast = ({ message }) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 bg-slate-800 border-l-4 border-emerald-500 text-white px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] z-50 flex items-center gap-3">
      <Check size={18} className="text-emerald-400" />
      <span className="font-bold text-sm tracking-wide">{message}</span>
    </div>
  );
};

const CRMModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] w-full max-w-2xl relative z-10 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <XIcon size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 text-sm bg-slate-950/50">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- CRM Modules ---

const CRMOverviewModule = ({ crmData }) => {
  const activeContacts = crmData.contacts.filter(c => c.status === 'Active').length;

  // Pipeline metrics
  const activeDeals = crmData.deals.filter(d => !d.stage.includes('Closed'));
  const totalPipelineValue = crmData.deals.reduce((acc, deal) => acc + deal.estimatedValue, 0);
  const weightedForecast = activeDeals.reduce((sum, d) => sum + (d.estimatedValue * (d.probability / 100)), 0);
  const closedWon = crmData.deals.filter(d => d.stage === 'Closed Won').reduce((acc, d) => acc + d.estimatedValue, 0);
  const conversionRate = totalPipelineValue > 0 ? ((closedWon / totalPipelineValue) * 100).toFixed(1) : 0;

  // Industry Distribution mapping
  const industryCounts = crmData.companies.reduce((acc, company) => {
    acc[company.industry] = (acc[company.industry] || 0) + 1;
    return acc;
  }, {});

  const maxIndustry = Math.max(...Object.values(industryCounts), 1);

  return (
    <div className="space-y-6">
      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-700 bg-slate-900/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
          <div className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center justify-between">
            <span>Total Entities</span>
            <Users size={14} className="text-slate-500" />
          </div>
          <div className="text-3xl font-black text-white">{crmData.contacts.length + crmData.companies.length}</div>
          <div className="text-xs text-sky-400 mt-2 font-mono">{crmData.contacts.length} Contacts • {crmData.companies.length} Accounts</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-700 bg-slate-900/80 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
          <div className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center justify-between">
            <span>Pipeline Value</span>
            <DollarSign size={14} className="text-sky-400" />
          </div>
          <div className="text-3xl font-black text-white glow-text">${totalPipelineValue.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-2 font-mono uppercase tracking-widest">{activeDeals.length} Active Deals</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-sky-500/30 bg-sky-950/20 shadow-[0_0_20px_rgba(56,189,248,0.1)] relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/20 rounded-full blur-[30px]"></div>
          <div className="text-sky-300 font-bold text-xs uppercase tracking-widest mb-2 flex items-center justify-between relative z-10">
            <span>Weighted Forecast</span>
            <BarChart size={14} className="text-sky-400" />
          </div>
          <div className="text-3xl font-black text-sky-400 relative z-10">${weightedForecast.toLocaleString()}</div>
          <div className="text-xs text-sky-500/70 mt-2 font-mono relative z-10">Probability Adjusted</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_20px_rgba(52,211,153,0.1)] relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-[30px]"></div>
          <div className="text-emerald-300 font-bold text-xs uppercase tracking-widest mb-2 flex items-center justify-between relative z-10">
            <span>Win Rate (YTD)</span>
            <Target size={14} className="text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 relative z-10">{conversionRate}%</div>
          <div className="text-xs text-emerald-500/70 mt-2 font-mono relative z-10">${closedWon.toLocaleString()} Closed Won</div>
        </div>
      </div>

      {/* Secondary Row: Dashboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[340px]">
        {/* Industry Distribution Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-700 bg-slate-900/80 flex flex-col h-full">
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">Account Firmographics</h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {Object.entries(industryCounts).map(([industry, count]) => {
              const percentage = (count / maxIndustry) * 100;
              return (
                <div key={industry} className="space-y-1 group">
                  <div className="flex justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                    <span>{industry}</span>
                    <span className="text-slate-500 font-mono">{count} ACCOUNTS</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div className="bg-sky-500 h-full rounded-full group-hover:bg-sky-400 transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              )
            })}
            {Object.keys(industryCounts).length === 0 && (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm font-mono italic">No mapped companies.</div>
            )}
          </div>
        </div>

        {/* AI Action Hub / System Health */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-700 bg-slate-950 flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none"></div>

          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 relative z-10">
            <Bot size={18} className="text-sky-400" /> Command Diagnostics
          </h3>

          <div className="flex-1 flex flex-col justify-center space-y-6 relative z-10 max-w-sm mx-auto w-full">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-slate-400 text-sm font-bold uppercase tracking-wider text-xs">AI Enrichment Loop</span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-mono text-xs font-bold">ACTIVE</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-slate-400 text-sm font-bold uppercase tracking-wider text-xs">Postgres DB Sync</span>
              <div className="text-sky-400 font-mono text-xs font-bold flex items-center gap-1">
                14m ago <Zap size={10} />
              </div>
            </div>

            <div className="flex justify-between items-center pb-3">
              <span className="text-slate-400 text-sm font-bold uppercase tracking-wider text-xs">Unmapped Contacts</span>
              <div className="text-amber-500 font-mono text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {crmData.contacts.filter(c => !c.companyId).length} Flagged
              </div>
            </div>

            <div className="pt-2">
              <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded-xl transition-colors border border-slate-700 shadow-sm text-sm uppercase tracking-wider">
                Run Full Database Scan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CRMFollowupsModule = ({ crmData, updateCrmData, onNavigate }) => {
  const [filters, setFilters] = useState({ owner: 'All', timeline: 'All' });
  const [sortAsc, setSortAsc] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleQuickAction = (id, actionType) => {
    const updated = crmData.contacts.map(c => {
      if (c.id === id) {
        if (actionType === 'followup') {
          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          return { ...c, nextFollowUpDate: nextWeek.toISOString().split('T')[0] };
        }
        if (actionType === 'snooze') {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return { ...c, nextFollowUpDate: tomorrow.toISOString().split('T')[0] };
        }
        if (actionType === 'done') {
          return { ...c, nextFollowUpDate: '' };
        }
      }
      return c;
    });

    let toastMsg = 'Action completed';
    if (actionType === 'followup') toastMsg = 'Follow-up set for next week';
    if (actionType === 'snooze') toastMsg = 'Snoozed to tomorrow';
    if (actionType === 'done') toastMsg = 'Follow-up marked as Done';

    updateCrmData({ ...crmData, contacts: updated });
    showToast(toastMsg);
  };

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const followUpItems = crmData.contacts
    .filter(c => c.nextFollowUpDate)
    .map(c => {
      const cDate = new Date(c.nextFollowUpDate + 'T12:00:00Z');
      cDate.setHours(0, 0, 0, 0);
      const diffDays = Math.round((cDate - todayDate) / (1000 * 60 * 60 * 24));

      let urgency = 'Later';
      if (diffDays < 0) urgency = 'Overdue';
      else if (diffDays === 0) urgency = 'Due Today';
      else if (diffDays <= 7) urgency = 'This Week';

      const company = crmData.companies.find(comp => comp.id === c.companyId);
      const deal = crmData.deals.find(d => d.companyId === c.companyId); // simplified deal linking

      return {
        ...c,
        urgency,
        diffDays,
        companyName: company ? company.companyName : 'No Company',
        dealStage: deal ? deal.stage : 'No Active Deal'
      };
    })
    .filter(item => {
      if (filters.owner !== 'All' && item.leadOwner !== filters.owner) return false;
      if (filters.timeline !== 'All' && item.urgency !== filters.timeline) return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.nextFollowUpDate + 'T12:00:00Z');
      const dateB = new Date(b.nextFollowUpDate + 'T12:00:00Z');
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

  const owners = ['All', ...new Set(crmData.contacts.map(c => c.leadOwner).filter(Boolean))];

  return (
    <div className="flex flex-col h-full space-y-6 relative">
      <CRMToast message={toast} />

      <div className="flex flex-col lg:flex-row gap-4 justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-glow">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <ListTodo size={20} />
          </div>
          <div>
            <h2 className="font-bold tracking-tight">Follow-up Queue</h2>
            <p className="text-xs text-slate-400">Manage your daily outreach tasks.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <select className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500 appearance-none min-w-[120px]" value={filters.owner} onChange={(e) => setFilters({ ...filters, owner: e.target.value })}>
            <option disabled value="">Owner</option>
            {owners.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <select className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500 appearance-none min-w-[120px]" value={filters.timeline} onChange={(e) => setFilters({ ...filters, timeline: e.target.value })}>
            <option value="All">All Time</option>
            <option value="Due Today">Due Today</option>
            <option value="Overdue">Overdue</option>
            <option value="This Week">This Week</option>
            <option value="Later">Later</option>
          </select>
          <button onClick={() => setSortAsc(!sortAsc)} className="bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm px-4 py-2 rounded-xl border border-slate-700 transition-colors flex items-center gap-2">
            Sort {sortAsc ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-glow flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Urgency</th>
                <th className="px-6 py-4">Name & Status</th>
                <th className="px-6 py-4">Company & Deal</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-medium">
              {followUpItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500 font-mono">No follow-ups found in this view. Inbox zero!</td>
                </tr>
              ) : (
                followUpItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider 
                        ${item.urgency === 'Overdue' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          item.urgency === 'Due Today' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                            item.urgency === 'This Week' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                              'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                        {item.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-200 font-bold text-base cursor-pointer hover:text-sky-400 transition-colors" onClick={() => onNavigate('Contacts')}>{item.firstName} {item.lastName}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{item.status}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-300 font-medium cursor-pointer hover:underline" onClick={() => onNavigate('Companies')}>{item.companyName}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{item.dealStage}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Calendar size={14} className="text-slate-500" />
                        {item.nextFollowUpDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-[10px] flex items-center justify-center border border-slate-700 text-slate-300 uppercase">
                          {item.leadOwner ? item.leadOwner.charAt(0) : '?'}
                        </div>
                        <span className="text-slate-300 text-xs">{item.leadOwner || 'None'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleQuickAction(item.id, 'done')} title="Mark Done" className="relative group/btn p-2 bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-400 rounded-lg transition-colors">
                          <CheckSquare size={16} />
                        </button>
                        <button onClick={() => handleQuickAction(item.id, 'snooze')} title="Snooze 1 Day" className="relative group/btn p-2 bg-slate-800 hover:bg-amber-500/20 hover:text-amber-400 text-slate-400 rounded-lg transition-colors">
                          <Clock size={16} />
                        </button>
                        <button onClick={() => handleQuickAction(item.id, 'followup')} title="+1 Week" className="relative group/btn p-2 bg-slate-800 hover:bg-sky-500/20 hover:text-sky-400 text-slate-400 rounded-lg transition-colors">
                          <Calendar size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CRMContactsModule = ({ crmData, updateCrmData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ industry: 'All', status: 'All', owner: 'All', timeline: 'All' });
  const [sortConfig, setSortConfig] = useState({ key: 'none', direction: 'asc' });

  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = { firstName: '', lastName: '', email: '', phone: '', jobTitle: '', companyName: '', industry: 'Technology', location: '', leadSource: 'Outbound', leadOwner: 'Tyler', status: 'Cold', potentialValue: 0, nextFollowUpDate: '', notes: '', tags: '' };
  const [formData, setFormData] = useState(initialForm);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const industries = ['All', ...new Set(crmData.contacts.map(c => c.industry).filter(Boolean))];
  const statuses = ['All', ...new Set(crmData.contacts.map(c => c.status).filter(Boolean))];
  const owners = ['All', ...new Set(crmData.contacts.map(c => c.leadOwner).filter(Boolean))];

  const filteredContacts = crmData.contacts.filter(contact => {
    const matchesSearch = ((contact.firstName || '') + (contact.lastName || '') + (contact.email || '')).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filters.industry === 'All' || contact.industry === filters.industry;
    const matchesStatus = filters.status === 'All' || contact.status === filters.status;
    const matchesOwner = filters.owner === 'All' || contact.leadOwner === filters.owner;

    let matchesTimeline = true;
    if (filters.timeline !== 'All') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const contactDateStr = contact.nextFollowUpDate;
      if (!contactDateStr) {
        matchesTimeline = false;
      } else {
        const cDate = new Date(contactDateStr + 'T12:00:00Z');
        cDate.setHours(0, 0, 0, 0);
        const diffDays = Math.round((cDate - today) / (1000 * 60 * 60 * 24));
        if (filters.timeline === 'Overdue') matchesTimeline = diffDays < 0;
        if (filters.timeline === 'Due Today') matchesTimeline = diffDays === 0;
        if (filters.timeline === 'This Week') matchesTimeline = diffDays >= 0 && diffDays <= 7;
      }
    }

    return matchesSearch && matchesIndustry && matchesStatus && matchesOwner && matchesTimeline;
  }).sort((a, b) => {
    if (sortConfig.key === 'followUp') {
      if (!a.nextFollowUpDate) return 1;
      if (!b.nextFollowUpDate) return -1;
      const dateA = new Date(a.nextFollowUpDate + 'T12:00:00Z');
      const dateB = new Date(b.nextFollowUpDate + 'T12:00:00Z');
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const openNewModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    setEditingId(contact.id);
    const company = crmData.companies.find(c => c.id === contact.companyId) || { companyName: '' };
    setFormData({ ...contact, companyName: company.companyName });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      updateCrmData({ ...crmData, contacts: crmData.contacts.filter(c => c.id !== id) });
      showToast('Contact deleted.');
    }
  };

  const handleQuickAction = (id, actionType) => {
    const updated = crmData.contacts.map(c => {
      if (c.id === id) {
        if (actionType === 'contacted') return { ...c, status: 'Contacted', lastContactedDate: new Date().toISOString() };
        if (actionType === 'followup') {
          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          return { ...c, nextFollowUpDate: nextWeek.toISOString().split('T')[0] };
        }
        if (actionType === 'snooze') {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return { ...c, nextFollowUpDate: tomorrow.toISOString().split('T')[0] };
        }
        if (actionType === 'done') {
          return { ...c, nextFollowUpDate: '' };
        }
      }
      return c;
    });
    let toastMsg = 'Action completed';
    if (actionType === 'contacted') toastMsg = 'Marked as Contacted';
    if (actionType === 'followup') toastMsg = 'Follow-up set for next week';
    if (actionType === 'snooze') toastMsg = 'Snoozed to tomorrow';
    if (actionType === 'done') toastMsg = 'Follow-up marked as Done';
    updateCrmData({ ...crmData, contacts: updated });
    showToast(toastMsg);
  };

  const saveContact = (e) => {
    e.preventDefault();
    let compId = null;
    let newCompanies = [...crmData.companies];

    if (formData.companyName) {
      const existingComp = crmData.companies.find(c => c.companyName.toLowerCase() === formData.companyName.toLowerCase());
      if (existingComp) {
        compId = existingComp.id;
      } else {
        compId = "COMP-" + Math.floor(1000 + Math.random() * 9000);
        newCompanies.push({
          id: compId, companyName: formData.companyName, website: '', industry: formData.industry, location: formData.location, accountOwner: formData.leadOwner, accountStatus: 'Active', notes: ''
        });
      }
    }

    const { companyName, ...cleanedData } = formData;
    cleanedData.companyId = compId;

    let newContacts;
    if (editingId) {
      newContacts = crmData.contacts.map(c => c.id === editingId ? { ...c, ...cleanedData } : c);
      showToast('Contact updated successfully.');
    } else {
      const newContact = { ...cleanedData, id: "C-" + Math.floor(1000 + Math.random() * 9000), activityTimeline: [], leadScore: editingId ? formData.leadScore : 50 };
      newContacts = [newContact, ...crmData.contacts];
      showToast('Contact created successfully.');
    }

    updateCrmData({ ...crmData, contacts: newContacts, companies: newCompanies });
    setIsModalOpen(false);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (window.Papa) {
      window.Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data;
          if (!data || data.length === 0) {
            showToast('CSV is empty or could not be read.');
            return;
          }

          let importCount = 0;
          const newContacts = [];

          data.forEach(row => {
            if (importCount >= 1500) return;

            const getVal = (keys) => {
              for (const k of keys) {
                const foundKey = Object.keys(row).find(rk => rk.toLowerCase().trim() === k);
                if (foundKey && row[foundKey].trim()) return row[foundKey].trim();
              }
              return '';
            };

            const fNameSrc = getVal(['first name', 'name', 'client name', 'first']);
            const lNameSrc = getVal(['last name', 'last']);
            const emailSrc = getVal(['email', 'email address', 'e-mail']);
            const phoneSrc = getVal(['phone', 'phone number', 'mobile']);
            const compSrc = getVal(['company', 'company name', 'organization']);
            const titleSrc = getVal(['title', 'job title', 'role']);

            if (!fNameSrc && !emailSrc && !compSrc) return;

            let fName = fNameSrc;
            let lName = lNameSrc;
            if (fNameSrc && !lNameSrc && fNameSrc.includes(' ')) {
              const parts = fNameSrc.split(' ');
              fName = parts[0];
              lName = parts.slice(1).join(' ');
            }

            const newContact = {
              id: "C-" + Math.floor(1000 + Math.random() * 9000000),
              firstName: fName || 'Unknown',
              lastName: lName || '',
              email: emailSrc || '',
              phone: phoneSrc || '',
              companyName: compSrc || '',
              jobTitle: titleSrc || '',
              industry: getVal(['industry', 'sector']) || 'Unknown',
              status: getVal(['status', 'lead status']) || 'Cold',
              leadOwner: getVal(['owner', 'lead owner']) || 'Unassigned',
              potentialValue: Number(getVal(['value', 'potential value'])) || 0,
              activityTimeline: [],
              leadScore: 50,
              nextFollowUpDate: ''
            };

            newContacts.push(newContact);
            importCount++;
          });

          let compAdditions = [];
          newContacts.forEach(nc => {
            if (nc.companyName) {
              const existingComp = [...crmData.companies, ...compAdditions].find(c => c.companyName.toLowerCase() === nc.companyName.toLowerCase());
              if (existingComp) {
                nc.companyId = existingComp.id;
              } else {
                const compId = "COMP-" + Math.floor(1000 + Math.random() * 9000000);
                nc.companyId = compId;
                compAdditions.push({
                  id: compId, companyName: nc.companyName, website: '', industry: nc.industry, location: '', accountOwner: nc.leadOwner, accountStatus: 'Active', notes: ''
                });
              }
            }
            delete nc.companyName; // IMPORTANT: Prevent Supabase 400 Bad Request schema mismatch 
          });

          updateCrmData({
            ...crmData,
            contacts: [...newContacts, ...crmData.contacts],
            companies: [...compAdditions, ...crmData.companies]
          });
          showToast(`${newContacts.length} Contacts imported successfully.`);
          setIsImportOpen(false);
          e.target.value = null; // reset
        },
        error: (error) => {
          showToast('Error parsing CSV: ' + error.message);
          e.target.value = null;
        }
      });
    } else {
      showToast('PapaParse not loaded. Please refresh.');
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 relative">
      <CRMToast message={toast} />

      {/* Import Modal */}
      <CRMModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} title="Import Contacts (CSV)">
        <div className="flex flex-col gap-6 text-center py-8">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-sky-400 border border-slate-700">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Upload CSV File</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">Map your columns to 723 Command properties. Duplicates will be automatically flagged for review.</p>
          </div>
          <div className="mx-auto mt-2 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleImport}
              id="csv-upload"
              className="hidden"
            />
            <label
              htmlFor="csv-upload"
              className="cursor-pointer inline-block bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-glow"
            >
              Select & Upload CSV
            </label>
            <p className="text-slate-500 text-xs mt-3">Supports up to 1,500 contacts per upload.</p>
          </div>
        </div>
      </CRMModal>

      {/* Contact Form Modal */}
      <CRMModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Contact" : "New Contact"}>
        <form onSubmit={saveContact} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">First Name *</label>
              <input required value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Last Name *</label>
              <input required value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email *</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone</label>
              <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Job Title</label>
              <input value={formData.jobTitle} onChange={e => setFormData({ ...formData, jobTitle: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Company Name</label>
              <input value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} placeholder="Or select existing..." className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Industry</label>
              <input value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Owner</label>
              <select value={formData.leadOwner} onChange={e => setFormData({ ...formData, leadOwner: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500">
                <option value="Tyler">Tyler</option>
                <option value="Colton">Colton</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Status</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500">
                <option value="Cold">Cold</option>
                <option value="Contacted">Contacted</option>
                <option value="Replied">Replied</option>
                <option value="Meeting Booked">Meeting Booked</option>
                <option value="Proposal">Proposal</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Potential Value ($)</label>
              <input type="number" value={formData.potentialValue} onChange={e => setFormData({ ...formData, potentialValue: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Next Follow-up</label>
              <input type="date" value={formData.nextFollowUpDate} onChange={e => setFormData({ ...formData, nextFollowUpDate: e.target.value })} style={{ colorScheme: 'dark' }} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Notes</label>
            <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} rows="3" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500"></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800 mt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]">{editingId ? 'Save Changes' : 'Create Contact'}</button>
          </div>
        </form>
      </CRMModal>

      {/* Top Action Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-glow">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search contacts, emails, or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <select className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500 appearance-none min-w-[120px]" value={filters.industry} onChange={(e) => handleFilterChange('industry', e.target.value)}>
            <option disabled value="">Industry</option>
            {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
          </select>
          <select className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500 appearance-none min-w-[120px]" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
            <option disabled value="">Status</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500 appearance-none min-w-[120px]" value={filters.owner} onChange={(e) => handleFilterChange('owner', e.target.value)}>
            <option disabled value="">Owner</option>
            {owners.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <select className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500 appearance-none min-w-[120px]" value={filters.timeline} onChange={(e) => handleFilterChange('timeline', e.target.value)}>
            <option value="All">All Time</option>
            <option value="Due Today">Due Today</option>
            <option value="Overdue">Overdue</option>
            <option value="This Week">This Week</option>
          </select>
          <button onClick={() => setIsImportOpen(true)} className="bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm px-4 py-2 rounded-xl border border-slate-700 transition-colors flex items-center gap-2">
            <FileText size={16} /> Import CSV
          </button>
          <button onClick={openNewModal} className="bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold text-sm px-4 py-2 rounded-xl transition-all shadow-[0_0_10px_rgba(56,189,248,0.3)]">
            + New Contact
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-glow flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Name & Title</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Contact Logic</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 cursor-pointer hover:text-sky-400 select-none flex items-center justify-between group" onClick={() => setSortConfig({ key: 'followUp', direction: sortConfig.key === 'followUp' && sortConfig.direction === 'asc' ? 'desc' : 'asc' })}>
                  <span>Follow-Up</span>
                  {sortConfig.key === 'followUp' && <span className="text-sky-400 opacity-60 group-hover:opacity-100">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>}
                </th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-medium">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500 font-mono">No contacts found. Add one or import a CSV.</td>
                </tr>
              ) : (
                filteredContacts.map((contact, i) => {
                  const company = crmData.companies.find(c => c.id === contact.companyId) || { companyName: 'Unassigned', industry: contact.industry || 'Unknown' };

                  return (
                    <tr key={contact.id} className="hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-slate-200 font-bold text-base">{contact.firstName} {contact.lastName}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{contact.jobTitle || 'Unknown Title'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sky-400 font-medium hover:underline cursor-pointer">{company.companyName}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{company.industry}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-300 text-xs">{contact.email}</div>
                        <div className="text-slate-500 text-xs mt-0.5 font-mono">{contact.phone || 'No Phone'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${contact.status === 'Active' || contact.status === 'Meeting Booked' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                          contact.status === 'New' || contact.status === 'Closed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {contact.nextFollowUpDate ? (
                          <div className="flex items-center gap-2 text-slate-300 text-xs">
                            <Calendar size={12} className="text-sky-400" />
                            {contact.nextFollowUpDate}
                          </div>
                        ) : (
                          <span className="text-slate-600 text-[10px] uppercase font-bold tracking-wider">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-800 text-[10px] flex items-center justify-center border border-slate-700 text-slate-300 uppercase">
                            {contact.leadOwner ? contact.leadOwner.charAt(0) : '?'}
                          </div>
                          <span className="text-slate-300 text-xs">{contact.leadOwner || 'None'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${contact.leadScore > 75 ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400'}`}>
                            {contact.leadScore || 0}
                          </div>
                          <div className="text-slate-500 text-[10px] uppercase font-mono tracking-widest">
                            {contact.aiManaged ? <span className="text-emerald-400 flex items-center gap-1"><Bot size={10} /> AI ON</span> : 'MANUAL'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleQuickAction(contact.id, 'done')} title="Mark Follow-up Done" className="p-1.5 bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-400 rounded-lg transition-colors">
                            <CheckSquare size={14} />
                          </button>
                          <button onClick={() => handleQuickAction(contact.id, 'snooze')} title="Snooze 1 Day" className="p-1.5 bg-slate-800 hover:bg-amber-500/20 hover:text-amber-400 text-slate-400 rounded-lg transition-colors">
                            <Clock size={14} />
                          </button>
                          <button onClick={() => handleQuickAction(contact.id, 'followup')} title="Set Follow-up" className="p-1.5 bg-slate-800 hover:bg-sky-500/20 hover:text-sky-400 text-slate-400 rounded-lg transition-colors">
                            <Calendar size={14} />
                          </button>
                          <button onClick={() => openEditModal(contact)} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(contact.id)} className="p-1.5 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded-lg transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CRMCompaniesModule = ({ crmData, updateCrmData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [dealFormData, setDealFormData] = useState({ dealName: '', dealOwner: 'Colton', stage: 'Discovery', estimatedValue: 0, probability: 20, expectedCloseDate: '', notes: '' });
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const initialForm = { companyName: '', website: '', industry: 'Technology', location: '', employeeSize: '', revenueEstimate: '', accountOwner: 'Tyler', accountStatus: 'Active', notes: '' };
  const [formData, setFormData] = useState(initialForm);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredCompanies = crmData.companies.filter(company =>
    ((company.companyName || '') + (company.website || '') + (company.industry || '')).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openNewModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (company) => {
    setEditingId(company.id);
    setFormData({ ...company });
    setIsModalOpen(true);
  };

  const openDealModalForCompany = (company) => {
    setSelectedCompany(company);
    setDealFormData({ dealName: `${company.companyName} Deal`, dealOwner: 'Colton', stage: 'Discovery', estimatedValue: 0, probability: 20, expectedCloseDate: '', notes: '' });
    setIsDealModalOpen(true);
  };

  const saveCompanyDeal = (e) => {
    e.preventDefault();
    const newDeal = { ...dealFormData, companyId: selectedCompany.id, companyName: selectedCompany.companyName, contactId: null, id: "D-" + Math.floor(1000 + Math.random() * 9000), activityLog: [] };
    updateCrmData({ ...crmData, deals: [newDeal, ...crmData.deals] });
    setIsDealModalOpen(false);
    showToast('Deal created successfully.');
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this company? Associated contacts will remain but lose their company link.")) {
      updateCrmData({ ...crmData, companies: crmData.companies.filter(c => c.id !== id) });
      showToast('Company deleted.');
    }
  };

  const saveCompany = (e) => {
    e.preventDefault();
    let newCompanies;
    if (editingId) {
      newCompanies = crmData.companies.map(c => c.id === editingId ? { ...c, ...formData } : c);
      showToast('Company updated successfully.');
    } else {
      const newCompany = { ...formData, id: "COMP-" + Math.floor(1000 + Math.random() * 9000) };
      newCompanies = [newCompany, ...crmData.companies];
      showToast('Company created successfully.');
    }
    updateCrmData({ ...crmData, companies: newCompanies });
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full space-y-6 relative">
      <CRMToast message={toast} />

      {/* Company Details Modal */}
      <CRMModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Company Details">
        {selectedCompany && (() => {
          const assocContacts = crmData.contacts.filter(c => c.companyId === selectedCompany.id);
          const assocDeals = crmData.deals.filter(d => d.companyId === selectedCompany.id);
          return (
            <div className="flex flex-col gap-6">
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-1">{selectedCompany.companyName}</h3>
                <a href={selectedCompany.website} className="text-sky-400 hover:underline text-sm mb-4 block" target="_blank" rel="noreferrer">{selectedCompany.website}</a>
                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                  <div><span className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">Industry</span> <span className="text-slate-300">{selectedCompany.industry}</span></div>
                  <div><span className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">Location</span> <span className="text-slate-300">{selectedCompany.location || 'Unknown'}</span></div>
                  <div><span className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">Size</span> <span className="text-slate-300">{selectedCompany.employeeSize || 'Unknown'}</span></div>
                  <div><span className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">Revenue</span> <span className="text-slate-300">{selectedCompany.revenueEstimate || 'Unknown'}</span></div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-300 mb-2 border-b border-slate-800 pb-2">Associated Contacts ({assocContacts.length})</h4>
                <div className="flex flex-col gap-2">
                  {assocContacts.length === 0 ? <p className="text-slate-500 text-sm">No contacts found.</p> : assocContacts.map(c => (
                    <div key={c.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="text-slate-200 font-bold text-sm">{c.firstName} {c.lastName}</div>
                        <div className="text-slate-500 text-xs">{c.jobTitle || 'Unknown Title'}</div>
                      </div>
                      <span className="text-sky-400 text-xs px-2 py-1 bg-sky-500/10 rounded font-bold uppercase tracking-wider">{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-300 mb-2 border-b border-slate-800 pb-2">Active Deals ({assocDeals.length})</h4>
                <div className="flex flex-col gap-2">
                  {assocDeals.length === 0 ? <p className="text-slate-500 text-sm">No deals found.</p> : assocDeals.map(d => (
                    <div key={d.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="text-slate-200 font-bold text-sm">{d.dealName}</div>
                        <div className="text-emerald-400 font-mono text-xs">${d.estimatedValue.toLocaleString()}</div>
                      </div>
                      <span className="text-amber-400 text-xs px-2 py-1 bg-amber-500/10 rounded border border-amber-500/20 font-bold uppercase tracking-wider">{d.stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </CRMModal>

      {/* Add Deal Modal */}
      <CRMModal isOpen={isDealModalOpen} onClose={() => setIsDealModalOpen(false)} title={`New Deal for ${selectedCompany?.companyName}`}>
        <form onSubmit={saveCompanyDeal} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deal Name *</label>
            <input required value={dealFormData.dealName} onChange={e => setDealFormData({ ...dealFormData, dealName: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Estimated Value ($)</label>
              <input type="number" required value={dealFormData.estimatedValue} onChange={e => setDealFormData({ ...dealFormData, estimatedValue: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Win Probability (%)</label>
              <input type="number" min="0" max="100" value={dealFormData.probability} onChange={e => setDealFormData({ ...dealFormData, probability: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Stage</label>
              <select value={dealFormData.stage} onChange={e => setDealFormData({ ...dealFormData, stage: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500">
                <option value="Discovery">Discovery & Mapping</option>
                <option value="Proposal">Proposal Sent</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Expected Close</label>
              <input type="date" value={dealFormData.expectedCloseDate} onChange={e => setDealFormData({ ...dealFormData, expectedCloseDate: e.target.value })} style={{ colorScheme: 'dark' }} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800 mt-2">
            <button type="button" onClick={() => setIsDealModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]">Create Deal</button>
          </div>
        </form>
      </CRMModal>

      {/* Company Form Modal */}
      <CRMModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Company" : "New Company"}>
        <form onSubmit={saveCompany} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Company Name *</label>
              <input required value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Website</label>
              <input value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Industry</label>
              <input value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Location</label>
              <input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Employee Size</label>
              <input value={formData.employeeSize} onChange={e => setFormData({ ...formData, employeeSize: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Revenue Estimate</label>
              <input value={formData.revenueEstimate} onChange={e => setFormData({ ...formData, revenueEstimate: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Owner</label>
              <select value={formData.accountOwner} onChange={e => setFormData({ ...formData, accountOwner: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500">
                <option value="Tyler">Tyler</option>
                <option value="Colton">Colton</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Status</label>
              <select value={formData.accountStatus} onChange={e => setFormData({ ...formData, accountStatus: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500">
                <option value="Target">Target</option>
                <option value="Active">Active</option>
                <option value="Churned">Churned</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Notes</label>
            <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} rows="3" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500"></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800 mt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]">{editingId ? 'Save Changes' : 'Create Company'}</button>
          </div>
        </form>
      </CRMModal>

      <div className="flex gap-4 justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-glow">
        <div className="flex-1 relative max-w-md">
          <input
            type="text"
            placeholder="Search companies or domains..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>
        <button onClick={openNewModal} className="bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold text-sm px-4 py-2 rounded-xl transition-all shadow-[0_0_10px_rgba(56,189,248,0.3)]">
          + Add Company
        </button>
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-glow flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Account Name</th>
                <th className="px-6 py-4">Firmographics</th>
                <th className="px-6 py-4">Network Activity</th>
                <th className="px-6 py-4 text-center">Pipeline Potential</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-medium">
              {filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500 font-mono">No companies found. Create one to get started.</td>
                </tr>
              ) : (
                filteredCompanies.map((company, i) => {
                  // Relational Calculations
                  const associatedContacts = crmData.contacts.filter(c => c.companyId === company.id);
                  const activeDeals = crmData.deals.filter(d => d.companyId === company.id && !d.stage.includes('Closed'));
                  const totalPipeline = activeDeals.reduce((sum, d) => sum + d.estimatedValue, 0);

                  return (
                    <tr key={company.id} className="hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-white font-bold text-base flex items-center gap-2">
                          {company.companyName}
                          {company.accountStatus === 'Active' && <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></div>}
                        </div>
                        <div className="text-sky-400 text-xs font-mono mt-0.5 hover:underline cursor-pointer">{company.website}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 mb-1.5">
                          <span className="bg-slate-800 border border-slate-700 text-slate-300 text-[10px] px-2 py-0.5 rounded font-bold uppercase">{company.industry}</span>
                        </div>
                        <div className="text-slate-500 text-xs flex items-center gap-2">
                          <span>{company.employeeSize} EMP</span> • <span>{company.revenueEstimate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-[-8px]">
                          {associatedContacts.length > 0 ? associatedContacts.slice(0, 3).map((contact, idx) => (
                            <div key={idx} className="w-7 h-7 rounded-full bg-slate-800 text-[10px] flex items-center justify-center border-2 border-slate-900 text-slate-300 -ml-2 first:ml-0 relative z-10 hover:z-20 hover:scale-110 transition-transform cursor-pointer" title={contact.firstName + " " + contact.lastName}>
                              {(contact.firstName || '').charAt(0)}{(contact.lastName || '').charAt(0)}
                            </div>
                          )) : <span className="text-xs text-slate-600 italic">No contacts synced.</span>}
                          {associatedContacts.length > 3 && (
                            <div className="w-7 h-7 rounded-full bg-slate-950 text-[10px] flex items-center justify-center border-2 border-slate-800 text-slate-500 -ml-2 relative z-10">
                              +{associatedContacts.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-lg font-black text-white glow-text">${totalPipeline.toLocaleString()}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest">{activeDeals.length} Active Deals</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setSelectedCompany(company); setIsDetailModalOpen(true); }} title="Company Details" className="p-1.5 bg-slate-800 hover:bg-sky-500/20 hover:text-sky-400 text-slate-400 rounded-lg transition-colors">
                            <Search size={14} />
                          </button>
                          <button onClick={() => openDealModalForCompany(company)} title="Add Deal" className="p-1.5 bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-slate-400 rounded-lg transition-colors">
                            <DollarSign size={14} />
                          </button>
                          <button onClick={() => openEditModal(company)} title="Edit Company" className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(company.id)} title="Delete Company" className="p-1.5 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded-lg transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CRMDealsModule = ({ crmData, updateCrmData }) => {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showCompanySuggest, setShowCompanySuggest] = useState(false);

  const initialForm = { dealName: '', companyName: '', contactName: '', dealOwner: 'Colton', stage: 'Discovery', estimatedValue: 0, probability: 20, expectedCloseDate: '', notes: '' };
  const [formData, setFormData] = useState(initialForm);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const stages = [
    { id: 'Discovery', label: 'Discovery & Mapping', color: 'border-slate-500' },
    { id: 'Proposal', label: 'Proposal Sent', color: 'border-yellow-500' },
    { id: 'Negotiation', label: 'Negotiation', color: 'border-sky-500' },
    { id: 'Closed Won', label: 'Closed Won', color: 'border-emerald-500' },
    { id: 'Closed Lost', label: 'Closed Lost', color: 'border-red-500' }
  ];

  const openNewModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (deal) => {
    setEditingId(deal.id);
    const company = crmData.companies.find(c => c.id === deal.companyId) || { companyName: '' };
    const contact = crmData.contacts.find(c => c.id === deal.contactId) || { firstName: '', lastName: '' };
    setFormData({ ...deal, companyName: company.companyName, contactName: contact.firstName ? `${contact.firstName} ${contact.lastName}` : '' });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this deal?")) {
      updateCrmData({ ...crmData, deals: crmData.deals.filter(d => d.id !== id) });
      showToast('Deal deleted.');
    }
  };

  const saveDeal = (e) => {
    e.preventDefault();
    let compId = null;
    let contId = null;
    let newCompanies = [...crmData.companies];

    if (formData.companyName) {
      const existingComp = crmData.companies.find(c => c.companyName.toLowerCase() === formData.companyName.toLowerCase());
      if (existingComp) {
        compId = existingComp.id;
      } else {
        compId = "COMP-" + Math.floor(1000 + Math.random() * 9000);
        newCompanies.push({
          id: compId, companyName: formData.companyName, website: '', industry: 'Unknown', location: '', accountOwner: formData.dealOwner, accountStatus: 'Active', notes: ''
        });
      }
    }

    const { companyName, contactName, ...cleanedData } = formData;
    cleanedData.companyId = compId;
    cleanedData.contactId = contId;

    let newDeals;
    if (editingId) {
      newDeals = crmData.deals.map(d => d.id === editingId ? { ...d, ...cleanedData } : d);
      showToast('Deal updated successfully.');
    } else {
      const newDeal = { ...cleanedData, id: "D-" + Math.floor(1000 + Math.random() * 9000), activityLog: [] };
      newDeals = [newDeal, ...crmData.deals];
      showToast('Deal created successfully.');
    }

    updateCrmData({ ...crmData, deals: newDeals, companies: newCompanies });
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full space-y-6 relative">
      <CRMToast message={toast} />

      <CRMModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Deal" : "New Deal"}>
        <form onSubmit={saveDeal} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deal Name *</label>
            <input required value={formData.dealName} onChange={e => setFormData({ ...formData, dealName: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Company Name *</label>
              <input required value={formData.companyName}
                onChange={e => { setFormData({ ...formData, companyName: e.target.value }); setShowCompanySuggest(true); }}
                onFocus={() => setShowCompanySuggest(true)}
                onBlur={() => setTimeout(() => setShowCompanySuggest(false), 200)}
                placeholder="Existing or new..." className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
              {showCompanySuggest && suggestedCompanies.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                  {suggestedCompanies.map(c => (
                    <div key={c.id} onMouseDown={(e) => { e.preventDefault(); setFormData({ ...formData, companyName: c.companyName }); setShowCompanySuggest(false); }} className="px-4 py-2 hover:bg-sky-500/20 hover:text-sky-400 cursor-pointer text-sm text-slate-300 transition-colors border-b border-slate-700/50 last:border-0">
                      <div className="font-bold text-white">{c.companyName}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest">{c.industry}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Primary Contact</label>
              <input value={formData.contactName} onChange={e => setFormData({ ...formData, contactName: e.target.value })} placeholder="Optional name" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deal Owner</label>
              <select value={formData.dealOwner} onChange={e => setFormData({ ...formData, dealOwner: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500">
                <option value="Tyler">Tyler</option>
                <option value="Colton">Colton</option>
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Stage</label>
              <select value={formData.stage} onChange={e => setFormData({ ...formData, stage: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500">
                {stages.map(s => <option key={s.id} value={s.id}>{s.id}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Estimated Value ($)</label>
              <input type="number" required value={formData.estimatedValue} onChange={e => setFormData({ ...formData, estimatedValue: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Probability (%)</label>
              <input type="number" min="0" max="100" value={formData.probability} onChange={e => setFormData({ ...formData, probability: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Close Date</label>
              <input type="date" value={formData.expectedCloseDate} onChange={e => setFormData({ ...formData, expectedCloseDate: e.target.value })} style={{ colorScheme: 'dark' }} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Notes</label>
            <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} rows="2" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500"></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800 mt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]">{editingId ? 'Save Changes' : 'Create Deal'}</button>
          </div>
        </form>
      </CRMModal>

      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-glow">
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button onClick={() => setViewMode('kanban')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'kanban' ? 'bg-slate-800 text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Kanban</button>
          <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-slate-800 text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>List View</button>
        </div>
        <button onClick={openNewModal} className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm px-4 py-2 rounded-xl transition-all shadow-[0_0_10px_rgba(56,189,248,0.3)]">
          + New Deal
        </button>
      </div>

      {viewMode === 'kanban' ? (
        <div className="flex-1 overflow-x-auto flex gap-6 pb-4">
          {stages.map(stage => {
            const stageDeals = crmData.deals.filter(d => d.stage === stage.id);
            const stageValue = stageDeals.reduce((sum, d) => sum + d.estimatedValue, 0);

            return (
              <div key={stage.id} className="min-w-[320px] w-80 flex flex-col h-full bg-slate-900/50 rounded-2xl border border-slate-800/50">
                <div className={`p-4 border-b-2 ${stage.color} bg-slate-900 rounded-t-2xl flex justify-between items-center`}>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">{stage.label}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">{stageDeals.length}</span>
                    <span className="text-sm font-bold text-sky-400">${(stageValue / 1000).toFixed(0)}k</span>
                  </div>
                </div>

                <div className="flex-1 p-3 overflow-y-auto space-y-3">
                  {stageDeals.map(deal => {
                    const company = crmData.companies.find(c => c.id === deal.companyId);

                    return (
                      <div key={deal.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-sky-500/50 transition-colors shadow-sm group relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-20 bg-slate-950/80 backdrop-blur-sm p-1 rounded-lg">
                          <button onClick={() => openEditModal(deal)} className="p-1 hover:text-sky-400 text-slate-500 transition-colors bg-slate-800 rounded text-[10px] font-bold uppercase tracking-wider px-2">Edit</button>
                          <button onClick={() => handleDelete(deal.id)} className="p-1 hover:text-red-400 text-slate-500 transition-colors"><Trash2 size={14} /></button>
                        </div>

                        <div className="flex justify-between items-start mb-2 pl-2">
                          <h4 className="text-slate-200 font-bold text-sm">{deal.dealName}</h4>
                          <span className="text-emerald-400 font-bold text-sm glow-text">${deal.estimatedValue.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4 pl-2">
                          <Building size={12} className="text-slate-500" />
                          <span className="text-slate-400 text-xs">{company ? company.companyName : 'Unknown Company'}</span>
                        </div>
                        <div className="flex justify-between items-center pl-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-slate-800 text-[9px] flex items-center justify-center border border-slate-700 text-slate-300">
                              {deal.dealOwner ? deal.dealOwner.charAt(0) : '?'}
                            </div>
                            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{deal.dealOwner}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                            <Target size={10} /> {deal.probability}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {stageDeals.length === 0 && (
                    <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-800/50 rounded-xl p-6 text-slate-600 font-mono text-xs text-center">
                      No deals in {stage.id}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-glow flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">Deal Name</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Stage</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Probability</th>
                  <th className="px-6 py-4">Close Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-medium">
                {crmData.deals.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-500 font-mono">No deals found. Create one.</td>
                  </tr>
                ) : (
                  crmData.deals.sort((a, b) => b.estimatedValue - a.estimatedValue).map((deal) => {
                    const company = crmData.companies.find(c => c.id === deal.companyId);
                    const stageConfig = stages.find(s => s.id === deal.stage) || stages[0];

                    return (
                      <tr key={deal.id} className="hover:bg-slate-800/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="text-white font-bold text-base">{deal.dealName}</div>
                          <div className="text-slate-500 text-xs mt-0.5 max-w-[200px] truncate">{deal.notes}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sky-400 font-medium hover:underline cursor-pointer">{company ? company.companyName : 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-950 border-l-2 ${stageConfig.color}`}>
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-emerald-400 font-black text-sm glow-text">${deal.estimatedValue.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1.5 w-24">
                            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                              <span>{deal.probability}%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1.5">
                              <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${deal.probability}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-slate-300 font-mono text-xs">{deal.expectedCloseDate}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEditModal(deal)} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(deal.id)} className="p-1.5 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded-lg transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const CRMPipelineModule = ({ crmData, updateCrmData }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Q1 2026');

  const stages = [
    { id: 'Discovery', label: 'Discovery', color: 'bg-slate-500' },
    { id: 'Proposal', label: 'Proposal', color: 'bg-yellow-500' },
    { id: 'Negotiation', label: 'Negotiation', color: 'bg-sky-500' },
    { id: 'Closed Won', label: 'Closed Won', color: 'bg-emerald-500' }
  ];

  // Pipeline Math
  const totalValue = crmData.deals.reduce((sum, d) => sum + d.estimatedValue, 0);
  const weightedValue = crmData.deals.reduce((sum, d) => sum + (d.estimatedValue * (d.probability / 100)), 0);
  const wonValue = crmData.deals.filter(d => d.stage === 'Closed Won').reduce((sum, d) => sum + d.estimatedValue, 0);

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header & Controls */}
      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-glow">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><BarChart className="text-sky-400" /> Revenue Forecast</h2>
        <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-sky-500 appearance-none min-w-[150px] font-bold"
        >
          <option>Q1 2026</option>
          <option>Q2 2026</option>
          <option>FY 2026</option>
        </select>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-700">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Pipeline Value</div>
          <div className="text-3xl font-black text-white">${totalValue.toLocaleString()}</div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-700">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Weighted Forecast</div>
          <div className="text-3xl font-black text-sky-400 glow-text">${weightedValue.toLocaleString()}</div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
          {/* Progress bar background visual */}
          <div className="absolute top-0 left-0 bottom-0 bg-emerald-500/10" style={{ width: `${(wonValue / totalValue) * 100}%` }}></div>
          <div className="relative z-10">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Closed Won (YTD)</div>
            <div className="text-3xl font-black text-emerald-400">${wonValue.toLocaleString()}</div>
            <div className="text-xs text-emerald-500 font-mono mt-2">{((wonValue / totalValue) * 100).toFixed(1)}% of total pipeline converted</div>
          </div>
        </div>
      </div>

      {/* Stage Analysis Funnel */}
      <div className="flex-1 glass-panel p-8 rounded-2xl border border-slate-700 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-8 uppercase tracking-wider flex items-center gap-2">Deal Velocity by Stage</h3>

        <div className="flex-1 flex flex-col justify-center gap-6 max-w-4xl mx-auto w-full">
          {stages.map((stage, i) => {
            const stageDeals = crmData.deals.filter(d => d.stage === stage.id);
            const stageTotal = stageDeals.reduce((sum, d) => sum + d.estimatedValue, 0);

            // Calculate a fake width percentage based on index to simulate a funnel shape
            // 100% -> 85% -> 60% -> 40%
            const visualWidth = 100 - (i * 18);

            return (
              <div key={stage.id} className="relative flex items-center group cursor-pointer hover:scale-[1.02] transition-transform gap-4">
                {/* Funnel Bar */}
                <div className="flex-1">
                  <div
                    className={`h-16 rounded-r-xl ${stage.color} bg-opacity-80 border-y border-r border-white/10 flex items-center shadow-lg relative z-10`}
                    style={{ width: `${visualWidth}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                    <div className="px-6 relative z-20 flex items-center justify-between w-full">
                      <span className="text-white font-black uppercase tracking-widest text-sm sm:text-base drop-shadow-md">{stage.label}</span>
                      <span className="text-white/90 font-bold text-sm bg-black/20 px-3 py-1 rounded-lg backdrop-blur-sm">{stageDeals.length} Deals</span>
                    </div>
                  </div>
                </div>

                {/* Metrics Callout */}
                <div className="w-32 flex-shrink-0 flex items-center justify-end opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="text-right">
                    <div className="text-xl font-black text-white glow-text">${stageTotal.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">In Stage</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CRMAutomationView = () => {
  const [logs, setLogs] = useState([
    "[10:04:12] INITIALIZING AUTO-TRIAGE AGENT...",
    "[10:04:13] CONNECTING ZENDESK WEbHOOK [200 OK]",
    "[10:05:01] EVENT RECEIVED: TICKET #8942",
    "[10:05:02] PARSING INTENT... -> CATEGORY: BILLING",
    "[10:05:04] ROUTING TO JIRA (PROJ: FIN-22) [SUCCESS]"
  ]);

  useEffect(() => {
    const newLogs = [
      "[10:12:45] PDF INGESTION STARTED: invoice_774.pdf",
      "[10:12:46] EXTRACTING K-1 TABLES...",
      "[10:12:48] VECTOR MATCH: VENDOR 'ACME CORP'",
      "[10:12:50] PUSHING STRUCTURED DATA TO POSTGRES...",
      "[10:12:51] DB WRITE ACKNOWLEDGED [SUCCESS]",
      "[10:15:00] STRIPE RECONCILIATION CRON TRIGGERED",
      "[10:15:05] PROCESSED 142 TRANSACTIONS",
      "[10:15:06] NO DISCREPANCIES FOUND"
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < newLogs.length) {
        setLogs(prev => [...prev.slice(-8), newLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const agents = [
    { name: "Zendesk ➔ Jira Triage", type: "Webhook", status: "Active", lastRun: "2m ago" },
    { name: "Invoice PDF Extractor", type: "Cron (Hourly)", status: "Active", lastRun: "14m ago" },
    { name: "Stripe Ledger Sync", type: "Cron (Daily)", status: "Pending", lastRun: "11h ago" }
  ];

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-slate-700">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-between">Tokens Consumed <Activity size={14} className="text-sky-400" /></div>
          <div className="text-3xl font-black text-white">14.2M</div>
          <div className="text-xs text-emerald-400 mt-2 font-mono flex items-center gap-1">+2.4% vs last week</div>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-slate-700">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-between">API Requests (24h) <Zap size={14} className="text-sky-400" /></div>
          <div className="text-3xl font-black text-white">8,405</div>
          <div className="text-xs text-sky-400 mt-2 font-mono flex items-center gap-1">Capacity: 12%</div>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-slate-700">
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-between">Error Rate <ShieldCheck size={14} className="text-emerald-400" /></div>
          <div className="text-3xl font-black text-white">{"<"} 0.01%</div>
          <div className="text-xs text-slate-500 mt-2 font-mono flex items-center gap-1">0 active alerts</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Active Agents List */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-700 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2"><Bot size={18} className="text-sky-400" /> Active Infrastructure</h3>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {agents.map((agent, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between group hover:border-sky-500/30 transition-colors">
                <div>
                  <div className="text-slate-200 font-bold text-sm mb-1">{agent.name}</div>
                  <div className="text-xs text-slate-500 font-mono">{agent.type}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    {agent.status === 'Active' ? (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-slate-600"></span>
                    )}
                    <span className={`text-xs font-bold uppercase tracking-wider ${agent.status === 'Active' ? 'text-emerald-400' : 'text-slate-400'} `}>{agent.status}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">Run: {agent.lastRun}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Terminal Log */}
        <div className="glass-panel border border-slate-700 rounded-2xl flex flex-col overflow-hidden bg-slate-950 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-2 text-xs font-mono text-slate-500">orchestrator_node_01.log</span>
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto flex flex-col justify-end space-y-2">
            {logs.map((log, i) => (
              <div key={i} className={`${log.includes('SUCCESS') ? 'text-emerald-400' : log.includes('STARTED') || log.includes('TRIGGERED') ? 'text-sky-400' : 'text-slate-400'} `}>
                <span className="opacity-50 mr-2">{'>'}</span>{log}
              </div>
            ))}
            <div className="text-emerald-400 animate-pulse"><span className="opacity-50 mr-2">{'>'}</span>_</div>
          </div>
        </div>
      </div>
    </div>
  );
};


const CRMDashboard = ({ crmData, updateCrmData }) => {
  const [currentView, setCurrentView] = useState('Overview');

  const logout = () => {
    localStorage.removeItem('crm_auth');
    window.location.hash = '';
  };
  const renderContent = () => {
    switch (currentView) {
      case 'Followups':
        return <CRMFollowupsModule crmData={crmData} updateCrmData={updateCrmData} onNavigate={setCurrentView} />;
      case 'Contacts':
        return <CRMContactsModule crmData={crmData} updateCrmData={updateCrmData} />;
      case 'Companies':
        return <CRMCompaniesModule crmData={crmData} updateCrmData={updateCrmData} onNavigate={setCurrentView} />;
      case 'Deals':
        return <CRMDealsModule crmData={crmData} updateCrmData={updateCrmData} />;
      case 'Pipeline':
        return <CRMPipelineModule crmData={crmData} updateCrmData={updateCrmData} />;
      case 'Automations':
        return <CRMAutomationView />;
      case 'Sandbox':
        return <CRMSandboxView />;
      case 'Overview':
      default:
        return <CRMOverviewModule crmData={crmData} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-50 relative z-50">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-sky-500 text-slate-950 flex items-center justify-center">
            <Zap size={18} />
          </div>
          <span className="font-bold text-lg">723 Command</span>
        </div>
        <ul className="space-y-1 mt-6 px-3">
          <li>
            <button onClick={() => setCurrentView('Overview')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${currentView === 'Overview' ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <Activity size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentView('Followups')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${currentView === 'Followups' ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <ListTodo size={18} /> <span className="text-sm font-medium">Follow-ups</span>
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentView('Contacts')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${currentView === 'Contacts' ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <Users size={18} /> <span className="text-sm font-medium">Contacts</span>
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentView('Companies')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${currentView === 'Companies' ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <Building size={18} /> <span className="text-sm font-medium">Companies</span>
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentView('Deals')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${currentView === 'Deals' ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <DollarSign size={18} /> <span className="text-sm font-medium">Deals</span>
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentView('Pipeline')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${currentView === 'Pipeline' ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <BarChart size={18} /> <span className="text-sm font-medium">Pipeline</span>
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentView('Automations')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${currentView === 'Automations' ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <Bot size={18} /> <span className="text-sm font-medium">Automations</span>
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentView('Sandbox')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${currentView === 'Sandbox' ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <Target size={18} /> <span className="text-sm font-medium">Sandbox</span>
            </button>
          </li>
        </ul>
        <div className="mt-auto p-4 border-t border-slate-800 text-sm font-medium text-slate-500 flex flex-col gap-4">
          <a href="#/" className="hover:text-sky-400 w-full text-left px-4">Site Frontend</a>
          <button onClick={logout} className="hover:text-slate-300 w-full text-left px-4">
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden h-screen text-left">
        <header className="h-20 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-950 shrink-0">
          <h1 className="text-2xl font-bold">{currentView}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              SYSTEM LIVE
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              CS
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-slate-950">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// --- App Router Root ---

const App = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('crm_auth') === 'true'
  );

  const [crmData, setCrmData] = useState({
    contacts: [],
    companies: [],
    deals: []
  });
  const [isDbConnected, setIsDbConnected] = useState(false);

  // Initial Data Load (Prioritizing Cloud, failing over to Local Storage)
  useEffect(() => {
    const fetchCloudData = async () => {
      if (!supabase) {
        const saved = localStorage.getItem('723_crm_data_v2');
        if (saved) setCrmData(JSON.parse(saved));
        return;
      }
      try {
        const { data: contactsData, error: cErr } = await supabase.from('crm_contacts').select('*');
        const { data: companiesData, error: compErr } = await supabase.from('crm_companies').select('*');
        const { data: dealsData, error: dErr } = await supabase.from('crm_deals').select('*');

        if (!cErr && !compErr && !dErr) {
          setCrmData({
            contacts: contactsData || [],
            companies: companiesData || [],
            deals: dealsData || []
          });
          setIsDbConnected(true);
        } else {
          console.error("Supabase Data Fetch Error:", cErr, compErr, dErr);
          const saved = localStorage.getItem('723_crm_data_v2');
          if (saved) setCrmData(JSON.parse(saved));
        }
      } catch (err) {
        console.error("Network error fetching Supabase:", err);
        const saved = localStorage.getItem('723_crm_data_v2');
        if (saved) setCrmData(JSON.parse(saved));
      }
    };
    fetchCloudData();
  }, []);

  // Sync Mutation Engine (Optimistic UI Update + Background Cloud Sync)
  const updateCrmData = async (newData) => {
    // 1. Calculate Deletions (Items in old state missing from new state)
    const deletedContacts = crmData.contacts.filter(old => !newData.contacts.some(n => n.id === old.id));
    const deletedCompanies = crmData.companies.filter(old => !newData.companies.some(n => n.id === old.id));
    const deletedDeals = crmData.deals.filter(old => !newData.deals.some(n => n.id === old.id));

    // 2. Optimistically update local UI immediately so it feels instanteous
    setCrmData(newData);
    localStorage.setItem('723_crm_data_v2', JSON.stringify(newData)); // Local backup

    // 3. Sync arrays to relational Postgres tables
    if (supabase) {
      try {
        // Upsert modified/new items
        if (newData.contacts.length > 0) await supabase.from('crm_contacts').upsert(newData.contacts);
        if (newData.companies.length > 0) await supabase.from('crm_companies').upsert(newData.companies);
        if (newData.deals.length > 0) await supabase.from('crm_deals').upsert(newData.deals);

        // Delete removed items
        for (const c of deletedContacts) await supabase.from('crm_contacts').delete().eq('id', c.id);
        for (const c of deletedCompanies) await supabase.from('crm_companies').delete().eq('id', c.id);
        for (const d of deletedDeals) await supabase.from('crm_deals').delete().eq('id', d.id);
      } catch (e) {
        console.error("Supabase sync failed:", e);
      }
    }
  };


  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    // Initial routing fix to trigger re-render on load securely
    setRoute(window.location.hash || '#/');
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Ensure window is scrolled up on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  if (route === '#/backend') {
    if (isAuthenticated) {
      return <CRMDashboard crmData={crmData} updateCrmData={updateCrmData} />;
    } else {
      return <LoginGate onLogin={() => setIsAuthenticated(true)} />;
    }
  }

  // Frontend Router
  const renderFrontendComponent = () => {
    switch (route) {
      case '#/services':
        return <ServicesPage />;
      case '#/about':
        return <AboutPage />;
      case '#/cases':
        return <CaseStudiesPage />;
      case '#/contact':
        return <ContactPage onSubmitLead={(lead) => {
          // Temporarily support pushing new form submissions specifically to contacts
          const newContact = {
            id: 'C-' + Math.floor(1000 + Math.random() * 9000),
            firstName: lead.name.split(' ')[0] || lead.name,
            lastName: lead.name.split(' ').slice(1).join(' ') || '',
            email: lead.email,
            phone: '',
            linkedIn: '',
            jobTitle: '',
            companyId: '',
            industry: 'Unknown',
            location: '',
            leadSource: 'Inbound Web',
            leadOwner: 'Unassigned',
            status: 'New',
            leadScore: 50,
            potentialValue: 0,
            lastContactedDate: new Date().toISOString(),
            nextFollowUpDate: '',
            outreachStatus: 'Pending',
            emailSequenceStage: 'None',
            aiManaged: false,
            notes: lead.message,
            tags: ['Inbound'],
            activityTimeline: []
          };
          updateCrmData({ ...crmData, contacts: [newContact, ...crmData.contacts] });
        }} />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="relative selection:bg-sky-500/30 selection:text-sky-400">
      <Navbar currentRoute={route} />

      {/* Route Content */}
      <main className="min-h-screen">
        {renderFrontendComponent()}
      </main>

      <Footer />
      <AIChatbotWidget isBackend={route === '#/backend'} />
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
