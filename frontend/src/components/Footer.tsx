import { GitHubLogoIcon } from "@radix-ui/react-icons"

const Footer = () => {
  return (
    <div className="bg-orange-500 py-10 px-5">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <span className="text-2xl text-white font-bold tracking-tight">
                Eats.com
            </span>
            <div className="text-white tracking-tight font-light flex justify-evenly items-center">
                <p>Made with 🧡 by Somu</p>
                <a href="https://github.com/shalshcode08/Food-Ordering-Application" target="#"><GitHubLogoIcon className="ml-4 size-5"></GitHubLogoIcon></a>
            </div>
        </div>
    </div>
  )
}

export default Footer