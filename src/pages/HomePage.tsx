import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Check } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <section className="h-screen grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6 p-10">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Tiny Share
            </span>{" "}
          </h1>{" "}
          <br />A Files{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Sharing
            </span>{" "}
            Platform.
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          A simple, fast, and secure file sharing platform that allows you to
          share files with anyone, anywhere, anytime.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link to="/register">
            <Button className="w-full md:w-1/3">Get Started</Button>
          </Link>

          <a
            rel="noreferrer noopener"
            href="https://github.com/akashrchandran/tinyshare"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="hidden lg:flex items-center justify-center">
        <div className="z-10">
          <Card className="w-80 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                Free
                <Badge variant="secondary" className="text-sm text-primary">
                  Most popular
                </Badge>
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground"> /month</span>
              </div>

              <CardDescription>
                Free forever. Try it out and upgrade as you grow.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Link to="/register">
                <Button className="w-full">Register now!</Button>
              </Link>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {[
                  "Unlimited files upload",
                  "5 MB files each",
                  "Public shareable link",
                ].map((benefit: string) => (
                  <span key={benefit} className="flex">
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};

export default HomePage;
