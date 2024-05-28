import {useRouter} from "next/navigation";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {Button} from "@/components/ui/button";
import React from "react";

export function BackButton() {
    const router = useRouter()
    return (
        <Button size="icon" variant="outline" onClick={() => router.back()}>
            <ArrowLeftIcon className="h-4 w-4"/>
            <span className="sr-only">Back</span>
        </Button>
    )
}