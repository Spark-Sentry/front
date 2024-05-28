import { Metadata } from "next"

export const metadata: Metadata = {
    title: "SparkSentry",
    description: "Building Energy Management Platform",
}

export default function Home() {
    return (
        <>
            <div className="p-6 text-2xl">Home page</div>
        </>
    )
}