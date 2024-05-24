
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
    <main className="grid flex-1 items-start gap-4 p-4 pt-6 sm:px-6 sm:py-0 md:gap-8">
      <div className="relative w-full overflow-auto">
        <ScrollArea className="h-[80vh]">
          <Table>
            <TableHeader className="bg-background">
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>File Type</TableHead>
                <TableHead className="hidden md:table-cell">
                  Uploaded at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <ListFiles />
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </main>
  );
};

export default FilesTable;
