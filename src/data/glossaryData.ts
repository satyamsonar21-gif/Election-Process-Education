export const categories = [
  { id: "all", label: "All Terms" },
  { id: "voting", label: "Voting" },
  { id: "institutions", label: "Institutions" },
  { id: "legal", label: "Legal & Laws" },
  { id: "technology", label: "Technology" },
  { id: "campaigns", label: "Campaigns" },
];

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  { term: "Aadhaar", definition: "A 12-digit unique identity number issued by UIDAI to every Indian resident. Accepted as valid photo ID at polling booths.", category: "voting" },
  { term: "Anti-Defection Law", definition: "The 52nd Amendment Act (1985) added the Tenth Schedule to the Constitution, disqualifying elected members who switch parties after election.", category: "legal" },
  { term: "Article 324", definition: "The article of the Indian Constitution that vests the superintendence, direction, and control of elections in the Election Commission of India.", category: "legal" },
  { term: "Ballot Unit", definition: "The part of the EVM where candidates' names, serial numbers, and party symbols are displayed alongside blue voting buttons.", category: "technology" },
  { term: "BLO (Booth Level Officer)", definition: "A government official responsible for maintaining the voter list at the individual polling booth level and ensuring its accuracy.", category: "institutions" },
  { term: "Bye-Election", definition: "An election held to fill a vacancy in a constituency caused by death, resignation, or disqualification of a sitting member.", category: "voting" },
  { term: "Campaigning", definition: "The process by which candidates and parties seek votes through rallies, advertisements, door-to-door canvassing, and social media.", category: "campaigns" },
  { term: "Chief Election Commissioner (CEC)", definition: "The head of the Election Commission of India. The CEC can only be removed through impeachment, similar to a Supreme Court judge.", category: "institutions" },
  { term: "Constituency", definition: "A defined geographical area whose eligible voters elect one representative. India has 543 Lok Sabha and ~4,120 Vidhan Sabha constituencies.", category: "voting" },
  { term: "Control Unit", definition: "The core component of the EVM that stores vote data. It is kept with the Presiding Officer and displays total votes polled.", category: "technology" },
  { term: "Counting Agent", definition: "A representative appointed by a candidate to observe the vote counting process at the counting center on their behalf.", category: "voting" },
  { term: "Delimitation", definition: "The process of redrawing the boundaries of electoral constituencies based on population changes revealed by the Census.", category: "legal" },
  { term: "ECI (Election Commission of India)", definition: "An autonomous constitutional body (Article 324) responsible for administering free and fair elections across India. Established January 25, 1950.", category: "institutions" },
  { term: "Electoral Bond", definition: "A financial instrument (struck down by the Supreme Court in 2024) that was used for anonymous political donations to registered parties.", category: "legal" },
  { term: "Electoral Roll", definition: "The official list of all registered voters in a constituency. Also called the Voter List. Updated periodically by the ECI.", category: "voting" },
  { term: "EPIC (Voter ID Card)", definition: "The official Elector's Photo Identity Card issued by the ECI containing the voter's photo, name, age, and constituency details.", category: "voting" },
  { term: "EVM (Electronic Voting Machine)", definition: "An electronic device for recording votes used since 1982 (Kerala pilot). Each EVM stores up to 2,000 votes, runs on a single battery, and has been used nationwide since 2004.", category: "technology" },
  { term: "Exit Poll", definition: "A survey conducted after voters leave the polling booth. Banned from broadcast until the last phase of voting ends.", category: "campaigns" },
  { term: "FPTP (First-Past-The-Post)", definition: "The electoral system used in India where the candidate with the highest number of votes in a constituency wins, even without an absolute majority.", category: "voting" },
  { term: "Form 6", definition: "The application form for new voter registration. Can be filled online at the NVSP portal or submitted at the local Electoral Registration Office.", category: "voting" },
  { term: "Indelible Ink", definition: "A semi-permanent ink applied to the left index finger of voters after casting their vote to prevent duplicate voting. Contains silver nitrate.", category: "technology" },
  { term: "Lok Sabha", definition: "The lower house of India's Parliament (House of the People). Has 543 elected members. A party or coalition needs 272+ seats to form the government.", category: "institutions" },
  { term: "Manifesto", definition: "A public declaration of the policies, promises, and plans of a political party, released before elections to attract voters.", category: "campaigns" },
  { term: "Model Code of Conduct (MCC)", definition: "Guidelines issued by the ECI for parties and candidates during elections. Covers speeches, rallies, polling day conduct, and use of government resources.", category: "legal" },
  { term: "NOTA (None Of The Above)", definition: "A ballot option introduced in 2013 (Supreme Court ruling) allowing voters to reject all candidates. If NOTA gets the most votes, the next highest candidate still wins.", category: "voting" },
  { term: "NVSP Portal", definition: "The National Voters' Service Portal (nvsp.in) where citizens can register to vote, check their name on the electoral roll, and apply for corrections.", category: "technology" },
  { term: "Panchayat", definition: "A system of local self-governance in rural India. Panchayat elections are conducted by the State Election Commission, not the ECI.", category: "institutions" },
  { term: "Postal Ballot", definition: "A facility allowing certain voters (service personnel, seniors 80+, PwD, essential workers) to cast their vote by mail.", category: "voting" },
  { term: "Presiding Officer", definition: "The senior-most election official in charge of a polling station. Responsible for poll conduct, EVM handling, and maintaining order.", category: "institutions" },
  { term: "Rajya Sabha", definition: "The upper house of India's Parliament (Council of States). Has 245 members — 233 elected by state legislatures and 12 nominated by the President.", category: "institutions" },
  { term: "Returning Officer (RO)", definition: "The official responsible for managing the entire election process in a constituency — from nomination to declaration of results.", category: "institutions" },
  { term: "RPA (Representation of the People Act)", definition: "The 1950 and 1951 acts governing voter qualifications, election conduct, corrupt practices, and dispute resolution.", category: "legal" },
  { term: "Silence Period", definition: "The 48-hour period before polling day during which all campaigning must stop, giving voters time to reflect without external influence.", category: "campaigns" },
  { term: "Strong Room", definition: "A secure, sealed room where EVMs are stored after polling and before counting. Under 24/7 CCTV surveillance and armed security.", category: "technology" },
  { term: "SVEEP", definition: "Systematic Voters' Education and Electoral Participation — the ECI's flagship program to educate voters and improve turnout.", category: "campaigns" },
  { term: "Tender Vote", definition: "If someone has already voted using your identity, you can cast a tender vote on a special ballot paper. It is counted only after investigation.", category: "voting" },
  { term: "Vidhan Sabha", definition: "The State Legislative Assembly. Each state has its own Vidhan Sabha with varying numbers of seats. Members are directly elected using FPTP.", category: "institutions" },
  { term: "VVPAT", definition: "Voter Verifiable Paper Audit Trail — a device attached to the EVM that prints a paper slip showing the candidate's name and party symbol for 7 seconds. Mandatory since 2019.", category: "technology" },
  { term: "Whip", definition: "A directive issued by a party to its legislators instructing them to vote in a particular way. Defying a three-line whip can lead to disqualification.", category: "legal" },
];
