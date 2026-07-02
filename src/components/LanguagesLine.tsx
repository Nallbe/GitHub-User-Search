import { useEffect } from 'react';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type LanguageStat = {
  language: string;
  bytes: number;
  percent: number;
};

type LanguagesLineProps = {
    languages: Record<string, number>
}


export default function LanguagesLine({languages}: LanguagesLineProps) {
    const languageColors: Record<string, string> = {
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        HTML: "#e34c26",
        CSS: "#563d7c",

        Python: "#3572A5",
        Java: "#b07219",
        C: "#555555",
        "C++": "#f34b7d",
        "C#": "#178600",
        Go: "#00ADD8",
        Rust: "#dea584",
        Ruby: "#701516",
        PHP: "#4F5D95",
        Swift: "#F05138",
        Kotlin: "#A97BFF",
        Dart: "#00B4AB",
        Scala: "#c22d40",

        Shell: "#89e051",
        PowerShell: "#012456",
        Batchfile: "#C1F12E",

        Vue: "#41b883",
        Svelte: "#ff3e00",
        Astro: "#ff5a03",

        SCSS: "#c6538c",
        Sass: "#a53b70",
        Less: "#1d365d",

        JSON: "#292929",
        YAML: "#cb171e",
        XML: "#0060ac",
        Markdown: "#083fa1",

        Dockerfile: "#384d54",
        CMake: "#DA3434",
        Makefile: "#427819",

        ObjectiveC: "#438eff",
        "Objective-C": "#438eff",

        Perl: "#0298c3",
        Lua: "#000080",
        R: "#198CE7",
        Haskell: "#5e5086",
        Elixir: "#6e4a7e",
        Erlang: "#B83998",
        Clojure: "#db5855",
        FSharp: "#b845fc",
        "F#": "#b845fc",

        JupyterNotebook: "#DA5B0B",
        "Jupyter Notebook": "#DA5B0B",

        TeX: "#3D6117",
        VimScript: "#199f4b",
        "Vim Script": "#199f4b",
    };
    
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
            <div className="languages-line languages-line-pos">
                {percentages.map(lang => (
                    <div
                        key={lang.language}
                        className={lang.language}
                        style={{
                            width: `${lang.percent}%`
                        }}>
                    </div>
                ))}
            </div>
            {percentages.map(lang => (
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1}}>
                    <span
                        className="circle"
                        style={{
                            "--language-color": languageColors[lang.language] ?? "#8b949e",
                        } as React.CSSProperties}/>
                    <Typography>{lang.language}: {lang.percent}%</Typography>
                </Box>
            ))}
        </Box>
    )
}