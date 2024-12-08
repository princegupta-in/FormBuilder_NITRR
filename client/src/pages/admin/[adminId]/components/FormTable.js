import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const FormTable = ({
    forms
}) => {
    return ( 
        <div className="w-full mt-6 p-6 bg-white rounded-lg shadow-md">
            <h1 className="font-bold text-xl mb-6">All Forms</h1>
            { forms.length === 0 ? 
            <div className="flex items-center justify-center">
                No Forms Created
            </div>
            :
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Form Name</TableHead>
                    <TableHead>Responses</TableHead>
                    <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { forms.map((form) => (
                        <TableRow>
                            <TableCell className="font-medium text-center">{form.title}</TableCell>
                            <TableCell className="text-center">{form.responses}</TableCell>
                            <TableCell className="text-center" >{form.createdAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>}
        </div>
     );
}
 
export default FormTable;