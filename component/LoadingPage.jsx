import { AiOutlineLoading } from "react-icons/ai";


export default function LoadingPage() {
  return (
    <div>
      <div className="flex h-screen w-screen items-center justify-center">
        <div className=" flex  text-6xl font-semibold" >
          GEMICKS LABEL 
        </div>
        <AiOutlineLoading className="animate-spin text-5xl"></AiOutlineLoading>
      </div>
    </div>
  );
}
