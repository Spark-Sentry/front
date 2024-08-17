import React from "react";
import { TableRow, TableCell, TableBody, Table } from "@/components/ui/table";

interface DataProps {
    label: string;
    value: string | number;
}

interface SummaryTableProps {
    data: DataProps[];
}

const SummaryTable: React.FC<SummaryTableProps> = ({ data }) => {
    return (
        <section>
            <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
                <Table>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.label}</TableCell>
                                <TableCell>{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};

export default SummaryTable;