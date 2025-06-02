import { FaReact } from "react-icons/fa"
import { bebas_Neue } from "../ui/fonts"

const Logo = () => {
    return (
        <div className={`${bebas_Neue} flex flex-row items-center leading-none text-white`}>
            <FaReact className="h-20 w-20 rotate-[15deg]" />
            <p className="text-2xl ml-3">Antonio</p>
        </div>
    )

}

export default Logo;