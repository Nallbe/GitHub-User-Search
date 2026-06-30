import { useEffect } from 'react';

import Box from "@mui/material/Box";

type LanguageStat = {
  language: string;
  bytes: number;
  percent: number;
};

type LanguagesLineProps = {
    languages: Record<string, number>
}


export default function LanguagesLine({languages}: LanguagesLineProps) {

    const percentages = calculate(languages);

    useEffect(() => {
        console.log(percentages)
    }, [percentages])

    function calculate(languages: Record<string, number>) {

        const totalBytes = Object.values(languages).reduce((sum, value) => {
            return sum + value;
        }, 0)


        const result: LanguageStat[] = Object.entries(languages).map(([language, bytes]) => {
            return {
                language: language,
                bytes: bytes,
                percent: Math.round((bytes / totalBytes) * 100)
            };
        });

        return result;

    }

    return (
        <Box>
            <div className="languages-line">
                {percentages.map(lang => (
                    <div
                        key={lang.language}
                        className={lang.language}
                        style={{
                            width: `${lang.percent}%`
                        }}
                        >
                    </div>
                ))}
            </div>
            {percentages.map(lang => (
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}>
                    <div className={`${lang.language}-circle`}></div>
                    <p>{lang.language}: {lang.percent}%</p>
                </Box>
            ))}
        </Box>
    )
}