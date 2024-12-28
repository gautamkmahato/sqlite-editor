import MainSection from "./editor/MainSection";
import QueryEditor from "./editor/QueryEditor";


export default function Editor({ dbName, tableName }) {

    //const [query, setQuery] = useState('');

    return (
        <>
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Database Dashboard</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    {/* <p className="text-gray-600">
                        Welcome to the Database Dashboard! Select a database or table from the sidebar to begin.
                    </p> */}
                    {/* Main Content Placeholder */}
                    <div className="">
                        <MainSection dbName={dbName} tableName={tableName} />
                    </div>
                </div>
            </div>
            
        </>
    )
}
