import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Welcome to the Video Conferencing App
      </h1>
      <p className="mt-4 text-lg">
        Connect with others seamlessly through our platform.
      </p>
      <div>
        <Button>Get Started</Button>
      </div>
    </main>
  );
}
