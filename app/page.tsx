import { BsArrowRight } from "react-icons/bs";
import Header from "./components/Header";
import { bebas_Neue } from "./ui/fonts";
import Link from "next/link";

const Home = () => {
    return <main className="flex min-h-screen flex-col">
        <Header />
        <div className="mt-4 mx-auto flex grow fle-col gap-4 md:flex-row w-4/5">
            <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                <p className={`${bebas_Neue.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                    <strong>Bienvenido a React</strong>
                </p>
                <Link href="/dashboard" className="flex items-center self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
                    <span>Login</span> <BsArrowRight />
                </Link>
            </div>
        </div>


    </main>;

};

export default Home;