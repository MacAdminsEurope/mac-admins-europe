export interface Sponsor {
  name: string;
  tier: "platinum" | "gold" | "silver" | "patron";
  logo?: string;
  url?: string;
  tagline?: string;
}

export type SponsorTier = Sponsor["tier"];

export const sponsors: Sponsor[] = [
  {
    name: "Jamf",
    tier: "platinum",
    logo: "/img/sponsors/jamfdark.png",
    url: "/2026/sponsors/jamf",
    tagline: "",
  },
  {
    name: "Iru",
    tier: "platinum",
    logo: "/img/sponsors/irulogo.png",
    url: "/2026/sponsors/iru",
    tagline: "",
  },
  {
    name: "Fleetdm",
    tier: "platinum",
    logo: "/img/sponsors/fleet-logo-dark-rgb.png",
    url: "/2026/sponsors/fleetdm",
    tagline: "",
  },
  {
    name: "WorkBrew",
    tier: "gold",
    logo: "/img/sponsors/Logo-Workbrew-purple.png",
    url: "https://workbrew.com",
    tagline: "Workbrew is a secure software delivery platform that makes managing Homebrew simple and scalable across your organization. Homebrew is trusted by developers and installed on millions of devices, but managing it across teams creates visibility gaps, compliance risk, and operational overhead. Workbrew brings structure and control to that complexity. With zero-touch deployment, full visibility into installed packages and versions, and enterprise-grade security built in, you can standardize software delivery without slowing developers down. Deploy from a library of 15,000+ packages in minutes, enforce policies centrally, manage vulnerabilities proactively, and keep every package patched automatically. Built for IT and security teams, Workbrew helps you maintain accurate inventory, meet compliance requirements, and securely deliver the software your teams need at scale.",
  },
  {
    name: "ProWarehouse",
    tier: "gold",
    logo: "/img/sponsors/pro-warehouse.png",
    url: "https://www.prowarehouse.nl/en/",
    tagline: "Pro Warehouse delivers complete solutions for the Apple platform: from expert advice and logistics to seamless deployment, comprehensive management and ongoing support for organisations working with Apple devices. As an Apple Premium Business Partner, we help businesses design, implement and optimise their modern workplace. With deep expertise, personal guidance and a strong focus on user experience, we ensure technology not only works reliably, but truly contributes to productivity, continuity and sustainable growth.",
  },
  {
    name: "LAI",
    tier: "gold",
    logo: "/img/sponsors/lai.png",
    url: "https://www.lai.nl/?lang=en",
    tagline: "Since 1987, LAI has been the leading training partner for Apple technologies in Europe. We are proud of our long-standing expertise and experience in providing high-quality Apple training for businesses, educational institutions, and government agencies. \n LAI only works with experienced, certified instructors who know how to explain difficult subjects with ease and humor. Students appreciate the LAI approach and enjoy coming to our modern, well-equipped training facilities.",
  },
  {
    name: "MBH Global",
    tier: "gold",
    logo: "/img/sponsors/mbh.png",
    url: "https://www.mbhglobal.co.uk",
    tagline: "MBH Global helps organisations worldwide manage e-waste pickups through our bespoke client portal, removing the operational burden from IT teams. We securely recover, data-wipe, process, and report on IT assets all in one place, providing certified destruction documentation, ESG impact reporting, and rebate visibility. With operations across the UK, Europe, and the USA, we deliver secure IT lifecycle services including on-site data destruction, data centre decommissioning, and sustainable reuse. We ensure compliance, protect data, and maximise value at every stage of the asset lifecycle",
  },
  {
    name: "ARP",
    tier: "gold",
    logo: "/img/sponsors/arp.png",
    url: "https://www.arp.nl/nl-en/",
    tagline: "ARP is Apple Business Partner voor organisaties die Apple gebruiksklaar willen inzetten. Van levering tot installatie en integratie binnen de IT-omgeving: alles geregeld door ervaren en gecertificeerde Apple technici. Met een partner voor hardware, services en support wordt de volledige Apple-werkplek uit handen genomen. Als Apple Authorised Service Provider (AASP) verzorgen wij onderhoud en reparaties aan Apple-hardware, zowel in- als out-of-warranty.",
  },
  {
    name: "Root3",
    tier: "silver",
    logo: "/img/sponsors/root3.png",
    url: "https://www.root3.nl/en/",
    tagline: "Root3 believes that technology only truly works when people can use it effortlessly. As Apple specialists, we create digital environments where security and ease of use merge seamlessly. Our focus spans the complete employee journey: from zero-touch provisioning and modern device management to a watertight zero trust architecture. We ensure that Apple works within organizations the way Apple was meant to, creating space for calm, focus, and growth. By removing technical friction, we make Apple in the workplace effortless. Root3 - Apple Solutionists",
  },
  {
    name: "NEXT Enterprise GmbH",
    tier: "silver",
    logo: "/img/sponsors/next.png",
    url: "https://www.nextenterprise.it",
    tagline: "Apple in the enterprise, COMPETENT, COMMITTED. SOLUTION-ORIENTED! Our vision: As a leading partner for the Apple ecosystem, NEXT strives to accompany companies into the digital future by offering outstanding IT security and management solutions. Our mission: Through a unique combination of individual consulting, tailor-made solutions and managed services, NEXT paves the way to a successful digital future - always with our sights set on the horizon!",
  },
  {
    name: "EBF",
    tier: "silver",
    logo: "/img/sponsors/ebf.png",
    url: "https://ebf.com/",
    tagline: "Let EBF be your guide to the Modern Workplace with Macs. Since 1994 we are passionate about creating outstanding workplace management and smart modern work solutions, protected by IT-Security tools and nowadays combined with AI. As an Apple MSP and Jamf Elite Partner we deliver the best experience for your Mac Management - and we also have strong partnerships with Microsoft, Ivanti, BlackBerry, Omnissa a.o. to enhance your mixed device fleet! Independent and fully committed we provide guidance you can trust. Over 30 years of experience, 1,000+ customers and over 5 million successfully managed devices speak for themselves - and for us.",
  },
  {
    name: "Lab9 Pro",
    tier: "silver",
    logo: "/img/sponsors/lab9.png",
    url: "https://lab9pro.be/",
    tagline: "An IT partner (in crime) who shares your passion for Apple. We have been helping organizations and schools realize their IT vision for 30 years. We do not shy away from challenges: from network infrastructure to process automation to successful device management and security, our best people are happy to sink their teeth into it. Lab9 Pro is the B2B division of Apple Premium Partner Lab9. As an Apple Authorized Service Provider and Apple Authorized Education Specialist, we are the only player in Belgium with the three most important Apple certifications. This is of course a great honor for us, but above all it means a lot of knowledge and benefits that we would like to share with you.",
  },
  {
    name: "Zentral",
    tier: "silver",
    logo: "/img/sponsors/zentral.png",
    url: "https://www.zentral.com",
    tagline: "Company description: Zentral is the leading European Apple MDM vendor and integrator of open source device management solutions for Apple in Enterprise. Since the release of the official Terraform provider in 2022 Zentral has been setting the standard for config-as-code at scale and helps customers solve reliability, auditability, role-based access problems. Zentral ships with a ready-to-use stack of integrations that usually takes IT teams years to build, such as event shipping to SIEMS, metrics & dashboards and an ACME capable custom CA.",
  },
  {
    name: "iKON Informatika",
    tier: "silver",
    logo: "/img/sponsors/ikon.png",
    url: "https://ikoninformatika.hu",
    tagline: "iKON Informatika is an Apple Business Partner and Apple-focused system integrator supporting large enterprise customers across Central Europe. We specialize in Apple device lifecycle management, including deployment, management, security, and compliance. Our team brings hands-on experience from complex, large-scale deployments and works closely with organizations, primarily in regulated industries, to design and operate enterprise-grade Apple environments at scale. We focus on delivering practical, secure solutions for real-world enterprise use.",
  },
  {
    name: "macPaw",
    tier: "patron",
    logo: "/img/sponsors/macpaw.png",
    url: "https://macpaw.com",
    tagline: "MacPaw creates software that empowers people and makes their lives a little easier.",
  },
  {
    name: "Jamf User Groups",
    tier: "patron",
    logo: "/img/sponsors/Jamf-user-group.png",
    url: "https://community.jamf.com/p/user-groups",
    tagline: "Jamf User Groups (JUGs) are community-led local meetups where Apple IT admins connect, share knowledge, and learn about managing Apple devices with Jamf. Check out their directory of user groups and join whichever ones appeal to you (near or far)!",
  },
];

export const tierOrder: SponsorTier[] = ["platinum", "gold", "silver", "patron"];

export const tierLabels: Record<SponsorTier, string> = {
  platinum: "Platinum Sponsors",
  gold: "Gold Sponsors",
  silver: "Silver Sponsors",
  patron: "Patron Sponsors",
};

export const tierPlaceholderCounts: Record<SponsorTier, number> = {
  platinum: 2,
  gold: 5,
  silver: 6,
  patron: 1,
};

export const sponsorshipTiers = [
  {
    name: "Patron",
    class: "patron",
    isIncremental: true,
    benefits: [
      { label: "Inclusive tickets", value: "1" },
      { label: "Logo on our website", value: true },
      { label: "Branding on stage", value: true },
    ],
  },
  {
    name: "Silver",
    class: "silver",
    isIncremental: true,
    benefits: [
      { label: "Inclusive tickets", value: "2" },
      { label: "Discounted tickets", value: "Max. 2" },
      { label: "Social media promotion", value: true },
      { label: "Newsletter inclusion", value: true },
      { label: "Logo in YouTube videos", value: true },
    ],
  },
  {
    name: "Gold",
    class: "gold",
    soldOut: true,
    isIncremental: true,
    benefits: [
      { label: "Inclusive tickets", value: "3" },
      { label: "Discounted tickets", value: "Max. 3" },
      { label: "Exhibition space", value: "Standard" },
    ],
  },
  {
    name: "Platinum",
    class: "platinum featured",
    soldOut: true,
    isIncremental: true,
    benefits: [
      { label: "Inclusive tickets", value: "4" },
      { label: "Discounted tickets", value: "Max. 4" },
      { label: "Exhibition space", value: "Premium" },
      { label: "Logo on event badge", value: true },
      { label: "Speaker slot (25 min)", value: true },
      { label: "Speaker bio on website", value: true },
    ],
  },
];
