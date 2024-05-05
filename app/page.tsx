import { Metadata } from "next"
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/ui/modeToggle";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import {
    BuildingIcon,
    ChevronLeftIcon, ChevronRightIcon, HomeIcon,
    LayoutGridIcon,
    Package2Icon, SearchIcon, Settings2Icon,
    SettingsIcon,
    UserIcon,
    UsersIcon
} from "lucide-react";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";


export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
}

export default function Home() {
    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex min-h-screen w-full">
                    <div
                        className="hidden bg-gray-100 border-r border-gray-200 w-[250px] md:flex flex-col gap-4 p-4 shrink-0 dark:bg-gray-800 dark:border-gray-800">
                        <div className="flex items-center gap-4">
                            <Package2Icon className="h-6 w-6"/>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Acme Inc" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="acme">Acme Inc</SelectItem>
                                        <SelectItem value="edf">EDF</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <nav className="flex-1 flex flex-col gap-4 text-sm">
                            <a
                                className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <UsersIcon className="h-4 w-4"/>
                                User 
                            </a>
                            <a
                                className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <UserIcon className="h-4 w-4"/>
                                Account 
                            </a>
                            <a className="flex items-center gap-3 text-gray-900 font-medium dark:text-gray-50"
                                  href="#">
                                <BuildingIcon className="h-4 w-4"/>
                                Building 
                            </a>
                            <a
                                className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <LayoutGridIcon className="h-4 w-4"/>
                                Area 
                            </a>
                            <a
                                className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <SettingsIcon className="h-4 w-4"/>
                                System 
                            </a>
                            <a
                                className="flex items-center gap-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <Settings2Icon className="h-4 w-4"/>
                                Equipment 
                            </a>
                        </nav>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <header className="flex items-center h-14 border-b gap-4 p-9 md:gap-5 md:h-16 md:p-6">
                            <nav className="hidden md:flex-8 md:flex md:items-center md:gap-5 lg:gap-6">
                                <form className="flex w-full md:ml-auto lg:w-[800px]">
                                    <div className="relative w-full">
                                        <SearchIcon
                                            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"/>
                                        <Input
                                            className="w-full bg-white shadow-none appearance-none pl-9 dark:bg-gray-950"
                                            placeholder="Search..."
                                            type="search"
                                        />
                                    </div>
                                </form>
                            </nav>
                            <div className="flex items-center gap-4 md:gap-2 lg:ml-auto">
                                <ModeToggle/>
                                <Button className="rounded-full" size="icon" variant="ghost">
                                    <img
                                        alt="Avatar"
                                        className="rounded-full"
                                        height="32"
                                        src="https://avatar.iran.liara.run/public/89"
                                        style={{
                                            aspectRatio: "32/32",
                                            objectFit: "cover",
                                        }}
                                        width="32"
                                    />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </div>
                        </header>
                        <main className="flex-1 flex flex-col p-4 md:gap-8 md:p-10">
                            <div className="flex-1 flex flex-col gap-4 min-h-0">
                                <div className="flex items-center gap-4">
                                    <a
                                        className="flex items-center gap-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                        href="#"
                                    >
                                        <ChevronLeftIcon className="h-4 w-4"/>
                                        Back
                                    </a>
                                </div>
                                <div className="flex-1 flex flex-col gap-4 min-h-0">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Card>
                                            <CardHeader className="pb-4">
                                                <CardTitle>Building List</CardTitle>
                                                <CardDescription>List of buildings under </CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <ul className="divide-y">
                                                    <li className="flex items-center justify-between p-4">
                                                        <div className="flex items-center gap-2">
                                                            <HomeIcon
                                                                className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                                                            <div className="font-semibold">Headquarters</div>
                                                        </div>
                                                        <Button className="rounded-full" size="icon">
                                                            <ChevronRightIcon className="w-4 h-4"/>
                                                            <span className="sr-only">View</span>
                                                        </Button>
                                                    </li>
                                                    <li className="flex items-center justify-between p-4">
                                                        <div className="flex items-center gap-2">
                                                            <HomeIcon
                                                                className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                                                            <div className="font-semibold">Branch Office</div>
                                                        </div>
                                                        <Button className="rounded-full" size="icon">
                                                            <ChevronRightIcon className="w-4 h-4"/>
                                                            <span className="sr-only">View</span>
                                                        </Button>
                                                    </li>
                                                    <li className="flex items-center justify-between p-4">
                                                        <div className="flex items-center gap-2">
                                                            <HomeIcon
                                                                className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                                                            <div className="font-semibold">Warehouse</div>
                                                        </div>
                                                        <Button className="rounded-full" size="icon">
                                                            <ChevronRightIcon className="w-4 h-4"/>
                                                            <span className="sr-only">View</span>
                                                        </Button>
                                                    </li>
                                                </ul>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-4">
                                                <CardTitle>Add Building</CardTitle>
                                                <CardDescription>Enter details to add a new building</CardDescription>
                                            </CardHeader>
                                            <CardContent className="grid gap-4">
                                                <Input placeholder="Building Name" type="text"/>
                                                <Input placeholder="Location" type="text"/>
                                                <Button className="w-full">Add Building</Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}