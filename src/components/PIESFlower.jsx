import React from "react";

const PIESFlower = ({ scores }) => {
    const petals = [
        { label: "Physical", angle: 0, score: scores.physical },
        { label: "Intellectual", angle: 90, score: scores.intellectual },
        { label: "Emotional", angle: 180, score: scores.emotional },
        { label: "Spiritual", angle: 270, score: scores.spiritual },
    ];

    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            <g transform="translate(100,100)">
                {petals.map(({ label, angle, score }, idx) => {
                    const scale = 0.5 + (score / 10) * 0.5; // 0.5 to 1.0 scale
                    return (
                        <g key={idx} transform={`rotate(${angle})`}>
                            <ellipse
                                cx="0"
                                cy="-40"
                                rx={20 * scale}
                                ry={50 * scale}
                                fill="#A7D3A6"
                                stroke="#4B8B3B"
                                strokeWidth="2"
                                opacity={scale}
                            />
                            <text
                                x="0"
                                y={-65 * scale}
                                fill="#333"
                                fontSize="10"
                                textAnchor="middle"
                            >
                                {label}
                            </text>
                        </g>
                    );
                })}
                <circle cx="0" cy="0" r="8" fill="#FFD700" />
            </g>
        </svg>
    );
};

export default PIESFlower;