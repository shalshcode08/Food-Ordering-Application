import landing from '../assets/landing.png'
import appDownload from '../assets/appDownload.png'
import SearchBar, { SearchForm } from '@/components/SearchBar'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    const handleSearchSubmit = (searchFromValues : SearchForm) => {
        navigate({
            pathname : `/search/${searchFromValues.searchQuery}`,
        })
    }
return (
    <div className="flex flex-col gap-12">
        <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16 px-5">
            <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                Tuck into and takeway today
            </h1>
            <span className="text-xl">Food is just click away</span>
            <SearchBar placeHolder ='Search by city or town' onSubmit={handleSearchSubmit}/>
        </div>
        <div className="grid md:grid-cols-2 gap-5 py-20">
            <img src={landing} />
            <div className='flex flex-col items-center justify-center gap-4 text-center'>
                <span className='font-bold text-3xl tracking-tighter'>
                    Order takeway even faster!
                </span>
                <span>
                    Download the Eats App for faster ordering and personalised recommendations
                </span>
                <img src={appDownload} />
            </div>  
        </div>
    </div>
)
}

export default HomePage