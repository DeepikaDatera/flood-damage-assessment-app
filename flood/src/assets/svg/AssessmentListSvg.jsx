// AssessmentListIcon.jsx
export default function AssessmentListIcon({ className = "w-5 h-5 text-subTitleClr" }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="8" y1="8" x2="16" y2="8" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="8" y1="16" x2="12" y2="16" />
        </svg>
    )
}