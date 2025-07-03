
import LinearSearch from "../components/Searching/searching_algo/linearSearch";
import LinearSearchBar from "../components/Searching/bar/linearSearchBar";
import BinarySearchBar from "../components/Searching/bar/BinarySearchBar";
import BinarySearch from "../components/Searching/searching_algo/binarySearch";

const searchingType = {
  "linear-search": {
    barComponent:<LinearSearchBar/>,
    sortFn: LinearSearch,
  },
  "binary-search": {
barComponent:<BinarySearchBar/>,
    sortFn: BinarySearch,
  },
}
export default searchingType;