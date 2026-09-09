import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, ArrowUp, Bell, BookOpen, BriefcaseBusiness,
  Check, ChevronDown, ChevronRight, FileText, Languages, MapPin, Mic, Phone,
  Plus, Search, Send, ShieldAlert, Siren, X, MoreHorizontal, MoreVertical,
  Sparkles, Activity, Award, ZoomIn, ZoomOut, RotateCcw,
  Calendar, Heart, Edit3, Download, Volume2, RefreshCw, Trash2, Navigation,
  PhoneOff, QrCode, Camera, Copy, ExternalLink, FileCheck, ListChecks,
  Share2, HelpCircle, Clock, Sliders, Eye, Bookmark, TrendingUp, GraduationCap, Home, PiggyBank, MessageSquare
} from 'lucide-react';
import unnatiLogoSvg from './unnati_logo.svg';
import abhayaSvg from './abhaya_illustration.svg';
import './styles.css';

/* ─── localization & translations ────────────────────────── */
const LANGUAGES = [
  ['English', 'English'], ['Hindi', 'हिन्दी'], ['Bengali', 'বাংলা'], ['Telugu', 'తెలుగు'],
  ['Marathi', 'मराठी'], ['Tamil', 'தமிழ்'], ['Urdu', 'اردو'], ['Gujarati', 'ગુજરાતી'],
  ['Kannada', 'ಕನ್ನಡ'], ['Odia', 'ଓଡ଼ିଆ'], ['Malayalam', 'മലയാളം'], ['Punjabi', 'ਪੰਜਾਬੀ'],
  ['Assamese', 'অসমীয়া'], ['Maithili', 'मैथिली'], ['Santali', 'ᱥᱟᱱᱛᱟᱲᱤ'], ['Kashmiri', 'كأشُر'],
  ['Nepali', 'नेपाली'], ['Konkani', 'कोंकणी'], ['Manipuri', 'মৈতৈলোन्'], ['Bodo', 'बड़ो'],
  ['Dogri', 'डोगरी'], ['Sindhi', 'سنڌي'], ['Sanskrit', 'संस्कृतम्']
];

const TRANSLATIONS = {
  English: {
    finVerifiedSchemes: 'Verified Schemes',
    finGovPrograms: 'Government programs matching your location & requirements.',
    finSearchPlaceholder: 'Search by keyword or scheme',
    finCheckEligibility: 'Check Eligibility',
    finBudgetTracking: 'Monthly Budget Tracking',
    finExpenseTracker: 'Expense Tracker',
    finAddExpense: 'Add Expense',
    finCancel: 'Cancel',
    finSpent: 'Spent ₹',
    finOf: 'of ₹',
    finRemaining: 'remaining in monthly allowance',
    finDescPlaceholder: 'Description (e.g. Groceries, School fees…)',
    finAmountPlaceholder: 'Amount (₹)',
    finSaveExpense: 'Save Expense',
    finNoExpenses: 'No expenses recorded yet',
    finClickAdd: 'Click "+ Add Expense" above to<br/>track your daily household expenditures.',
    finUsageOverview: 'Usage Overview',
    finMonthlyLimit: 'Monthly Limit & Alerts',
    finBudgetUtilized: 'Budget Utilized',
    finBudgetCheckin: 'Budget Check-in',
    finYouHave: 'You have ₹',
    finRemainingMonth: 'remaining this month.',
    finCloseLimit: ' You\'re close to your monthly limit for shopping.',
    finComfortable: ' You are comfortably within your monthly allocation.',
    finProTip: 'Pro-Tip',
    finProTipDesc: 'Putting just ₹200/month into Sukanya Samriddhi or PPF earns 8.2% guaranteed return.',
    finSavingsGoals: 'Savings Goals',
    finSetGoals: 'Set your goals to stay motivated and plan better.',
    finGoalsSet: 'goals set',
    finUpdateGoal: 'Update Goal',
    finAddGoal: 'Add Goal',
    finCheckFullEligibility: 'Check Full Eligibility & Apply',
    livCareerAdv: 'Career Advancement',
    livResumeCreator: 'Professional Resume / CV Creator',
    livAtsFriendly: 'ATS-friendly formats designed for healthcare, retail, coordinator, and office roles.',
    livBuildResume: 'Build My Resume',
    livAiVoice: 'AI Voice Practice',
    livInterviewSim: 'Interview Simulator',
    livPracticeReal: 'Practice real interview questions out loud in your language. Receive instant AI scores for confidence, clarity, and tone.',
    livStartVoice: 'Start Voice Practice',
    livVideoGuides: '🎬 <strong>Video Guides:</strong> Watch 5-minute video tutorials on answering salary questions and introducing your past achievements confidently.',
    safProtection: '24/7 Protection & Rapid Response',
    safAssistance: 'Immediate Emergency Assistance',
    safPrivateDispatch: 'Private emergency dispatch, discreet exit simulation, and verified helplines.',
    safActivateSOS: 'Activate Emergency SOS',
    safDiscreetExit: 'Discreet Exit Call',
    safSimulatesCall: 'Simulates an incoming mobile phone call to exit uncomfortable or tense situations discreetly.',
    safShareLocation: 'Share Live Location',
    safGeneratesLink: 'Generates a private 2-hour encrypted GPS tracking link to send to trusted contacts.',
    safCopyLink: 'Copy Tracking Link',
    safLinkExpires: 'This secure tracking link expires in 2 hours.',
    safEmergencyContacts: 'Emergency Contacts',
    safDesignateContacts: 'Designate trusted contacts who will immediately receive your location during an SOS.',
    safManageContacts: 'Manage Contacts',
    safClose: 'Close',
    rigExactScripts: 'Exact Word-for-Word Scripts',
    rigKnowWhatToSay: 'Know What to Say',
    rigHereIsWhat: 'Here is what you can say, word for word, if this happens — practical, assertive, and legal.',
    rigListenOutLoud: 'Listen out loud',
    rigCopyScript: 'Copy Script',
    rigCopied: 'Copied!',
    rigPlainExplainers: 'Plain-Language Explainers',
    rigLegalProtections: 'Know Your Legal Protections',
    rigUnderstandLegal: 'Understand your legal standing in plain words without confusing legal jargon.',
    rigWorkplacePosh: 'Workplace & POSH Protection',
    rigMandatoryICC: 'Mandatory ICC committees in organizations with 10+ employees.',
    rigEqualProperty: 'Equal Property & Inheritance Rights',
    rigEqualRights: 'Equal rights in ancestral property under Hindu Succession Act.',
    rigProtectionDV: 'Protection from Domestic Violence',
    rigRightToReside: 'Right to reside in shared household, interim relief & protection orders.',
    rigFreeLegalAid: 'Free Legal Aid (NALSA)',
    rigEveryWoman: 'Every woman in India is legally entitled to free advocates in any court.',
    rigReadFullGuide: 'Read Full Legal Guide',

    homeSearchPlaceholder: 'Search for a scheme, service or how to get help...',
    homeRecTitle: 'Recommended for you',
    homeRecSub: 'Based on your location and profile',
    homeViewAll: 'View all schemes',
    homeTrackApps: 'Track your applications',
    homeNearbyTitle: 'Nearby Support Services',
    homeNearbySub: 'Find verified centers near you',
    homeViewMap: 'View on map',
    homeContactsTitle: 'Important Contacts',
    homeContactsSub: 'Quick access to verified helplines',
    homeExploreTitle: 'Explore Support Areas',
    homeExploreSub: 'Find schemes, services and information across key areas',
    homeExpHealth: 'Hospitals, insurance, maternal care and more',
    homeExpWealth: 'Savings, pensions, benefits and insurance',
    homeExpLivelihood: 'Jobs, skill training and entrepreneurship',
    homeExpFinance: 'Loans, scholarships and financial support',
    homeExpSafety: 'Emergency help, legal aid and crisis support',
    homeExpRights: 'Know your rights and access legal resources',
    wealthRecKicker: 'RECOMMENDED FOR YOU',
    wealthSchemesTitle: 'Financial Schemes',
    wealthSchemesSub: 'Based on your location and profile.',
    wealthSearchPlaceholder: 'Search by keyword or scheme',
    wealthResetFilters: 'Reset filters',
    wealthViewAll: 'View all schemes',
    wealthTrackApps: 'Track your applications',
    wealthHeroKicker: 'BUILD A BRIGHTER TOMORROW',
    wealthHeroTitle: 'Small steps,',
    wealthHeroTitle2: 'big financial freedom.',
    wealthHeroDesc: 'Explore savings, loans, insurance and investment schemes made for you.',
    wealthStartExplore: 'Start exploring',
    wealthPlan: 'Plan',
    wealthSave: 'Save',
    wealthGrow: 'Grow',
    wealthExploreGoalTitle: 'Explore by Goal',
    wealthViewAllGoals: 'View all',
    wealthExploreGoalSub: 'Find the right schemes and tools for your needs.',
    wealthSnapshotTitle: 'Your Financial Snapshot',
    wealthSnapshotSub: 'Track and manage your progress.',
    wealthSavedSchemes: 'Saved Schemes',
    wealthApplications: 'Applications',
    wealthDeadlines: 'Upcoming Deadlines',
    wealthNotes: 'Personal Notes',
    wealthNeedHelpTitle: 'Need Help?',
    wealthNeedHelpSub: 'Get guidance from verified experts or helplines.',
    wealthHelpHelpline: 'Talk to a Financial Helpline',
    wealthHelpAsk: 'Ask Unnati',
    wealthHelpAskSub: 'Get step-by-step guidance',
    wealthHelpGuide: 'Financial Literacy Guide',
    wealthHelpGuideSub: 'Learn the basics of banking, saving, investing and avoiding fraud.',

    nav: { home: 'Home', health: 'Health', wealth: 'Wealth', livelihood: 'Livelihood', finance: 'Finance', safety: 'Safety', rights: 'Rights' },
    sos: 'SOS',
    signin: 'Sign in',
    askPlaceholder: 'Ask about a scheme, or how to get help...',
    tagline: 'Talk to Unnati in your language and get clear, personalized guidance — from health & financial support to opportunities, safety, and legal rights.',
    greeting: 'Namaste! I am Unnati.',
    intro: 'Ask me about maternity benefits, zero-collateral Mudra loans, free certified courses, POSH workplace rights, or emergency help.',
    recommendedForYou: 'Recommended for you',
    findingNearYou: 'Finding what is relevant near you…',
    checkEligibility: 'Check eligibility',
    trackApplication: 'Track applications',
    callMom: 'Call Mom',
    locationPrescreen: 'Unnati uses your location to show nearby hospitals, police desks, and Sakhi crisis shelters.',
    allowLocation: 'Enable location access',

    // Health Page specific
    healthKickerRec: '# RECOMMENDED FOR YOU',
    healthVerifiedSchemesTitle: 'Verified Schemes',
    healthVerifiedSchemesSub: 'Government programs matching your location & requirements.',
    healthSearchPlaceholder: 'Search by keyword or scheme',
    healthCheckEligibility: 'Check Eligibility',
    healthTrackApps: 'Track submitted applications',
    healthSchemes: [
      {
        id: 'pmjay',
        name: 'Ayushman Bharat (PM-JAY)',
        desc: 'Free health coverage up to ₹5 lakh per family per year.',
      },
      {
        id: 'jsy',
        name: 'Janani Suraksha Yojana',
        desc: 'Financial support for safe delivery and maternal care.',
      },
      {
        id: 'pmmvy',
        name: 'Pradhan Mantri Matru Vandana Yojana',
        desc: 'Cash incentive for pregnancy and lactating mothers.',
      }
    ],
    healthPeriodAlert: 'Your period may start in 2 days. Log how you are feeling?',
    healthCycleKicker: 'CYCLE & SYMPTOM TRACKING',
    healthPeriodSuiteTitle: 'Period & Wellness Suite',
    healthPeriodSuiteSub: 'Log daily flow, moods, cramps, and symptoms. View 6-month cycle length trends.',
    healthTabs: {
      cycle: 'Cycle Length',
      flow: 'Flow Intensity',
      symptoms: 'Symptoms',
      mood: 'Mood',
    },
    healthCycleHeader: 'Cycle length (days)',
    healthCycleAvg: 'Average: 28 days',
    healthFlowSublabel: "Select today's flow intensity",
    healthFlowOpts: {
      Spotting: { label: 'Spotting', desc: 'Barely visible' },
      Light: { label: 'Light', desc: 'Standard flow' },
      Medium: { label: 'Medium', desc: 'Standard flow' },
      Heavy: { label: 'Heavy', desc: 'High absorbency' },
    },
    healthSymptomsSublabel: 'Log daily symptoms',
    healthSymptoms: ['Cramps', 'Headache', 'Fatigue', 'Bloating', 'Tender Breasts', 'Back Pain', 'Acne'],
    healthMoodSublabel: 'How are you feeling today?',
    healthMoods: [
      ['Calm', '😌'], ['Happy', '😊'], ['Anxious', '😰'],
      ['Irritable', '😤'], ['Low Energy', '🔋'], ['Sensitive', '🥺']
    ],
    healthOpenTracker: 'Open complete tracker',
    healthMedScheduleKicker: 'MEDICATION SCHEDULE',
    healthScanQr: 'Scan QR',
    healthAddMed: 'Add',
    healthMedTabMedicine: 'Medicine',
    healthMedTabCabinet: 'Cabinet',
    healthNoMedsTitle: 'No medications scheduled',
    healthNoMedsDesc: 'Tap "+ Add" or "Scan QR" above to log your daily prescriptions.',
    healthCabinetEmptyTitle: 'Medicine cabinet is empty',
    healthCabinetEmptyDesc: 'Scan packaging QR code to automatically register first-aid items and track expiration.',
    healthEmergencyKicker: 'EMERGENCY REFERENCE',
    healthFirstAidTitle: 'First-Aid Emergency Guide',
    healthFirstAidSub: 'Quick steps for burns, fainting, CPR, and trauma.',
  },
  Hindi: {
    finVerifiedSchemes: 'सत्यापित योजनाएं',
    finGovPrograms: 'आपके स्थान और आवश्यकताओं से मेल खाने वाले सरकारी कार्यक्रम।',
    finSearchPlaceholder: 'कीवर्ड या योजना द्वारा खोजें',
    finCheckEligibility: 'पात्रता जांचें',
    finBudgetTracking: 'मासिक बजट ट्रैकिंग',
    finExpenseTracker: 'खर्च ट्रैकर',
    finAddExpense: 'खर्च जोड़ें',
    finCancel: 'रद्द करें',
    finSpent: 'खर्च ₹',
    finOf: 'में से ₹',
    finRemaining: 'मासिक भत्ते में शेष',
    finDescPlaceholder: 'विवरण (उदा. किराने का सामान, स्कूल की फीस...)',
    finAmountPlaceholder: 'राशि (₹)',
    finSaveExpense: 'खर्च सहेजें',
    finNoExpenses: 'अभी तक कोई खर्च दर्ज नहीं किया गया',
    finClickAdd: 'अपने दैनिक घरेलू खर्चों को ट्रैक करने के लिए<br/>ऊपर "+ खर्च जोड़ें" पर क्लिक करें।',
    finUsageOverview: 'उपयोग अवलोकन',
    finMonthlyLimit: 'मासिक सीमा और अलर्ट',
    finBudgetUtilized: 'बजट का उपयोग',
    finBudgetCheckin: 'बजट चेक-इन',
    finYouHave: 'आपके पास ₹',
    finRemainingMonth: 'इस महीने शेष हैं।',
    finCloseLimit: ' आप खरीदारी के लिए अपनी मासिक सीमा के करीब हैं।',
    finComfortable: ' आप अपने मासिक आवंटन के भीतर आराम से हैं।',
    finProTip: 'प्रो-टिप',
    finProTipDesc: 'सुकन्या समृद्धि या PPF में केवल ₹200/माह लगाने से 8.2% की गारंटीड रिटर्न मिलती है।',
    finSavingsGoals: 'बचत लक्ष्य',
    finSetGoals: 'प्रेरित रहने और बेहतर योजना बनाने के लिए अपने लक्ष्य निर्धारित करें।',
    finGoalsSet: 'लक्ष्य निर्धारित',
    finUpdateGoal: 'लक्ष्य अपडेट करें',
    finAddGoal: 'लक्ष्य जोड़ें',
    finCheckFullEligibility: 'पूरी पात्रता जांचें और आवेदन करें',
    livCareerAdv: 'कैरियर उन्नति',
    livResumeCreator: 'पेशेवर रेज़्यूमे / सीवी निर्माता',
    livAtsFriendly: 'हेल्थकेयर, रिटेल, कोऑर्डिनेटर और ऑफिस भूमिकाओं के लिए डिज़ाइन किए गए ATS-अनुकूल प्रारूप।',
    livBuildResume: 'मेरा रेज़्यूमे बनाएं',
    livAiVoice: 'एआई वॉयस अभ्यास',
    livInterviewSim: 'साक्षात्कार सिम्युलेटर',
    livPracticeReal: 'अपनी भाषा में वास्तविक साक्षात्कार प्रश्नों का जोर से अभ्यास करें। आत्मविश्वास, स्पष्टता और लहजे के लिए तुरंत एआई स्कोर प्राप्त करें।',
    livStartVoice: 'आवाज अभ्यास शुरू करें',
    livVideoGuides: '🎬 <strong>वीडियो गाइड:</strong> वेतन संबंधी सवालों के जवाब देने और अपनी पिछली उपलब्धियों को आत्मविश्वास के साथ पेश करने पर 5 मिनट के वीडियो ट्यूटोरियल देखें।',
    safProtection: '24/7 सुरक्षा और त्वरित प्रतिक्रिया',
    safAssistance: 'तत्काल आपातकालीन सहायता',
    safPrivateDispatch: 'निजी आपातकालीन प्रेषण, असतत निकास सिमुलेशन, और सत्यापित हेल्पलाइन।',
    safActivateSOS: 'आपातकालीन SOS सक्रिय करें',
    safDiscreetExit: 'असतत निकास कॉल',
    safSimulatesCall: 'असुविधाजनक या तनावपूर्ण स्थितियों से चुपचाप बाहर निकलने के लिए एक इनकमिंग मोबाइल फोन कॉल का अनुकरण करता है।',
    safShareLocation: 'लाइव लोकेशन शेयर करें',
    safGeneratesLink: 'विश्वसनीय संपर्कों को भेजने के लिए 2 घंटे का एक निजी एन्क्रिप्टेड GPS ट्रैकिंग लिंक जेनरेट करता है।',
    safCopyLink: 'ट्रैकिंग लिंक कॉपी करें',
    safLinkExpires: 'यह सुरक्षित ट्रैकिंग लिंक 2 घंटे में समाप्त हो जाता है।',
    safEmergencyContacts: 'आपातकालीन संपर्क',
    safDesignateContacts: 'विश्वसनीय संपर्कों को नामित करें जो SOS के दौरान तुरंत आपकी लोकेशन प्राप्त करेंगे।',
    safManageContacts: 'संपर्क प्रबंधित करें',
    safClose: 'बंद करें',
    rigExactScripts: 'सटीक शब्द-दर-शब्द स्क्रिप्ट',
    rigKnowWhatToSay: 'जानें क्या कहना है',
    rigHereIsWhat: 'यहां बताया गया है कि यदि ऐसा होता है तो आप शब्द-दर-शब्द क्या कह सकते हैं — व्यावहारिक, मुखर और कानूनी।',
    rigListenOutLoud: 'जोर से सुनें',
    rigCopyScript: 'स्क्रिप्ट कॉपी करें',
    rigCopied: 'कॉपी किया गया!',
    rigPlainExplainers: 'सरल भाषा में व्याख्या',
    rigLegalProtections: 'अपनी कानूनी सुरक्षा को जानें',
    rigUnderstandLegal: 'भ्रमित करने वाले कानूनी शब्दजाल के बिना सरल शब्दों में अपनी कानूनी स्थिति को समझें।',
    rigWorkplacePosh: 'कार्यस्थल और POSH सुरक्षा',
    rigMandatoryICC: '10+ कर्मचारियों वाले संगठनों में अनिवार्य ICC समितियां।',
    rigEqualProperty: 'समान संपत्ति और विरासत अधिकार',
    rigEqualRights: 'हिंदू उत्तराधिकार अधिनियम के तहत पैतृक संपत्ति में समान अधिकार।',
    rigProtectionDV: 'घरेलू हिंसा से सुरक्षा',
    rigRightToReside: 'साझा घर में रहने का अधिकार, अंतरिम राहत और सुरक्षा आदेश।',
    rigFreeLegalAid: 'मुफ्त कानूनी सहायता (NALSA)',
    rigEveryWoman: 'भारत में हर महिला कानूनी तौर पर किसी भी अदालत में मुफ्त वकीलों की हकदार है।',
    rigReadFullGuide: 'पूरी कानूनी गाइड पढ़ें',

    homeSearchPlaceholder: 'किसी योजना, सेवा या मदद के लिए खोजें...',
    homeRecTitle: 'आपके लिए अनुशंसित',
    homeRecSub: 'आपके स्थान और प्रोफ़ाइल के आधार पर',
    homeViewAll: 'सभी योजनाएं देखें',
    homeTrackApps: 'अपने आवेदनों को ट्रैक करें',
    homeNearbyTitle: 'आसपास की सहायता सेवाएं',
    homeNearbySub: 'अपने आस-पास सत्यापित केंद्र खोजें',
    homeViewMap: 'नक्शे पर देखें',
    homeContactsTitle: 'महत्वपूर्ण संपर्क',
    homeContactsSub: 'सत्यापित हेल्पलाइनों तक त्वरित पहुँच',
    homeExploreTitle: 'सहायता क्षेत्रों का अन्वेषण करें',
    homeExploreSub: 'प्रमुख क्षेत्रों में योजनाएं, सेवाएं और जानकारी खोजें',
    homeExpHealth: 'अस्पताल, बीमा, मातृ देखभाल और बहुत कुछ',
    homeExpWealth: 'बचत, पेंशन, लाभ और बीमा',
    homeExpLivelihood: 'नौकरियां, कौशल प्रशिक्षण और उद्यमिता',
    homeExpFinance: 'ऋण, छात्रवृत्ति और वित्तीय सहायता',
    homeExpSafety: 'आपातकालीन मदद, कानूनी सहायता और संकट समर्थन',
    homeExpRights: 'अपने अधिकारों को जानें और कानूनी संसाधनों तक पहुँचें',
    wealthRecKicker: 'आपके लिए अनुशंसित',
    wealthSchemesTitle: 'वित्तीय योजनाएं',
    wealthSchemesSub: 'आपके स्थान और प्रोफ़ाइल के आधार पर।',
    wealthSearchPlaceholder: 'कीवर्ड या योजना द्वारा खोजें',
    wealthResetFilters: 'फ़िल्टर रीसेट करें',
    wealthViewAll: 'सभी योजनाएं देखें',
    wealthTrackApps: 'अपने आवेदनों को ट्रैक करें',
    wealthHeroKicker: 'एक उज्जवल कल का निर्माण',
    wealthHeroTitle: 'छोटे कदम,',
    wealthHeroTitle2: 'बड़ी वित्तीय स्वतंत्रता।',
    wealthHeroDesc: 'आपके लिए बनाई गई बचत, ऋण, बीमा और निवेश योजनाओं का अन्वेषण करें।',
    wealthStartExplore: 'अन्वेषण शुरू करें',
    wealthPlan: 'योजना',
    wealthSave: 'बचत',
    wealthGrow: 'विकास',
    wealthExploreGoalTitle: 'लक्ष्य द्वारा अन्वेषण करें',
    wealthViewAllGoals: 'सभी देखें',
    wealthExploreGoalSub: 'अपनी आवश्यकताओं के लिए सही योजनाएं और उपकरण खोजें।',
    wealthSnapshotTitle: 'आपका वित्तीय स्नैपशॉट',
    wealthSnapshotSub: 'अपनी प्रगति को ट्रैक और प्रबंधित करें।',
    wealthSavedSchemes: 'सहेजी गई योजनाएं',
    wealthApplications: 'आवेदनों',
    wealthDeadlines: 'आगामी समय सीमा',
    wealthNotes: 'व्यक्तिगत नोट्स',
    wealthNeedHelpTitle: 'क्या मदद चाहिए?',
    wealthNeedHelpSub: 'सत्यापित विशेषज्ञों या हेल्पलाइनों से मार्गदर्शन प्राप्त करें।',
    wealthHelpHelpline: 'वित्तीय हेल्पलाइन से बात करें',
    wealthHelpAsk: 'उन्नति से पूछें',
    wealthHelpAskSub: 'चरण-दर-चरण मार्गदर्शन प्राप्त करें',
    wealthHelpGuide: 'वित्तीय साक्षरता गाइड',
    wealthHelpGuideSub: 'बैंकिंग, बचत, निवेश और धोखाधड़ी से बचने की मूल बातें जानें।',

    nav: { home: 'होम', health: 'स्वास्थ्य', wealth: 'सम्पत्ति', livelihood: 'आजीविका', finance: 'वित्त', safety: 'सुरक्षा', rights: 'अधिकार' },
    sos: 'आपातकाल',
    signin: 'लॉग इन',
    askPlaceholder: 'किसी सरकारी योजना या सहायता के बारे में पूछें…',
    tagline: 'उन्नति से अपनी भाषा में बात करें और स्पष्ट, व्यक्तिगत मार्गदर्शन पाएं — स्वास्थ्य और वित्तीय सहायता से लेकर अवसर, सुरक्षा और कानूनी अधिकारों तक।',
    greeting: 'नमस्ते! मैं उन्नति हूँ।',
    intro: 'मुझसे मातृत्व लाभ, बिना गारंटी वाले मुद्रा ऋण, निःशुल्क प्रमाणित पाठ्यक्रम, POSH कार्यस्थल अधिकार या आपातकालीन सहायता के बारे में पूछें।',
    recommendedForYou: 'आपके लिए अनुशंसित योजनाएं',
    findingNearYou: 'आपके क्षेत्र की योजनाएं खोजी जा रही हैं…',
    checkEligibility: 'पात्रता जांचें',
    trackApplication: 'आवेदन ट्रैक करें',
    callMom: 'कॉल मॉम',
    locationPrescreen: 'उन्नति नजदीकी अस्पताल, महिला पुलिस डेस्क और सखी केंद्र दिखाने के लिए स्थान का उपयोग करती है।',
    allowLocation: 'स्थान सेवा चालू करें',

    // Health Page specific
    healthKickerRec: '# आपके लिए अनुशंसित',
    healthVerifiedSchemesTitle: 'सत्यापित योजनाएं',
    healthVerifiedSchemesSub: 'आपके स्थान और आवश्यकताओं के अनुरूप सरकारी कार्यक्रम।',
    healthSearchPlaceholder: 'कीवर्ड या योजना द्वारा खोजें',
    healthCheckEligibility: 'पात्रता जांचें',
    healthTrackApps: 'जमा किए गए आवेदन ट्रैक करें',
    healthSchemes: [
      {
        id: 'pmjay',
        name: 'आयुष्मान भारत (PM-JAY)',
        desc: 'प्रति वर्ष प्रति परिवार ₹5 लाख तक का मुफ्त स्वास्थ्य कवरेज।',
      },
      {
        id: 'jsy',
        name: 'जननी सुरक्षा योजना',
        desc: 'सुरक्षित प्रसव और मातृ देखभाल के लिए वित्तीय सहायता।',
      },
      {
        id: 'pmmvy',
        name: 'प्रधानमंत्री मातृ वंदना योजना',
        desc: 'गर्भवती और स्तनपान कराने वाली माताओं के लिए नकद प्रोत्साहन राशि।',
      }
    ],
    healthPeriodAlert: 'आपका पीरियड 2 दिनों में शुरू हो सकता है। आप कैसा महसूस कर रही हैं दर्ज करें?',
    healthCycleKicker: 'मासिक धर्म और लक्षण ट्रैकिंग',
    healthPeriodSuiteTitle: 'पीरियड एवं वेलनेस सुइट',
    healthPeriodSuiteSub: 'दैनिक प्रवाह, मनोदशा, ऐंठन और लक्षण दर्ज करें। 6 महीने के चक्र के रुझान देखें।',
    healthTabs: {
      cycle: 'चक्र अवधि',
      flow: 'प्रवाह तीव्रता',
      symptoms: 'लक्षण',
      mood: 'मूड',
    },
    healthCycleHeader: 'चक्र अवधि (दिन)',
    healthCycleAvg: 'औसत: 28 दिन',
    healthFlowSublabel: 'आज के प्रवाह की तीव्रता चुनें',
    healthFlowOpts: {
      Spotting: { label: 'स्पॉटिंग', desc: 'हल्का सा' },
      Light: { label: 'हल्का', desc: 'सामान्य प्रवाह' },
      Medium: { label: 'मध्यम', desc: 'सामान्य प्रवाह' },
      Heavy: { label: 'भारी', desc: 'उच्च अवशोषण' },
    },
    healthSymptomsSublabel: 'दैनिक लक्षण दर्ज करें',
    healthSymptoms: ['पेट दर्द / ऐंठन', 'सिरदर्द', 'थकान', 'पेट फूलना', 'स्तन संवेदनशीलता', 'पीठ दर्द', 'मुंहासे'],
    healthMoodSublabel: 'आज आप कैसा महसूस कर रही हैं?',
    healthMoods: [
      ['शांत', '😌'], ['खुश', '😊'], ['चिंतित', '😰'],
      ['चिड़चिड़ा', '😤'], ['कम ऊर्जा', '🔋'], ['भावुक', '🥺']
    ],
    healthOpenTracker: 'पूरा ट्रैकर खोलें',
    healthMedScheduleKicker: 'दवा अनुसूची',
    healthScanQr: 'QR स्कैन',
    healthAddMed: 'जोड़ें',
    healthMedTabMedicine: 'दवाइयां',
    healthMedTabCabinet: 'कैबिनेट',
    healthNoMedsTitle: 'कोई दवा निर्धारित नहीं है',
    healthNoMedsDesc: 'अपने दैनिक नुस्खे को दर्ज करने के लिए ऊपर "+ जोड़ें" या "QR स्कैन" पर टैप करें।',
    healthCabinetEmptyTitle: 'दवा कैबिनेट खाली है',
    healthCabinetEmptyDesc: 'प्राथमिक उपचार सामग्री जोड़ने और समाप्ति तिथि ट्रैक करने के लिए पैकेजिंग QR स्कैन करें।',
    healthEmergencyKicker: 'आपातकालीन संदर्भ',
    healthFirstAidTitle: 'प्राथमिक चिकित्सा आपातकालीन गाइड',
    healthFirstAidSub: 'जलने, बेहोशी, सीपीआर और चोटों के लिए त्वरित प्राथमिक कदम।',
  },
  Marathi: {
    finVerifiedSchemes: 'सत्यापित योजना',
    finGovPrograms: 'तुमच्या स्थानाशी आणि गरजांशी जुळणारे सरकारी कार्यक्रम.',
    finSearchPlaceholder: 'कीवर्ड किंवा योजनेद्वारे शोधा',
    finCheckEligibility: 'पात्रता तपासा',
    finBudgetTracking: 'मासिक बजेट ट्रॅकिंग',
    finExpenseTracker: 'खर्च ट्रॅकर',
    finAddExpense: 'खर्च जोडा',
    finCancel: 'रद्द करा',
    finSpent: 'खर्च ₹',
    finOf: 'पैकी ₹',
    finRemaining: 'मासिक भत्त्यामध्ये उर्वरित',
    finDescPlaceholder: 'वर्णन (उदा. किराणा माल, शाळेची फी...)',
    finAmountPlaceholder: 'रक्कम (₹)',
    finSaveExpense: 'खर्च जतन करा',
    finNoExpenses: 'अद्याप कोणताही खर्च नोंदवला नाही',
    finClickAdd: 'तुमच्या दैनंदिन घरगुती खर्चाचा मागोवा घेण्यासाठी<br/>वर "+ खर्च जोडा" क्लिक करा.',
    finUsageOverview: 'वापर विहंगावलोकन',
    finMonthlyLimit: 'मासिक मर्यादा आणि सूचना',
    finBudgetUtilized: 'बजेट वापरले',
    finBudgetCheckin: 'बजेट चेक-इन',
    finYouHave: 'तुमच्याकडे ₹',
    finRemainingMonth: 'या महिन्यात उर्वरित आहेत.',
    finCloseLimit: ' तुम्ही खरेदीसाठी तुमच्या मासिक मर्यादेच्या जवळ आहात.',
    finComfortable: ' तुम्ही तुमच्या मासिक वाटपाच्या आत आरामात आहात.',
    finProTip: 'प्रो-टिप',
    finProTipDesc: 'सुकन्या समृद्धी किंवा PPF मध्ये दरमहा फक्त ₹200 गुंतवल्यास 8.2% हमी परतावा मिळतो.',
    finSavingsGoals: 'बचत उद्दिष्टे',
    finSetGoals: 'प्रेरित राहण्यासाठी आणि चांगले नियोजन करण्यासाठी तुमची उद्दिष्टे सेट करा.',
    finGoalsSet: 'उद्दिष्टे सेट',
    finUpdateGoal: 'उद्दिष्ट अपडेट करा',
    finAddGoal: 'उद्दिष्ट जोडा',
    finCheckFullEligibility: 'संपूर्ण पात्रता तपासा आणि अर्ज करा',
    livCareerAdv: 'करिअर प्रगती',
    livResumeCreator: 'व्यावसायिक रेझ्युमे / सीव्ही निर्माता',
    livAtsFriendly: 'हेल्थकेअर, रिटेल, समन्वयक आणि ऑफिसच्या भूमिकांसाठी डिझाइन केलेले ATS-अनुकूल फॉरमॅट्स.',
    livBuildResume: 'माझा रेझ्युमे बनवा',
    livAiVoice: 'एआय व्हॉइस सराव',
    livInterviewSim: 'मुलाखत सिम्युलेटर',
    livPracticeReal: 'तुमच्या भाषेत खऱ्या मुलाखतीच्या प्रश्नांचा मोठ्याने सराव करा. आत्मविश्वास, स्पष्टता आणि टोनसाठी त्वरित एआय स्कोअर मिळवा.',
    livStartVoice: 'व्हॉइस सराव सुरू करा',
    livVideoGuides: '🎬 <strong>व्हिडिओ मार्गदर्शक:</strong> पगाराच्या प्रश्नांची उत्तरे देणे आणि आपल्या मागील यशाची आत्मविश्वासाने ओळख करून देणे यावर 5 मिनिटांचे व्हिडिओ ट्यूटोरियल पहा.',
    safProtection: '24/7 संरक्षण आणि त्वरित प्रतिसाद',
    safAssistance: 'तात्काळ आपत्कालीन मदत',
    safPrivateDispatch: 'खाजगी आपत्कालीन पाठवणी, गुप्त निर्गमन सिम्युलेशन आणि सत्यापित हेल्पलाइन.',
    safActivateSOS: 'आपत्कालीन SOS सक्रिय करा',
    safDiscreetExit: 'गुप्त निर्गमन कॉल',
    safSimulatesCall: 'अस्वस्थ किंवा तणावपूर्ण परिस्थितीतून शांतपणे बाहेर पडण्यासाठी इनकमिंग मोबाईल फोन कॉलचे अनुकरण करते.',
    safShareLocation: 'थेट स्थान शेअर करा',
    safGeneratesLink: 'विश्वसनीय संपर्कांना पाठवण्यासाठी 2 तासांची खाजगी एनक्रिप्टेड GPS ट्रॅकिंग लिंक व्युत्पन्न करते.',
    safCopyLink: 'ट्रॅकिंग लिंक कॉपी करा',
    safLinkExpires: 'ही सुरक्षित ट्रॅकिंग लिंक 2 तासांत संपेल.',
    safEmergencyContacts: 'आपत्कालीन संपर्क',
    safDesignateContacts: 'SOS दरम्यान ज्यांना तुमचे स्थान त्वरित प्राप्त होईल असे विश्वसनीय संपर्क नियुक्त करा.',
    safManageContacts: 'संपर्क व्यवस्थापित करा',
    safClose: 'बंद करा',
    rigExactScripts: 'अचूक शब्दशः स्क्रिप्ट्स',
    rigKnowWhatToSay: 'काय बोलायचे ते जाणून घ्या',
    rigHereIsWhat: 'असे घडल्यास तुम्ही शब्दशः काय बोलू शकता ते येथे आहे — व्यावहारिक, ठाम आणि कायदेशीर.',
    rigListenOutLoud: 'मोठ्याने ऐका',
    rigCopyScript: 'स्क्रिप्ट कॉपी करा',
    rigCopied: 'कॉपी केले!',
    rigPlainExplainers: 'सोप्या भाषेतील स्पष्टीकरण',
    rigLegalProtections: 'तुमचे कायदेशीर संरक्षण जाणून घ्या',
    rigUnderstandLegal: 'गोंधळात टाकणाऱ्या कायदेशीर शब्दांशिवाय सोप्या शब्दांत तुमची कायदेशीर स्थिती समजून घ्या.',
    rigWorkplacePosh: 'कार्यस्थळ आणि POSH संरक्षण',
    rigMandatoryICC: '10+ कर्मचारी असलेल्या संस्थांमध्ये अनिवार्य ICC समित्या.',
    rigEqualProperty: 'समान मालमत्ता आणि वारसा हक्क',
    rigEqualRights: 'हिंदू वारसा कायद्यांतर्गत वडिलोपार्जित संपत्तीत समान अधिकार.',
    rigProtectionDV: 'कौटुंबिक हिंसाचारापासून संरक्षण',
    rigRightToReside: 'सामायिक घरात राहण्याचा अधिकार, अंतरिम दिलासा आणि संरक्षण आदेश.',
    rigFreeLegalAid: 'मोफत कायदेशीर मदत (NALSA)',
    rigEveryWoman: 'भारतातील प्रत्येक महिला कायदेशीररित्या कोणत्याही न्यायालयात मोफत वकिलांची हक्कदार आहे.',
    rigReadFullGuide: 'संपूर्ण कायदेशीर मार्गदर्शक वाचा',

    homeSearchPlaceholder: 'योजना, सेवा किंवा मदत शोधण्यासाठी येथे शोधा...',
    homeRecTitle: 'तुमच्यासाठी शिफारस केलेले',
    homeRecSub: 'तुमच्या स्थानावर आणि प्रोफाइलवर आधारित',
    homeViewAll: 'सर्व योजना पहा',
    homeTrackApps: 'तुमचे अर्ज ट्रॅक करा',
    homeNearbyTitle: 'जवळपासच्या मदत सेवा',
    homeNearbySub: 'तुमच्या जवळचे सत्यापित केंद्र शोधा',
    homeViewMap: 'नकाशावर पहा',
    homeContactsTitle: 'महत्त्वाचे संपर्क',
    homeContactsSub: 'सत्यापित हेल्पलाइनवर त्वरित प्रवेश',
    homeExploreTitle: 'मदत क्षेत्रे एक्सप्लोर करा',
    homeExploreSub: 'प्रमुख क्षेत्रांमधील योजना, सेवा आणि माहिती शोधा',
    homeExpHealth: 'रुग्णालये, विमा, मातांची काळजी आणि बरेच काही',
    homeExpWealth: 'बचत, पेन्शन, लाभ आणि विमा',
    homeExpLivelihood: 'नोकऱ्या, कौशल्य प्रशिक्षण आणि उद्योजकता',
    homeExpFinance: 'कर्ज, शिष्यवृत्ती आणि आर्थिक मदत',
    homeExpSafety: 'आपत्कालीन मदत, कायदेशीर मदत आणि संकट समर्थन',
    homeExpRights: 'तुमचे हक्क जाणून घ्या आणि कायदेशीर संसाधनांमध्ये प्रवेश करा',
    wealthRecKicker: 'तुमच्यासाठी शिफारस केलेले',
    wealthSchemesTitle: 'आर्थिक योजना',
    wealthSchemesSub: 'तुमच्या स्थानावर आणि प्रोफाइलवर आधारित.',
    wealthSearchPlaceholder: 'कीवर्ड किंवा योजनेद्वारे शोधा',
    wealthResetFilters: 'फिल्टर रीसेट करा',
    wealthViewAll: 'सर्व योजना पहा',
    wealthTrackApps: 'तुमचे अर्ज ट्रॅक करा',
    wealthHeroKicker: 'उज्ज्वल उद्याची निर्मिती',
    wealthHeroTitle: 'छोटी पावले,',
    wealthHeroTitle2: 'मोठे आर्थिक स्वातंत्र्य.',
    wealthHeroDesc: 'तुमच्यासाठी बनवलेल्या बचत, कर्ज, विमा आणि गुंतवणूक योजना एक्सप्लोर करा.',
    wealthStartExplore: 'एक्सप्लोर करणे सुरू करा',
    wealthPlan: 'योजना',
    wealthSave: 'बचत',
    wealthGrow: 'वाढ',
    wealthExploreGoalTitle: 'उद्दिष्टानुसार एक्सप्लोर करा',
    wealthViewAllGoals: 'सर्व पहा',
    wealthExploreGoalSub: 'तुमच्या गरजेनुसार योग्य योजना आणि साधने शोधा.',
    wealthSnapshotTitle: 'तुमचा आर्थिक स्नॅपशॉट',
    wealthSnapshotSub: 'तुमच्या प्रगतीचा मागोवा घ्या आणि व्यवस्थापित करा.',
    wealthSavedSchemes: 'जतन केलेल्या योजना',
    wealthApplications: 'अर्ज',
    wealthDeadlines: 'आगामी मुदती',
    wealthNotes: 'वैयक्तिक नोट्स',
    wealthNeedHelpTitle: 'मदत हवी आहे?',
    wealthNeedHelpSub: 'सत्यापित तज्ञ किंवा हेल्पलाइनकडून मार्गदर्शन मिळवा.',
    wealthHelpHelpline: 'आर्थिक हेल्पलाइनशी बोला',
    wealthHelpAsk: 'उन्नतीला विचारा',
    wealthHelpAskSub: 'टप्प्याटप्प्याने मार्गदर्शन मिळवा',
    wealthHelpGuide: 'आर्थिक साक्षरता मार्गदर्शक',
    wealthHelpGuideSub: 'बँकिंग, बचत, गुंतवणूक आणि फसवणूक टाळण्याच्या मूलभूत गोष्टी जाणून घ्या.',

    nav: { home: 'मुख्यपृष्ठ', health: 'आरोग्य', wealth: 'संपत्ती', livelihood: 'उपजीविका', finance: 'वित्त', safety: 'सुरक्षा', rights: 'हक्क' },
    sos: 'आपत्कालीन',
    signin: 'साइन इन',
    askPlaceholder: 'योजना किंवा मदतीबाबत आपल्या भाषेत विचारा…',
    tagline: 'उन्नतीशी आपल्या भाषेत बोला आणि स्पष्ट मार्गदर्शन मिळवा — आरोग्य, वित्त, रोजगार, सुरक्षा आणि कायदेशीर हक्कांपर्यंत.',
    greeting: 'नमस्कार! मी उन्नती आहे.',
    intro: 'मातृत्व लाभ, विनातारण मुद्रा कर्ज, मोफत प्रमाणित अभ्यासक्रम, POSH कार्यस्थळ हक्क किंवा आपत्कालीन मदतीबद्दल मला विचारा.',
    recommendedForYou: 'तुमच्यासाठी शिफारस केलेल्या योजना',
    findingNearYou: 'तुमच्या जवळच्या सेवा शोधत आहोत…',
    checkEligibility: 'पात्रता तपासा',
    trackApplication: 'अर्ज ट्रॅक करा',
    callMom: 'कॉल मॉम',
    locationPrescreen: 'जवळचे रुग्णालय आणि सखी केंद्र दाखवण्यासाठी उन्नती स्थानाचा वापर करते.',
    allowLocation: 'स्थान चालू करा',
  },
  Tamil: {
    finVerifiedSchemes: 'சரிபார்க்கப்பட்ட திட்டங்கள்',
    finGovPrograms: 'உங்கள் இருப்பிடம் மற்றும் தேவைகளுக்குப் பொருந்தும் அரசுத் திட்டங்கள்.',
    finSearchPlaceholder: 'முக்கிய சொல் அல்லது திட்டத்தின் மூலம் தேடுங்கள்',
    finCheckEligibility: 'தகுதியைச் சரிபார்க்கவும்',
    finBudgetTracking: 'மாதாந்திர பட்ஜெட் கண்காணிப்பு',
    finExpenseTracker: 'செலவு கண்காணிப்பாளர்',
    finAddExpense: 'செலவைச் சேர்',
    finCancel: 'ரத்துசெய்',
    finSpent: 'செலவிடப்பட்டது ₹',
    finOf: 'இல் ₹',
    finRemaining: 'மாதாந்திர கொடுப்பனவில் மீதமுள்ளது',
    finDescPlaceholder: 'விளக்கம் (எ.கா. மளிகை பொருட்கள், பள்ளி கட்டணம்...)',
    finAmountPlaceholder: 'தொகை (₹)',
    finSaveExpense: 'செலவைச் சேமி',
    finNoExpenses: 'இதுவரை எந்தச் செலவும் பதிவு செய்யப்படவில்லை',
    finClickAdd: 'உங்கள் அன்றாட வீட்டுச் செலவுகளைக் கண்காணிக்க<br/>மேலே உள்ள "+ செலவைச் சேர்" என்பதைக் கிளிக் செய்யவும்.',
    finUsageOverview: 'பயன்பாட்டு கண்ணோட்டம்',
    finMonthlyLimit: 'மாதாந்திர வரம்பு & விழிப்பூட்டல்கள்',
    finBudgetUtilized: 'பயன்படுத்தப்பட்ட பட்ஜெட்',
    finBudgetCheckin: 'பட்ஜெட் சரிபார்ப்பு',
    finYouHave: 'உங்களிடம் ₹',
    finRemainingMonth: 'இந்த மாதம் மீதமுள்ளது.',
    finCloseLimit: ' ஷாப்பிங் செய்வதற்கான உங்கள் மாதாந்திர வரம்பை நீங்கள் நெருங்கிவிட்டீர்கள்.',
    finComfortable: ' உங்கள் மாதாந்திர ஒதுக்கீட்டிற்குள் நீங்கள் வசதியாக இருக்கிறீர்கள்.',
    finProTip: 'ப்ரோ-டிப்',
    finProTipDesc: 'சுகன்யா சம்ரித்தி அல்லது PPF இல் மாதத்திற்கு ₹200 செலுத்தினால் 8.2% உத்தரவாத வருவாய் கிடைக்கும்.',
    finSavingsGoals: 'சேமிப்பு இலக்குகள்',
    finSetGoals: 'உந்துதலாக இருக்கவும், சிறப்பாகத் திட்டமிடவும் உங்கள் இலக்குகளை அமைக்கவும்.',
    finGoalsSet: 'இலக்குகள் அமைக்கப்பட்டுள்ளன',
    finUpdateGoal: 'இலக்கைப் புதுப்பிக்கவும்',
    finAddGoal: 'இலக்கைச் சேர்',
    finCheckFullEligibility: 'முழு தகுதியைச் சரிபார்த்து விண்ணப்பிக்கவும்',
    livCareerAdv: 'தொழில் முன்னேற்றம்',
    livResumeCreator: 'தொழில்முறை ரெஸ்யூம் / சிவி கிரியேட்டர்',
    livAtsFriendly: 'சுகாதாரம், சில்லறை விற்பனை, ஒருங்கிணைப்பாளர் மற்றும் அலுவலகப் பாத்திரங்களுக்காக வடிவமைக்கப்பட்ட ATS-க்கு உகந்த வடிவங்கள்.',
    livBuildResume: 'எனது ரெஸ்யூமை உருவாக்கு',
    livAiVoice: 'AI குரல் பயிற்சி',
    livInterviewSim: 'நேர்காணல் சிமுலேட்டர்',
    livPracticeReal: 'உங்கள் மொழியில் உண்மையான நேர்காணல் கேள்விகளை சத்தமாகப் பயிற்சி செய்யுங்கள். தன்னம்பிக்கை, தெளிவு மற்றும் தொனிக்கான உடனடி AI மதிப்பெண்களைப் பெறுங்கள்.',
    livStartVoice: 'குரல் பயிற்சியைத் தொடங்கு',
    livVideoGuides: '🎬 <strong>வீடியோ வழிகாட்டிகள்:</strong> சம்பளக் கேள்விகளுக்குப் பதிலளிப்பது மற்றும் உங்களின் கடந்தகால சாதனைகளை நம்பிக்கையுடன் அறிமுகப்படுத்துவது குறித்த 5 நிமிட வீடியோ டுடோரியல்களைப் பார்க்கவும்.',
    safProtection: '24/7 பாதுகாப்பு & விரைவான பதில்',
    safAssistance: 'உடனடி அவசர உதவி',
    safPrivateDispatch: 'தனியார் அவசரகால அனுப்புதல், விவேகமான வெளியேறும் உருவகப்படுத்துதல் மற்றும் சரிபார்க்கப்பட்ட உதவி எண்கள்.',
    safActivateSOS: 'அவசர SOS ஐ இயக்கவும்',
    safDiscreetExit: 'விவேகமான வெளியேறும் அழைப்பு',
    safSimulatesCall: 'சங்கடமான அல்லது பதட்டமான சூழ்நிலைகளில் இருந்து விவேகத்துடன் வெளியேற, உள்வரும் மொபைல் போன் அழைப்பை உருவகப்படுத்துகிறது.',
    safShareLocation: 'நேரலை இருப்பிடத்தைப் பகிரவும்',
    safGeneratesLink: 'நம்பகமான தொடர்புகளுக்கு அனுப்ப 2 மணிநேர தனிப்பட்ட மறைகுறியாக்கப்பட்ட ஜிபிஎஸ் கண்காணிப்பு இணைப்பை உருவாக்குகிறது.',
    safCopyLink: 'கண்காணிப்பு இணைப்பை நகலெடுக்கவும்',
    safLinkExpires: 'இந்த பாதுகாப்பான கண்காணிப்பு இணைப்பு 2 மணிநேரத்தில் காலாவதியாகும்.',
    safEmergencyContacts: 'அவசரகால தொடர்புகள்',
    safDesignateContacts: 'SOS இன் போது உங்கள் இருப்பிடத்தை உடனடியாகப் பெறும் நம்பகமான தொடர்புகளை நியமிக்கவும்.',
    safManageContacts: 'தொடர்புகளை நிர்வகி',
    safClose: 'மூடு',
    rigExactScripts: 'சரியான வார்த்தைக்கு வார்த்தை ஸ்கிரிப்டுகள்',
    rigKnowWhatToSay: 'என்ன சொல்வது என்று தெரிந்து கொள்ளுங்கள்',
    rigHereIsWhat: 'இது நடந்தால் - நடைமுறை, உறுதியான மற்றும் சட்டபூர்வமான முறையில் நீங்கள் வார்த்தைக்கு வார்த்தை கூறக்கூடியது இங்கே.',
    rigListenOutLoud: 'சத்தமாகக் கேளுங்கள்',
    rigCopyScript: 'ஸ்கிரிப்டை நகலெடுக்கவும்',
    rigCopied: 'நகலெடுக்கப்பட்டது!',
    rigPlainExplainers: 'எளிய மொழி விளக்கங்கள்',
    rigLegalProtections: 'உங்கள் சட்டப் பாதுகாப்புகளை அறிந்து கொள்ளுங்கள்',
    rigUnderstandLegal: 'குழப்பமான சட்டச் சொற்கள் இல்லாமல் எளிய வார்த்தைகளில் உங்கள் சட்ட நிலைப்பாட்டை புரிந்து கொள்ளுங்கள்.',
    rigWorkplacePosh: 'பணியிடம் & POSH பாதுகாப்பு',
    rigMandatoryICC: '10+ ஊழியர்களைக் கொண்ட நிறுவனங்களில் கட்டாய ICC குழுக்கள்.',
    rigEqualProperty: 'சமமான சொத்து மற்றும் பரம்பரை உரிமைகள்',
    rigEqualRights: 'இந்து வாரிசுச் சட்டத்தின் கீழ் மூதாதையர் சொத்துக்களில் சம உரிமைகள்.',
    rigProtectionDV: 'குடும்ப வன்முறையிலிருந்து பாதுகாப்பு',
    rigRightToReside: 'பகிர்ந்த வீட்டில் வசிக்கும் உரிமை, இடைக்கால நிவாரணம் & பாதுகாப்பு உத்தரவுகள்.',
    rigFreeLegalAid: 'இலவச சட்ட உதவி (NALSA)',
    rigEveryWoman: 'இந்தியாவில் உள்ள ஒவ்வொரு பெண்ணும் எந்த நீதிமன்றத்திலும் இலவச வழக்கறிஞர்களுக்கு சட்டப்பூர்வ உரிமை உண்டு.',
    rigReadFullGuide: 'முழு சட்ட வழிகாட்டியைப் படிக்கவும்',

    homeSearchPlaceholder: 'ஒரு திட்டம், சேவை அல்லது உதவி பெறுவது எப்படி என்று தேடுங்கள்...',
    homeRecTitle: 'உங்களுக்காகப் பரிந்துரைக்கப்பட்டவை',
    homeRecSub: 'உங்கள் இருப்பிடம் மற்றும் சுயவிவரத்தின் அடிப்படையில்',
    homeViewAll: 'அனைத்து திட்டங்களையும் காண்க',
    homeTrackApps: 'உங்கள் விண்ணப்பங்களைக் கண்காணிக்கவும்',
    homeNearbyTitle: 'அருகிலுள்ள ஆதரவு சேவைகள்',
    homeNearbySub: 'உங்களுக்கு அருகிலுள்ள சரிபார்க்கப்பட்ட மையங்களைக் கண்டறியவும்',
    homeViewMap: 'வரைபடத்தில் காண்க',
    homeContactsTitle: 'முக்கியமான தொடர்புகள்',
    homeContactsSub: 'சரிபார்க்கப்பட்ட உதவி எண்களுக்கு விரைவான அணுகல்',
    homeExploreTitle: 'ஆதரவு பகுதிகளை ஆராயுங்கள்',
    homeExploreSub: 'முக்கிய பிரிவுகளில் திட்டங்கள், சேவைகள் மற்றும் தகவல்களைக் கண்டறியவும்',
    homeExpHealth: 'மருத்துவமனைகள், காப்பீடு, தாய்வழி பராமரிப்பு மற்றும் பல',
    homeExpWealth: 'சேமிப்பு, ஓய்வூதியம், சலுகைகள் மற்றும் காப்பீடு',
    homeExpLivelihood: 'வேலைகள், திறன் பயிற்சி மற்றும் தொழில்முனைவோர்',
    homeExpFinance: 'கடன், உதவித்தொகை மற்றும் நிதி உதவி',
    homeExpSafety: 'அவசர உதவி, சட்ட உதவி மற்றும் நெருக்கடி ஆதரவு',
    homeExpRights: 'உங்கள் உரிமைகளை அறிந்து சட்ட ஆதாரங்களை அணுகவும்',
    wealthRecKicker: 'உங்களுக்காகப் பரிந்துரைக்கப்பட்டவை',
    wealthSchemesTitle: 'நிதி திட்டங்கள்',
    wealthSchemesSub: 'உங்கள் இருப்பிடம் மற்றும் சுயவிவரத்தின் அடிப்படையில்.',
    wealthSearchPlaceholder: 'முக்கிய சொல் அல்லது திட்டத்தின் மூலம் தேடுங்கள்',
    wealthResetFilters: 'வடிப்பான்களை மீட்டமைக்கவும்',
    wealthViewAll: 'அனைத்து திட்டங்களையும் காண்க',
    wealthTrackApps: 'உங்கள் விண்ணப்பங்களைக் கண்காணிக்கவும்',
    wealthHeroKicker: 'ஒரு பிரகாசமான நாளைய உருவாக்குதல்',
    wealthHeroTitle: 'சிறிய படிகள்,',
    wealthHeroTitle2: 'பெரிய நிதி சுதந்திரம்.',
    wealthHeroDesc: 'உங்களுக்காக உருவாக்கப்பட்ட சேமிப்பு, கடன், காப்பீடு மற்றும் முதலீட்டு திட்டங்களை ஆராயுங்கள்.',
    wealthStartExplore: 'ஆராய்வதைத் தொடங்கவும்',
    wealthPlan: 'திட்டம்',
    wealthSave: 'சேமி',
    wealthGrow: 'வளரு',
    wealthExploreGoalTitle: 'இலக்கு மூலம் ஆராயுங்கள்',
    wealthViewAllGoals: 'அனைத்தையும் காண்க',
    wealthExploreGoalSub: 'உங்கள் தேவைகளுக்கு சரியான திட்டங்கள் மற்றும் கருவிகளைக் கண்டறியவும்.',
    wealthSnapshotTitle: 'உங்கள் நிதி கண்ணோட்டம்',
    wealthSnapshotSub: 'உங்கள் முன்னேற்றத்தைக் கண்காணித்து நிர்வகிக்கவும்.',
    wealthSavedSchemes: 'சேமிக்கப்பட்ட திட்டங்கள்',
    wealthApplications: 'விண்ணப்பங்கள்',
    wealthDeadlines: 'வரவிருக்கும் காலக்கெடு',
    wealthNotes: 'தனிப்பட்ட குறிப்புகள்',
    wealthNeedHelpTitle: 'உதவி தேவையா?',
    wealthNeedHelpSub: 'சரிபார்க்கப்பட்ட நிபுணர்கள் அல்லது உதவி எண்களிலிருந்து வழிகாட்டுதலைப் பெறுங்கள்.',
    wealthHelpHelpline: 'நிதி உதவி எண்ணுடன் பேசுங்கள்',
    wealthHelpAsk: 'உன்னதியைக் கேளுங்கள்',
    wealthHelpAskSub: 'படிப்படியான வழிகாட்டுதலைப் பெறுங்கள்',
    wealthHelpGuide: 'நிதி கல்வியறிவு வழிகாட்டி',
    wealthHelpGuideSub: 'வங்கியியல், சேமிப்பு, முதலீடு மற்றும் மோசடியைத் தவிர்ப்பதற்கான அடிப்படைகளைக் கற்றுக்கொள்ளுங்கள்.',

    nav: { home: 'முகப்பு', health: 'சுகாதாரம்', wealth: 'செல்வம்', livelihood: 'வாழ்வாதாரம்', finance: 'நிதி', safety: 'பாதுகாப்பு', rights: 'உரிமைகள்' },
    sos: 'அவசரம்',
    signin: 'உள்நுழைக',
    askPlaceholder: 'திட்டங்கள் அல்லது உதவி குறித்து உங்கள் மொழியில் கேளுங்கள்…',
    tagline: 'உன்னதியிடம் உங்கள் தாய்மொழியில் பேசி தெளிவான வழிகாட்டலைப் பெறுங்கள் — சுகாதாரம், நிதி உதவி, பாதுகாப்பு மற்றும் சட்ட உரிமைகள் வரை.',
    greeting: 'வணக்கம்! நான் உன்னதி.',
    intro: 'மகப்பேறு நலன்கள், பிணையில்லா முத்ரா கடன்கள், இலவச சான்றிதழ் பயிற்சிகள், POSH பணியிட உரிமைகள் அல்லது அவசர உதவி பற்றி என்னிடம் கேளுங்கள்.',
    recommendedForYou: 'உங்களுக்கான சிறப்புத் திட்டங்கள்',
    findingNearYou: 'உங்களுக்கு அருகிலுள்ள தகவல்கள் தேடப்படுகின்றன…',
    checkEligibility: 'தகுதியை சரிபார்க்கவும்',
    trackApplication: 'விண்ணப்பத்தைக் கண்காணிக்கவும்',
    callMom: 'அம்மாவை அழைக்கவும்',
    locationPrescreen: 'அருகிலுள்ள மருத்துவமனைகள் மற்றும் உதவி மையங்களைக் காட்ட உன்னதி இருப்பிடத்தைப் பயன்படுத்துகிறது.',
    allowLocation: 'இருப்பிடத்தை அனுமதிக்கவும்',
  },
  Bengali: {
    finVerifiedSchemes: 'যাচাইকৃত প্রকল্প',
    finGovPrograms: 'আপনার অবস্থান এবং প্রয়োজনীয়তার সাথে মেলে এমন সরকারি প্রোগ্রাম।',
    finSearchPlaceholder: 'কীওয়ার্ড বা স্কিম দ্বারা অনুসন্ধান করুন',
    finCheckEligibility: 'যোগ্যতা যাচাই করুন',
    finBudgetTracking: 'মাসিক বাজেট ট্র্যাকিং',
    finExpenseTracker: 'খরচ ট্র্যাকার',
    finAddExpense: 'খরচ যোগ করুন',
    finCancel: 'বাতিল করুন',
    finSpent: 'ব্যয়িত ₹',
    finOf: 'এর মধ্যে ₹',
    finRemaining: 'মাসিক ভাতায় অবশিষ্ট',
    finDescPlaceholder: 'বিবরণ (যেমন মুদি, স্কুলের ফি...)',
    finAmountPlaceholder: 'পরিমাণ (₹)',
    finSaveExpense: 'খরচ সংরক্ষণ করুন',
    finNoExpenses: 'এখনও কোন খরচ রেকর্ড করা হয়নি',
    finClickAdd: 'আপনার দৈনন্দিন গৃহস্থালির খরচ ট্র্যাক করতে<br/>উপরের "+ খরচ যোগ করুন" এ ক্লিক করুন।',
    finUsageOverview: 'ব্যবহারের ওভারভিউ',
    finMonthlyLimit: 'মাসিক সীমা এবং সতর্কতা',
    finBudgetUtilized: 'বাজেট ব্যবহৃত',
    finBudgetCheckin: 'বাজেট চেক-ইন',
    finYouHave: 'আপনার কাছে ₹',
    finRemainingMonth: 'এই মাসে অবশিষ্ট আছে।',
    finCloseLimit: ' আপনি কেনাকাটার জন্য আপনার মাসিক সীমার কাছাকাছি।',
    finComfortable: ' আপনি আপনার মাসিক বরাদ্দের মধ্যে আরামে আছেন।',
    finProTip: 'প্রো-টিপ',
    finProTipDesc: 'সুকন্যা সমৃদ্ধি বা PPF-এ মাসে মাত্র ₹200 রাখলে 8.2% নিশ্চিত রিটার্ন পাওয়া যায়।',
    finSavingsGoals: 'সঞ্চয়ের লক্ষ্য',
    finSetGoals: 'অনুপ্রাণিত থাকতে এবং আরও ভাল পরিকল্পনা করতে আপনার লক্ষ্য নির্ধারণ করুন।',
    finGoalsSet: 'লক্ষ্য নির্ধারিত',
    finUpdateGoal: 'লক্ষ্য আপডেট করুন',
    finAddGoal: 'লক্ষ্য যোগ করুন',
    finCheckFullEligibility: 'সম্পূর্ণ যোগ্যতা যাচাই করুন এবং আবেদন করুন',
    livCareerAdv: 'কর্মজীবনে অগ্রগতি',
    livResumeCreator: 'পেশাদার জীবনবৃত্তান্ত / সিভি স্রষ্টা',
    livAtsFriendly: 'স্বাস্থ্যসেবা, খুচরা, সমন্বয়কারী এবং অফিস ভূমিকার জন্য ডিজাইন করা ATS-বান্ধব ফর্ম্যাট।',
    livBuildResume: 'আমার জীবনবৃত্তান্ত তৈরি করুন',
    livAiVoice: 'এআই ভয়েস অনুশীলন',
    livInterviewSim: 'সাক্ষাৎকার সিমুলেটর',
    livPracticeReal: 'আপনার ভাষায় বাস্তব সাক্ষাৎকারের প্রশ্নগুলি জোরে জোরে অনুশীলন করুন। আত্মবিশ্বাস, স্বচ্ছতা এবং টোনের জন্য তাত্ক্ষণিক এআই স্কোর পান।',
    livStartVoice: 'ভয়েস অনুশীলন শুরু করুন',
    livVideoGuides: '🎬 <strong>ভিডিও গাইড:</strong> বেতনের প্রশ্নের উত্তর দেওয়া এবং আত্মবিশ্বাসের সাথে আপনার অতীত অর্জনগুলি উপস্থাপন করার উপর 5 মিনিটের ভিডিও টিউটোরিয়াল দেখুন।',
    safProtection: '24/7 সুরক্ষা এবং দ্রুত প্রতিক্রিয়া',
    safAssistance: 'তাৎক্ষণিক জরুরি সহায়তা',
    safPrivateDispatch: 'ব্যক্তিগত জরুরি প্রেরণ, বিচক্ষণ প্রস্থান সিমুলেশন, এবং যাচাইকৃত হেল্পলাইন।',
    safActivateSOS: 'জরুরী SOS সক্রিয় করুন',
    safDiscreetExit: 'বিচক্ষণ প্রস্থান কল',
    safSimulatesCall: 'অস্বস্তিকর বা উত্তেজনাপূর্ণ পরিস্থিতি থেকে বিচক্ষণতার সাথে প্রস্থান করার জন্য একটি ইনকামিং মোবাইল ফোন কলের অনুকরণ করে।',
    safShareLocation: 'লাইভ অবস্থান শেয়ার করুন',
    safGeneratesLink: 'বিশ্বস্ত পরিচিতিদের পাঠানোর জন্য একটি ব্যক্তিগত 2-ঘন্টা এনক্রিপ্ট করা GPS ট্র্যাকিং লিঙ্ক তৈরি করে।',
    safCopyLink: 'ট্র্যাকিং লিঙ্ক কপি করুন',
    safLinkExpires: 'এই সুরক্ষিত ট্র্যাকিং লিঙ্কটির মেয়াদ 2 ঘন্টার মধ্যে শেষ হবে।',
    safEmergencyContacts: 'জরুরী পরিচিতি',
    safDesignateContacts: 'বিশ্বস্ত পরিচিতিদের মনোনীত করুন যারা একটি SOS এর সময় অবিলম্বে আপনার অবস্থান গ্রহণ করবে।',
    safManageContacts: 'পরিচিতি পরিচালনা করুন',
    safClose: 'বন্ধ করুন',
    rigExactScripts: 'সঠিক শব্দ-ব-শব্দ স্ক্রিপ্ট',
    rigKnowWhatToSay: 'কী বলতে হবে তা জানুন',
    rigHereIsWhat: 'যদি এটি ঘটে তবে আপনি শব্দে শব্দে কী বলতে পারেন তা এখানে — বাস্তবসম্মত, দৃঢ় এবং আইনি।',
    rigListenOutLoud: 'জোরে শুনুন',
    rigCopyScript: 'স্ক্রিপ্ট কপি করুন',
    rigCopied: 'কপি করা হয়েছে!',
    rigPlainExplainers: 'সরল-ভাষা ব্যাখ্যাকারী',
    rigLegalProtections: 'আপনার আইনি সুরক্ষা জানুন',
    rigUnderstandLegal: 'বিভ্রান্তিকর আইনি শব্দবাদ ছাড়াই সহজ কথায় আপনার আইনি অবস্থান বুঝুন।',
    rigWorkplacePosh: 'কর্মক্ষেত্র এবং POSH সুরক্ষা',
    rigMandatoryICC: '10+ কর্মচারী সহ সংস্থাগুলিতে বাধ্যতামূলক ICC কমিটি।',
    rigEqualProperty: 'সমান সম্পত্তি এবং উত্তরাধিকার অধিকার',
    rigEqualRights: 'হিন্দু উত্তরাধিকার আইনের অধীনে পৈতৃক সম্পত্তিতে সমান অধিকার।',
    rigProtectionDV: 'গার্হস্থ্য সহিংসতা থেকে সুরক্ষা',
    rigRightToReside: 'ভাগ করা বাড়িতে থাকার অধিকার, অন্তর্বর্তীকালীন ত্রাণ এবং সুরক্ষা আদেশ।',
    rigFreeLegalAid: 'বিনামূল্যে আইনি সহায়তা (NALSA)',
    rigEveryWoman: 'ভারতের প্রতিটি নারী আইনত যেকোনো আদালতে বিনামূল্যে আইনজীবীর অধিকারী।',
    rigReadFullGuide: 'সম্পূর্ণ আইনি গাইড পড়ুন',

    homeSearchPlaceholder: 'একটি প্রকল্প, পরিষেবা বা কীভাবে সাহায্য পাবেন তা খুঁজুন...',
    homeRecTitle: 'আপনার জন্য প্রস্তাবিত',
    homeRecSub: 'আপনার অবস্থান এবং প্রোফাইলের উপর ভিত্তি করে',
    homeViewAll: 'সমস্ত প্রকল্প দেখুন',
    homeTrackApps: 'আপনার অ্যাপ্লিকেশনগুলি ট্র্যাক করুন',
    homeNearbyTitle: 'আশেপাশের সহায়তা পরিষেবা',
    homeNearbySub: 'আপনার কাছাকাছি যাচাই করা কেন্দ্রগুলি খুঁজুন',
    homeViewMap: 'মানচিত্রে দেখুন',
    homeContactsTitle: 'গুরুত্বপূর্ণ যোগাযোগ',
    homeContactsSub: 'যাচাই করা হেল্পলাইনগুলিতে দ্রুত অ্যাক্সেস',
    homeExploreTitle: 'সহায়তা অঞ্চলগুলি অন্বেষণ করুন',
    homeExploreSub: 'মূল অঞ্চল জুড়ে প্রকল্প, পরিষেবা এবং তথ্য খুঁজুন',
    homeExpHealth: 'হাসপাতাল, বীমা, মাতৃ যত্ন এবং আরও অনেক কিছু',
    homeExpWealth: 'সঞ্চয়, পেনশন, সুবিধা এবং বীমা',
    homeExpLivelihood: 'চাকরি, দক্ষতা প্রশিক্ষণ এবং উদ্যোক্তা',
    homeExpFinance: 'ঋণ, বৃত্তি এবং আর্থিক সহায়তা',
    homeExpSafety: 'জরুরী সাহায্য, আইনি সহায়তা এবং সংকট সমর্থন',
    homeExpRights: 'আপনার অধিকার জানুন এবং আইনি সংস্থান অ্যাক্সেস করুন',
    wealthRecKicker: 'আপনার জন্য প্রস্তাবিত',
    wealthSchemesTitle: 'আর্থিক প্রকল্প',
    wealthSchemesSub: 'আপনার অবস্থান এবং প্রোফাইলের উপর ভিত্তি করে।',
    wealthSearchPlaceholder: 'কীওয়ার্ড বা স্কিম দ্বারা অনুসন্ধান করুন',
    wealthResetFilters: 'ফিল্টার রিসেট করুন',
    wealthViewAll: 'সমস্ত প্রকল্প দেখুন',
    wealthTrackApps: 'আপনার অ্যাপ্লিকেশনগুলি ট্র্যাক করুন',
    wealthHeroKicker: 'একটি উজ্জ্বল আগামী তৈরি করা',
    wealthHeroTitle: 'ছোট পদক্ষেপ,',
    wealthHeroTitle2: 'বড় আর্থিক স্বাধীনতা।',
    wealthHeroDesc: 'আপনার জন্য তৈরি সঞ্চয়, ঋণ, বীমা এবং বিনিয়োগ প্রকল্পগুলি অন্বেষণ করুন।',
    wealthStartExplore: 'অন্বেষণ শুরু করুন',
    wealthPlan: 'পরিকল্পনা',
    wealthSave: 'সঞ্চয়',
    wealthGrow: 'বৃদ্ধি',
    wealthExploreGoalTitle: 'লক্ষ্য দ্বারা অন্বেষণ করুন',
    wealthViewAllGoals: 'সব দেখুন',
    wealthExploreGoalSub: 'আপনার প্রয়োজনের জন্য সঠিক প্রকল্প এবং সরঞ্জাম খুঁজুন।',
    wealthSnapshotTitle: 'আপনার আর্থিক স্ন্যাপশট',
    wealthSnapshotSub: 'আপনার অগ্রগতি ট্র্যাক এবং পরিচালনা করুন।',
    wealthSavedSchemes: 'সংরক্ষিত প্রকল্প',
    wealthApplications: 'অ্যাপ্লিকেশন',
    wealthDeadlines: 'আসন্ন সময়সীমা',
    wealthNotes: 'ব্যক্তিগত নোট',
    wealthNeedHelpTitle: 'সাহায্য প্রয়োজন?',
    wealthNeedHelpSub: 'যাচাই করা বিশেষজ্ঞ বা হেল্পলাইন থেকে দিকনির্দেশনা পান।',
    wealthHelpHelpline: 'আর্থিক হেল্পলাইনের সাথে কথা বলুন',
    wealthHelpAsk: 'উন্নতিকে জিজ্ঞাসা করুন',
    wealthHelpAskSub: 'ধাপে ধাপে দিকনির্দেশনা পান',
    wealthHelpGuide: 'আর্থিক সাক্ষরতা নির্দেশিকা',
    wealthHelpGuideSub: 'ব্যাংকিং, সঞ্চয়, বিনিয়োগ এবং জালিয়াতি এড়ানোর বুনিয়াদি শিখুন।',

    nav: { home: 'হোম', health: 'স্বাস্থ্য', wealth: 'সম্পদ', livelihood: 'জীবিকা', finance: 'অর্থায়ন', safety: 'নিরাপত্তা', rights: 'অধিকার' },
    sos: 'জরুরি',
    signin: 'সাইন ইন',
    askPlaceholder: 'সরকারি প্রকল্প বা আইনি অধিকার সম্পর্কে জিজ্ঞাসা করুন…',
    tagline: 'উন্নতির সাথে আপনার ভাষায় কথা বলুন এবং স্পষ্ট নির্দেশিকা পান — স্বাস্থ্য, অর্থ, কর্মসংস্থান, নিরাপত্তা ও আইনি অধিকার পর্যন্ত।',
    greeting: 'নমস্কার! আমি উন্নতি।',
    intro: 'মাতৃত্বকালীন সুবিধা, জামানতবিহীন মুদ্রা ঋণ, বিনামূল্যের সার্টিফিকেট কোর্স, POSH কর্মক্ষেত্রের অধিকার বা জরুরি সহায়তা সম্পর্কে আমাকে জিজ্ঞাসা করুন।',
    recommendedForYou: 'আপনার জন্য প্রস্তাবিত প্রকল্প',
    findingNearYou: 'আপনার আশেপাশের পরিষেবা খোঁজা হচ্ছে…',
    checkEligibility: 'যোগ্যতা যাচাই করুন',
    trackApplication: 'আবেদন ট্র্যাক করুন',
    callMom: 'কল মম',
    locationPrescreen: 'কাছের হাসপাতাল ও সাহায্য কেন্দ্র দেখতে উন্নতি আপনার লোকেশন ব্যবহার করে।',
    allowLocation: 'লোকেশন চালু করুন',
  },
  Telugu: {
    finVerifiedSchemes: 'ధృవీకరించబడిన పథకాలు',
    finGovPrograms: 'మీ స్థానం & అవసరాలకు సరిపోలే ప్రభుత్వ కార్యక్రమాలు.',
    finSearchPlaceholder: 'కీవర్డ్ లేదా స్కీమ్ ద్వారా శోధించండి',
    finCheckEligibility: 'అర్హతను తనిఖీ చేయండి',
    finBudgetTracking: 'నెలవారీ బడ్జెట్ ట్రాకింగ్',
    finExpenseTracker: 'ఖర్చుల ట్రాకర్',
    finAddExpense: 'ఖర్చును జోడించండి',
    finCancel: 'రద్దు చేయండి',
    finSpent: 'ఖర్చు చేసినది ₹',
    finOf: 'లో ₹',
    finRemaining: 'నెలవారీ భత్యంలో మిగిలి ఉన్నది',
    finDescPlaceholder: 'వివరణ (ఉదా. కిరాణా, పాఠశాల ఫీజులు...)',
    finAmountPlaceholder: 'మొత్తం (₹)',
    finSaveExpense: 'ఖర్చును సేవ్ చేయండి',
    finNoExpenses: 'ఇంకా ఎలాంటి ఖర్చులు నమోదు కాలేదు',
    finClickAdd: 'మీ రోజువారీ ఇంటి ఖర్చులను ట్రాక్ చేయడానికి<br/>పైన ఉన్న "+ ఖర్చును జోడించు" క్లిక్ చేయండి.',
    finUsageOverview: 'వినియోగం అవలోకనం',
    finMonthlyLimit: 'నెలవారీ పరిమితి & హెచ్చరికలు',
    finBudgetUtilized: 'ఉపయోగించిన బడ్జెట్',
    finBudgetCheckin: 'బడ్జెట్ చెక్-ఇన్',
    finYouHave: 'మీ వద్ద ₹',
    finRemainingMonth: 'ఈ నెల మిగిలి ఉన్నాయి.',
    finCloseLimit: ' మీరు షాపింగ్ కోసం మీ నెలవారీ పరిమితికి చేరువలో ఉన్నారు.',
    finComfortable: ' మీరు మీ నెలవారీ కేటాయింపులో సౌకర్యవంతంగా ఉన్నారు.',
    finProTip: 'ప్రో-టిప్',
    finProTipDesc: 'సుకన్య సమృద్ధి లేదా PPFలో నెలకు కేవలం ₹200 పెడితే 8.2% గ్యారెంటీ రిటర్న్ వస్తుంది.',
    finSavingsGoals: 'పొదుపు లక్ష్యాలు',
    finSetGoals: 'ప్రేరణతో ఉండటానికి మరియు మెరుగ్గా ప్లాన్ చేయడానికి మీ లక్ష్యాలను నిర్దేశించుకోండి.',
    finGoalsSet: 'లక్ష్యాలు సెట్ చేయబడ్డాయి',
    finUpdateGoal: 'లక్ష్యాన్ని నవీకరించండి',
    finAddGoal: 'లక్ష్యాన్ని జోడించండి',
    finCheckFullEligibility: 'పూర్తి అర్హతను తనిఖీ చేసి దరఖాస్తు చేసుకోండి',
    livCareerAdv: 'కెరీర్ పురోగతి',
    livResumeCreator: 'ప్రొఫెషనల్ రెజ్యూమ్ / CV క్రియేటర్',
    livAtsFriendly: 'హెల్త్‌కేర్, రిటైల్, కోఆర్డినేటర్ మరియు ఆఫీసు పాత్రల కోసం రూపొందించబడిన ATS-స్నేహపూర్వక ఆకృతులు.',
    livBuildResume: 'నా రెజ్యూమ్‌ను రూపొందించండి',
    livAiVoice: 'AI వాయిస్ ప్రాక్టీస్',
    livInterviewSim: 'ఇంటర్వ్యూ సిమ్యులేటర్',
    livPracticeReal: 'మీ భాషలో నిజమైన ఇంటర్వ్యూ ప్రశ్నలను బిగ్గరగా ప్రాక్టీస్ చేయండి. విశ్వాసం, స్పష్టత మరియు టోన్ కోసం తక్షణ AI స్కోర్‌లను పొందండి.',
    livStartVoice: 'వాయిస్ ప్రాక్టీస్ ప్రారంభించండి',
    livVideoGuides: '🎬 <strong>వీడియో గైడ్‌లు:</strong> జీతం ప్రశ్నలకు సమాధానమివ్వడం మరియు మీ గత విజయాలను నమ్మకంగా పరిచయం చేయడంపై 5 నిమిషాల వీడియో ట్యుటోరియల్‌లను చూడండి.',
    safProtection: '24/7 రక్షణ & వేగవంతమైన ప్రతిస్పందన',
    safAssistance: 'తక్షణ అత్యవసర సహాయం',
    safPrivateDispatch: 'ప్రైవేట్ ఎమర్జెన్సీ డిస్పాచ్, వివేకవంతమైన నిష్క్రమణ అనుకరణ మరియు ధృవీకరించబడిన హెల్ప్‌లైన్‌లు.',
    safActivateSOS: 'అత్యవసర SOSని సక్రియం చేయండి',
    safDiscreetExit: 'వివేకవంతమైన నిష్క్రమణ కాల్',
    safSimulatesCall: 'అసౌకర్య లేదా ఉద్రిక్త పరిస్థితుల నుండి వివేకంతో నిష్క్రమించడానికి ఇన్‌కమింగ్ మొబైల్ ఫోన్ కాల్‌ను అనుకరిస్తుంది.',
    safShareLocation: 'లైవ్ లొకేషన్‌ను షేర్ చేయండి',
    safGeneratesLink: 'విశ్వసనీయ పరిచయాలకు పంపడానికి ప్రైవేట్ 2-గంటల ఎన్‌క్రిప్ట్ చేయబడిన GPS ట్రాకింగ్ లింక్‌ను రూపొందిస్తుంది.',
    safCopyLink: 'ట్రాకింగ్ లింక్‌ను కాపీ చేయండి',
    safLinkExpires: 'ఈ సురక్షిత ట్రాకింగ్ లింక్ 2 గంటల్లో ముగుస్తుంది.',
    safEmergencyContacts: 'అత్యవసర పరిచయాలు',
    safDesignateContacts: 'SOS సమయంలో వెంటనే మీ లొకేషన్‌ను స్వీకరించే విశ్వసనీయ పరిచయాలను నియమించండి.',
    safManageContacts: 'పరిచయాలను నిర్వహించండి',
    safClose: 'మూసివేయి',
    rigExactScripts: 'ఖచ్చితమైన వర్డ్-ఫర్-వర్డ్ స్క్రిప్ట్‌లు',
    rigKnowWhatToSay: 'ఏం చెప్పాలో తెలుసుకోండి',
    rigHereIsWhat: 'ఇది జరిగితే మీరు మాటకొక మాట ఏం చెప్పగలరో ఇక్కడ ఉంది — ఆచరణాత్మకమైనది, నొక్కి చెప్పేది మరియు చట్టబద్ధమైనది.',
    rigListenOutLoud: 'బిగ్గరగా వినండి',
    rigCopyScript: 'స్క్రిప్ట్‌ను కాపీ చేయండి',
    rigCopied: 'కాపీ చేయబడింది!',
    rigPlainExplainers: 'సాధారణ భాషా వివరణలు',
    rigLegalProtections: 'మీ చట్టపరమైన రక్షణలను తెలుసుకోండి',
    rigUnderstandLegal: 'గందరగోళపరిచే చట్టపరమైన పదజాలం లేకుండా సాధారణ పదాలలో మీ చట్టపరమైన స్థితిని అర్థం చేసుకోండి.',
    rigWorkplacePosh: 'పని ప్రదేశం & POSH రక్షణ',
    rigMandatoryICC: '10+ మంది ఉద్యోగులు ఉన్న సంస్థలలో తప్పనిసరి ICC కమిటీలు.',
    rigEqualProperty: 'సమాన ఆస్తి & వారసత్వ హక్కులు',
    rigEqualRights: 'హిందూ వారసత్వ చట్టం కింద పూర్వీకుల ఆస్తిలో సమాన హక్కులు.',
    rigProtectionDV: 'గృహ హింస నుండి రక్షణ',
    rigRightToReside: 'భాగస్వామ్య గృహంలో నివసించే హక్కు, మధ్యంతర ఉపశమనం & రక్షణ ఉత్తర్వులు.',
    rigFreeLegalAid: 'ఉచిత న్యాయ సహాయం (NALSA)',
    rigEveryWoman: 'భారతదేశంలోని ప్రతి స్త్రీ ఏ కోర్టులోనైనా ఉచిత న్యాయవాదులకు చట్టబద్ధంగా అర్హులు.',
    rigReadFullGuide: 'పూర్తి లీగల్ గైడ్ చదవండి',

    homeSearchPlaceholder: 'పథకం, సేవ లేదా సహాయం ఎలా పొందాలో శోధించండి...',
    homeRecTitle: 'మీ కోసం సిఫార్సు చేయబడింది',
    homeRecSub: 'మీ స్థానం మరియు ప్రొఫైల్ ఆధారంగా',
    homeViewAll: 'అన్ని పథకాలను వీక్షించండి',
    homeTrackApps: 'మీ దరఖాస్తులను ట్రాక్ చేయండి',
    homeNearbyTitle: 'సమీప మద్దతు సేవలు',
    homeNearbySub: 'మీకు సమీపంలో ధృవీకరించబడిన కేంద్రాలను కనుగొనండి',
    homeViewMap: 'మ్యాప్‌లో వీక్షించండి',
    homeContactsTitle: 'ముఖ్యమైన పరిచయాలు',
    homeContactsSub: 'ధృవీకరించబడిన హెల్ప్‌లైన్‌లకు త్వరిత యాక్సెస్',
    homeExploreTitle: 'మద్దతు ప్రాంతాలను అన్వేషించండి',
    homeExploreSub: 'కీలక ప్రాంతాల్లో పథకాలు, సేవలు మరియు సమాచారాన్ని కనుగొనండి',
    homeExpHealth: 'ఆసుపత్రులు, భీమా, ప్రసూతి సంరక్షణ మరియు మరిన్ని',
    homeExpWealth: 'పొదుపు, పెన్షన్లు, ప్రయోజనాలు మరియు భీమా',
    homeExpLivelihood: 'ఉద్యోగాలు, నైపుణ్య శిక్షణ మరియు వ్యవస్థాపకత',
    homeExpFinance: 'రుణాలు, స్కాలర్‌షిప్‌లు మరియు ఆర్థిక సహాయం',
    homeExpSafety: 'అత్యవసర సహాయం, న్యాయ సహాయం మరియు సంక్షోభ మద్దతు',
    homeExpRights: 'మీ హక్కులను తెలుసుకోండి మరియు న్యాయ వనరులను యాక్సెస్ చేయండి',
    wealthRecKicker: 'మీ కోసం సిఫార్సు చేయబడింది',
    wealthSchemesTitle: 'ఆర్థిక పథకాలు',
    wealthSchemesSub: 'మీ స్థానం మరియు ప్రొఫైల్ ఆధారంగా.',
    wealthSearchPlaceholder: 'కీవర్డ్ లేదా స్కీమ్ ద్వారా శోధించండి',
    wealthResetFilters: 'ఫిల్టర్‌లను రీసెట్ చేయండి',
    wealthViewAll: 'అన్ని పథకాలను వీక్షించండి',
    wealthTrackApps: 'మీ దరఖాస్తులను ట్రాక్ చేయండి',
    wealthHeroKicker: 'ఉజ్వల భవిష్యత్తును నిర్మించడం',
    wealthHeroTitle: 'చిన్న అడుగులు,',
    wealthHeroTitle2: 'పెద్ద ఆర్థిక స్వేచ్ఛ.',
    wealthHeroDesc: 'మీ కోసం రూపొందించిన పొదుపు, రుణాలు, భీమా మరియు పెట్టుబడి పథకాలను అన్వేషించండి.',
    wealthStartExplore: 'అన్వేషించడం ప్రారంభించండి',
    wealthPlan: 'ప్రణాళిక',
    wealthSave: 'పొదుపు',
    wealthGrow: 'పెరుగుదల',
    wealthExploreGoalTitle: 'లక్ష్యం ద్వారా అన్వేషించండి',
    wealthViewAllGoals: 'అన్నీ వీక్షించండి',
    wealthExploreGoalSub: 'మీ అవసరాలకు సరైన పథకాలు మరియు సాధనాలను కనుగొనండి.',
    wealthSnapshotTitle: 'మీ ఆర్థిక స్నాప్‌షాట్',
    wealthSnapshotSub: 'మీ పురోగతిని ట్రాక్ చేయండి మరియు నిర్వహించండి.',
    wealthSavedSchemes: 'సేవ్ చేసిన పథకాలు',
    wealthApplications: 'దరఖాస్తులు',
    wealthDeadlines: 'రాబోయే గడువులు',
    wealthNotes: 'వ్యక్తిగత గమనికలు',
    wealthNeedHelpTitle: 'సహాయం కావాలా?',
    wealthNeedHelpSub: 'ధృవీకరించబడిన నిపుణులు లేదా హెల్ప్‌లైన్‌ల నుండి మార్గదర్శకత్వం పొందండి.',
    wealthHelpHelpline: 'ఫైనాన్షియల్ హెల్ప్‌లైన్‌తో మాట్లాడండి',
    wealthHelpAsk: 'ఉన్నతిని అడగండి',
    wealthHelpAskSub: 'దశల వారీ మార్గదర్శకత్వం పొందండి',
    wealthHelpGuide: 'ఆర్థిక అక్షరాస్యత గైడ్',
    wealthHelpGuideSub: 'బ్యాంకింగ్, పొదుపు, పెట్టుబడి మరియు మోసాలను నివారించడం గురించి తెలుసుకోండి.',

    nav: { home: 'హోమ్', health: 'ఆరోగ్యం', wealth: 'సంపద', livelihood: 'జీవనోపాధి', finance: 'ఆర్థికం', safety: 'రక్షణ', rights: 'హక్కులు' },
    sos: 'అత్యవసరం',
    signin: 'సైన్ ఇన్',
    askPlaceholder: 'పథకాలు లేదా సహాయం గురించి మీ భాషలో అడగండి…',
    tagline: 'ఉన్నతితో మీ భాషలో మాట్లాడి స్పష్టమైన మార్గదర్శకత్వం పొందండి — ఆరోగ్యం, ఆర్థిక తోడ్పాటు, ఉపాధి, రక్షణ మరియు చట్టపరమైన హక్కుల వరకు.',
    greeting: 'నమస్తే! నేను ఉన్నతిని.',
    intro: 'మాతృత్వ ప్రయోజనాలు, హామీ లేని ముద్రా రుణాలు, ఉచిత సర్టిఫైడ్ కోర్సులు, POSH కార్యాలయ హక్కులు లేదా అత్యవసర సహాయం గురించి నన్ను అడగండి.',
    recommendedForYou: 'మీ కోసం సిఫార్సు చేయబడిన పథకాలు',
    findingNearYou: 'మీ సమీపంలో ఉన్న సేవలను అన్వేషిస్తున్నాము…',
    checkEligibility: 'అర్హతను తనిఖీ చేయండి',
    trackApplication: 'దరఖాస్తును ట్రాక్ చేయండి',
    callMom: 'కాల్ మామ్',
    locationPrescreen: 'సమీప ఆసుపత్రులు మరియు కేంద్రాలను చూపించడానికి ఉన్నతి లొకేషన్ ఉపయోగిస్తుంది.',
    allowLocation: 'లొకేషన్ ప్రారంభించండి',
  },
  Gujarati: {
    finVerifiedSchemes: 'ચકાસાયેલ યોજનાઓ',
    finGovPrograms: 'તમારા સ્થાન અને જરૂરિયાતો સાથે મેળ ખાતા સરકારી કાર્યક્રમો.',
    finSearchPlaceholder: 'કીવર્ડ અથવા યોજના દ્વારા શોધો',
    finCheckEligibility: 'પાત્રતા તપાસો',
    finBudgetTracking: 'માસિક બજેટ ટ્રેકિંગ',
    finExpenseTracker: 'ખર્ચ ટ્રેકર',
    finAddExpense: 'ખર્ચ ઉમેરો',
    finCancel: 'રદ કરો',
    finSpent: 'ખર્ચ્યા ₹',
    finOf: 'માંથી ₹',
    finRemaining: 'માસિક ભથ્થામાં બાકી',
    finDescPlaceholder: 'વર્ણન (દા.ત. કરિયાણું, શાળાની ફી...)',
    finAmountPlaceholder: 'રકમ (₹)',
    finSaveExpense: 'ખર્ચ સાચવો',
    finNoExpenses: 'હજી સુધી કોઈ ખર્ચ નોંધાયેલ નથી',
    finClickAdd: 'તમારા રોજિંદા ઘરગથ્થુ ખર્ચને ટ્રૅક કરવા માટે<br/>ઉપર "+ ખર્ચ ઉમેરો" પર ક્લિક કરો.',
    finUsageOverview: 'ઉપયોગની ઝાંખી',
    finMonthlyLimit: 'માસિક મર્યાદા અને ચેતવણીઓ',
    finBudgetUtilized: 'બજેટ વપરાયેલ',
    finBudgetCheckin: 'બજેટ ચેક-ઇન',
    finYouHave: 'તમારી પાસે ₹',
    finRemainingMonth: 'આ મહિને બાકી છે.',
    finCloseLimit: ' તમે ખરીદી માટે તમારી માસિક મર્યાદાની નજીક છો.',
    finComfortable: ' તમે તમારી માસિક ફાળવણીની અંદર આરામદાયક છો.',
    finProTip: 'પ્રો-ટીપ',
    finProTipDesc: 'સુકન્યા સમૃદ્ધિ અથવા PPFમાં મહિને માત્ર ₹200 મૂકવાથી 8.2% ગેરંટીડ વળતર મળે છે.',
    finSavingsGoals: 'બચત લક્ષ્યો',
    finSetGoals: 'પ્રેરિત રહેવા અને વધુ સારી યોજના બનાવવા માટે તમારા લક્ષ્યો નક્કી કરો.',
    finGoalsSet: 'લક્ષ્યો સેટ',
    finUpdateGoal: 'લક્ષ્ય અપડેટ કરો',
    finAddGoal: 'લક્ષ્ય ઉમેરો',
    finCheckFullEligibility: 'સંપૂર્ણ પાત્રતા તપાસો અને અરજી કરો',
    livCareerAdv: 'કારકિર્દી પ્રગતિ',
    livResumeCreator: 'વ્યાવસાયિક રેઝ્યૂમે / સીવી સર્જક',
    livAtsFriendly: 'હેલ્થકેર, રિટેલ, કોઓર્ડિનેટર અને ઓફિસની ભૂમિકાઓ માટે રચાયેલ ATS-મૈત્રીપૂર્ણ ફોર્મેટ.',
    livBuildResume: 'મારો રેઝ્યૂમે બનાવો',
    livAiVoice: 'AI વૉઇસ પ્રેક્ટિસ',
    livInterviewSim: 'ઇન્ટરવ્યુ સિમ્યુલેટર',
    livPracticeReal: 'તમારી ભાષામાં વાસ્તવિક ઇન્ટરવ્યુ પ્રશ્નોની મોટેથી પ્રેક્ટિસ કરો. આત્મવિશ્વાસ, સ્પષ્ટતા અને ટોન માટે ત્વરિત AI સ્કોર્સ મેળવો.',
    livStartVoice: 'વૉઇસ પ્રેક્ટિસ શરૂ કરો',
    livVideoGuides: '🎬 <strong>વિડિઓ માર્ગદર્શિકાઓ:</strong> પગારના પ્રશ્નોના જવાબ આપવા અને તમારી ભૂતકાળની સિદ્ધિઓને આત્મવિશ્વાસ સાથે રજૂ કરવા પર 5-મિનિટના વિડિઓ ટ્યુટોરિયલ્સ જુઓ.',
    safProtection: '24/7 સુરક્ષા અને ઝડપી પ્રતિસાદ',
    safAssistance: 'તાત્કાલિક કટોકટી સહાય',
    safPrivateDispatch: 'ખાનગી ઈમરજન્સી ડિસ્પેચ, સમજદાર એક્ઝિટ સિમ્યુલેશન અને ચકાસાયેલ હેલ્પલાઈન.',
    safActivateSOS: 'ઇમરજન્સી SOS સક્રિય કરો',
    safDiscreetExit: 'સમજદાર એક્ઝિટ કૉલ',
    safSimulatesCall: 'અસ્વસ્થતા અથવા તંગ પરિસ્થિતિઓમાંથી સમજદારીપૂર્વક બહાર નીકળવા માટે ઇનકમિંગ મોબાઇલ ફોન કૉલનું અનુકરણ કરે છે.',
    safShareLocation: 'લાઇવ લોકેશન શેર કરો',
    safGeneratesLink: 'વિશ્વસનીય સંપર્કોને મોકલવા માટે ખાનગી 2-કલાકની એન્ક્રિપ્ટેડ GPS ટ્રેકિંગ લિંક જનરેટ કરે છે.',
    safCopyLink: 'ટ્રેકિંગ લિંક કૉપિ કરો',
    safLinkExpires: 'આ સુરક્ષિત ટ્રેકિંગ લિંક 2 કલાકમાં સમાપ્ત થાય છે.',
    safEmergencyContacts: 'ઇમરજન્સી સંપર્કો',
    safDesignateContacts: 'વિશ્વસનીય સંપર્કો નિયુક્ત કરો જેઓ SOS દરમિયાન તરત જ તમારું સ્થાન પ્રાપ્ત કરશે.',
    safManageContacts: 'સંપર્કો મેનેજ કરો',
    safClose: 'બંધ કરો',
    rigExactScripts: 'ચોક્કસ શબ્દ-દર-શબ્દ સ્ક્રિપ્ટ્સ',
    rigKnowWhatToSay: 'શું કહેવું તે જાણો',
    rigHereIsWhat: 'અહીં તે છે જે તમે શબ્દશઃ કહી શકો છો, જો આવું થાય છે — વ્યવહારુ, અડગ અને કાનૂની.',
    rigListenOutLoud: 'મોટેથી સાંભળો',
    rigCopyScript: 'સ્ક્રિપ્ટ કૉપિ કરો',
    rigCopied: 'કૉપિ કર્યું!',
    rigPlainExplainers: 'સરળ ભાષામાં સમજૂતી',
    rigLegalProtections: 'તમારી કાનૂની સુરક્ષા જાણો',
    rigUnderstandLegal: 'ગૂંચવણભરી કાનૂની પરિભાષા વિના સરળ શબ્દોમાં તમારી કાનૂની સ્થિતિને સમજો.',
    rigWorkplacePosh: 'કાર્યસ્થળ અને POSH સુરક્ષા',
    rigMandatoryICC: '10+ કર્મચારીઓ ધરાવતી સંસ્થાઓમાં ફરજિયાત ICC સમિતિઓ.',
    rigEqualProperty: 'સમાન સંપત્તિ અને વારસાના અધિકારો',
    rigEqualRights: 'હિન્દુ ઉત્તરાધિકાર અધિનિયમ હેઠળ પૈતૃક સંપત્તિમાં સમાન અધિકાર.',
    rigProtectionDV: 'ઘરેલું હિંસાથી રક્ષણ',
    rigRightToReside: 'શેર કરેલ ઘરમાં રહેવાનો અધિકાર, વચગાળાની રાહત અને સુરક્ષા આદેશો.',
    rigFreeLegalAid: 'મફત કાનૂની સહાય (NALSA)',
    rigEveryWoman: 'ભારતમાં દરેક મહિલા કાયદેસર રીતે કોઈપણ કોર્ટમાં મફત વકીલો માટે હકદાર છે.',
    rigReadFullGuide: 'સંપૂર્ણ કાનૂની માર્ગદર્શિકા વાંચો',

    homeSearchPlaceholder: 'કોઈ યોજના, સેવા અથવા મદદ કેવી રીતે મેળવવી તે શોધો...',
    homeRecTitle: 'તમારા માટે ભલામણ કરેલ',
    homeRecSub: 'તમારા સ્થાન અને પ્રોફાઇલના આધારે',
    homeViewAll: 'તમામ યોજનાઓ જુઓ',
    homeTrackApps: 'તમારી અરજીઓ ટ્રૅક કરો',
    homeNearbyTitle: 'નજીકની સહાય સેવાઓ',
    homeNearbySub: 'તમારી નજીકના ચકાસાયેલ કેન્દ્રો શોધો',
    homeViewMap: 'નકશા પર જુઓ',
    homeContactsTitle: 'મહત્વપૂર્ણ સંપર્કો',
    homeContactsSub: 'ચકાસાયેલ હેલ્પલાઇન્સની ઝડપી ઍક્સેસ',
    homeExploreTitle: 'સહાય વિસ્તારોનું અન્વેષણ કરો',
    homeExploreSub: 'મુખ્ય વિસ્તારોમાં યોજનાઓ, સેવાઓ અને માહિતી શોધો',
    homeExpHealth: 'હોસ્પિટલો, વીમા, પ્રસૂતિ સંભાળ અને વધુ',
    homeExpWealth: 'બચત, પેન્શન, લાભો અને વીમા',
    homeExpLivelihood: 'નોકરીઓ, કૌશલ્ય તાલીમ અને ઉદ્યોગસાહસિકતા',
    homeExpFinance: 'લોન, શિષ્યવૃત્તિ અને નાણાકીય સહાય',
    homeExpSafety: 'કટોકટી મદદ, કાનૂની સહાય અને કટોકટી આધાર',
    homeExpRights: 'તમારા અધિકારો જાણો અને કાનૂની સંસાધનોની ઍક્સેસ મેળવો',
    wealthRecKicker: 'તમારા માટે ભલામણ કરેલ',
    wealthSchemesTitle: 'નાણાકીય યોજનાઓ',
    wealthSchemesSub: 'તમારા સ્થાન અને પ્રોફાઇલના આધારે.',
    wealthSearchPlaceholder: 'કીવર્ડ અથવા યોજના દ્વારા શોધો',
    wealthResetFilters: 'ફિલ્ટર્સ રીસેટ કરો',
    wealthViewAll: 'તમામ યોજનાઓ જુઓ',
    wealthTrackApps: 'તમારી અરજીઓ ટ્રૅક કરો',
    wealthHeroKicker: 'ઉજ્જવળ આવતીકાલનું નિર્માણ',
    wealthHeroTitle: 'નાના પગલાં,',
    wealthHeroTitle2: 'મોટી નાણાકીય સ્વતંત્રતા.',
    wealthHeroDesc: 'તમારા માટે બનાવેલી બચત, લોન, વીમા અને રોકાણ યોજનાઓનું અન્વેષણ કરો.',
    wealthStartExplore: 'અન્વેષણ કરવાનું શરૂ કરો',
    wealthPlan: 'યોજના',
    wealthSave: 'બચત',
    wealthGrow: 'વિકાસ',
    wealthExploreGoalTitle: 'લક્ષ્ય દ્વારા અન્વેષણ કરો',
    wealthViewAllGoals: 'બધા જુઓ',
    wealthExploreGoalSub: 'તમારી જરૂરિયાતો માટે યોગ્ય યોજનાઓ અને સાધનો શોધો.',
    wealthSnapshotTitle: 'તમારો નાણાકીય સ્નેપશોટ',
    wealthSnapshotSub: 'તમારી પ્રગતિને ટ્રૅક કરો અને સંચાલિત કરો.',
    wealthSavedSchemes: 'સાચવેલી યોજનાઓ',
    wealthApplications: 'અરજીઓ',
    wealthDeadlines: 'આગામી સમયમર્યાદા',
    wealthNotes: 'વ્યક્તિગત નોંધો',
    wealthNeedHelpTitle: 'મદદ જોઈએ છે?',
    wealthNeedHelpSub: 'ચકાસાયેલ નિષ્ણાતો અથવા હેલ્પલાઇન્સ પાસેથી માર્ગદર્શન મેળવો.',
    wealthHelpHelpline: 'નાણાકીય હેલ્પલાઇન સાથે વાત કરો',
    wealthHelpAsk: 'ઉન્નતિને પૂછો',
    wealthHelpAskSub: 'સ્ટેપ-બાય-સ્ટેપ માર્ગદર્શન મેળવો',
    wealthHelpGuide: 'નાણાકીય સાક્ષરતા માર્ગદર્શિકા',
    wealthHelpGuideSub: 'બેંકિંગ, બચત, રોકાણ અને છેતરપિંડી ટાળવાની મૂળભૂત બાબતો શીખો.',

    nav: { home: 'હોમ', health: 'આરોગ્ય', wealth: 'સંપત્તિ', livelihood: 'આજીવિકા', finance: 'નાણાં', safety: 'સુરક્ષા', rights: 'અધિકાર' },
    sos: 'ઇમરજન્સી',
    signin: 'સાઇન ઇન',
    askPlaceholder: 'સરકારી યોજના અથવા સહાય વિશે તમારી ભાષામાં પૂછો…',
    tagline: 'ઉન્નતિ સાથે તમારી ભાષામાં વાત કરો અને સ્પષ્ટ માર્ગદર્શન મેળવો — આરોગ્ય, નાણાકીય સહાય, રોજગાર, સુરક્ષા અને કાયદાકીય અધિકારો સુધી.',
    greeting: 'નમસ્તે! હું ઉન્નતિ છું.',
    intro: 'માતૃત્વ લાભો, કોઈ ગેરંટી વગરની મુદ્રા લોન, મફત પ્રમાણિત અભ્યાસક્રમો, POSH કાર્યસ્થળના અધિકારો અથવા કટોકટીની મદદ વિશે મને પૂછો.',
    recommendedForYou: 'તમારા માટે ભલામણ કરેલ યોજનાઓ',
    findingNearYou: 'તમારી નજીકની સેવાઓ શોધી રહ્યાં છીએ…',
    checkEligibility: 'પાત્રતા તપાસો',
    trackApplication: 'અરજી ટ્રેક કરો',
    callMom: 'કોલ મૉમ',
    locationPrescreen: 'નજીકની હોસ્પિટલ અને સેવા કેન્દ્રો દર્શાવવા માટે ઉન્નતિ લોકેશનનો ઉપયોગ કરે છે.',
    allowLocation: 'લોકેશન શરૂ કરો',
  }
};

const NAV = [
  ['home', 'Home'], ['health', 'Health'], ['wealth', 'Wealth'],
  ['livelihood', 'Livelihood'], ['finance', 'Finance'], ['safety', 'Safety'], ['rights', 'Rights']
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

/* Verified Government Schemes across all domains */
const ALL_SCHEMES = [
  { id: 'pmmvy', name: 'PM Matru Vandana Yojana', desc: '₹6,000 cash incentive for pregnant & lactating mothers.', tag: '₹6,000 Benefit', area: ['health', 'home'] },
  { id: 'pmjay', name: 'Ayushman Bharat (PM-JAY)', desc: '₹5 Lakh annual free cashless healthcare for the whole family.', tag: '₹5 Lakh Cashless', area: ['health', 'home'] },
  { id: 'mudra', name: 'Mudra Yojana – Shishu', desc: 'Collateral-free business loan up to ₹50,000 for women-led micro-enterprises.', tag: 'Up to ₹50,000', area: ['wealth', 'finance'] },
  { id: 'pmkvy', name: 'PMKVY 4.0 Free Skill Training', desc: 'NSQF-certified training with daily travel stipend & guaranteed placement support.', tag: 'Free + Stipend', area: ['livelihood', 'wealth'] },
  { id: 'sukanya', name: 'Sukanya Samriddhi Yojana', desc: 'Government-backed high interest (8.2%) tax-free savings plan for girl child.', tag: '8.2% Interest', area: ['finance', 'wealth'] },
  { id: 'pmsby', name: 'PM Suraksha Bima Yojana', desc: '₹2 Lakh accidental death & disability insurance for ₹20/year.', tag: '₹20/Year Cover', area: ['finance', 'safety'] },
  { id: 'nalsa', name: 'NALSA Free Legal Aid', desc: 'Free female advocates and zero-cost court representation for all women in India.', tag: 'Zero Cost Aid', area: ['rights', 'safety'] },
  { id: 'posh', name: 'POSH Act Protections', desc: 'Statutory rights ensuring safe workplace, Internal Complaints Committee (ICC), and anti-retaliation.', tag: 'Workplace Law', area: ['rights', 'livelihood'] },
  { id: 'sakhi', name: 'Sakhi One Stop Crisis Centre', desc: '24/7 integrated shelter, medical care, police desk & psychological counseling under one roof.', tag: '24/7 Shelter', area: ['safety', 'home'] }
];

/* Initial Application Tracking Dataset — Empty by default for backend integration */
const INITIAL_APPLICATIONS = [];

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

/* ─── main application component ─────────────────────────── */
export default function App() {
  const [page, setPage]               = useState('landing');
  const [subPage, setSubPage]         = useState(null);
  const [lang, setLang]               = useState(() => localStorage.getItem('unnati-lang') || 'English');
  const [langOpen, setLangOpen]       = useState(false);
  const [authOpen, setAuthOpen]       = useState(false);
  const [authStep, setAuthStep]       = useState('prefs');
  const [loggedIn, setLoggedIn]       = useState(() => localStorage.getItem('unnati-loggedin') === '1');
  const [chat, setChat]               = useState([]);
  const [query, setQuery]             = useState('');
  const [guide, setGuide]             = useState(null);
  const [sos, setSos]                 = useState(false);
  const [toast, setToast]             = useState('');
  const [showCallMom, setShowCallMom] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [userQueriesCount, setUserQueriesCount] = useState(0);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.English;

  useEffect(() => { localStorage.setItem('unnati-lang', lang); }, [lang]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 3800);
    return () => clearTimeout(timer);
  }, [toast]);

  const navigate = (p) => {
    setPage(p);
    setSubPage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSub  = (s) => setSubPage(s);
  const closeSub = ()  => setSubPage(null);

  const sendChat = (e) => {
    e?.preventDefault();
    const txt = query.trim();
    if (!txt) return;

    const nextCount = userQueriesCount + 1;
    setUserQueriesCount(nextCount);

    const userMsgs = chat.filter(m => m.from === 'user').length;
    const nextChat = [...chat, { from: 'user', text: txt }, { from: 'ai', text: AI_STUBS[userMsgs % AI_STUBS.length] }];
    setChat(nextChat);
    setQuery('');

    /* Soft login nudge after 2-3 queries per frontend spec */
    if (!loggedIn && nextCount === 3) {
      setTimeout(() => {
        setAuthStep('prefs');
        setAuthOpen(true);
        setToast('Want me to remember this for next time? Sign in to save your progress.');
      }, 700);
    }
  };

  const completeAuth = () => {
    localStorage.setItem('unnati-loggedin', '1');
    setLoggedIn(true);
    setAuthOpen(false);
    setAuthStep('login');
    setToast('Welcome to Unnati! Your preferences and profile are active.');
  };

  const signOut = () => {
  localStorage.removeItem('unnati-loggedin');
  setLoggedIn(false);
  setAuthOpen(false);
  setAuthStep('prefs');
  navigate('landing');
  setToast('You have been signed out.');
};

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setToast('Location access granted. Nearby services updated for your area.'),
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
        onAuthOpen={() => { setAuthStep(loggedIn ? 'login' : 'prefs'); setAuthOpen(true); }}
        onSignOut={signOut}onSos={() => setSos(true)}
        t={t}
      />

      {page === 'landing' ? (
        <Landing
          chat={chat} query={query} setQuery={setQuery}
          onSend={sendChat} onNav={navigate}
          onOpenTracker={() => setShowTracker(true)}
          t={t}
        />
      ) : (
        <div className="inner">
          <div className={`workspace ${subPage ? 'pushed' : ''}`}>
            {page !== 'home' && <AiBar page={page} onToast={setToast} t={t} onOpenTracker={() => setShowTracker(true)} />}
            {
              {
                home:       <HomePage onToast={setToast} onNav={navigate} onOpenTracker={() => setShowTracker(true)} t={t} />,
                health:     <HealthPage onGuide={setGuide} onSub={() => openSub('period')} onOpenScanner={() => setShowScanner(true)} onToast={setToast} onOpenTracker={() => setShowTracker(true)} t={t} />,
                wealth:     <WealthPage applications={applications} onGuide={setGuide} onToast={setToast} onNav={navigate} onOpenTracker={() => setShowTracker(true)} t={t} />,
                livelihood: <LivelihoodPage onSub={openSub} onToast={setToast} t={t} />,
                finance:    <FinancePage onToast={setToast} t={t} />,
                safety:     <SafetyPage onSos={() => setSos(true)} onCallMom={() => setShowCallMom(true)} onToast={setToast} t={t} />,
                rights:     <RightsPage onGuide={setGuide} onToast={setToast} t={t} />,
              }[page] || <HomePage onToast={setToast} onNav={navigate} onOpenTracker={() => setShowTracker(true)} t={t} />
            }
          </div>

          <div className={`subpage ${subPage ? 'open' : ''}`}>
            {subPage === 'period'    && <PeriodPage onClose={closeSub} onToast={setToast} t={t} />}
            {subPage === 'resume'    && <ResumePage onClose={closeSub} onToast={setToast} t={t} />}
            {subPage === 'interview' && <InterviewPage onClose={closeSub} onToast={setToast} t={t} />}
          </div>
        </div>
      )}

      {/* Overlays & Interactive Modals */}
      {guide       && <GuideDrawer kind={guide} onClose={() => setGuide(null)} />}
      {authOpen    && <AuthModal lang={lang} setLang={setLang} step={authStep} setStep={setAuthStep} onClose={() => setAuthOpen(false)} onDone={completeAuth} onLocation={requestLocation} t={t} />}
      {sos         && <SosModal onClose={() => setSos(false)} onToast={setToast} />}
      {showCallMom && <CallMomModal onClose={() => setShowCallMom(false)} onToast={setToast} />}
      {showScanner && <QrScannerModal onClose={() => setShowScanner(false)} onToast={setToast} />}
      {showTracker && <AppTrackerModal applications={applications} setApplications={setApplications} onClose={() => setShowTracker(false)} onToast={setToast} />}
      {toast       && <div className="toast"><Check size={14}/>{toast}</div>}
    </div>
  );
}

/* ─── header ─────────────────────────────────────────────── */
function Header({ page, onNav, lang, setLang, langOpen, setLangOpen, loggedIn, onAuthOpen, onSignOut, onSos, t }) {
  const ref = useRef(null);
  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [setLangOpen]);

  return (
    <header className="topbar">
      <button className="brand" onClick={() => onNav('landing')} title="Go to Unnati Home">
        <img src={unnatiLogoSvg} alt="unnati" className="brand-logo-img" />
      </button>

      {loggedIn && (
        <nav className="topnav">
          {NAV.map(([id, defaultLabel]) => {
            const label = t.nav?.[id] || defaultLabel;
            return (
              <button
                key={id}
                className={page === id ? 'active' : ''}
                onClick={() => onNav(id)}
              >
                {label}
              </button>
            );
          })}
        </nav>
      )}

      <div className="top-end">
        <button className="sos-top-btn" onClick={onSos} title="Emergency SOS">
          {t.sos || 'SOS'}
        </button>

        <div className="lang-wrap" ref={ref}>
          <button className="lang-btn" onClick={() => setLangOpen(v => !v)}>
            <Languages size={14}/>{lang}<ChevronDown size={12}/>
          </button>
          {langOpen && (
            <div className="lang-menu">
              {LANGUAGES.map(([name, native]) => (
                <button
                  key={name}
                  className={lang === name ? 'sel' : ''}
                  onClick={() => { setLang(name); setLangOpen(false); }}
                >
                  <span>{native}</span><small>{name}</small>
                </button>
              ))}
            </div>
          )}
        </div>

        {loggedIn
  ? (
    <button className="signin-btn" onClick={onSignOut}>
      Sign out
    </button>
  )
  : (
    <button className="signin-btn" onClick={onAuthOpen}>
      {t.signin || 'Sign in'}
    </button>
  )
}
      </div>
    </header>
  );
}

/* ─── landing page ───────────────────────────────────────── */
function Landing({ chat, query, setQuery, onSend, onNav, onOpenTracker, t }) {
  const streamRef = useRef(null);
  useEffect(() => {
    if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
  }, [chat.length]);

  return (
    <section className="landing">
      <div className="land-content">
        <p className="land-tagline">
          {t.tagline || 'Talk to Unnati in your language and get clear, personalized guidance — from health & financial support to opportunities, safety, and legal rights.'}
        </p>

        <div className="land-row">
          {/* Left: SVG Illustration */}
          <div className="land-illustration-wrap">
            <img
              src={abhayaSvg}
              alt="Unnati Guidance — Empowering Women"
              className="land-illustration"
            />
          </div>

          {/* Right: Glass Card — Horizontally Aligned */}
          <div className="land-chat-wrap">
            <div className="land-chat-widget">
              <div className="land-chat-stream" ref={streamRef}>
                {chat.length === 0 ? (
                  <div style={{ padding: '12px 8px', color: '#574a51', fontSize: '13px', lineHeight: 1.5 }}>
                    <p style={{ fontWeight: 600, color: '#271d22', marginBottom: 6 }}>{t.greeting}</p>
                    <p>{t.intro}</p>
                  </div>
                ) : (
                  chat.map((m, i) => (
                    <div key={i} className={`lbubble ${m.from}`}>{m.text}</div>
                  ))
                )}
              </div>

              <form className="land-chat-bar" onSubmit={onSend}>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={t.askPlaceholder || 'Ask me anything :)'}
                />
                <button
                  type="button"
                  className="land-bar-icon"
                  aria-label="Voice input"
                  onClick={() => setQuery('What government schemes can I apply for?')}
                >
                  <Mic size={18}/>
                </button>
                <button type="submit" className="land-bar-send" aria-label="Send">
                  <ArrowUp size={16}/>
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── AI search & scheme tracker bar on all pages ────────── */
function AiBar({ page, onToast, t, onOpenTracker }) {
  const [q, setQ] = useState('');
  const [result, setResult] = useState('');
  const [isListening, setIsListening] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;

    const stubs = [
      'You may qualify for PM Matru Vandana Yojana (up to ₹6,000) and Ayushman Bharat PM-JAY (₹5 Lakh cashless health cover). Would you like help applying?',
      'I found 3 relevant government programs for your situation. The PMKVY scheme provides free certified training with a monthly travel stipend. Shall I walk you through the application?',
      'Under the POSH Act, you have the right to a safe workplace without discrimination. I can provide the exact script to file an official report.',
      'Under Mudra Yojana – Shishu, you can obtain collateral-free working capital up to ₹50,000 for your home enterprise through any local public sector bank.'
    ];
    const idx = q.length % stubs.length;
    setResult(stubs[idx]);
    setQ('');
  };

  const handleMicClick = () => {
    setIsListening(true);
    onToast('Voice input listening… (Speak in your preferred language)');
    setTimeout(() => {
      setQ('Check my eligibility for government maternity and loan schemes');
      setIsListening(false);
      onToast('Speech recognized.');
    }, 1800);
  };

  return (
    <div className="ai-bar-wrap">
      <form className="ai-bar" onSubmit={submit}>
        <Search size={16} className="ai-icon"/>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder={
            page === 'wealth'
              ? 'Ask about a scheme, how to save, start a business, or get financial help...'
              : (t.askPlaceholder || 'Ask about a scheme, or how to get help...')
          }
        />
        <button
          type="button"
          className={`land-bar-icon ${isListening ? 'listening-active' : ''}`}
          aria-label="Voice input"
          onClick={handleMicClick}
          title="Voice input in your language"
        >
          <Mic size={17} style={{ color: isListening ? '#a2385c' : undefined }}/>
        </button>
        <button type="submit" className="land-bar-send" aria-label="Submit">
          <ArrowRight size={16}/>
        </button>
      </form>

      {result && (
        <div className="ai-bar-result">
          <div className="ai-result-badge"><Sparkles size={12}/> Unnati Guidance</div>
          <p>{result}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
            <button className="solid-btn small" onClick={onOpenTracker}>
              <FileCheck size={12}/> Check My Application Status
            </button>
            <button className="link-btn small" onClick={() => setResult('')}>Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── reusable scheme panel ─────────────────────────────── */
function SchemePanel({ area = 'government schemes', onToast, onOpenTracker }) {
  const [filter, setFilter] = useState('');
  const filtered = ALL_SCHEMES.filter(s =>
    !filter ||
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.desc.toLowerCase().includes(filter.toLowerCase()) ||
    s.area.some(a => a.includes(filter.toLowerCase()))
  );

  return (
    <aside className="scheme-panel card">
      <div className="panel-tag"><Sparkles size={12}/> Recommended for You</div>
      <h3>Verified Schemes</h3>
      <p className="muted small">Government programs matching your location & requirements.</p>

      <label className="search-field" style={{ margin: '12px 0' }}>
        <Search size={13}/>
        <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Search by keyword or scheme…"
        />
      </label>

      <div className="scheme-list-stack">
        {filtered.slice(0, 5).map(s => (
          <div
            key={s.id}
            className="scheme-list-item"
            onClick={() => onToast && onToast(`${s.name} — eligibility criteria and application checklist loaded.`)}
          >
            
            <strong>{s.name}</strong>
            <small>{s.desc}</small>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="muted small" style={{ padding: '8px 0' }}>No programs matched. Try searching "health", "loan", or "safety".</p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
        <button
          className="solid-btn full small"
          onClick={() => onToast && onToast('Opening state-wide eligibility directory…')}
        >
          Check Eligibility <ArrowRight size={13}/>
        </button>
        {onOpenTracker && (
          <button className="link-btn small" onClick={onOpenTracker}>
            <FileCheck size={12}/> Track submitted applications
          </button>
        )}
      </div>
    </aside>
  );
}

/* ─── home page matching exact reference design ──────────── */
function HomePage({ onToast, onNav, onOpenTracker, t }) {
  const [searchQuery, setSearchQuery]       = useState('');
  const [selectedState, setSelectedState]   = useState('Delhi NCR');
  const [recommendedSchemes, setRecommendedSchemes] = useState([]);
  const [loadingSchemes, setLoadingSchemes] = useState(false);

  /* Real backend integration hook: query backend if available, otherwise stay cleanly empty */
  useEffect(() => {
    let isMounted = true;
    async function fetchBackendSchemes() {
      try {
        setLoadingSchemes(true);
        const res = await fetch('http://localhost:8000/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: 'women empowerment schemes' })
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data?.results && Array.isArray(data.results)) {
            setRecommendedSchemes(data.results);
          } else if (isMounted && data?.recommendations && Array.isArray(data.recommendations)) {
            setRecommendedSchemes(data.recommendations);
          }
        }
      } catch (e) {
        // Backend not currently active - retain clean empty state without fake hardcoded items
      } finally {
        if (isMounted) setLoadingSchemes(false);
      }
    }
    fetchBackendSchemes();
    return () => { isMounted = false; };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    onToast(`Searching for "${q}"…`);
    setLoadingSchemes(true);
    fetch('http://localhost:8000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q, top_k: 5, state_filter: selectedState })
    })
      .then(res => res.json())
      .then(data => {
        if (data?.results && Array.isArray(data.results)) {
          setRecommendedSchemes(data.results.map(r => ({
            id: r.id || r.scheme_id || Math.random(),
            name: r.scheme_name || r.name || q,
            desc: r.details || r.brief || r.desc || 'Verified government scheme'
          })));
          onToast(`Found ${data.results.length} schemes.`);
        } else {
          onToast(`Search for "${q}" submitted.`);
        }
      })
      .catch(() => {
        onToast(`Query "${q}" submitted. Connect backend (localhost:8000) to view live results.`);
      })
      .finally(() => setLoadingSchemes(false));
  };

  /* Official verified 24/7 Pan-India National Emergency Helplines */
  const HELPLINES = [
    { name: 'Women Helpline', number: '181', raw: '181' },
    { name: 'Child Helpline', number: '1098', raw: '1098' },
    { name: 'Mental Health Helpline (KIRAN)', number: '1800 599 0019', raw: '18005990019' },
    { name: 'National Health Helpline', number: '1800 180 1104', raw: '18001801104' },
    { name: 'Cyber Crime Helpline', number: '1930', raw: '1930' }
  ];

  return (
    <div className="home-wrapper">
      {/* Wide Centered Search Bar matching user reference */}
      <form className="home-search-pill" onSubmit={handleSearchSubmit}>
        <Search size={18} className="home-search-icon"/>
        <input
          className="home-search-input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={t?.homeSearchPlaceholder || "Search for a scheme, service or how to get help..."}
        />
        <button type="submit" className="home-search-submit" title="Search">
          <ArrowRight size={17}/>
        </button>
      </form>

      {/* Top 3-Column Grid matching user reference */}
      <div className="home-trio-grid">
        {/* Column 1: Recommended for you */}
        <section className="home-white-card">
          <div className="home-card-header">
            <h3 className="home-card-title">{t?.homeRecTitle || "Recommended for you"}</h3>
            <p className="home-card-subtitle">{t?.homeRecSub || "Based on your location and profile"}</p>
          </div>

          {loadingSchemes ? (
            <div className="rec-scheme-empty">
              <Sparkles size={20} style={{ color: '#75233e' }}/>
              <strong style={{ fontSize: '13px', color: '#1e151a' }}>Loading schemes…</strong>
              <p style={{ fontSize: '11.5px', color: '#6e6268' }}>Querying backend database…</p>
            </div>
          ) : recommendedSchemes.length === 0 ? (
            <div className="rec-scheme-empty">
              <Sparkles size={24} style={{ color: '#75233e', opacity: 0.6 }}/>
              <strong style={{ fontSize: '13.5px', color: '#1e151a' }}>No schemes loaded yet</strong>
              <p style={{ fontSize: '11.5px', color: '#6e6268', maxWidth: '240px', lineHeight: 1.45 }}>
                Connect your backend API (localhost:8000) or search above to view personalized recommendations.
              </p>
            </div>
          ) : (
            <div className="rec-schemes-list">
              {recommendedSchemes.map(s => (
                <div
                  key={s.id || s.name}
                  className="rec-scheme-item"
                  onClick={() => onToast(`${s.name} details loaded.`)}
                >
                  <div className="rec-scheme-info">
                    <strong>{s.name}</strong>
                    <p>{s.desc}</p>
                  </div>
                  <ChevronRight size={16} className="rec-scheme-chevron"/>
                </div>
              ))}
            </div>
          )}

          <button className="rec-scheme-btn" onClick={() => onToast('Connect backend API to load scheme catalog.')}>
            {t?.homeViewAll || "View all schemes"} <ArrowRight size={14}/>
          </button>

          <button className="rec-track-link" onClick={onOpenTracker}>
            {t?.homeTrackApps || "Track your applications"}
          </button>
        </section>

        {/* Column 2: Nearby Support Services */}
        <section className="home-white-card">
          <div className="home-card-header row-between">
            <div>
              <h3 className="home-card-title">{t?.homeNearbyTitle || "Nearby Support Services"}</h3>
              <p className="home-card-subtitle">{t?.homeNearbySub || "Find verified centers near you"}</p>
            </div>
            <select
              value={selectedState}
              onChange={e => { setSelectedState(e.target.value); onToast(`Updated map for ${e.target.value}.`); }}
              className="nearby-state-select"
            >
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Karnataka">Karnataka</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>

          {/* Stylized Map Canvas matching user screenshot */}
          <div className="nearby-map-viewport">
            <svg className="nearby-map-canvas" viewBox="0 0 440 220" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="#f3efe8"/>
              {/* Park contours */}
              <path d="M 0,20 Q 50,0 90,40 L 100,100 Q 40,120 0,90 Z" fill="#dce9d8" opacity="0.85"/>
              <path d="M 280,0 Q 340,30 380,0 L 440,0 L 440,80 Q 360,60 300,90 Z" fill="#dce9d8" opacity="0.85"/>
              <path d="M 120,180 Q 200,150 240,220 L 100,220 Z" fill="#dce9d8" opacity="0.85"/>
              {/* River water path */}
              <path d="M 440,120 Q 320,130 260,160 T 220,220" fill="none" stroke="#cae4f7" strokeWidth="18" opacity="0.75"/>
              {/* Street road grid */}
              <path d="M 0,60 L 440,140 M 0,140 L 440,40 M 80,0 L 220,220 M 240,0 L 360,220 M 340,0 L 180,220 M 0,110 L 440,110" stroke="#ffffff" strokeWidth="4" opacity="0.95"/>
              <path d="M 0,60 L 440,140 M 0,140 L 440,40 M 80,0 L 220,220" stroke="#f6eccd" strokeWidth="2" opacity="0.6"/>
            </svg>

            {/* Pin Badges matching screenshot */}
            <div className="nearby-pin-badge" style={{ top: '35%', left: '46%' }} onClick={() => onToast('AIIMS Maternity & Trauma Center')}>
              <span className="pin-marker-icon"/>
              <span>AIIMS</span>
            </div>

            <div className="nearby-pin-badge" style={{ top: '48%', left: '72%' }} onClick={() => onToast("Delhi Police Women's Help Desk (1091)")}>
              <span className="pin-marker-icon"/>
              <span>Delhi Police Women's Help Desk</span>
            </div>

            <div className="nearby-pin-badge" style={{ top: '78%', left: '48%' }} onClick={() => onToast('Sakhi One Stop Center (Pandara Road)')}>
              <span className="pin-marker-icon"/>
              <span>Sakhi One Stop Center</span>
            </div>

            {/* Marker dots */}
            <span style={{ position: 'absolute', top: '24%', left: '68%', width: 7, height: 7, borderRadius: '50%', background: '#a2385c' }}/>
            <span style={{ position: 'absolute', top: '50%', left: '20%', width: 7, height: 7, borderRadius: '50%', background: '#a2385c' }}/>
            <span style={{ position: 'absolute', top: '78%', left: '18%', width: 7, height: 7, borderRadius: '50%', background: '#a2385c' }}/>
            <span style={{ position: 'absolute', top: '65%', left: '78%', width: 7, height: 7, borderRadius: '50%', background: '#a2385c' }}/>
          </div>

          <div className="nearby-map-footer">
            <span>3 verified centers in {selectedState}</span>
            <button className="nearby-view-link" onClick={() => onToast('Full regional map view loaded.')}>
              {t?.homeViewMap || "View on map"} <ArrowRight size={13}/>
            </button>
          </div>
        </section>

        {/* Column 3: Important Contacts */}
        <section className="home-white-card">
          <div className="home-card-header">
            <h3 className="home-card-title">{t?.homeContactsTitle || "Important Contacts"}</h3>
            <p className="home-card-subtitle">{t?.homeContactsSub || "Quick access to verified helplines"}</p>
          </div>

          <div className="helplines-list">
            {HELPLINES.map(h => (
              <div key={h.name} className="helpline-item">
                <div className="helpline-meta">
                  <strong>{h.name}</strong>
                  <span>{h.number}</span>
                </div>
                <a href={`tel:${h.raw}`} className="helpline-call-btn" title={`Call ${h.name}`}>
                  <Phone size={14}/>
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Full-Width Card: Explore Support Areas matching user reference */}
      <section className="explore-areas-card">
        <h3 className="home-card-title">{t?.homeExploreTitle || "Explore Support Areas"}</h3>
        <p className="home-card-subtitle">{t?.homeExploreSub || "Find schemes, services and information across key areas"}</p>

        <div className="explore-areas-grid">
          {/* Health */}
          <div className="explore-area-chip" onClick={() => onNav('health')}>
            <Heart size={20} className="explore-area-icon"/>
            <strong>Health</strong>
            <p>{t?.homeExpHealth || "Hospitals, insurance, maternal care and more"}</p>
          </div>

          {/* Wealth */}
          <div className="explore-area-chip" onClick={() => onNav('wealth')}>
            <Award size={20} className="explore-area-icon"/>
            <strong>Wealth</strong>
            <p>{t?.homeExpWealth || "Savings, pensions, benefits and insurance"}</p>
          </div>

          {/* Livelihood */}
          <div className="explore-area-chip" onClick={() => onNav('livelihood')}>
            <BriefcaseBusiness size={20} className="explore-area-icon"/>
            <strong>Livelihood</strong>
            <p>{t?.homeExpLivelihood || "Jobs, skill training and entrepreneurship"}</p>
          </div>

          {/* Finance */}
          <div className="explore-area-chip" onClick={() => onNav('finance')}>
            <Sliders size={20} className="explore-area-icon"/>
            <strong>Finance</strong>
            <p>{t?.homeExpFinance || "Loans, scholarships and financial support"}</p>
          </div>

          {/* Safety */}
          <div className="explore-area-chip" onClick={() => onNav('safety')}>
            <ShieldAlert size={20} className="explore-area-icon"/>
            <strong>Safety</strong>
            <p>{t?.homeExpSafety || "Emergency help, legal aid and crisis support"}</p>
          </div>

          {/* Rights */}
          <div className="explore-area-chip" onClick={() => onNav('rights')}>
            <FileText size={20} className="explore-area-icon"/>
            <strong>Rights</strong>
            <p>{t?.homeExpRights || "Know your rights and access legal resources"}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── health page matching exact reference design ───────── */
function HealthPage({ onGuide, onSub, onOpenScanner, onToast, onOpenTracker, t }) {
  // Column 1: Verified Schemes Search & List
  const [schemeQuery, setSchemeQuery] = useState('');

  // 3 Verified government schemes matching screenshot (localized if available)
  const defaultSchemes = [
    {
      id: 'pmjay',
      name: 'Ayushman Bharat (PM-JAY)',
      desc: 'Free health coverage up to ₹5 lakh per family per year.',
    },
    {
      id: 'jsy',
      name: 'Janani Suraksha Yojana',
      desc: 'Financial support for safe delivery and maternal care.',
    },
    {
      id: 'pmmvy',
      name: 'Pradhan Mantri Matru Vandana Yojana',
      desc: 'Cash incentive for pregnancy and lactating mothers.',
    }
  ];

  const healthSchemes = t?.healthSchemes || defaultSchemes;

  const filteredSchemes = healthSchemes.filter(s =>
    !schemeQuery.trim() ||
    s.name.toLowerCase().includes(schemeQuery.toLowerCase()) ||
    s.desc.toLowerCase().includes(schemeQuery.toLowerCase())
  );

  // Column 2: Period & Wellness Suite
  const [activeTab, setActiveTab] = useState('cycle'); // 'cycle' | 'flow' | 'symptoms' | 'mood'
  const [selectedFlow, setSelectedFlow] = useState('Medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Cramps']);
  const [selectedMood, setSelectedMood] = useState('Calm');

  // Column 3: Medication Schedule & Cabinet
  const [medTab, setMedTab] = useState('medicine'); // 'medicine' | 'cabinet'
  const [meds, setMeds] = useState([]);
  const [showAddMed, setShowAddMed] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newMedTiming, setNewMedTiming] = useState('');
  const [newMedSchedule, setNewMedSchedule] = useState('');
  const [newMedExpiry, setNewMedExpiry] = useState('');
  const [openKebabId, setOpenKebabId] = useState(null);

  const addMed = (e) => {
    e.preventDefault();
    if (!newMedName.trim()) return;
    const item = {
      id: Date.now(),
      name: newMedName.trim(),
      timing: newMedTiming.trim() || 'Daily after food',
      schedule: newMedSchedule.trim() || 'Morning • 1 tablet',
      expiry: newMedExpiry.trim() ? `Exp: ${newMedExpiry.trim()}` : 'Exp: 15 Oct 2028',
      status: 'Active'
    };
    setMeds([...meds, item]);
    setNewMedName('');
    setNewMedTiming('');
    setNewMedSchedule('');
    setNewMedExpiry('');
    setShowAddMed(false);
    onToast(`${item.name} added to medication schedule.`);
  };

  const removeMed = (id, name) => {
    setMeds(meds.filter(m => m.id !== id));
    setOpenKebabId(null);
    onToast(`${name} removed from schedule.`);
  };

  return (
    <div className="health-wrapper">
      <div className="health-trio-grid">
        {/* Column 1: Verified Schemes */}
        <section className="health-white-card">
          <span className="health-kicker">{t?.healthKickerRec || '# RECOMMENDED FOR YOU'}</span>
          <h3 className="health-card-title">{t?.healthVerifiedSchemesTitle || 'Verified Schemes'}</h3>
          <p className="health-card-subtitle">
            {t?.healthVerifiedSchemesSub || 'Government programs matching your location & requirements.'}
          </p>

          <div className="health-scheme-search">
            <Search size={14} style={{ color: '#887d82' }}/>
            <input
              value={schemeQuery}
              onChange={e => setSchemeQuery(e.target.value)}
              placeholder={t?.healthSearchPlaceholder || "Search by keyword or scheme"}
            />
          </div>

          <div className="health-schemes-list">
            {filteredSchemes.map(s => (
              <div
                key={s.id}
                className="health-scheme-item"
                onClick={() => onToast(`${s.name} guidelines loaded.`)}
              >
                <div className="health-scheme-info">
                  <strong>{s.name}</strong>
                  <p>{s.desc}</p>
                </div>
                <ChevronRight size={16} className="health-scheme-chevron"/>
              </div>
            ))}
            {filteredSchemes.length === 0 && (
              <p className="muted small" style={{ textAlign: 'center', padding: '16px 0' }}>
                No schemes matched "{schemeQuery}".
              </p>
            )}
          </div>

          <button
            className="health-dark-btn"
            onClick={() => onToast('Launching eligibility pre-screening check…')}
          >
            {t?.healthCheckEligibility || 'Check Eligibility'} <ArrowRight size={14}/>
          </button>

          <button
            className="health-track-link"
            onClick={onOpenTracker}
          >
            <Clock size={12}/> {t?.healthTrackApps || 'Track submitted applications'}
          </button>
        </section>

        {/* Column 2: Period & Wellness Suite */}
        <section className="health-white-card">
          {/* Notification Banner */}
          <div className="health-period-alert" onClick={onSub}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="health-calendar-badge">
                <Calendar size={15}/>
              </div>
              <span className="health-alert-text">
                {t?.healthPeriodAlert || 'Your period may start in 2 days. Log how you are feeling?'}
              </span>
            </div>
            <ChevronRight size={15} style={{ color: '#9b3756', flexShrink: 0 }}/>
          </div>

          <span className="health-kicker">{t?.healthCycleKicker || 'CYCLE & SYMPTOM TRACKING'}</span>
          <h3 className="health-card-title">{t?.healthPeriodSuiteTitle || 'Period & Wellness Suite'}</h3>
          <p className="health-card-subtitle">
            {t?.healthPeriodSuiteSub || 'Log daily flow, moods, cramps, and symptoms. View 6-month cycle length trends.'}
          </p>

          {/* 4 Segmented Tabs */}
          <div className="health-tabs-row">
            {[
              { id: 'cycle', label: t?.healthTabs?.cycle || 'Cycle Length' },
              { id: 'flow', label: t?.healthTabs?.flow || 'Flow Intensity' },
              { id: 'symptoms', label: t?.healthTabs?.symptoms || 'Symptoms' },
              { id: 'mood', label: t?.healthTabs?.mood || 'Mood' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`health-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Cycle Length Chart View */}
          {activeTab === 'cycle' && (
            <div className="health-chart-container">
              <div className="health-chart-header">
                <span style={{ fontWeight: 600, color: '#2b2126' }}>{t?.healthCycleHeader || 'Cycle length (days)'}</span>
                <span style={{ color: '#6d6268', fontSize: '11.5px' }}>{t?.healthCycleAvg || 'Average: 28 days'}</span>
              </div>

              {/* Exact SVG chart recreation matching the user's reference image */}
              <svg viewBox="0 0 460 180" className="health-chart-svg" preserveAspectRatio="xMidYMid meet">
                {/* Horizontal grid lines & Y labels */}
                {[
                  { label: '40', y: 25 },
                  { label: '35', y: 55 },
                  { label: '30', y: 85 },
                  { label: '25', y: 115 },
                  { label: '20', y: 145 },
                ].map((g, idx) => (
                  <g key={g.label}>
                    <text x="22" y={g.y + 4} textAnchor="end" fontSize="10.5" fill="#8d8187" fontWeight="500">
                      {g.label}
                    </text>
                    <line
                      x1="34"
                      y1={g.y}
                      x2="445"
                      y2={g.y}
                      stroke="#f1eaee"
                      strokeWidth="1"
                      strokeDasharray={idx === 4 ? 'none' : '3 3'}
                    />
                  </g>
                ))}

                {/* Smooth Berry Trend Curve */}
                <path
                  d="M 55 97 C 92 97, 92 91, 129 91 C 166 91, 166 103, 203 103 C 240 103, 240 97, 277 97 C 314 97, 314 97, 351 97 C 388 97, 388 91, 425 91"
                  fill="none"
                  stroke="#9b3756"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />

                {/* Subtle soft gradient area beneath curve */}
                <path
                  d="M 55 97 C 92 97, 92 91, 129 91 C 166 91, 166 103, 203 103 C 240 103, 240 97, 277 97 C 314 97, 314 97, 351 97 C 388 97, 388 91, 425 91 L 425 145 L 55 145 Z"
                  fill="rgba(155, 55, 86, 0.04)"
                />

                {/* 6 Monthly Data Points matching reference */}
                {[
                  { month: 'Apr', val: 28, x: 55, y: 97 },
                  { month: 'May', val: 29, x: 129, y: 91 },
                  { month: 'Jun', val: 27, x: 203, y: 103 },
                  { month: 'Jul', val: 28, x: 277, y: 97 },
                  { month: 'Aug', val: 28, x: 351, y: 97 },
                  { month: 'Sep', val: 29, x: 425, y: 91 },
                ].map(p => (
                  <g key={p.month}>
                    {/* Value label above dot */}
                    <text
                      x={p.x}
                      y={p.y - 9}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="#1e151a"
                    >
                      {p.val}
                    </text>
                    {/* Dot */}
                    <circle cx={p.x} cy={p.y} r="3.8" fill="#9b3756" />
                    {/* Month Label below */}
                    <text
                      x={p.x}
                      y="166"
                      textAnchor="middle"
                      fontSize="11"
                      fill="#73686e"
                      fontWeight="500"
                    >
                      {p.month}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          )}

          {/* Tab 2: Flow Intensity */}
          {activeTab === 'flow' && (
            <div className="health-tab-content">
              <span className="health-sublabel">{t?.healthFlowSublabel || "Select today's flow intensity"}</span>
              <div className="flow-chips-grid">
                {['Spotting', 'Light', 'Medium', 'Heavy'].map(flowKey => {
                  const opt = t?.healthFlowOpts?.[flowKey] || {
                    label: flowKey,
                    desc: flowKey === 'Spotting' ? 'Barely visible' : flowKey === 'Heavy' ? 'High absorbency' : 'Standard flow'
                  };
                  return (
                    <button
                      key={flowKey}
                      className={`flow-chip-card ${selectedFlow === flowKey ? 'selected' : ''}`}
                      onClick={() => { setSelectedFlow(flowKey); onToast(`Logged today's flow: ${opt.label}`); }}
                    >
                      <span style={{ fontSize: '18px' }}>🩸</span>
                      <strong>{opt.label}</strong>
                      <small style={{ color: '#776d72', fontSize: '11px' }}>
                        {opt.desc}
                      </small>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Symptoms */}
          {activeTab === 'symptoms' && (
            <div className="health-tab-content">
              <span className="health-sublabel">{t?.healthSymptomsSublabel || 'Log daily symptoms'}</span>
              <div className="symptom-tag-cloud">
                {(t?.healthSymptoms || ['Cramps', 'Headache', 'Fatigue', 'Bloating', 'Tender Breasts', 'Back Pain', 'Acne']).map((sym, idx) => {
                  const has = selectedSymptoms.includes(sym) || selectedSymptoms.includes(idx);
                  return (
                    <button
                      key={sym}
                      className={`symptom-tag ${has ? 'active' : ''}`}
                      onClick={() => {
                        const next = has ? selectedSymptoms.filter(s => s !== sym && s !== idx) : [...selectedSymptoms, sym];
                        setSelectedSymptoms(next);
                        onToast(`${has ? 'Removed' : 'Logged'} symptom: ${sym}`);
                      }}
                    >
                      {sym} {has && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: Mood */}
          {activeTab === 'mood' && (
            <div className="health-tab-content">
              <span className="health-sublabel">{t?.healthMoodSublabel || 'How are you feeling today?'}</span>
              <div className="mood-tag-cloud">
                {(t?.healthMoods || [
                  ['Calm', '😌'], ['Happy', '😊'], ['Anxious', '😰'],
                  ['Irritable', '😤'], ['Low Energy', '🥱'], ['Sensitive', '🥺']
                ]).map(([mood, emoji]) => (
                  <button
                    key={mood}
                    className={`mood-tag ${selectedMood === mood ? 'active' : ''}`}
                    onClick={() => { setSelectedMood(mood); onToast(`Mood logged: ${mood}`); }}
                  >
                    <span>{emoji}</span> {mood}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Open complete tracker link */}
          <button className="health-open-tracker-btn" onClick={onSub}>
            {t?.healthOpenTracker || 'Open complete tracker'} <ArrowRight size={14}/>
          </button>
        </section>

        {/* Column 3: Medication Schedule & Emergency Guide */}
        <div className="health-col-right">
          {/* Card 1: Medication Schedule */}
          <section className="health-white-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="health-kicker">{t?.healthMedScheduleKicker || 'MEDICATION SCHEDULE'}</span>
              <div className="med-header-actions">
                <button
                  className="med-pill-btn"
                  onClick={onOpenScanner}
                  title="Scan package QR code"
                >
                  <QrCode size={13}/> {t?.healthScanQr || 'Scan QR'}
                </button>
                <button
                  className="med-pill-btn"
                  onClick={() => setShowAddMed(v => !v)}
                  title="Add new medication"
                >
                  <Plus size={13}/> {t?.healthAddMed || 'Add'}
                </button>
              </div>
            </div>

            {/* Medicine vs Cabinet Tabs */}
            <div className="med-tabs">
              <button
                className={`med-tab ${medTab === 'medicine' ? 'active' : ''}`}
                onClick={() => setMedTab('medicine')}
              >
                {t?.healthMedTabMedicine || 'Medicine'}
              </button>
              <button
                className={`med-tab ${medTab === 'cabinet' ? 'active' : ''}`}
                onClick={() => setMedTab('cabinet')}
              >
                {t?.healthMedTabCabinet || 'Cabinet'}
              </button>
            </div>

            {/* Add Medication inline form */}
            {showAddMed && (
              <form className="med-add-form" onSubmit={addMed}>
                <input
                  placeholder="Medicine name (e.g. Paracetamol)"
                  value={newMedName}
                  onChange={e => setNewMedName(e.target.value)}
                  required
                />
                <input
                  placeholder="Timing (e.g. Daily after breakfast)"
                  value={newMedTiming}
                  onChange={e => setNewMedTiming(e.target.value)}
                />
                <input
                  placeholder="Schedule & Dose (e.g. 9:00 AM • 1 tablet)"
                  value={newMedSchedule}
                  onChange={e => setNewMedSchedule(e.target.value)}
                />
                <input
                  placeholder="Expiry (e.g. 15 Oct 2028)"
                  value={newMedExpiry}
                  onChange={e => setNewMedExpiry(e.target.value)}
                />
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <button type="submit" className="solid-btn small full">Save Medicine</button>
                  <button type="button" className="link-btn small" onClick={() => setShowAddMed(false)}>Cancel</button>
                </div>
              </form>
            )}

            {/* Active Medications List */}
            {medTab === 'medicine' ? (
              <div className="med-list-container">
                {meds.length === 0 ? (
                  <div className="rec-scheme-empty" style={{ margin: '14px 0', padding: '24px 16px', background: 'rgba(255,255,255,0.6)', borderRadius: 14 }}>
                    <Sparkles size={24} style={{ color: '#75233e', opacity: 0.7, marginBottom: 8 }}/>
                    <strong style={{ fontSize: '13.5px', color: '#1e151a' }}>{t?.healthNoMedsTitle || 'No medications scheduled'}</strong>
                    <p style={{ fontSize: '11.5px', color: '#6e6268', maxWidth: '240px', margin: '4px auto 0', lineHeight: 1.45 }}>
                      {t?.healthNoMedsDesc || 'Tap "+ Add" or "Scan QR" above to log your daily prescriptions.'}
                    </p>
                  </div>
                ) : (
                  meds.map(m => (
                    <div key={m.id} className="med-item-card">
                      <div className="med-top-row">
                        <strong className="med-name">{m.name}</strong>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span className="med-active-badge">{m.status}</span>
                          <div style={{ position: 'relative' }}>
                            <button
                              className="med-kebab-btn"
                              onClick={() => setOpenKebabId(openKebabId === m.id ? null : m.id)}
                              title="Options"
                            >
                              <MoreVertical size={14}/>
                            </button>
                            {openKebabId === m.id && (
                              <div className="med-popover-menu">
                                <button onClick={() => removeMed(m.id, m.name)}>Remove</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="med-subtext">{m.timing}</p>
                      <div className="med-meta-row">
                        <Clock size={11} style={{ color: '#776d72' }}/>
                        <span>{m.schedule}</span>
                      </div>
                      <p className="med-exp-text">{m.expiry}</p>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="cabinet-inventory-view">
                <div className="rec-scheme-empty" style={{ margin: '14px 0', padding: '24px 16px', background: 'rgba(255,255,255,0.6)', borderRadius: 14 }}>
                  <BookOpen size={24} style={{ color: '#75233e', opacity: 0.7, marginBottom: 8 }}/>
                  <strong style={{ fontSize: '13.5px', color: '#1e151a' }}>{t?.healthCabinetEmptyTitle || 'Medicine cabinet is empty'}</strong>
                  <p style={{ fontSize: '11.5px', color: '#6e6268', maxWidth: '240px', margin: '4px auto 0', lineHeight: 1.45 }}>
                    {t?.healthCabinetEmptyDesc || 'Scan packaging QR code to automatically register first-aid items and track expiration.'}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Card 2: Emergency Reference */}
          <section className="health-white-card">
            <span className="health-kicker-red">{t?.healthEmergencyKicker || 'EMERGENCY REFERENCE'}</span>
            <div className="firstaid-tile" onClick={() => onGuide('first-aid')}>
              <div className="firstaid-info">
                <div className="firstaid-icon-wrap">
                  <FileText size={20}/>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '13.5px', color: '#1e151a' }}>
                    {t?.healthFirstAidTitle || 'First-Aid Emergency Guide'}
                  </strong>
                  <small style={{ color: '#776d72', fontSize: '11.5px' }}>
                    {t?.healthFirstAidSub || 'Quick steps for burns, fainting, CPR, and trauma.'}
                  </small>
                </div>
              </div>
              <ChevronRight size={16} style={{ color: '#887d82' }}/>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ─── wealth page with 3-column layout matching reference ─ */
const WEALTH_SCHEMES = [
  {
    id: 'pmjdy',
    name: 'PM Jan Dhan Yojana',
    subtitle: 'Zero-balance bank accounts with RuPay card and benefits.',
    agency: 'Ministry of Finance, Govt of India',
    benefit: 'Zero balance savings, ₹2 Lakh accidental insurance cover, free RuPay debit card, and ₹10,000 overdraft facility.',
    eligibility: 'Indian citizens aged 10+ without an existing basic banking account.',
    documents: 'Aadhaar Card, Voter ID, or NREGA job card with 2 passport photographs.',
    goal: 'savings'
  },
  {
    id: 'apy',
    name: 'Atal Pension Yojana (APY)',
    subtitle: 'Secure your future with guaranteed pension.',
    agency: 'PFRDA / Ministry of Finance',
    benefit: 'Guaranteed lifelong monthly pension of ₹1,000 to ₹5,000 upon reaching age 60, with continuous pension to spouse.',
    eligibility: 'Indian citizens aged 18–40 years holding a savings bank or post office account.',
    documents: 'Savings account number, Aadhaar number, and active mobile number.',
    goal: 'invest'
  },
  {
    id: 'mudra',
    name: 'PM Mudra Yojana',
    subtitle: 'Collateral-free loans for small businesses.',
    agency: 'MUDRA / Department of Financial Services',
    benefit: 'Collateral-free loans up to ₹50,000 (Shishu), ₹50,000–₹5 Lakh (Kishore), and ₹5–₹10 Lakh (Tarun) at low interest rates.',
    eligibility: 'Non-corporate, non-farm small/micro enterprises and self-employed women.',
    documents: 'Business registration/Udyam certificate, 6 months bank statement, PAN & Aadhaar.',
    goal: 'business'
  },
  {
    id: 'sukanya',
    name: 'Sukanya Samriddhi Yojana',
    subtitle: "Long-term savings for the girl child's education.",
    agency: 'National Savings Institute / Ministry of Finance',
    benefit: 'Government-backed 8.2% tax-free annual compound interest, triple tax exemption (EEE under Sec 80C), 21-year maturity.',
    eligibility: 'Parents or legal guardians of a girl child aged under 10 years (maximum 2 accounts per family).',
    documents: 'Birth certificate of the child, parent/guardian Aadhaar and PAN card, initial deposit (min ₹250).',
    goal: 'education'
  }
];

function WealthPage({ applications = [], onGuide, onToast, onNav, onOpenTracker, t }) {
  const [keyword, setKeyword] = useState('');
  const [savedSchemes, setSavedSchemes] = useState(() => {
    try {
      const stored = localStorage.getItem('unnati-saved-schemes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [deadlines] = useState([]); // Zero fake data, empty for backend integration
  const [notes, setNotes] = useState(() => {
    try {
      const stored = localStorage.getItem('unnati-personal-notes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [activeGoalFilter, setActiveGoalFilter] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const toggleSaveScheme = (schemeId) => {
    let updated;
    if (savedSchemes.includes(schemeId)) {
      updated = savedSchemes.filter(id => id !== schemeId);
      onToast('Removed scheme from saved list.');
    } else {
      updated = [...savedSchemes, schemeId];
      onToast('Scheme saved to your Financial Snapshot.');
    }
    setSavedSchemes(updated);
    try {
      localStorage.setItem('unnati-saved-schemes', JSON.stringify(updated));
    } catch {}
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const noteObj = {
      id: Date.now(),
      text: newNoteText.trim(),
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const updated = [noteObj, ...notes];
    setNotes(updated);
    setNewNoteText('');
    try {
      localStorage.setItem('unnati-personal-notes', JSON.stringify(updated));
    } catch {}
    onToast('Personal financial note saved.');
  };

  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    try {
      localStorage.setItem('unnati-personal-notes', JSON.stringify(updated));
    } catch {}
    onToast('Note deleted.');
  };

  // Filter schemes based on search keyword and goal filter
  const filteredSchemes = WEALTH_SCHEMES.filter(s => {
    const matchesKeyword = !keyword.trim() || 
      s.name.toLowerCase().includes(keyword.toLowerCase()) || 
      s.subtitle.toLowerCase().includes(keyword.toLowerCase());
    const matchesGoal = !activeGoalFilter || s.goal === activeGoalFilter;
    return matchesKeyword && matchesGoal;
  });

  const GOAL_CARDS = [
    { id: 'business', title: 'Start a Business', desc: 'Loans, training and subsidies', icon: <BriefcaseBusiness size={18}/> },
    { id: 'savings', title: 'Build Savings', desc: 'Recurring deposits, savings schemes', icon: <PiggyBank size={18}/> },
    { id: 'insured', title: 'Get Insured', desc: 'Health, life and asset protection', icon: <Heart size={18}/> },
    { id: 'invest', title: 'Invest for the Future', desc: 'Government-backed investment schemes', icon: <TrendingUp size={18}/> },
    { id: 'education', title: 'Fund Education', desc: 'Scholarships and education loans', icon: <GraduationCap size={18}/> },
    { id: 'home', title: 'Own a Home', desc: 'Home loans and housing support', icon: <Home size={18}/> }
  ];

  return (
    <div className="wealth-wrapper">
      <div className="wealth-trio-grid">
        {/* Column 1: Recommended Financial Schemes */}
        <section className="wealth-white-card">
          <span className="wealth-kicker-red"><Sparkles size={12} style={{ color: '#9b3756', marginRight: 4 }}/> RECOMMENDED FOR YOU</span>
          <h3 className="wealth-section-title">{t?.wealthSchemesTitle || "Financial Schemes"}</h3>
          <p className="wealth-section-subtitle">{t?.wealthSchemesSub || "Based on your location and profile."}</p>

          <div className="wealth-scheme-search">
            <Search size={14} style={{ color: '#9e9198' }}/>
            <input
              type="text"
              placeholder={t?.wealthSearchPlaceholder || "Search by keyword or scheme"}
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
            {keyword && (
              <button 
                type="button" 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#9e9198' }}
                onClick={() => setKeyword('')}
              >
                <X size={13}/>
              </button>
            )}
          </div>

          <div className="wealth-scheme-list">
            {filteredSchemes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 10px', color: '#776d72', fontSize: '12px' }}>
                No schemes found matching "{keyword}".
                <button 
                  style={{ display: 'block', margin: '8px auto 0', background: 'none', border: 'none', color: '#9b3756', fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => { setKeyword(''); setActiveGoalFilter(null); }}
                >
                  {t?.wealthResetFilters || "Reset filters"}
                </button>
              </div>
            ) : (
              filteredSchemes.map(scheme => (
                <div
                  key={scheme.id}
                  className="wealth-scheme-item"
                  onClick={() => setSelectedScheme(scheme)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="wealth-scheme-item-info">
                    <strong>{scheme.name}</strong>
                    <small>{scheme.subtitle}</small>
                  </div>
                  <ChevronRight size={16} style={{ color: '#887d82', flexShrink: 0 }}/>
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              type="button"
              className="wealth-view-all-btn"
              onClick={() => {
                setKeyword('');
                setActiveGoalFilter(null);
                onToast('Showing all recommended schemes.');
              }}
            >
              {t?.wealthViewAll || "View all schemes"} <ArrowRight size={14}/>
            </button>

            <button
              type="button"
              className="wealth-track-link"
              onClick={onOpenTracker}
            >
              <Clock size={13}/> {t?.wealthTrackApps || "Track your applications"}
            </button>
          </div>
        </section>

        {/* Column 2: Hero Banner & Explore by Goal */}
        <div className="wealth-col-center">
          {/* Top Hero Banner */}
          <section className="wealth-hero-card">
            <div className="wealth-hero-text">
              <span className="wealth-hero-kicker">{t?.wealthHeroKicker || "BUILD A BRIGHTER TOMORROW"}</span>
              <h2 className="wealth-hero-title">
                {t?.wealthHeroTitle || "Small steps,"}<br/>{t?.wealthHeroTitle2 || "big financial freedom."}
              </h2>
              <p className="wealth-hero-desc">
                {t?.wealthHeroDesc || "Explore savings, loans, insurance and investment schemes made for you."}
              </p>
              <button
                type="button"
                className="wealth-hero-btn"
                onClick={() => {
                  onToast('Explore by Goal activated below.');
                  const el = document.getElementById('explore-by-goal');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t?.wealthStartExplore || "Start exploring"} <ArrowRight size={13}/>
              </button>
            </div>

            {/* Sprout Illustration */}
            <div className="wealth-hero-illo">
              <svg width="140" height="140" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45 145 C48 115, 60 85, 95 38" stroke="#8d4b62" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M95 38 C90 20, 110 18, 115 32 C118 45, 102 48, 95 38 Z" fill="rgba(192, 43, 84, 0.18)" stroke="#8d4b62" strokeWidth="1.5"/>
                <path d="M72 75 C85 70, 108 72, 125 65 C132 80, 115 95, 95 85 C85 80, 78 78, 72 75 Z" fill="rgba(192, 43, 84, 0.22)" stroke="#8d4b62" strokeWidth="1.5"/>
                <path d="M72 75 C95 78, 118 72, 125 65" stroke="#8d4b62" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M58 98 C42 92, 25 96, 12 108 C10 122, 28 130, 48 118 C55 113, 58 105, 58 98 Z" fill="rgba(192, 43, 84, 0.18)" stroke="#8d4b62" strokeWidth="1.5"/>
                <path d="M58 98 C38 104, 22 112, 12 108" stroke="#8d4b62" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M52 118 C65 115, 88 118, 102 128 C95 140, 78 145, 62 135 C56 130, 53 124, 52 118 Z" fill="rgba(192, 43, 84, 0.15)" stroke="#8d4b62" strokeWidth="1.5"/>
                <path d="M52 118 C72 122, 92 126, 102 128" stroke="#8d4b62" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <div className="wealth-illo-words">
                <span>{t?.wealthPlan || "Plan"}</span>
                <span>{t?.wealthSave || "Save"}</span>
                <span>{t?.wealthGrow || "Grow"}</span>
              </div>
            </div>
          </section>

          {/* Bottom Explore by Goal Card */}
          <section className="wealth-white-card" id="explore-by-goal">
            <div className="wealth-goals-head">
              <h3 className="wealth-section-title" style={{ margin: 0 }}>{t?.wealthExploreGoalTitle || "Explore by Goal"}</h3>
              <button
                type="button"
                onClick={() => {
                  setActiveGoalFilter(null);
                  setKeyword('');
                  onToast('Viewing all categories.');
                }}
              >
                {t?.wealthViewAllGoals || "View all"} <ArrowRight size={12}/>
              </button>
            </div>
            <p className="wealth-section-subtitle">{t?.wealthExploreGoalSub || "Find the right schemes and tools for your needs."}</p>

            <div className="wealth-goals-grid">
              {GOAL_CARDS.map(g => (
                <div
                  key={g.id}
                  className="wealth-goal-item"
                  style={{
                    borderColor: activeGoalFilter === g.id ? '#9b3756' : undefined,
                    background: activeGoalFilter === g.id ? '#fdf4f7' : undefined
                  }}
                  onClick={() => {
                    const next = activeGoalFilter === g.id ? null : g.id;
                    setActiveGoalFilter(next);
                    onToast(next ? `Filtered for ${g.title}.` : 'Cleared goal filter.');
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="wealth-goal-icon">{g.icon}</div>
                  <strong>{g.title}</strong>
                  <p>{g.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Column 3: Snapshot & Need Help matching media_1788941438603.png */}
        <div className="wealth-col-right">
          {/* Top Card: Your Financial Snapshot */}
          <section className="wealth-white-card">
            <h3 className="wealth-section-title" style={{ margin: 0 }}>{t?.wealthSnapshotTitle || "Your Financial Snapshot"}</h3>
            <p className="wealth-section-subtitle" style={{ margin: '4px 0 16px 0' }}>Track and manage your progress.</p>

            <div className="snapshot-rows-list">
              {/* Row 1: Saved Schemes */}
              <div
                className="snapshot-row"
                onClick={() => {
                  if (savedSchemes.length === 0) {
                    onToast('No schemes saved yet. Click any scheme on the left to save it.');
                  } else {
                    onToast(`You have ${savedSchemes.length} saved schemes.`);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="snapshot-left">
                  <div className="snapshot-icon">
                    <Bookmark size={18}/>
                  </div>
                  <div className="snapshot-info">
                    <strong>{t?.wealthSavedSchemes || "Saved Schemes"}</strong>
                    <small>{savedSchemes.length === 0 ? '0 schemes' : `${savedSchemes.length} scheme${savedSchemes.length > 1 ? 's' : ''}`}</small>
                  </div>
                </div>
                <ChevronRight size={15} style={{ color: '#887d82' }}/>
              </div>

              {/* Row 2: Applications */}
              <div
                className="snapshot-row"
                onClick={onOpenTracker}
                role="button"
                tabIndex={0}
              >
                <div className="snapshot-left">
                  <div className="snapshot-icon">
                    <FileText size={18}/>
                  </div>
                  <div className="snapshot-info">
                    <strong>{t?.wealthApplications || "Applications"}</strong>
                    <small>{applications.length === 0 ? '0 in progress' : `${applications.length} in progress`}</small>
                  </div>
                </div>
                <ChevronRight size={15} style={{ color: '#887d82' }}/>
              </div>

              {/* Row 3: Upcoming Deadlines */}
              <div
                className="snapshot-row"
                onClick={() => onToast('No upcoming scheme deadlines scheduled.')}
                role="button"
                tabIndex={0}
              >
                <div className="snapshot-left">
                  <div className="snapshot-icon">
                    <Calendar size={18}/>
                  </div>
                  <div className="snapshot-info">
                    <strong>{t?.wealthDeadlines || "Upcoming Deadlines"}</strong>
                    <small>{deadlines.length ? `${deadlines.length} this month` : '0 this month'}</small>
                  </div>
                </div>
                <ChevronRight size={15} style={{ color: '#887d82' }}/>
              </div>

              {/* Row 4: Personal Notes */}
              <div
                className="snapshot-row"
                onClick={() => setShowNotesModal(true)}
                role="button"
                tabIndex={0}
              >
                <div className="snapshot-left">
                  <div className="snapshot-icon">
                    <Edit3 size={18}/>
                  </div>
                  <div className="snapshot-info">
                    <strong>{t?.wealthNotes || "Personal Notes"}</strong>
                    <small>{notes.length ? `${notes.length} note${notes.length > 1 ? 's' : ''}` : 'Your saved information'}</small>
                  </div>
                </div>
                <ChevronRight size={15} style={{ color: '#887d82' }}/>
              </div>
            </div>
          </section>

          {/* Bottom Card: Need Help? */}
          <section className="wealth-white-card">
            <h3 className="wealth-section-title" style={{ margin: 0 }}>{t?.wealthNeedHelpTitle || "Need Help?"}</h3>
            <p className="wealth-section-subtitle" style={{ margin: '4px 0 16px 0' }}>Get guidance from verified experts or helplines.</p>

            <div className="wealth-help-list">
              {/* Help Item 1 */}
              <a
                href="tel:1800114000"
                className="wealth-help-row"
                onClick={e => { e.preventDefault(); onToast('Calling Financial Helpline 1800 11 4000…'); }}
              >
                <div className="wealth-help-left">
                  <div className="wealth-help-icon">
                    <Phone size={17}/>
                  </div>
                  <div className="wealth-help-info">
                    <strong>{t?.wealthHelpHelpline || "Talk to a Financial Helpline"}</strong>
                    <small>1800 11 4000</small>
                  </div>
                </div>
                <ChevronRight size={15} style={{ color: '#887d82' }}/>
              </a>

              {/* Help Item 2 */}
              <div
                className="wealth-help-row"
                onClick={() => onToast('Ask Unnati AI assistant for financial guidance.')}
                role="button"
                tabIndex={0}
              >
                <div className="wealth-help-left">
                  <div className="wealth-help-icon">
                    <MessageSquare size={17}/>
                  </div>
                  <div className="wealth-help-info">
                    <strong>{t?.wealthHelpAsk || "Ask Unnati"}</strong>
                    <small>{t?.wealthHelpAskSub || "Get step-by-step guidance"}</small>
                  </div>
                </div>
                <ChevronRight size={15} style={{ color: '#887d82' }}/>
              </div>

              {/* Help Item 3: Financial Literacy Guide highlight card */}
              <div
                className="wealth-guide-highlight-card"
                onClick={() => onGuide ? onGuide('financial_literacy') : onToast('Opening Financial Literacy Guide…')}
                role="button"
                tabIndex={0}
              >
                <div className="wealth-help-left">
                  <div className="wealth-guide-icon">
                    <BookOpen size={18}/>
                  </div>
                  <div className="wealth-help-info">
                    <strong style={{ color: '#75233e' }}>Financial Literacy Guide</strong>
                    <small style={{ color: '#6e6268', fontSize: '11px', lineHeight: 1.35 }}>
                      {t?.wealthHelpGuideSub || "Learn the basics of banking, saving, investing and avoiding fraud."}
                    </small>
                  </div>
                </div>
                <ChevronRight size={15} style={{ color: '#887d82', flexShrink: 0 }}/>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <div className="modal-bg" onClick={() => setSelectedScheme(null)}>
          <div className="app-tracker-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <button className="modal-close" onClick={() => setSelectedScheme(null)}><X size={16}/></button>
            <p className="kicker" style={{ color: '#9b3756', fontWeight: 700, fontSize: '11px', letterSpacing: '0.05em' }}>
              {selectedScheme.agency}
            </p>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e151a', margin: '4px 0 6px' }}>
              {selectedScheme.name}
            </h2>
            <p className="muted small" style={{ marginBottom: 16 }}>{selectedScheme.subtitle}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#fdf7f9', padding: '12px 14px', borderRadius: 12, border: '1px solid #f6e6ec' }}>
                <strong style={{ display: 'block', fontSize: '12px', color: '#9b3756', marginBottom: 4, textTransform: 'uppercase' }}>
                  Benefit Overview
                </strong>
                <p style={{ fontSize: '13px', color: '#271d22', margin: 0, lineHeight: 1.45 }}>{selectedScheme.benefit}</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 4, textTransform: 'uppercase' }}>
                  Eligibility Criteria
                </strong>
                <p style={{ fontSize: '13px', color: '#334155', margin: 0, lineHeight: 1.45 }}>{selectedScheme.eligibility}</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 4, textTransform: 'uppercase' }}>
                  Required Documents
                </strong>
                <p style={{ fontSize: '13px', color: '#334155', margin: 0, lineHeight: 1.45 }}>{selectedScheme.documents}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                className="solid-btn"
                style={{ flex: 1 }}
                onClick={() => {
                  toggleSaveScheme(selectedScheme.id);
                }}
              >
                <Bookmark size={14}/> {savedSchemes.includes(selectedScheme.id) ? 'Saved to Snapshot' : 'Save to Snapshot'}
              </button>
              <button
                type="button"
                className="solid-btn"
                style={{ flex: 1, background: '#1e151a' }}
                onClick={() => {
                  onToast('Opening application process tracker.');
                  setSelectedScheme(null);
                  onOpenTracker();
                }}
              >
                Track / Apply <ArrowRight size={14}/>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Personal Notes Modal */}
      {showNotesModal && (
        <div className="modal-bg" onClick={() => setShowNotesModal(false)}>
          <div className="app-tracker-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <button className="modal-close" onClick={() => setShowNotesModal(false)}><X size={16}/></button>
            <p className="kicker">Confidential Information</p>
            <h2>Personal Financial Notes</h2>
            <p className="muted small">Write down scheme application IDs, bank officer numbers, or personal budget goals.</p>

            <form onSubmit={handleAddNote} style={{ margin: '16px 0 14px' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  placeholder="e.g. Visited SBI branch for Mudra Shishu loan inquiry..."
                  value={newNoteText}
                  onChange={e => setNewNoteText(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '9px 14px',
                    borderRadius: 10,
                    border: '1px solid #dfd5da',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="solid-btn small">Save Note</button>
              </div>
            </form>

            <div style={{ maxHeight: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {notes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 10px', color: '#776d72', fontSize: '12px' }}>
                  No personal notes logged yet. Add your first note above.
                </div>
              ) : (
                notes.map(n => (
                  <div
                    key={n.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #eee5ea',
                      borderRadius: 10,
                      padding: '10px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 10
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, fontSize: '13px', color: '#1e151a', fontWeight: 500 }}>{n.text}</p>
                      <small style={{ color: '#887d82', fontSize: '11px' }}>{n.date}</small>
                    </div>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#b34764', cursor: 'pointer', padding: 4 }}
                      onClick={() => handleDeleteNote(n.id)}
                      title="Delete note"
                    >
                      <Trash2 size={14}/>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── finance page matching media_1788941455601.png exact layout ── */
const FINANCE_VERIFIED_SCHEMES = [
  {
    id: 'pmmvy',
    name: 'PM Matru Vandana Yojana',
    subtitle: '₹6,000 cash incentive for pregnant & lactating mothers.',
    agency: 'Ministry of Women and Child Development',
    benefit: 'Cash incentive of ₹5,000 in three installments for first living child, plus institutional delivery incentive under JSY.',
    eligibility: 'Pregnant Women and Lactating Mothers (PW&LM) aged 19+ for their first child.',
    documents: 'Mother-Child Protection (MCP) card, Aadhaar card, linked bank/post office account passbook.'
  },
  {
    id: 'pmjay',
    name: 'Ayushman Bharat (PM-JAY)',
    subtitle: '₹5 Lakh annual free cashless healthcare for the whole family.',
    agency: 'National Health Authority / MoHFW',
    benefit: 'Up to ₹5 Lakh per family per year for secondary and tertiary care hospitalisation across 27,000+ empaneled hospitals.',
    eligibility: 'Families identified based on deprivation criteria in Socio-Economic Caste Census (SECC 2011).',
    documents: 'Aadhaar card, Ration card, PM-JAY letter, or mobile verification.'
  }
];

function FinancePage({ onToast, t }) {
  const [expenses, setExpenses] = useState([]);
  const [newTitle, setNewTitle]   = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCat, setNewCat]       = useState('Food');
  const [showAdd, setShowAdd]     = useState(false);
  const [schemeQuery, setSchemeQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);

  const budgetLimit = 10000;
  const totalSpent  = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining   = Math.max(budgetLimit - totalSpent, 0);

  /* 5 savings goals matching screenshot */
  const [goalNames, setGoalNames] = useState(['', '', '', '', '']);
  const [savedGoals, setSavedGoals] = useState([false, false, false, false, false]);

  const defaultGoalPlaceholders = [
    'e.g. Buy a laptop',
    'e.g. Higher education',
    'e.g. Start a business',
    'e.g. Emergency fund',
    'e.g. Home ownership'
  ];

  const handleGoalChange = (idx, val) => {
    const next = [...goalNames];
    next[idx] = val;
    setGoalNames(next);
  };

  const handleSaveGoal = (idx) => {
    const name = goalNames[idx].trim();
    if (!name) {
      onToast(`Please enter a goal name first.`);
      return;
    }
    const nextSaved = [...savedGoals];
    nextSaved[idx] = true;
    setSavedGoals(nextSaved);
    onToast(`Saved Goal ${idx + 1}: ${name}`);
  };

  const goalsCount = savedGoals.filter(Boolean).length;

  const inferCategory = (text) => {
    const s = text.toLowerCase();
    if (s.includes('grocery') || s.includes('food') || s.includes('vegetable') || s.includes('milk') || s.includes('ration')) return 'Food';
    if (s.includes('bus') || s.includes('auto') || s.includes('train') || s.includes('petrol') || s.includes('travel')) return 'Travel';
    if (s.includes('cloth') || s.includes('shopping') || s.includes('dress') || s.includes('saree')) return 'Shopping';
    if (s.includes('school') || s.includes('book') || s.includes('tuition') || s.includes('course')) return 'Education';
    if (s.includes('doctor') || s.includes('medicine') || s.includes('hospital') || s.includes('tonic')) return 'Health';
    return 'General';
  };

  const handleTitleChange = (val) => {
    setNewTitle(val);
    const cat = inferCategory(val);
    if (cat) setNewCat(cat);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;
    const item = { id: Date.now(), title: newTitle, amount: Number(newAmount), cat: newCat };
    setExpenses([item, ...expenses]);
    setNewTitle('');
    setNewAmount('');
    setShowAdd(false);
    onToast(`Logged ₹${newAmount} in ${newCat}.`);
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
    onToast('Expense item removed.');
  };

  const catEmoji = { Food: '🛒', Travel: '🚌', Shopping: '🛍️', Education: '📚', Health: '💊', General: '📦', Subscriptions: '📱' };

  const filteredSchemes = FINANCE_VERIFIED_SCHEMES.filter(s =>
    !schemeQuery.trim() ||
    s.name.toLowerCase().includes(schemeQuery.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(schemeQuery.toLowerCase())
  );

  return (
    <div className="finance-wrapper">
      {/* ── Top Section: 3 Columns Grid ── */}
      <div className="finance-trio-grid">

        {/* ── Column 1: Verified Schemes ── */}
        <section className="finance-white-card">
          <h3 className="finance-card-title" style={{ margin: 0 }}>{t?.finVerifiedSchemes || "Verified Schemes"}</h3>
          <p className="wealth-section-subtitle" style={{ margin: '4px 0 16px 0' }}>
            Government programs matching your location &amp; requirements.
          </p>

          <div className="wealth-scheme-search" style={{ marginBottom: 16 }}>
            <Search size={14} style={{ color: '#9e9198' }} />
            <input
              type="text"
              placeholder={t?.finSearchPlaceholder || "Search by keyword or scheme"}
              value={schemeQuery}
              onChange={e => setSchemeQuery(e.target.value)}
            />
            {schemeQuery && (
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#9e9198' }}
                onClick={() => setSchemeQuery('')}
              >
                <X size={13}/>
              </button>
            )}
          </div>

          <div className="wealth-scheme-list" style={{ marginBottom: 16 }}>
            {filteredSchemes.map(s => (
              <div
                key={s.id}
                className="wealth-scheme-item"
                onClick={() => setSelectedScheme(s)}
                role="button"
                tabIndex={0}
              >
                <div className="wealth-scheme-item-info">
                  <strong>{s.name}</strong>
                  <small>{s.subtitle}</small>
                </div>
                <ChevronRight size={16} style={{ color: '#887d82', flexShrink: 0 }} />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="finance-eligibility-btn"
            onClick={() => onToast('Checking your eligibility for government programs…')}
          >
            {t?.finCheckEligibility || "Check Eligibility"} <ArrowRight size={14} />
          </button>
        </section>

        {/* ── Column 2: Expense Tracker ── */}
        <section className="finance-white-card">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <span className="finance-kicker-red">{t?.finBudgetTracking || "Monthly Budget Tracking"}</span>
              <h3 className="finance-card-title-dark">{t?.finExpenseTracker || "Expense Tracker"}</h3>
            </div>
            <button
              type="button"
              className="finance-add-expense-pill"
              onClick={() => setShowAdd(v => !v)}
            >
              <Plus size={13}/> {showAdd ? 'Cancel' : 'Add Expense'}
            </button>
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e151a' }}>
                {t?.finSpent || "Spent ₹"}{totalSpent.toLocaleString()} {t?.finOf || "of ₹"}{budgetLimit.toLocaleString()}
              </span>
            </div>
            <div className="finance-progress-track">
              <div
                className="finance-progress-fill"
                style={{
                  width: `${Math.min((totalSpent / budgetLimit) * 100, 100)}%`,
                  background: totalSpent > budgetLimit * 0.85 ? '#ef4444' : '#9b3756'
                }}
              />
            </div>
            <span className="finance-remaining-text">
              ₹{remaining.toLocaleString()} {t?.finRemaining || "remaining in monthly allowance"}
            </span>
          </div>

          {showAdd && (
            <form className="finance-add-form" onSubmit={handleAddExpense} style={{ marginTop: 14 }}>
              <input
                placeholder={t?.finDescPlaceholder || "Description (e.g. Groceries, School fees…)"}
                value={newTitle}
                onChange={e => handleTitleChange(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder={t?.finAmountPlaceholder || "Amount (₹)"}
                value={newAmount}
                onChange={e => setNewAmount(e.target.value)}
                required
              />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Food', 'Shopping', 'Travel', 'Health', 'Education', 'Subscriptions', 'General'].map(c => (
                  <button
                    type="button"
                    key={c}
                    className={`flow-chip ${newCat === c ? 'sel' : ''}`}
                    onClick={() => setNewCat(c)}
                    style={{ fontSize: '11px', padding: '4px 10px' }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button type="submit" className="finance-dark-btn" style={{ padding: '8px 14px', borderRadius: 8 }}>{t?.finSaveExpense || "Save Expense"}</button>
            </form>
          )}

          {/* Empty State or Expenses List */}
          {expenses.length === 0 ? (
            <div className="finance-empty-state-dashed">
              <div style={{ width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center', margin: '0 auto 10px' }}>
                <FileText size={32} style={{ color: '#9b3756', strokeWidth: 1.5 }} />
              </div>
              <strong style={{ fontSize: '14px', color: '#1e151a', display: 'block', marginBottom: 4 }}>
                {t?.finNoExpenses || "No expenses recorded yet"}
              </strong>
              <p style={{ fontSize: '12px', color: '#6e6268', maxWidth: 280, margin: '0 auto', lineHeight: 1.45 }}>
                <span dangerouslySetInnerHTML={{ __html: t?.finClickAdd || "Click \"+ Add Expense\" above to<br/>track your daily household expenditures." }} />
              </p>
            </div>
          ) : (
            <div className="finance-expense-list" style={{ marginTop: 14 }}>
              {expenses.map(e => (
                <div key={e.id} className="finance-expense-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="finance-cat-badge">{catEmoji[e.cat] || '📦'} {e.cat}</span>
                    <span style={{ fontSize: '13px', color: '#1e151a' }}>{e.title}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <strong style={{ fontSize: '13px' }}>₹{e.amount.toLocaleString()}</strong>
                    <button onClick={() => removeExpense(e.id)} className="finance-delete-btn" title="Delete"><Trash2 size={12}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Column 3: Usage Overview / Monthly Limit & Alerts ── */}
        <section className="finance-white-card">
          <span className="finance-kicker-red">{t?.finUsageOverview || "Usage Overview"}</span>
          <h3 className="finance-card-title-dark">{t?.finMonthlyLimit || "Monthly Limit & Alerts"}</h3>

          <div style={{ marginTop: 14 }}>
            <div className="finance-budget-utilized-row">
              <span>{t?.finBudgetUtilized || "Budget Utilized"}</span>
              <strong>₹{totalSpent.toLocaleString()} / ₹{budgetLimit.toLocaleString()}</strong>
            </div>
            <div className="finance-utilized-track">
              <div
                className="finance-utilized-fill"
                style={{ width: `${Math.min((totalSpent / budgetLimit) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="finance-checkin-card">
            <h4 className="finance-checkin-title">{t?.finBudgetCheckin || "Budget Check-in"}</h4>
            <p className="finance-checkin-desc">
              {t?.finYouHave || "You have ₹"}{remaining.toLocaleString()} {t?.finRemainingMonth || "remaining this month."}
              {remaining < 2500 ? " You're close to your monthly limit for shopping." : " You are comfortably within your monthly allocation."}
            </p>
          </div>

          <div className="finance-protip-section">
            <div className="finance-protip-head">
              <Sparkles size={13} style={{ color: '#75233e' }} />
              <span>{t?.finProTip || "Pro-Tip"}</span>
            </div>
            <p className="finance-protip-desc">
              {t?.finProTipDesc || "Putting just ₹200/month into Sukanya Samriddhi or PPF earns 8.2% guaranteed return."}
            </p>
          </div>
        </section>

      </div>

      {/* ── Bottom Section: Savings Goals (Full Width) ── */}
      <section className="finance-white-card" style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <h3 className="finance-card-title" style={{ margin: 0 }}>{t?.finSavingsGoals || "Savings Goals"}</h3>
            <p className="wealth-section-subtitle" style={{ margin: '3px 0 0 0' }}>
              {t?.finSetGoals || "Set your goals to stay motivated and plan better."}
            </p>
          </div>
          <span style={{ fontSize: '12px', color: '#6e6268', fontWeight: 500 }}>
            {goalsCount}/5 {t?.finGoalsSet || "goals set"}
          </span>
        </div>

        <div className="finance-goals-grid">
          {defaultGoalPlaceholders.map((ph, idx) => (
            <div key={idx} className="finance-goal-slot">
              <div className="finance-goal-badge">{idx + 1}</div>
              <input
                type="text"
                placeholder={ph}
                value={goalNames[idx]}
                onChange={e => handleGoalChange(idx, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleSaveGoal(idx)}
              >
                {savedGoals[idx] ? 'Update Goal' : 'Add Goal'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Scheme Detail Modal for Finance */}
      {selectedScheme && (
        <div className="modal-bg" onClick={() => setSelectedScheme(null)}>
          <div className="app-tracker-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <button className="modal-close" onClick={() => setSelectedScheme(null)}><X size={16}/></button>
            <p className="kicker" style={{ color: '#9b3756', fontWeight: 700, fontSize: '11px', letterSpacing: '0.05em' }}>
              {selectedScheme.agency}
            </p>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e151a', margin: '4px 0 6px' }}>
              {selectedScheme.name}
            </h2>
            <p className="muted small" style={{ marginBottom: 16 }}>{selectedScheme.subtitle}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#fdf7f9', padding: '12px 14px', borderRadius: 12, border: '1px solid #f6e6ec' }}>
                <strong style={{ display: 'block', fontSize: '12px', color: '#9b3756', marginBottom: 4, textTransform: 'uppercase' }}>
                  Benefit Overview
                </strong>
                <p style={{ fontSize: '13px', color: '#271d22', margin: 0, lineHeight: 1.45 }}>{selectedScheme.benefit}</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 4, textTransform: 'uppercase' }}>
                  Eligibility Criteria
                </strong>
                <p style={{ fontSize: '13px', color: '#334155', margin: 0, lineHeight: 1.45 }}>{selectedScheme.eligibility}</p>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: 4, textTransform: 'uppercase' }}>
                  Required Documents
                </strong>
                <p style={{ fontSize: '13px', color: '#334155', margin: 0, lineHeight: 1.45 }}>{selectedScheme.documents}</p>
              </div>
            </div>

            <button
              type="button"
              className="solid-btn"
              style={{ width: '100%', background: '#75233e' }}
              onClick={() => {
                onToast(`Application process initiated for ${selectedScheme.name}`);
                setSelectedScheme(null);
              }}
            >
              {t?.finCheckFullEligibility || "Check Full Eligibility & Apply"} <ArrowRight size={14}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── livelihood page with resume creator & interview prep ─ */
function LivelihoodPage({ onSub, onToast, t }) {
  return (
    <div className="grid livelihood-grid">
      <SchemePanel area="livelihood" onToast={onToast}/>

      <section className="card cv-card">
        <div>
          <p className="kicker">{t?.livCareerAdv || "Career Advancement"}</p>
          <h3>{t?.livResumeCreator || "Professional Resume / CV Creator"}</h3>
          <p className="muted">{t?.livAtsFriendly || "ATS-friendly formats designed for healthcare, retail, coordinator, and office roles."}</p>
          <button className="solid-btn" onClick={() => onSub('resume')} style={{ marginTop: 18 }}>
            {t?.livBuildResume || "Build My Resume"} <ArrowRight size={13}/>
          </button>
        </div>
        <div className="resume-preview" aria-hidden style={{ marginTop: 16 }}>
          <span/><span/><span/><i/>
        </div>
      </section>

      <section className="card interview-card">
        <div className="cat-icon-badge" style={{ marginBottom: 12 }}><Volume2 size={20}/></div>
        <p className="kicker">{t?.livAiVoice || "AI Voice Practice"}</p>
        <h3>{t?.livInterviewSim || "Interview Simulator"}</h3>
        <p className="muted">{t?.livPracticeReal || "Practice real interview questions out loud in your language. Receive instant AI scores for confidence, clarity, and tone."}</p>
        <button className="solid-btn" onClick={() => onSub('interview')} style={{ marginTop: 18 }}>
          {t?.livStartVoice || "Start Voice Practice"} <ArrowRight size={13}/>
        </button>

        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          <small className="muted" style={{ display: 'block' }}>
            <span dangerouslySetInnerHTML={{ __html: t?.livVideoGuides || "🎬 <strong>Video Guides:</strong> Watch 5-minute video tutorials on answering salary questions and introducing your past achievements confidently." }} />
          </small>
        </div>
      </section>
    </div>
  );
}

/* ─── safety page with unambiguous SOS & "Call Mom" ──────── */
function SafetyPage({ onSos, onCallMom, onToast, t }) {
  const [activePanel, setActivePanel] = useState(null);
  const [contacts, setContacts] = useState(['Priya (Sister) — 98765 43210', 'Anita (Friend) — 87654 32109']);
  const [newContact, setNewContact] = useState('');

  return (
    <div className="safety-wrap">
      <section className="card safe-hero">
        <div>
          <p className="kicker" style={{ color: '#be2d5e' }}>24/7 Protection & Rapid Response</p>
          <h2>{t?.safAssistance || "Immediate Emergency Assistance"}</h2>
          <p className="muted">{t?.safPrivateDispatch || "Private emergency dispatch, discreet exit simulation, and verified helplines."}</p>
        </div>

        <button className="sos-pill-stylish" onClick={onSos}>
          <Siren size={16}/>
          {t?.safActivateSOS || "Activate Emergency SOS"}
        </button>
      </section>

      <div className="safety-tools">
        {/* Discreet Exit / Fake Call — labelled neutrally as "Call Mom" per frontend spec */}
        <div className="card safety-tool">
          <div className="tool-icon-circle"><Phone size={20}/></div>
          <h3>{t?.safDiscreetExit || "Discreet Exit Call"}</h3>
          <p className="muted">{t?.safSimulatesCall || "Simulates an incoming mobile phone call to exit uncomfortable or tense situations discreetly."}</p>
          <button className="solid-btn full" style={{ marginTop: 'auto' }} onClick={onCallMom}>
            <Phone size={13}/> {t.callMom || 'Call Mom'}
          </button>
        </div>

        {/* Share Live Location */}
        <div className="card safety-tool">
          <div className="tool-icon-circle"><MapPin size={20}/></div>
          <h3>{t?.safShareLocation || "Share Live Location"}</h3>
          <p className="muted">{t?.safGeneratesLink || "Generates a private 2-hour encrypted GPS tracking link to send to trusted contacts."}</p>
          <button
            className="solid-btn full"
            style={{ marginTop: 'auto' }}
            onClick={() => {
              navigator.clipboard?.writeText('https://unnati.app/track/gps-safe-88319').catch(() => {});
              onToast('Encrypted live tracking link copied to clipboard.');
              setActivePanel(activePanel === 'loc' ? null : 'loc');
            }}
          >
            {t?.safCopyLink || "Copy Tracking Link"} <ArrowRight size={12}/>
          </button>
          {activePanel === 'loc' && (
            <div className="safety-panel-expanded">
              <code className="safety-link-display">unnati.app/track/gps-safe-88319</code>
              <small className="muted">{t?.safLinkExpires || "This secure tracking link expires in 2 hours."}</small>
            </div>
          )}
        </div>

        {/* Emergency Contacts Network */}
        <div className="card safety-tool">
          <div className="tool-icon-circle"><ShieldAlert size={20}/></div>
          <h3>{t?.safEmergencyContacts || "Emergency Contacts"}</h3>
          <p className="muted">{t?.safDesignateContacts || "Designate trusted contacts who will immediately receive your location during an SOS."}</p>
          <button
            className="solid-btn full"
            style={{ marginTop: 'auto' }}
            onClick={() => setActivePanel(activePanel === 'plan' ? null : 'plan')}
          >
            {activePanel === 'plan' ? 'Close' : 'Manage Contacts'} <ArrowRight size={12}/>
          </button>
          {activePanel === 'plan' && (
            <div className="safety-panel-expanded">
              {contacts.map((c, i) => (
                <div key={i} className="contact-row">
                  <span>{c}</span>
                  <button className="delete-log-btn" onClick={() => { setContacts(contacts.filter((_, j) => j !== i)); onToast('Contact removed.'); }}><Trash2 size={11}/></button>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <input
                  className="goal-input"
                  placeholder="Name — Mobile number"
                  value={newContact}
                  onChange={e => setNewContact(e.target.value)}
                />
                <button
                  className="icon-badge-btn"
                  onClick={() => {
                    if (newContact) {
                      setContacts([...contacts, newContact]);
                      setNewContact('');
                      onToast('Contact added to emergency circle.');
                    }
                  }}
                >
                  <Plus size={13}/>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── rights page with verbatim scripts & legal explainers ─ */
function RightsPage({ onGuide, onToast, t }) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const SCRIPTS = [
    {
      context: 'At a Police Station (Filing Zero FIR)',
      text: '"Under Section 154 of the CrPC, any police station is legally mandated to register a Zero FIR regardless of jurisdiction. Kindly record my complaint in writing and provide an official acknowledged stamped copy."'
    },
    {
      context: 'Workplace Sexual Harassment / POSH',
      text: '"Under the POSH Act 2013, I am formally requesting this complaint be referred to the Internal Complaints Committee (ICC). I request confidentiality and protection from workplace retaliation during inquiry."'
    },
    {
      context: 'Government Scheme Office Delay',
      text: '"Under the Citizens Charter, I am entitled to know the status of my application within 30 days. Please provide the designated grievance officer name and written acknowledgment of this visit."'
    },
    {
      context: 'Tenancy / Unlawful Eviction',
      text: '"Under Indian tenancy laws, a tenant cannot be forcibly evicted without due legal notice. Any disconnection of water or electricity is an unlawful violation of my basic legal rights."'
    }
  ];

  const handleCopy = (text, idx) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedIdx(idx);
    onToast('Verbatim script copied to clipboard.');
    setTimeout(() => setCopiedIdx(null), 2500);
  };

  const handleSpeak = (text) => {
    onToast('Reading script aloud…');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95;
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div className="grid rights-grid">
      <SchemePanel area="rights" onToast={onToast}/>

      {/* Verbatim Scripts per frontend spec */}
      <section className="card rights-card">
        <p className="kicker">{t?.rigExactScripts || "Exact Word-for-Word Scripts"}</p>
        <h3>{t?.rigKnowWhatToSay || "Know What to Say"}</h3>
        <p className="muted">
          {t?.rigHereIsWhat || "Here is what you can say, word for word, if this happens — practical, assertive, and legal."}
        </p>

        <div className="rights-scroll-content">
  {SCRIPTS.map((s, i) => (
    <div key={i} className="verbatim-box">
      <span className="question-tag">{s.context}</span>
      <p>{s.text}</p>

      <div className="script-action-row">
        <button className="link-btn small" onClick={() => handleSpeak(s.text)}>
          <Volume2 size={13}/> {t?.rigListenOutLoud || "Listen out loud"}
        </button>

        <button className="solid-btn small" onClick={() => handleCopy(s.text, i)}>
          <Copy size={12}/> {copiedIdx === i ? 'Copied!' : 'Copy Script'}
        </button>
      </div>
    </div>
  ))}
</div>
      </section>

      {/* Know Your Rights Plain-Language Explainers */}
<section className="card say-card">
  <p className="kicker">{t?.rigPlainExplainers || "Plain-Language Explainers"}</p>
  <h3>{t?.rigLegalProtections || "Know Your Legal Protections"}</h3>
  <p className="muted">
    {t?.rigUnderstandLegal || "Understand your legal standing in plain words without confusing legal jargon."}
  </p>

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginTop: 18,
      maxHeight: '420px',
      overflowY: 'auto',
      paddingRight: '6px'
    }}
  >
    <div className="app-card-item" onClick={() => onGuide('rights')} style={{ cursor: 'pointer' }}>
      <strong>{t?.rigWorkplacePosh || "Workplace & POSH Protection"}</strong>
      <small className="muted">{t?.rigMandatoryICC || "Mandatory ICC committees in organizations with 10+ employees."}</small>
    </div>

    <div className="app-card-item" onClick={() => onGuide('rights')} style={{ cursor: 'pointer' }}>
      <strong>{t?.rigEqualProperty || "Equal Property & Inheritance Rights"}</strong>
      <small className="muted">{t?.rigEqualRights || "Equal rights in ancestral property under Hindu Succession Act."}</small>
    </div>

    <div className="app-card-item" onClick={() => onGuide('rights')} style={{ cursor: 'pointer' }}>
      <strong>{t?.rigProtectionDV || "Protection from Domestic Violence"}</strong>
      <small className="muted">{t?.rigRightToReside || "Right to reside in shared household, interim relief & protection orders."}</small>
    </div>

    <div className="app-card-item" onClick={() => onGuide('rights')} style={{ cursor: 'pointer' }}>
      <strong>{t?.rigFreeLegalAid || "Free Legal Aid (NALSA)"}</strong>
      <small className="muted">{t?.rigEveryWoman || "Every woman in India is legally entitled to free advocates in any court."}</small>
    </div>
  </div>

        <button className="solid-btn full" onClick={() => onGuide('rights')} style={{ marginTop: 20 }}>
          {t?.rigReadFullGuide || "Read Full Legal Guide"} <ArrowRight size={13}/>
        </button>
      </section>
    </div>
  );
}

/* ─── complete interactive period & wellness subpage ─────── */
function PeriodPage({ onClose, onToast, t }) {
  const [startDate, setStartDate] = useState('2026-09-03');
  const [flow, setFlow]           = useState('Medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Hydrated']);
  const [notes, setNotes]         = useState('');
  
  // STRIPPED OF FAKE DATA — starts empty for live backend integration
  const [logs, setLogs]           = useState([]);

  const toggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter(x => x !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handleSaveLog = (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      date: startDate,
      flow,
      symptoms: selectedSymptoms.join(', ') || 'None reported',
      notes: notes.trim() || 'No extra notes logged.'
    };
    setLogs([entry, ...logs]);
    setNotes('');
    onToast("Today's check-in saved to your health log.");
  };

  const SYMPTOMS_LIST = [
    'Calm', 'Energetic', 'Cramps', 'Headache',
    'Tired', 'Bloated', 'Hydrated', 'Tender'
  ];

  return (
    <div className="sub-page">
      <button className="back-btn" onClick={onClose}>
        <ArrowLeft size={15}/> Back to Health
      </button>

      <div className="sub-header" style={{ marginBottom: 12 }}>
        <p className="kicker" style={{ color: '#9b3756', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Personal Health Suite
        </p>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e151a', margin: '4px 0 6px' }}>
          Cycle & Symptom Dashboard
        </h2>
        <p className="muted" style={{ fontSize: '13px', color: '#776d72', margin: 0 }}>
          Track your cycle, log symptoms, and understand your health patterns.
        </p>
      </div>

      <div className="period-layout">
        {/* Left Column: Daily Check-in & Symptom Log */}
        <section className="period-white-card">
          <h3 className="period-card-title">Daily Check-in & Symptom Log</h3>

          <form onSubmit={handleSaveLog}>
            {/* Cycle Date */}
            <div className="period-field-group">
              <label className="period-field-label">Cycle Date</label>
              <div className="period-date-input-wrap">
                <input
                  type="date"
                  className="period-date-input"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Flow Intensity */}
            <div className="period-field-group">
              <label className="period-field-label">Flow Intensity</label>
              <div className="period-flow-row">
                {['Spotting', 'Light', 'Medium', 'Heavy'].map(f => (
                  <button
                    type="button"
                    key={f}
                    className={`period-flow-btn ${flow === f ? 'active' : ''}`}
                    onClick={() => setFlow(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms (select all that apply) */}
            <div className="period-field-group">
              <label className="period-field-label">Symptoms (select all that apply)</label>
              <div className="period-symptoms-grid">
                {SYMPTOMS_LIST.map(sym => (
                  <button
                    type="button"
                    key={sym}
                    className={`period-symptom-btn ${selectedSymptoms.includes(sym) ? 'active' : ''}`}
                    onClick={() => toggleSymptom(sym)}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes (optional) */}
            <div className="period-field-group">
              <label className="period-field-label">Notes (optional)</label>
              <textarea
                className="period-notes-textarea"
                placeholder="How are you feeling today? Any symptoms, mood changes, or notes for yourself..."
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>

            <button type="submit" className="period-submit-btn">
              Save Today's Log
            </button>
          </form>
        </section>

        {/* Right Column: 6-Month Cycle Length & Saved History */}
        <div className="period-right-col">
          {/* Card 1: 6-Month Cycle Length */}
          <section className="period-white-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <strong style={{ fontSize: '15px', color: '#1e151a' }}>6-Month Cycle Length</strong>
              <span style={{ fontSize: '12px', color: '#776d72' }}>Average cycle length: 28 days</span>
            </div>

            {/* Precision SVG Trend Chart */}
            <svg viewBox="0 0 520 180" className="health-chart-svg" preserveAspectRatio="xMidYMid meet">
              {/* Y Axis text label */}
              <text
                x="-85"
                y="12"
                transform="rotate(-90)"
                textAnchor="middle"
                fontSize="10"
                fill="#887d82"
              >
                Cycle length (days)
              </text>

              {/* Horizontal grid lines & Y labels */}
              {[
                { label: '40', y: 25 },
                { label: '35', y: 55 },
                { label: '30', y: 85 },
                { label: '25', y: 115 },
                { label: '20', y: 145 },
              ].map((g, idx) => (
                <g key={g.label}>
                  <text x="32" y={g.y + 4} textAnchor="end" fontSize="10.5" fill="#8d8187" fontWeight="500">
                    {g.label}
                  </text>
                  <line
                    x1="42"
                    y1={g.y}
                    x2="505"
                    y2={g.y}
                    stroke="#f1eaee"
                    strokeWidth="1"
                    strokeDasharray={idx === 4 ? 'none' : '3 3'}
                  />
                </g>
              ))}

              {/* Smooth Berry Trend Curve */}
              <path
                d="M 65 97 C 110 97, 110 91, 153 91 C 196 91, 196 103, 241 103 C 286 103, 286 97, 331 97 C 376 97, 376 97, 421 97 C 466 97, 466 91, 495 91"
                fill="none"
                stroke="#9b3756"
                strokeWidth="2.4"
                strokeLinecap="round"
              />

              {/* Monthly Points */}
              {[
                { month: 'Apr', val: 28, x: 65, y: 97 },
                { month: 'May', val: 29, x: 153, y: 91 },
                { month: 'Jun', val: 27, x: 241, y: 103 },
                { month: 'Jul', val: 28, x: 331, y: 97 },
                { month: 'Aug', val: 28, x: 421, y: 97 },
                { month: 'Sep', val: 29, x: 495, y: 91 },
              ].map(p => (
                <g key={p.month}>
                  <text
                    x={p.x}
                    y={p.y - 8}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="#1e151a"
                  >
                    {p.val}
                  </text>
                  <circle cx={p.x} cy={p.y} r="3.8" fill="#9b3756" />
                  <text
                    x={p.x}
                    y="166"
                    textAnchor="middle"
                    fontSize="11"
                    fill="#73686e"
                    fontWeight="500"
                  >
                    {p.month}
                  </text>
                </g>
              ))}
            </svg>
          </section>

          {/* Card 2: Saved History */}
          <section className="period-white-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <strong style={{ fontSize: '15px', color: '#1e151a' }}>Saved History</strong>
              <button
                className="link-btn small"
                style={{ fontSize: '12px', color: '#75233e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}
                onClick={() => onToast('All historical cycles synced.')}
              >
                View all <ArrowRight size={13}/>
              </button>
            </div>

            {logs.length === 0 ? (
              <div className="history-empty-box">
                <FileText size={26} style={{ color: '#75233e', opacity: 0.6, marginBottom: 8 }}/>
                <strong style={{ fontSize: '13.5px', color: '#1e151a' }}>No saved history yet</strong>
                <p style={{ fontSize: '11.5px', color: '#6e6268', maxWidth: '300px', margin: '4px auto 0', lineHeight: 1.45 }}>
                  Complete today's check-in on the left to start logging your personal cycle patterns.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="period-history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Flow</th>
                      <th>Symptoms</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map(l => (
                      <tr key={l.id || l.date}>
                        <td style={{ whiteSpace: 'nowrap', fontWeight: 500 }}>{l.date}</td>
                        <td>
                          <span className={`flow-table-tag ${l.flow.toLowerCase()}`}>
                            {l.flow}
                          </span>
                        </td>
                        <td style={{ color: '#443c40' }}>{l.symptoms}</td>
                        <td style={{ color: '#776d72', maxWidth: '220px' }}>{l.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

/* ─── complete interactive resume creator subpage ────────── */
function ResumePage({ onClose, onToast, t }) {
  const [activeTab, setActiveTab] = useState('templates');
  const [resumeData, setResumeData] = useState({
    name: 'Sunita Meena',
    role: 'Community Health Coordinator & SHG Secretary',
    email: 'sunita.meena@example.com',
    phone: '+91 98765 43210',
    location: 'Jaipur, Rajasthan',
    summary: 'Dedicated community leader with 3+ years experience managing rural health awareness drives, SHG savings, and PMKVY vocational training camps.',
    skills: 'Community Outreach, First Aid Certified, Hindi & Marwari Fluency, Basic Excel, Micro-finance Recordkeeping',
    experience: `SHG Secretary • Gram Vikas Trust (2023 - Present)
Managed ₹2 Lakh monthly savings collective for 22 women; assisted 45 families with PMMVY maternity benefit documentation.`
  });

  return (
    <div className="sub-page">
      <button className="back-btn" onClick={onClose}><ArrowLeft size={15}/> Back to Livelihood</button>

      <div className="sub-header">
        <p className="kicker">Professional Career Tools</p>
        <h2>Resume & CV Creator</h2>
        <p className="muted">Choose an ATS-compliant template, fill your details, and export a printable CV.</p>
      </div>

      <div className="resume-mode-tabs">
        <button className={`mode-tab ${activeTab === 'templates' ? 'sel' : ''}`} onClick={() => setActiveTab('templates')}>
          1. Select Template
        </button>
        <button className={`mode-tab ${activeTab === 'editor' ? 'sel' : ''}`} onClick={() => setActiveTab('editor')}>
          2. Edit & Export CV
        </button>
      </div>

      {activeTab === 'templates' ? (
        <div className="template-grid">
          {[
            ['Clean & Simple', 'Standard format for healthcare, retail, coordinator, and office roles.'],
            ['Modern Two-Column', 'Highlights skills, languages, and vocational certificates.'],
            ['Classic Executive', 'Structured format for experienced team leads and entrepreneurs.']
          ].map(([title, desc]) => (
            <div key={title} className="card template-card-item">
              <div className="template-preview">
                <span/><span/><span/><i/>
              </div>
              <h4>{title}</h4>
              <p className="muted small">{desc}</p>
              <button
                className="solid-btn full"
                style={{ marginTop: 12 }}
                onClick={() => { setActiveTab('editor'); onToast(`${title} template loaded.`); }}
              >
                Use This Template <ArrowRight size={13}/>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="resume-editor-layout">
          <div className="card resume-form-card">
            <h3>Fill Your Information</h3>
            <label className="form-field">
              <span>Full Name</span>
              <input value={resumeData.name} onChange={e => setResumeData({ ...resumeData, name: e.target.value })}/>
            </label>
            <label className="form-field">
              <span>Job Title / Role</span>
              <input value={resumeData.role} onChange={e => setResumeData({ ...resumeData, role: e.target.value })}/>
            </label>
            <div className="form-row-2">
              <label className="form-field">
                <span>Phone Number</span>
                <input value={resumeData.phone} onChange={e => setResumeData({ ...resumeData, phone: e.target.value })}/>
              </label>
              <label className="form-field">
                <span>Location (City, State)</span>
                <input value={resumeData.location} onChange={e => setResumeData({ ...resumeData, location: e.target.value })}/>
              </label>
            </div>
            <label className="form-field">
              <span>Professional Summary</span>
              <textarea rows={2} value={resumeData.summary} onChange={e => setResumeData({ ...resumeData, summary: e.target.value })}/>
            </label>
            <label className="form-field">
              <span>Key Skills</span>
              <input value={resumeData.skills} onChange={e => setResumeData({ ...resumeData, skills: e.target.value })}/>
            </label>
            <label className="form-field">
              <span>Work & Community Experience</span>
              <textarea rows={3} value={resumeData.experience} onChange={e => setResumeData({ ...resumeData, experience: e.target.value })}/>
            </label>
          </div>

          <div className="resume-doc-wrapper">
            <div className="doc-toolbar">
              <span>Live Printable CV</span>
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
                <h5>WORK & LEADERSHIP EXPERIENCE</h5>
                <p style={{ whiteSpace: 'pre-line' }}>{resumeData.experience}</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── complete interactive AI interview simulator subpage ─ */
function InterviewPage({ onClose, onToast, t }) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [recording, setRecording]     = useState(false);
  const [answered, setAnswered]       = useState(false);

  const QUESTIONS = {
    'Job & Coordinator Interview': 'Tell me about a time when you faced a difficult situation in your community or team, and how you resolved it.',
    'Bank Mudra Loan Officer': 'What type of home enterprise or business are you launching, and how will this loan generate income?',
    'Government Scheme Desk': 'Which welfare scheme are you applying for today, and have you brought your official identity documents?',
    'Hospital & Healthcare Consultation': 'Can you describe the primary symptoms you are experiencing and approximately when they first began?'
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
      onToast('Listening to your response… Speak clearly in your language.');
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
        <p className="muted">Speak your answers out loud in your preferred language and get instant AI confidence scores.</p>
      </div>

      {!selectedCat ? (
        <div className="interview-cats-grid">
          {Object.keys(QUESTIONS).map(c => (
            <div key={c} className="card interview-cat-card" onClick={() => handleStartPractice(c)}>
              <div className="cat-icon-badge"><Volume2 size={20}/></div>
              <h3>{c}</h3>
              <p className="muted">Practice out loud and receive instant evaluation metrics.</p>
              <button className="solid-btn full" style={{ marginTop: 14 }}>Start Practice</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card interview-session-card">
          <button className="link-btn" onClick={() => setSelectedCat(null)} style={{ marginBottom: 16 }}>
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
              {recording ? 'Stop & Generate AI Feedback' : 'Hold to Speak / Record Voice Answer'}
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
                <strong>Constructive AI Feedback:</strong> Excellent delivery! Your tone was respectful and confident. When explaining past experience, try emphasizing measurable numbers (e.g. number of people assisted or projects managed) for maximum impact.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── fake call / discreet exit ("Call Mom") modal ───────── */
function CallMomModal({ onClose, onToast }) {
  const [connected, setConnected] = useState(false);
  const [seconds, setSeconds]     = useState(0);

  useEffect(() => {
    let timer;
    if (connected) {
      timer = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [connected]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="call-screen-overlay">
      <div className="call-top-info">
        <div className="caller-avatar">M</div>
        <h2 className="caller-name">Mom</h2>
        <p className="call-status">
          {connected ? `Connected • ${formatTimer(seconds)}` : 'Incoming Mobile Call…'}
        </p>
      </div>

      <div className="call-escape-pretext">
        <span className="pretext-tag">DISCREET EXIT PRETEXT</span>
        <p>
          "{connected ? "Hi Mom! Yes, I just finished up here and I'm walking to the car right now. See you in 10 minutes!" : "Tap Accept to simulate an urgent call from home and exit comfortably."}"
        </p>
      </div>

      <div className="call-actions-row">
        {!connected ? (
          <>
            <button className="call-action-btn" onClick={onClose}>
              <div className="call-btn-circle decline"><PhoneOff size={28}/></div>
              <span>Decline</span>
            </button>
            <button className="call-action-btn" onClick={() => { setConnected(true); onToast('Call connected. Read the pretext script aloud.'); }}>
              <div className="call-btn-circle accept"><Phone size={28}/></div>
              <span>Accept</span>
            </button>
          </>
        ) : (
          <button className="call-action-btn" onClick={onClose}>
            <div className="call-btn-circle decline"><PhoneOff size={28}/></div>
            <span>End Call</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── medical QR code scanner modal ─────────────────────── */
function QrScannerModal({ onClose, onToast }) {
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setScanned(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="qr-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={16}/></button>

        <p className="kicker">Medical Packaging Scanner</p>
        <h3>Scan Medicine QR Code</h3>
        <p className="muted small">Point your camera at the QR code or barcode on your medicine packaging.</p>

        <div className="scanner-viewfinder">
          <div className="reticle-corner reticle-tl"/>
          <div className="reticle-corner reticle-tr"/>
          <div className="reticle-corner reticle-bl"/>
          <div className="reticle-corner reticle-br"/>
          <div className="scan-laser"/>

          <div style={{ textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
            <Camera size={32} style={{ marginBottom: 6, opacity: 0.6 }}/>
            <p>{scanned ? 'QR Pattern Detected!' : 'Align QR inside the reticle…'}</p>
          </div>
        </div>

        {scanned && (
          <div className="scanned-result-card">
            <div className="scanned-result-header">
              <strong>Ferrous Ascorbate + Folic Acid (Iron)</strong>
              <span className="qr-pill-success">Verified Safe</span>
            </div>
            <small style={{ color: '#271d22', display: 'block' }}>
              <strong>Dosage:</strong> 1 tablet once daily after lunch.<br/>
              <strong>Expiry Date:</strong> 11/2027 (Batch #FA-9041)<br/>
              <strong>Manufacturer:</strong> Cipla Healthcare Ltd.
            </small>
            <button
              className="solid-btn full small"
              style={{ marginTop: 8 }}
              onClick={() => {
                onToast('Iron supplement details automatically logged to your cabinet.');
                onClose();
              }}
            >
              <Check size={13}/> Add to Medicine Cabinet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── cross-domain application tracker modal ─────────────── */
function AppTrackerModal({ applications, setApplications, onClose, onToast }) {
  const [newId, setNewId] = useState('');

  const handleTrackNew = (e) => {
    e.preventDefault();
    if (!newId.trim()) return;
    const item = {
      id: newId.toUpperCase(),
      scheme: 'General State Welfare Benefit',
      date: 'Today',
      status: 'Being reviewed',
      step: 2,
      note: 'Application record located in central database. Processing underway.'
    };
    setApplications([item, ...applications]);
    setNewId('');
    onToast(`Application ${item.id} tracked.`);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Submitted': return 'submitted';
      case 'Being reviewed': return 'reviewing';
      case 'Approved': return 'approved';
      case 'Needs more info': return 'info';
      default: return 'submitted';
    }
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="app-tracker-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={16}/></button>

        <p className="kicker">Central Status Portal</p>
        <h2>Scheme Application Tracker</h2>
        <p className="muted small">Real-time status of your government scheme and grant applications.</p>

        <form className="search-field" onSubmit={handleTrackNew} style={{ margin: '16px 0 10px' }}>
          <Search size={14}/>
          <input
            placeholder="Enter Application or Reference ID (e.g. UNN-8942)…"
            value={newId}
            onChange={e => setNewId(e.target.value)}
          />
          <button type="submit" className="solid-btn small">Track</button>
        </form>

        <div className="app-list-stack">
          {applications.length === 0 ? (
            <div className="rec-scheme-empty" style={{ margin: '16px 0', padding: '28px 16px', background: 'rgba(255,255,255,0.6)', borderRadius: 14 }}>
              <FileCheck size={28} style={{ color: '#75233e', opacity: 0.7, marginBottom: 8 }} />
              <strong style={{ fontSize: '13.5px', color: '#1e151a' }}>No applications tracked yet</strong>
              <p style={{ fontSize: '11.5px', color: '#6e6268', maxWidth: '280px', lineHeight: 1.45, margin: '6px auto 0' }}>
                Enter an Application or Reference ID above to track your real-time verification and approval status.
              </p>
            </div>
          ) : (
            applications.map(app => (
              <div key={app.id} className="app-card-item">
                <div className="app-card-head">
                  <div>
                    <strong>{app.scheme}</strong>
                    <small style={{ color: '#776d72', display: 'block' }}>ID: {app.id} • Applied {app.date}</small>
                  </div>
                  <span className={`status-badge ${getStatusClass(app.status)}`}>
                    ● {app.status}
                  </span>
                </div>

                <div className="app-timeline-nodes">
                  <span className={`timeline-step ${app.step >= 1 ? 'done' : ''}`}>1</span>
                  <span className={`timeline-step ${app.step >= 2 ? (app.step === 2 ? 'active' : 'done') : ''}`}>2</span>
                  <span className={`timeline-step ${app.step >= 3 ? (app.step === 3 ? 'active' : 'done') : ''}`}>3</span>
                  <span className={`timeline-step ${app.step >= 4 ? 'done' : ''}`}>4</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#64748b' }}>
                  <span>Submitted</span>
                  <span>Reviewing</span>
                  <span>Verification</span>
                  <span>Approved</span>
                </div>

                <p style={{ fontSize: '12px', color: '#332b2f', lineHeight: 1.5, background: 'rgba(255,255,255,0.7)', padding: '8px 12px', borderRadius: 10 }}>
                  {app.note}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── guide drawer ───────────────────────────────────────── */
const GUIDES = {
  'first-aid': {
    title: 'First-Aid Emergency Guide',
    intro: 'Immediate medical response steps before professional ambulance or doctor arrives.',
    steps: [
      'Ensure the immediate area is safe before approaching the affected person.',
      'Call 112 or 108 immediately for severe bleeding, breathing difficulty, or loss of consciousness.',
      'For severe bleeding, apply firm, continuous direct pressure with a clean folded cloth.',
      'If the person feels faint, elevate their feet 12 inches above head level and loosen tight clothing.',
      'Do not move anyone suspected of neck or spine trauma unless fire or physical collapse is imminent.'
    ]
  },
  rights: {
    title: 'Know Your Legal Rights',
    intro: 'Plain-language fundamental statutory protections guaranteed to all women in India.',
    steps: [
      'Under the POSH Act 2013, every woman has a legally enforceable right to a workplace free from harassment.',
      'You are entitled to a clear, written explanation and acknowledgment receipt for any scheme application.',
      'You have the legal right to demand a female police officer when giving statements at any station.',
      'Under Hindu Succession Amendment Act, daughters enjoy identical coparcenary rights to ancestral property.',
      'In any case of domestic distress, 181 National Women Helpline provides immediate zero-cost legal aid and shelter.'
    ]
  },
  'financial-literacy': {
    title: 'Financial Literacy Guide',
    intro: 'Essential principles for smart banking, micro-savings, safe borrowing, and avoiding fraud.',
    steps: [
      'Always keep your Aadhaar and bank account linked to receive direct benefit transfers (DBT) directly into your account.',
      'Never share your OTP, UPI PIN, or ATM PIN with anyone — authentic bank representatives will never ask for them.',
      'Prioritize building an emergency buffer of 3–6 months of basic household expenses in a safe liquid savings account.',
      'Borrow only from RBI-regulated public banks, cooperatives, or registered SHGs; avoid predatory illegal instant loan apps.',
      'Enroll in government micro-insurance (PMSBY & PMJJBY) for ₹2 Lakh accidental & life coverage at just ₹20 & ₹436 per year.'
    ]
  }
};

function GuideDrawer({ kind, onClose }) {
  const d = GUIDES[kind] || GUIDES['first-aid'];
  return (
    <div className="guide-backdrop" onClick={onClose}>
      <article className="guide-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={17}/></button>
        <p className="kicker">{d.intro}</p>
        <h2>{d.title}</h2>
        <div className="guide-steps">
          {d.steps.map((s, i) => (
            <div key={i} className="guide-step">
              <span>{i + 1}</span>
              <p>{s}</p>
            </div>
          ))}
        </div>
        <button className="solid-btn" onClick={onClose} style={{ marginTop: 28 }}>
          Understood <Check size={14}/>
        </button>
      </article>
    </div>
  );
}

/* ─── auth modal with preferred language & location ─────── */
function AuthModal({ lang, setLang, step, setStep, onClose, onDone, onLocation, t }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={16}/></button>

        <div className="auth-illo">
          <div className="illo-brand">unnati</div>
          <div className="illo-text">
            <h3>Empowering Every Woman</h3>
            <p>Save your progress, track your scheme applications, and keep Unnati tailored in your language.</p>
          </div>
        </div>

        <div className="auth-form">
          {/* Step 1: Preferred Language per frontend spec */}
          {step === 'prefs' && (
            <>
              <p className="kicker">Let's Get Started</p>
              <h2>Select Your Language</h2>
              <p className="muted small">Let's start with your preferred language. You can always change this later.</p>

              <div className="lang-grid">
                {LANGUAGES.slice(0, 12).map(([name, native]) => (
                  <button
                    key={name}
                    className={`lang-chip ${lang === name ? 'sel' : ''}`}
                    onClick={() => setLang(name)}
                  >
                    <span>{native}</span>
                    <small>{name}</small>
                  </button>
                ))}
              </div>

              <button className="location-row" onClick={onLocation} style={{ marginTop: 12 }}>
                <MapPin size={16} style={{ color: '#a2385c' }}/>
                <span>
                  <strong>Detect Local Government Services</strong>
                  <small>Unnati uses your location to show nearby hospitals and support desks</small>
                </span>
                <ArrowRight size={13}/>
              </button>

              <button className="solid-btn full" onClick={() => setStep('login')} style={{ marginTop: 14 }}>
                Continue to Account <ArrowRight size={14}/></button>
            </>
          )}

          {step === 'login' && (
            <>
              <p className="kicker">Welcome Back</p>
              <h2>Sign in to Unnati</h2>
              <p className="muted small">Access your personalized support dashboard and saved applications.</p>
              <label>Email Address<input type="email" placeholder="name@example.com"/></label>
              <label>Password<input type="password" placeholder="••••••••"/></label>
              <button className="solid-btn full" onClick={onDone}>Sign in to Continue <ArrowRight size={14}/></button>
              <p className="switch-link">New to Unnati? <button onClick={() => setStep('signup')}>Create an account</button></p>
            </>
          )}

          {step === 'signup' && (
            <>
              <p className="kicker">Create Profile</p>
              <h2>Join Unnati</h2>
              <p className="muted small">Get clear, personalized guidance in your native language.</p>
              <label>Full Name<input type="text" placeholder="Your name"/></label>
              <label>Email Address<input type="email" placeholder="name@example.com"/></label>
              <label>Password<input type="password" placeholder="Create a password"/></label>
              <button className="solid-btn full" onClick={onDone}>Complete Registration <Check size={14}/></button>
              <p className="switch-link">Already registered? <button onClick={() => setStep('login')}>Sign in</button></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── SOS modal with unambiguous confirmation ────────────── */
function SosModal({ onClose, onToast }) {
  const [countdown, setCountdown] = useState(5);
  const [sent, setSent]           = useState(false);

  useEffect(() => {
    let timer;
    if (!sent && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (!sent && countdown === 0) {
      setSent(true);
      onToast('Emergency alert dispatched to your contacts and 112 ERSS.');
    }
    return () => clearTimeout(timer);
  }, [countdown, sent, onToast]);

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="sos-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={16}/></button>
        <div className="sos-modal-badge"><Siren size={22}/></div>

        <p className="kicker" style={{ color: '#e53935' }}>High Priority Emergency Alert</p>
        <h2>{sent ? 'SOS Alert Dispatched' : `Emergency Alert in ${countdown}s`}</h2>

        {/* Unambiguous confirmation under stress per frontend spec */}
        <p className="muted">
          {sent
            ? 'Live GPS location actively shared with Priya (+91 98765 43210) and Police Command Center (112).'
            : 'Sending your live GPS location to Priya (Sister) and 112 Dispatch. Tap below to cancel if safe.'
          }
        </p>

        {!sent ? (
          <button className="sos-modal-safe" onClick={onClose} style={{ background: '#191316' }}>
            <Check size={16}/> Tap to Cancel (I am Safe)
          </button>
        ) : (
          <button className="sos-modal-safe" onClick={onClose}>
            <Check size={16}/> I am safe now
          </button>
        )}

        <small className="sos-modal-note">
          {sent ? 'Emergency personnel will keep in contact until safety is confirmed.' : 'No alert is transmitted if cancelled before timer expires.'}
        </small>
      </div>
    </div>
  );
}

/* Mount Root */
createRoot(document.getElementById('root')).render(<App/>);
