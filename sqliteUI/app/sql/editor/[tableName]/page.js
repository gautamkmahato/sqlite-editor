
export default async function page({ params }) {
    const { tableName } = await params;
    const handleTableData = async () =>{
        const response = await fetch('');
        const result = await response.json();
        console.log(result)
    }
    return (
        <>
            <h1>editor page </h1>
            <button onClick={() => {handleTableData}}>click</button>
        </>
    )
}
