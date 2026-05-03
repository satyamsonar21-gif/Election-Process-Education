import { FileText, CheckCircle, ExternalLink, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function VoterRegistrationGuide() {
  const documents = [
    { name: "Passport size photograph", desc: "Recent, colored, white background" },
    { name: "Identity Proof", desc: "Aadhaar Card, PAN Card, Driving License, or Passport" },
    { name: "Address Proof", desc: "Aadhaar Card, Passport, Utility Bill (Electricity/Water), or Bank Passbook" },
    { name: "Age Proof", desc: "Birth Certificate, 10th Marksheet, or PAN Card" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-slate-900">Voter Registration Assistant</h2>
        </div>
        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">Practical Guide</span>
      </div>

      <div className="p-6">
        <div className="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Why register?
          </h3>
          <p className="text-sm text-slate-600">
            Voting is your fundamental right. To cast a vote in Indian elections, your name must appear on the electoral roll. You apply for this by filling out <strong>Form 6</strong>.
          </p>
        </div>

        <h3 className="font-bold text-slate-900 mb-4 text-lg">Step-by-Step Process</h3>
        
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">1</div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-1">Check Eligibility</h4>
              <p className="text-sm text-slate-600 mb-2">You must be an Indian citizen and 18+ years old.</p>
              <Link href="/eligibility" className="text-indigo-600 text-sm font-medium hover:underline inline-flex items-center gap-1">
                Use our Eligibility Checker <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">2</div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">Gather Documents</h4>
              <ul className="space-y-2">
                {documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-slate-800">{doc.name}</span>
                      <p className="text-xs text-slate-500">{doc.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">3</div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-1">Apply via NVSP (Form 6)</h4>
              <p className="text-sm text-slate-600 mb-3">Visit the official portal, register/login, and fill Form 6 to add your name to the electoral roll.</p>
              <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
                Go to Voters Portal <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
