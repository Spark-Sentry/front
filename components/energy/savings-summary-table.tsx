import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";

const savingsHeaders = ["m^3", "kWh", "$", "t GES"];
const savingsData = [
    { label: "Goals", values: ["12,000", "$2,400", "10"] },
    { label: "Year 1", values: ["11,000", "$2,200", "9"] },
    { label: "Year 2", values: ["10,000", "$2,000", "8"] },
    { label: "Year 3", values: ["9,000", "$1,800", "7"] }
];

export default function SavingsSummaryTable() {
    return (
        <section>
            <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {savingsHeaders.map((header) => (
                                <TableHead key={header}>{header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {savingsData.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell>{row.label}</TableCell>
                                {row.values.map((value, valueIndex) => (
                                    <TableCell key={valueIndex}>{value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}
