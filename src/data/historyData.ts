export interface ElectionData {
  year: string;
  number: string;
  seats: number;
  turnout: number;
  totalVoters: string;
  winner: string;
  pm: string;
  highlight: string;
}

export const electionHistory: ElectionData[] = [
  { year: "1951-52", number: "1st", seats: 489, turnout: 45.7, totalVoters: "17.3 Cr", winner: "INC", pm: "Jawaharlal Nehru", highlight: "India's first-ever general election — took 4 months to complete with ballot papers." },
  { year: "1957", number: "2nd", seats: 494, turnout: 47.7, totalVoters: "19.4 Cr", winner: "INC", pm: "Jawaharlal Nehru", highlight: "First election in newly reorganized states after the States Reorganisation Act, 1956." },
  { year: "1962", number: "3rd", seats: 494, turnout: 55.4, totalVoters: "21.6 Cr", winner: "INC", pm: "Jawaharlal Nehru", highlight: "Held during the India-China war. Nehru's last election victory." },
  { year: "1967", number: "4th", seats: 520, turnout: 61.3, totalVoters: "25.0 Cr", winner: "INC", pm: "Indira Gandhi", highlight: "INC lost power in 8 states for the first time. Beginning of coalition politics." },
  { year: "1971", number: "5th", seats: 518, turnout: 55.3, totalVoters: "27.4 Cr", winner: "INC(R)", pm: "Indira Gandhi", highlight: "Indira Gandhi's 'Garibi Hatao' slogan led to a landslide INC victory." },
  { year: "1977", number: "6th", seats: 542, turnout: 60.5, totalVoters: "32.1 Cr", winner: "Janata Party", pm: "Morarji Desai", highlight: "First non-Congress government. Elections held after the Emergency (1975-77)." },
  { year: "1980", number: "7th", seats: 529, turnout: 56.9, totalVoters: "35.6 Cr", winner: "INC(I)", pm: "Indira Gandhi", highlight: "Indira Gandhi returned to power with a massive mandate." },
  { year: "1984", number: "8th", seats: 514, turnout: 64.0, totalVoters: "37.9 Cr", winner: "INC", pm: "Rajiv Gandhi", highlight: "Held after Indira Gandhi's assassination. INC won 404 seats — the largest-ever majority." },
  { year: "1989", number: "9th", seats: 529, turnout: 61.9, totalVoters: "49.9 Cr", winner: "Janata Dal", pm: "V.P. Singh", highlight: "First election with voting age lowered to 18 (61st Amendment). Coalition era begins." },
  { year: "1991", number: "10th", seats: 521, turnout: 56.7, totalVoters: "49.8 Cr", winner: "INC", pm: "P.V. Narasimha Rao", highlight: "Rajiv Gandhi assassinated during campaigning. Election conducted in phases." },
  { year: "1996", number: "11th", seats: 543, turnout: 57.9, totalVoters: "59.2 Cr", winner: "BJP", pm: "A.B. Vajpayee", highlight: "BJP emerged as single largest party for the first time. Government lasted only 13 days." },
  { year: "1998", number: "12th", seats: 543, turnout: 62.0, totalVoters: "60.5 Cr", winner: "BJP+", pm: "A.B. Vajpayee", highlight: "NDA coalition formed. India conducted Pokhran-II nuclear tests." },
  { year: "1999", number: "13th", seats: 543, turnout: 60.0, totalVoters: "62.0 Cr", winner: "NDA", pm: "A.B. Vajpayee", highlight: "Held in the aftermath of the Kargil War. NDA won a clear majority." },
  { year: "2004", number: "14th", seats: 543, turnout: 58.1, totalVoters: "67.1 Cr", winner: "UPA", pm: "Manmohan Singh", highlight: "First election with EVMs nationwide. Surprise UPA victory despite 'India Shining' campaign." },
  { year: "2009", number: "15th", seats: 543, turnout: 58.2, totalVoters: "71.7 Cr", winner: "UPA", pm: "Manmohan Singh", highlight: "UPA returned to power. NOTA was not yet available." },
  { year: "2014", number: "16th", seats: 543, turnout: 66.4, totalVoters: "83.4 Cr", winner: "NDA", pm: "Narendra Modi", highlight: "BJP won 282 seats — first single-party majority since 1984. NOTA was available for first time." },
  { year: "2019", number: "17th", seats: 543, turnout: 67.4, totalVoters: "91.2 Cr", winner: "NDA", pm: "Narendra Modi", highlight: "Highest-ever voter turnout. VVPAT used in all constituencies. Largest democratic exercise in history." },
  { year: "2024", number: "18th", seats: 543, turnout: 65.8, totalVoters: "96.8 Cr", winner: "NDA", pm: "Narendra Modi", highlight: "Over 96.8 crore registered voters — world's largest electorate. Conducted in 7 phases." },
];

export const milestones = [
  { year: "1950", title: "ECI Established", desc: "Election Commission of India created on January 25, 1950, before the first general election." },
  { year: "1951", title: "First Election", desc: "India's first general election — the world's largest democratic exercise at the time, spanning 4 months." },
  { year: "1966", title: "First Female PM", desc: "Indira Gandhi became India's first female Prime Minister." },
  { year: "1982", title: "EVM Pilot", desc: "Electronic Voting Machines first used in a pilot project in Paravur, Kerala." },
  { year: "1989", title: "Voting Age Lowered", desc: "61st Amendment reduced voting age from 21 to 18 years." },
  { year: "2004", title: "EVMs Nationwide", desc: "All constituencies used EVMs for the first time in a general election." },
  { year: "2013", title: "NOTA Introduced", desc: "Supreme Court ruling (PUCL v. Union of India) introduced the NOTA option on ballots." },
  { year: "2019", title: "VVPAT Mandatory", desc: "Voter Verifiable Paper Audit Trail machines made mandatory in all constituencies." },
  { year: "2024", title: "Largest Electorate", desc: "96.8 crore registered voters — the largest electoral exercise in human history." },
];
