import { useSearchRestaurants } from "@/api/RestaurantApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page : number;

};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page : 1,
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);


const setPage = (page : number) => {
  setSearchState((prevState)=> ({
    ...prevState,
    page,
  }))
}

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page : 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };
  if (isLoading) {
    <span>Loading...</span>;
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisine-list">insert cusine here</div>
      <div id="main-content flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="search by cuisine or restaurant name"
          onReset={resetSearch}
        />
        <SearchResultsInfo total={results?.pagination.total} city={city} />
        {results?.data.map((restaurat) => (
          <SearchResultsCard restaurant={restaurat} />
        ))}
        <PaginationSelector page={results?.pagination.page} pages={results?.pagination.pages} onPageChange={setPage}/>
      </div>
    </div>
  );
};

export default SearchPage;
