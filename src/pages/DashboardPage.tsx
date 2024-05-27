import { DialogUploader } from "@/components/DialogUploader";
import FilesTable from "@/components/FilesTable";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function DashboardPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="px-3 lg:px-10 pt-16">
        <header className="flex h-14 items-center bg-background pt-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent mb-4">
          <div className="flex-1">
            <h1 className="font-semibold text-4xl">Files</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <DialogUploader />
          </div>
        </header>
        <FilesTable />
      </div>
    </>
  );
}