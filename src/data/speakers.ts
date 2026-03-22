export interface Speaker {
  order: number;
  name: string;
  role: string;
  company?: string;
  image: string;
  bio?: string;
  talk?: string;
  talkDescription?: string;
  linkedin?: string;
  slack?: string;
  type?: 'speaker' | 'sponsor';
}

export const placeholderTalkTitle = "Talk Title Coming Soon";
export const placeholderTalkDescription =
  "Full session description coming soon. Check back for details about this talk.";

export const speakers: Speaker[] = [
  {
    order: 7,
    name: "Alexandra Smith",
    role: "Lead Endpoint Security Engineer",
    company: "Adyen",
    image: "/img/speakers/alex.jpg",
    bio: "Alexandra Smith is a Lead Endpoint Security Engineer at Adyen, bringing extensive experience across financial services, fashion, and education. As a Security Researcher and Threat Hunter, Alexandra specializes in Apple platform security within enterprise environments,with deep expertise in deployment, threat detection, vulnerability management, and security governance. Alexandra holds the full suite of Jamf certifications, Jamf Certified Technician, Administrator, Expert, and Endpoint Security Admin, reflecting a strong commitment to staying at the forefront of Apple enterprise management and security.",
    talk: "Trust, But Verify: Exposing Risk in Your App Catalog",
    talkDescription:
      "Every day, our user communities request tools to improve their productivity and enhance their working experience, presenting administrators and security analysts with the unique and complex challenge of validating whether an executable is both suitable and safe. In this talk, we'll explore techniques for inspecting the structure of mach binaries, taking a closer look at choices made by developers and threat actors alike that can help us make informed choices about the software we adopt and use.",
    linkedin: "https://www.linkedin.com/in/aqmain87/",
    slack: "https://macadmins.slack.com/team/UHK2G5YLW",
  },
  {
    order: 8,
    name: "Henry Stamerjohann",
    role: "Platform Engineer",
    company: "Fleet",
    image: "/img/speakers/henry.png",
    bio: "Henry Stamerjohann is a platform engineer, consultant, and was a co-founder of Zentral in 2015. He is a primary contributor to the Mac Admins SOFA project and the Swift Dialog project. He is also a contributor and developer on many other open-source projects focused around Apple device management in the enterprise and government. Henry has a new Roland TR-1000 drum machine! He lives in Hamburg, Germany and is currently a Solutions Consultant and individual contributor at Fleet Device Management.",
    talk: "Unlock the future of device management with Fleet",
    talkDescription:
      "Join Fleet Device Management Solutions Consultants Harrison Ravazzolo and Henry Stamerjohann  for a practical look at Fleet's infrastructure-as-code approach to device management. Fleet’s API-first design allows admins to control every endpoint management setting with version-controlled YAML files declaratively and push the changes to the Fleet console using GitOps-native capabilities built into the fleetctl CLI binary. In this session you’ll learn about workflows and tools to create self-documenting configuration files and collaborative change management practices. Do what you can’t do clicking a GUI in your legacy solution: see every change, undo any error, repeat every success.",
    linkedin: "https://www.linkedin.com/in/henry-st/",
    slack: "https://macadmins.slack.com/team/U055NGH5R",
  },
  {
    order: 6,
    name: "Harrison Ravazzolo",
    role: "Solutions Consultant",
    company: "Fleet",
    image: "/img/speakers/harrison.jpg",
    bio: "Harrison Ravazzolo is a security, identity and client platform engineer formerly with Deputy and other companies in Silicon Valley. He is a chef & baker who does real gigs in real restaurants in San Francisco, CA (one of the world's premiere food scenes.) He is also a rock climber & is a huge fan of Yogi Bear (or maybe Yoga...) Harrison is currently a Solutions Consultant with Fleet Device Management.",
    talk: "Unlock the future of device management with Fleet",
    talkDescription:
      "Join Fleet Device Management Solutions Consultants Harrison Ravazzolo and Henry Stamerjohann  for a practical look at Fleet's infrastructure-as-code approach to device management. Fleet’s API-first design allows admins to control every endpoint management setting with version-controlled YAML files declaratively and push the changes to the Fleet console using GitOps-native capabilities built into the fleetctl CLI binary. In this session you’ll learn about workflows and tools to create self-documenting configuration files and collaborative change management practices. Do what you can’t do clicking a GUI in your legacy solution: see every change, undo any error, repeat every success.",
    linkedin: "https://www.linkedin.com/in/harrison-ravazzolo/",
    slack: "https://macadmins.slack.com/team/U02792PDA2W",
  },
  {
    order: 9,
    name: "David Starr",
    role: "Partners",
    company: "Workbrew",
    image: "/img/speakers/david.jpg",
    bio: "David Starr has spent almost 25 years focused entirely on architecting Apple solutions for business, enterprise, and education organizations. David was a Consulting Engineer at Apple in the US and he later co-founded Black Glove, a managed services provider dedicated to delivering scaleable Apple-centric IT services.Today, David leads Partners @ Workbrew (https://workbrew.com/), helping bring Workbrew’s secure software delivery platform to organizations around the world. He is a proud member of the Benelux and European MacAdmin communities and is based in The Hague, Netherlands where he lives with his wife and two children.",
    talk: "Securing Developer Workflows (With the Tools They Already Love)",
    talkDescription:
      "Developers are often left to manage their own machines - installing what they need through Homebrew, GitHub, and increasingly via AI agents requesting additional tools on their behalf. As this ecosystem expands, security and IT teams struggle to maintain visibility, enforce policy, and prove compliance - especially on Macs operating with elevated administrator privileges. This session explores how to secure macOS developer environments without disrupting how developers need to work. We’ll look at Homebrew as a package manager, Workbrew’s approach to visibility and management for Homebrew, and how to embed governance directly into Git-based workflows developers are already using.",
    linkedin: "https://www.linkedin.com/in/starrdavid/",
    slack: "https://macadmins.slack.com/team/U05RJUB8C3Z",
  },
  {
    order: 3,
    name: "Weldon Dodd",
    role: "Distinguished Engineer",
    company: "Iru",
    image: "/img/speakers/weldon.jpg",
    bio: "Weldon Dodd began his career running a campus Mac lab and NeXT lab at the University of California. He then went to wireless telecom just as digital networks and the Internet came to mobile. The next stage was automating large Apple deployments and running the Apple Authorized Training Center in Colorado. Weldon joined Kandji in early 2020 where he has built and led several teams, and now serves as a Distinguished Engineer.",
    talk: "The Perpetual Promise of Passkeys & Passwordless",
    talkDescription:
      "We've been promised powerful and profound superpowers with a passwordless future powered by passkeys. What are passkeys? What do they do and why do we want them? How does this work with Apple and others? Weldon Dodd from Iru will share powerful principles and pointers to help power a prudent and pragmatic passkey provisioning project to push your powerhouse IT practice towards a peerless passwordless paradise.",
    linkedin: "https://www.linkedin.com/in/weldondodd/",
    slack: "https://macadmins.slack.com/team/U05671ZSM",
  },
  {
    order: 4,
    name: "Guillaume Gète",
    role: "Apple consultant",
    company: "Gete.Net Consulting",
    image: "/img/speakers/guillaume.jpg",
    bio: "Guillaume Gète is a renowned French Apple consultant and technical expert who has been navigating the Apple ecosystem since the days of System 7. With over thirty years of experience, he has become a leading voice in the Mac admin community by bridging the gap between complex infrastructure and the end-user experience. As an author of several reference books on macOS, Guillaume identifies himself as an « Apple Experience Creator for the enterprise ». He specializes in MDM strategy, security compliance, and automated provisioning, ensuring that the « Apple Way » delivers its full potential in professional environments, and creating useful tools for Mac admins like DiskMaker X. Beyond the technical architecture, Guillaume is a passionate educator. He believes that learning technology should be as engaging as using it, often injecting a healthy dose of humor into his training sessions to demystify even the most daunting IT concepts. Oh, and he's avid Doctor Who fan, too.",
    talk: "From Zero to Hero : Making Onboarding Magical",
    talkDescription:
      "First impressions are everything, yet the initial setup is often a source of « notification fatigue » and confusion. This session traces the evolution of macOS interaction, showing how to move from legacy « system beeps » to modern, sophisticated dialogues using powerful tools like Setup Manager, swiftDialog or Support App to guide users without overwhelming them. We will focus on transforming your deployment into a « seamless onboarding » journey that feels native and trustworthy. By mastering the art of the well-timed prompt, you can turn a cold machine into a ready-to-work tool, effectively reducing « day zero » support tickets while creating a truly professional user experience that reflects the quality of the Apple ecosystem.",
    linkedin: "https://www.linkedin.com/in/guillaume-gete/",
    slack: "https://macadmins.slack.com/team/U062DA2CS",
  },
  {
    order: 1,
    name: "Ulrik Aabye-Hansen",
    role: "Apple consultant",
    company: "TalkTech ApS",
    image: "/img/speakers/ulrik.jpg",
    bio: "Ulrik Aabye-Hansen is a seasoned Apple consultant, trainer, and co-founder of TalkTech ApS. With a path into the world of Apple originally shaped by music, he now specializes in Apple device management planning, automation, and security — but first and foremost in helping organizations train and upskill staff to maintain modern, manageable Apple environments. Ulrik delivers Apple-focused and Device Management training across EMEIA and is known for turning complex technical topics into clear, practical sessions. A regular conference speaker, he combines deep technical insight with real-world experience and a movie reference or two.",
    talk: "Do Mac Administrators Dream of Electric Users?",
    talkDescription:
      "We build elegant deployments, polished scripts, and “foolproof” workflows. And then… users surprise us. In this session, Ulrik Aabye-Hansen explores the often-overlooked human communication layer of Mac administration. Because our environments aren’t just technical systems — they’re human ones, filled with perception, emotion, and the occasional behaviour that makes perfect sense to humans but looks completely irrational to admins. Sometimes our workflows feel like they were designed for replicants rather than people. Borrowing a few ideas from psychology (and a certain sci-fi classic), we’ll examine how users actually experience dialogs, prompts, and automated processes. Through relatable real-world examples and a live Voight-Kampff test, we’ll see how small changes in communication and design can dramatically change user behaviour — without touching the underlying tech. Because we don’t just manage Macs. We design experiences for humans.",
    linkedin: "https://www.linkedin.com/in/ulrikhansen/",
    slack: "https://macadmins.slack.com/team/U0DJM0221",
  },
  {
    order: 2,
    name: "Armin Briegel",
    role: "Senior Consulting Engineer",
    company: "Jamf",
    image: "/img/speakers/armin.jpg",
    bio: "Armin Briegel has been managing Macs and their users since the time when Apple was beleaguered. He has held most existing technical job titles at one time or another. He worked for at Apple in the US and Germany. Then, he put theory into practice as a System Administrator and Consultant. He used to live near Leiden. He currently works for Jamf and also writes and posts on his weblogs, scriptingosx.com and macadmins.news.",
    talk: "A Few of Our Favorite (Mac Admin) Things",
    talkDescription:
      "Armin and Rob will share a collection of tools, tricks, workflows, and ideas that have made their lives as Mac admins easier (or at least more interesting). Expect practical insights, unexpected discoveries, and a few things you might immediately want to add to your own toolkit. Or as we like to think of it: the kind of knowledge that usually gets shared in hallway conversations — now on stage.",
    linkedin: "https://www.linkedin.com/in/armin-briegel/",
    slack: "https://macadmins.slack.com/team/U06R6V15J",
  },
  {
    order: 10,
    name: "Rob Potvin",
    role: "Senior Consulting Engineer",
    company: "Jamf",
    image: "/img/speakers/rob.jpg",
    bio: 'Rob is a Canadian expat based in the Netherlands, where he lives with his family and in the past helped train what feels like half of Europe’s Mac Admins. A long-time Mac admin and volunteer of the Mac Admins community, he brings deep, hands-on experience in managing, deploying, and supporting Apple devices and virtual "apple" machines.',
    talk: "A Few of Our Favorite (Mac Admin) Things",
    talkDescription:
      "Armin and Rob will share a collection of tools, tricks, workflows, and ideas that have made their lives as Mac admins easier (or at least more interesting). Expect practical insights, unexpected discoveries, and a few things you might immediately want to add to your own toolkit. Or as we like to think of it: the kind of knowledge that usually gets shared in hallway conversations — now on stage.",
    linkedin: "https://www.linkedin.com/in/robpotvin/",
    slack: "https://macadmins.slack.com/team/U07706K3K",
  },
  {
    order: 5,
    name: "Rachelle Noel",
    role: "Sales Engineer",
    company: "Jamf",
    image: "/img/speakers/rachelle.jpg",
    bio: "Rachelle Noel is a Sales Engineer at Jamf with 20 years of post-production experience and a passion for clear, effective workflows. She works closely with customers and partners across technology and education sectors to translate complex challenges into workable solutions. Rachelle’s commitment to clarity and empowerment makes her sessions both actionable and engaging for IT professionals at any level.",
    talk: "Think Different. Then Update: Software Updates, It's been a journey.",
    talkDescription:
      "Apple's software update ecosystem has evolved from manual updates to declarative management. Let's take a walk down memory to see how far we have come and where software updates is going.",
    linkedin: "https://www.linkedin.com/in/rachelle-noel-3703992a/",
    slack: "https://macadmins.slack.com/team/U04K3J4D1GA",
  }
];
