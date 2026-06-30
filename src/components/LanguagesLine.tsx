import Box from "@mui/material/Box";


type LanguagesLineProps = {
    language: string,
    bytes: number
}

export default function LanguagesLine({language, bytes}: LanguagesLineProps) {


    return (
        <Box>
            <span>{language}:</span>
            <span>{bytes}</span>
    </Box>
    )
}