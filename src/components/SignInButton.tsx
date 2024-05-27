import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState, logout } from "@/redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = { text: string };

const SignInButton = ({ text }: Props) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://i.ibb.co/Zh10CPC/115-1150152-default-profile-picture-avatar-png-green.png"/>
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => dispatch(logout())}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link to="/login" className="text-white">
      <Button>{text}</Button>
    </Link>
  );
};

export default SignInButton;
