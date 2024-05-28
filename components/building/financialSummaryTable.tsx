import {TableRow, TableCell, TableBody, Table } from "@/components/ui/table";
import React from "react";

const financialHeaders = ["Total Cost", "Energy Efficiency Cost", "Subsidies Obtained", "Actual Return of Investment", "Annual average savings"];
const financialData = ["$120,000", "$80,000", "$40,000", "15%", "$38,000"];

export default function FinancialSummaryTable() {
    return (
        <section>
            <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
                <Table>
                    <TableBody>
                        {financialHeaders.map((header, index) => (
                            <TableRow key={header}>
                                <TableCell>{header}</TableCell>
                                <TableCell>{financialData[index]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}
