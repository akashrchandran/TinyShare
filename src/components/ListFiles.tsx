import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon, FileIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useFiles from "@/hooks/useFiles";
import { TableCell, TableRow } from "./ui/table";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";
import { formatBytes } from "@/lib/utils";

const ListFiles = () => {
  const { data, isPending } = useFiles();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  if (isPending)
    return skeletons.map((_, index) => (
      <TableRow key={index}>
        <TableCell className="font-medium">
          <div className="flex items-center gap-1 ">
            <Skeleton className="h-[16px] w-[16px] rounded-full" />
            <Skeleton className="my-3 h-4 w-[300px]" />
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

  return data?.response?.length ? (
    data?.response?.map((file) => (
      <TableRow key={file.id}>
        <TableCell className="font-medium">
          <div className="flex gap-1">
            <FileIcon
              className="aspect-square rounded-md object-cover"
              height="20"
              width="20"
            />{" "}
            {file.name}
          </div>
        </TableCell>
        <TableCell>
          {formatBytes(file.file_size, {decimals:2, sizeType:"normal"})}
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
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem className="text-red">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <div className="flex justify-center items-center">
      No files found, please upload some.
    </div>
  );
};

export default ListFiles;
