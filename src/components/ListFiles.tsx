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
import useFiles from "@/hooks/useFiles";
import { TableCell, TableRow } from "./ui/table";
import { Skeleton } from "./ui/skeleton";

const ListFiles = () => {
  const { data, isPending } = useFiles();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  if (isPending)
    return skeletons.map((_, index) => (
      <TableRow key={index}>
        <TableCell className="hidden sm:table-cell">
          <Skeleton className="h-[20px] w-[20px] rounded-full" />
        </TableCell>
        <TableCell className="font-medium">
          <div className="sm:w-auto w-20 sm:overflow-visible overflow-hidden sm:whitespace-normal whitespace-nowrap overflow-ellipsis">
          <Skeleton className="m-4 h-4 w-[300px]" />
          </div>
        </TableCell>
        <TableCell>
            <Skeleton className="h-3 w-10 rounded-full" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-1 w-12" />
        </TableCell>
      </TableRow>
    ));

  return data?.response?.map((file) => (
    <TableRow key={file.id}>
      <TableCell className="hidden sm:table-cell">
        <FileIcon
          className="aspect-square rounded-md object-cover"
          height="20"
          width="20"
        />
      </TableCell>
      <TableCell className="font-medium">
        <div className="sm:w-auto w-20 sm:overflow-visible overflow-hidden sm:whitespace-normal whitespace-nowrap overflow-ellipsis">
          {file.name}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{file.file_type}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {(() => {
          const uploadedDate = new Date(file.uploaded_at);
          const today = new Date();

          if (uploadedDate.toDateString() === today.toDateString()) {
            return uploadedDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          } else {
            return uploadedDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
          }
        })()}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
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
  ));
};

export default ListFiles;
