import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Logout } from "../components/Logout"
import { TwoFactor } from "../components/TwoFactor";
import { Change } from "../components/Change";

export default function Settings() {

    return (
        <>
            <div className="sticky top-0 z-50 flex justify-between p-6 border-b border-orange-500 h-20 bg-black">
                <Navbar />
            </div>
            <div className="min-h-screen flex p-3">
                <div className="sticky top-24 z-30 w-1/4 hidden lg:block h-[calc(100%-50px)]">
                    <Sidebar />
                </div>
                
                <div className="w-full lg:w-1/3 p-6 sticky top-24 h-full">
                    <div className="text-center mb-6 sm:mb-10">
                        <span className="text-2xl">Settings</span>
                    </div>
                    <div className="grid grid-rows-4 gap-6 sm:gap-10 p-2">
                        <TwoFactor />
                        <Change />
                        <Link to="/founder">
                            <div className="rounded-full bg-gray-900 text-gray-100 p-6 hover:bg-gray-700">
                                <span className="text-xl">
                                    About the Dev
                                </span>
                            </div>
                        </Link>
                        <Logout />
                    </div>
                </div>
                {/*  blank column in large devices*/}
                <div className="w-1/3 hidden lg:block">

                </div>
            </div>
        </>
    )
}