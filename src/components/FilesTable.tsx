
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import ListFiles from "./ListFiles";

const FilesTable = () => {
  return (
      <div className="relative w-full overflow-auto">
        <ScrollArea className="h-[80vh]">
          <Table>
            <TableHeader className="bg-background">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-7/10">Name</TableHead>
                <TableHead className="w-1/10">File Type</TableHead>
                <TableHead className="hidden md:table-cell w-1/10">
                  File Size
                </TableHead>
                <TableHead className="hidden md:table-cell w-1/10">
                  Uploaded at
                </TableHead>
                <TableHead>
                  <span className="sr-only w-1/10">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <ListFiles />
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
  );
};

export default FilesTable;
