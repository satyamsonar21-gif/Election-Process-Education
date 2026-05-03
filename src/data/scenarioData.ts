export interface ScenarioQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Scenario {
  id: string;
  title: string;
  role: string;
  emoji: string;
  description: string;
  color: string;
  bgColor: string;
  questions: ScenarioQuestion[];
}

export const scenarios: Scenario[] = [
  {
    id: "presiding-officer",
    title: "You Are the Presiding Officer",
    role: "Presiding Officer",
    emoji: "👨‍⚖️",
    description: "You are in charge of a polling station on election day. Handle real challenges that officers face — from EVM malfunctions to maintaining order.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    questions: [
      {
        question: "It's 6:45 AM and polling starts at 7 AM. You discover that the EVM is showing an error during the mock poll. What do you do?",
        options: [
          "Start the election anyway and fix it later",
          "Replace the EVM with the reserve unit and conduct a fresh mock poll",
          "Cancel the election at this booth",
          "Call the candidate agents and ask them to fix it",
        ],
        correctIndex: 1,
        explanation: "As per ECI guidelines, if an EVM malfunctions before polling, the Presiding Officer must replace it with the reserve unit, conduct a fresh mock poll in front of polling agents, and then begin the poll.",
      },
      {
        question: "A voter arrives without any photo ID but claims to be registered. What action do you take?",
        options: [
          "Allow them to vote based on their word",
          "Ask polling agents to identify them and issue a 'challenged vote' if needed",
          "Turn them away immediately",
          "Let them vote if they know their voter serial number",
        ],
        correctIndex: 1,
        explanation: "Voters must carry valid photo ID. If identity is disputed, the Presiding Officer can ask polling agents if they recognize the person. If challenged, a 'challenged vote' process is followed per Section 49(2) of the RPA.",
      },
      {
        question: "A political party worker is distributing pamphlets 50 meters from the polling booth. What do you do?",
        options: [
          "Ignore it since it's outside the booth",
          "Confiscate the pamphlets yourself",
          "Ask the police on duty to remove them — campaigning is prohibited within 100 meters",
          "Allow it since the silence period is over",
        ],
        correctIndex: 2,
        explanation: "Campaigning within 100 meters of a polling station is prohibited under Section 130 of the RPA. The Presiding Officer should alert police on duty to remove the violator.",
      },
      {
        question: "After polling ends, what is the correct procedure for the EVM?",
        options: [
          "Hand it to the winning candidate's agent",
          "Seal the EVM in presence of polling agents, prepare account of votes, and escort it to the strong room",
          "Count the votes immediately at the booth",
          "Leave the EVM at the booth and submit the paperwork",
        ],
        correctIndex: 1,
        explanation: "After polling ends, the Presiding Officer must press the 'Close' button, seal the EVM with special seals (allowing agents to put their seals too), prepare Form 17C (account of votes), and transport the EVM under security to the strong room.",
      },
      {
        question: "A voter has cast their vote but the VVPAT slip shows a different candidate's name. What do you do?",
        options: [
          "Ignore it — the EVM record is final",
          "Allow the voter to file a complaint, conduct a test vote, and if the error persists, replace the VVPAT unit",
          "Discard the vote and let them re-vote",
          "Stop the entire election",
        ],
        correctIndex: 1,
        explanation: "The voter can report a VVPAT mismatch. The Presiding Officer conducts a test vote. If the error is confirmed, the VVPAT unit is replaced and a report is filed with the Returning Officer.",
      },
    ],
  },
  {
    id: "counting-agent",
    title: "You Are the Counting Agent",
    role: "Counting Agent",
    emoji: "🔢",
    description: "You represent a candidate during the vote counting process. Watch for irregularities, verify VVPAT slips, and ensure fair counting.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    questions: [
      {
        question: "Counting day begins. You notice that the seal on one EVM's strong room appears tampered with. What should you do?",
        options: [
          "Ignore it and wait for counting to proceed",
          "Immediately bring it to the notice of the Returning Officer and demand inspection before counting",
          "Open the EVM yourself to check",
          "Call the media to report it",
        ],
        correctIndex: 1,
        explanation: "Any irregularity in seals or storage must be reported to the Returning Officer immediately. The RO will inspect the unit, check CCTV footage of the strong room, and record the objection before deciding whether to count or set aside that EVM.",
      },
      {
        question: "The Returning Officer announces that VVPAT verification will be done for 5 randomly selected booths per constituency. Why only 5?",
        options: [
          "Because the Supreme Court ordered it (N. Chandrababu Naidu v. Union of India, 2019)",
          "Because the ECI decided it saves time",
          "Because EVMs don't need verification",
          "Because only 5 booths had VVPATs",
        ],
        correctIndex: 0,
        explanation: "The Supreme Court in 2019 directed that VVPAT slips from 5 randomly selected polling stations per constituency must be matched against EVM results, increasing from the earlier 1 booth per constituency.",
      },
      {
        question: "During counting, you observe that a round shows an unusually high vote count for one candidate from a specific booth. What can you do?",
        options: [
          "Nothing — you must accept the count",
          "File an application for re-count of that particular round with the Returning Officer",
          "Demand a complete re-election",
          "Stop the counting process",
        ],
        correctIndex: 1,
        explanation: "Under Rule 63 of the Conduct of Elections Rules, a counting agent can request a re-count of votes in any round. The Returning Officer may allow the re-count if the request is reasonable.",
      },
      {
        question: "What is a 'Postal Ballot' and when are they counted?",
        options: [
          "Votes cast online — counted first",
          "Votes sent by mail by eligible voters — counted BEFORE EVM counting begins",
          "Votes from overseas voters — not counted",
          "Votes on paper ballots — counted last",
        ],
        correctIndex: 1,
        explanation: "Postal ballots are used by service voters, senior citizens 80+, PwD, and essential workers. They are counted first (30 minutes before EVM counting begins) under the supervision of the RO.",
      },
      {
        question: "The final count shows your candidate lost by just 200 votes. What is your option?",
        options: [
          "Accept the result — there's nothing you can do",
          "File an election petition in the High Court within 45 days challenging the result",
          "Demand immediate re-election",
          "Appeal to the Election Commission to reverse the result",
        ],
        correctIndex: 1,
        explanation: "Under Section 80 of the RPA, any candidate or elector can challenge election results by filing an election petition in the High Court within 45 days of the result declaration. The ECI itself cannot reverse a declared result.",
      },
    ],
  },
  {
    id: "election-commissioner",
    title: "You Are the Election Commissioner",
    role: "Election Commissioner",
    emoji: "🏛️",
    description: "You lead the Election Commission of India. Make decisions on election scheduling, MCC enforcement, and ensuring free and fair elections.",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    questions: [
      {
        question: "You need to schedule elections for 543 Lok Sabha constituencies. Several states have extreme weather. How do you handle this?",
        options: [
          "Hold elections on a single day nationwide",
          "Conduct elections in multiple phases to manage security and accommodate weather/geographical challenges",
          "Let each state decide their own date",
          "Hold elections only when the weather is good",
        ],
        correctIndex: 1,
        explanation: "Indian general elections are conducted in phases (7 phases in 2024) to ensure adequate security forces deployment across the country and accommodate challenging weather and geographical terrain.",
      },
      {
        question: "A sitting Chief Minister announces a new welfare scheme worth ₹5,000 crore after the Model Code of Conduct has come into effect. What do you do?",
        options: [
          "Allow it — the government can function normally",
          "Issue a notice for violation of MCC and direct the government to put the scheme on hold until elections conclude",
          "Ignore it — MCC is not legally binding",
          "Arrest the Chief Minister",
        ],
        correctIndex: 1,
        explanation: "The MCC prohibits the ruling government from announcing new schemes, grants, or projects that can influence voters once elections are announced. The ECI issues notices and can direct the government to defer such announcements.",
      },
      {
        question: "Intelligence reports suggest potential violence in a constituency during polling day. What is your course of action?",
        options: [
          "Cancel elections in that constituency entirely",
          "Deploy additional Central Armed Police Forces (CAPF) and arrange for extra micro-observers",
          "Let the local police handle it alone",
          "Postpone the election to a later date permanently",
        ],
        correctIndex: 1,
        explanation: "The ECI can deploy Central Armed Police Forces (CAPF) like CRPF, BSF, and CISF to sensitive areas. Additional micro-observers, videographers, and flying squads are also deployed to ensure peaceful polling.",
      },
      {
        question: "A viral video on social media shows a candidate offering cash to voters. How should the ECI respond?",
        options: [
          "Ignore social media — it's not the ECI's jurisdiction",
          "Activate the cVIGIL app response, order an investigation by flying squads, and file an FIR if evidence supports the complaint",
          "Ban social media during elections",
          "Disqualify the candidate immediately without investigation",
        ],
        correctIndex: 1,
        explanation: "The ECI's cVIGIL app allows citizens to report violations with video evidence. Flying squads investigate within 100 minutes ('golden hour'). If confirmed, FIRs are filed and the candidate can face disqualification under Section 123 of the RPA.",
      },
      {
        question: "After elections, a major party demands all VVPAT slips be counted (100% verification), not just 5 booths per constituency. How do you respond?",
        options: [
          "Agree immediately and count all VVPAT slips",
          "Explain that the current 5-per-constituency norm was set by the Supreme Court, and any change requires a court order or rule amendment",
          "Ignore the demand completely",
          "Count 50% of VVPAT slips as a compromise",
        ],
        correctIndex: 1,
        explanation: "The ECI follows the Supreme Court's directive for 5 random VVPAT verifications per constituency. Any change to this process requires either a Supreme Court order or formal amendment to election rules.",
      },
    ],
  },
];
