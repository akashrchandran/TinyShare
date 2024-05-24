import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon, FileIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import useFiles from "@/hooks/useFiles";

const FilesTable = () => {
  const { data } = useFiles();
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
              {data?.response?.map((file) => (
                <TableRow>
                  <TableCell className="hidden sm:table-cell">
                    <FileIcon
                      className="aspect-square rounded-md object-cover"
                      height="20"
                      width="20"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {file.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{file.file_type}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {file.uploaded_at}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <DotsHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </main>
  );
};

export default FilesTable;
