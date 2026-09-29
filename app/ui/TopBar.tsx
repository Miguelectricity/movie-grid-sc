import { Suspense } from "react";
import GenreSelect from "./GenreSelect";


export default function TopBar() {
    return (
        <div className="flex flex-row justify-between text-gray-300 items-center px-4 pb-8">
            <h1 className="font-bold">MovieFlix</h1>
            <Suspense>
                <GenreSelect />
            </Suspense>
        </div>
    );
}