// components/HealingPlant.jsx
export default function HealingPlant({ delay = 0 }) {
    return (
        <svg
            viewBox="0 0 64 64"
            width="64"
            height="64"
            className="healing-plant"
            style={{ animationDelay: `${delay}s` }}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Roots */}
            <path
                d="M32 48 C30 52, 28 55, 26 56
           M32 48 C34 52, 36 55, 38 56
           M32 48 C32 52, 32 56, 32 60"
                stroke="#a3e635"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
            />

            {/* Ground line */}
            <line
                x1="12"
                y1="48"
                x2="52"
                y2="48"
                stroke="#4ade80"
                strokeWidth="2"
                strokeDasharray="1 2"
            />

            {/* Sprout stem */}
            <path
                d="M32 48 C32 40, 32 32, 32 28"
                stroke="#34d399"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
            />

            {/* Initial leaf (right side) */}
            <path
                d="M32 40 C38 36, 40 30, 34 28"
                fill="#6ee7b7"
                stroke="#34d399"
                strokeWidth="1"
            />

            {/* Stem base */}
            <circle cx="32" cy="48" r="2" fill="#34d399" />
        </svg>
    );
}