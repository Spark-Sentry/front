import Link from "next/link";

interface Building {
    id: number,
    name: string;
    address: string;
    timeToROI: string;
    return: string;
}

const buildingData: Building[] = [
    {
        id: 1,
        name: "Meubles Saint-Damase",
        address: "246 rue Principale, Saint-Damase",
        timeToROI: "3.5",
        return: "+27%",
    },
    {
        id: 2,
        name: "Oakwood Condos",
        address: "456 Oak Rd, Somewhere City",
        timeToROI: "3 years",
        return: "+12%",
    },
    {
        id: 3,
        name: "Riverfront Lofts",
        address: "789 River Rd, Riverside Town",
        timeToROI: "4 years",
        return: "+17%",
    },
    {
        id: 4,
        name: "Skyview Towers",
        address: "321 High St, Cityville",
        timeToROI: "5 years",
        return: "+20%",
    },
];
// async because we will go request the buildings, in the future
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id

    return (
        // <main>
        //     <Breadcrumbs
        //         breadcrumbs={[
        //             {label: 'Invoices', href: '/dashboard/invoices'},
        //             {
        //                 label: 'Edit Invoice',
        //                 href: `/dashboard/invoices/${id}/edit`,
        //                 active: true,
        //             },
        //         ]}
        //     />
        //     <Form invoice={invoice} customers={customers}/>
        // </main>

    <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
            <div
                className="mb-8 grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 border-b border-gray-200 pb-4 font-medium dark:border-gray-700">
                <div>Building Name</div>
                <div>Address</div>
                <div>Time to ROI</div>
                <div>Return</div>
                </div>
                <div className="grid gap-4">
                    {buildingData.map((building, index) => (
                        <Link
                            key={index}
                            href={`/buildings/${building.id}`}
                            className="rounded-md border"
                        >
                            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="font-medium">{building.name}</div>
                                <div className="text-gray-500 dark:text-gray-400">{building.address}</div>
                                <div>{building.timeToROI}</div>
                                <div className="font-medium">{building.return}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
