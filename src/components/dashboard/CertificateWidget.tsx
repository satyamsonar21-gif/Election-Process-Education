"use client";

import { Download, Award } from "lucide-react";
import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface CertificateWidgetProps {
  user: any;
  isUnlocked: boolean;
}

export default function CertificateWidget({ user, isUnlocked }: CertificateWidgetProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!isUnlocked) return;
    
    setIsGenerating(true);
    try {
      const certificateElement = document.getElementById("certificate-content");
      if (!certificateElement) throw new Error("Certificate element not found");

      // Temporarily make it visible for rendering if it was hidden
      certificateElement.style.display = "block";
      
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      
      certificateElement.style.display = "none";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${user.name.replace(/\s+/g, '_')}_Democracy_Champion.pdf`);
      
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Failed to generate certificate. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isUnlocked) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg p-6 mb-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 transform transition-transform hover:scale-[1.01]">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-4 rounded-full">
            <Award className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Democracy Champion!</h3>
            <p className="text-amber-50 font-medium mt-1">You've completed the guide, passed a quiz, and cast a mock vote.</p>
          </div>
        </div>
        
        <button 
          onClick={generatePDF}
          disabled={isGenerating}
          className="shrink-0 bg-white text-amber-600 hover:bg-amber-50 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-sm w-full sm:w-auto justify-center disabled:opacity-80"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div> Generating...</span>
          ) : (
            <><Download className="w-5 h-5" /> Download Certificate</>
          )}
        </button>
      </div>

      {/* Hidden Certificate Template for PDF Generation */}
      <div id="certificate-content" className="hidden" style={{ width: "1122px", height: "793px", padding: "40px", boxSizing: "border-box" }}>
        <div style={{ width: "100%", height: "100%", border: "10px solid #f59e0b", padding: "10px", boxSizing: "border-box", backgroundColor: "#fffbeb" }}>
          <div style={{ width: "100%", height: "100%", border: "2px solid #d97706", padding: "40px", boxSizing: "border-box", textAlign: "center", position: "relative", backgroundColor: "white" }}>
            
            <div style={{ position: "absolute", top: "40px", left: "40px", width: "100px", height: "100px", border: "4px solid #f59e0b", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b" }}>
               <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-4.24 4.24a3 3 0 0 0 0 4.24l3.88 3.88a1 1 0 1 0 3-3l-2.5-2.5"/><path d="M4.5 10.5 8 7"/><path d="M10 3 3 10"/><path d="m22 2-7 7"/></svg>
            </div>
            <div style={{ position: "absolute", top: "40px", right: "40px", width: "100px", height: "100px", border: "4px solid #f59e0b", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b" }}>
               <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
            </div>

            <h1 style={{ fontSize: "50px", color: "#d97706", marginTop: "40px", textTransform: "uppercase", letterSpacing: "4px", fontWeight: "bold" }}>Certificate of Achievement</h1>
            <p style={{ fontSize: "24px", color: "#64748b", marginTop: "20px" }}>This certifies that</p>
            <h2 style={{ fontSize: "60px", color: "#0f172a", marginTop: "30px", borderBottom: "2px solid #cbd5e1", display: "inline-block", paddingBottom: "10px", minWidth: "500px" }}>{user.name}</h2>
            <p style={{ fontSize: "24px", color: "#64748b", marginTop: "30px", maxWidth: "700px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.5" }}>
              has successfully completed the comprehensive Election Process Education program, demonstrating an understanding of the democratic process, electronic voting, and civic duties.
            </p>
            
            <h3 style={{ fontSize: "36px", color: "#f59e0b", marginTop: "40px", fontWeight: "bold" }}>Democracy Champion</h3>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "80px", padding: "0 80px" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ borderTop: "2px solid #94a3b8", width: "200px", paddingTop: "10px", fontSize: "18px", color: "#475569" }}>Date Completed</p>
                <p style={{ fontSize: "20px", fontWeight: "bold", color: "#0f172a", marginTop: "5px" }}>{new Date().toLocaleDateString('en-IN')}</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ borderTop: "2px solid #94a3b8", width: "200px", paddingTop: "10px", fontSize: "18px", color: "#475569" }}>Platform</p>
                <p style={{ fontSize: "20px", fontWeight: "bold", color: "#0f172a", marginTop: "5px" }}>ElectionEdu</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
