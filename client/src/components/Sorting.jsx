

function Sorting_navBar(){
    return(
        <h1>hey</h1>
    )
}

export  default function Sorting(){
    return(
        <div className="bg-[#4a5f81] flex">
            <div className="w-[30%] bg-transparent p-2">
                <button className="text-white">Bubble Sort</button>
                <button className="text-white">Selection Sort</button>
                <button className="text-white">Insertation Sort</button>
                <button className="text-white">Merge Sort</button>
                <button className="text-white">Quick Sort</button>

            </div>
          <div className="70%">
             <Sorting_navBar/>
          </div>
        </div>
    )
}