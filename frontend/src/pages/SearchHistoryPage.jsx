import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
	const date = new Date(dateString);
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthNames[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();
	return `${month} ${day}, ${year}`;
}

const SearchHistoryPage = () => {
	const [searchHistory, setSearchHistory] = useState([]);

	useEffect(() => {
		const getSearchHistory = async () => {
			try {
				const res = await axios.get(`/api/v1/search/history`);
				setSearchHistory(res.data.content);
			} catch (error) {
				setSearchHistory([]);
			}
		};
		getSearchHistory();
	}, []);

	const handleDelete = async (entry) => {
		try {
			await axios.delete(`/api/v1/search/history/${entry.id}`);
			setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
		} catch (error) {
			toast.error("Failed to delete search item");
		}
	};

	if (searchHistory?.length === 0) {
		return (
			<div className='bg-black min-h-screen text-white'>
				<Navbar />
				<div className='max-w-6xl mx-auto px-4 py-8'>
					<h1 className='text-4xl font-extrabold mb-8 text-center'>Search History</h1>
					<div className='flex justify-center items-center h-96'>
						<p className='text-2xl text-gray-400'>No search history found</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-black text-white min-h-screen'>
			<Navbar />

			<div className='max-w-6xl mx-auto px-4 py-8'>
				<h1 className='text-4xl font-extrabold mb-8 text-center'>Search History</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{searchHistory?.map((entry) => (
						<div key={entry.id} className='bg-gray-900 p-6 rounded-lg flex items-center gap-4 shadow-lg hover:shadow-2xl transition-all'>
							<img
								src={SMALL_IMG_BASE_URL + entry.image}
								alt='History image'
								className='size-20 rounded-full object-cover border-4 border-gray-700'
							/>
							<div className='flex flex-col flex-grow'>
								<span className='text-white text-xl font-semibold'>{entry.title}</span>
								<span className='text-gray-400 text-sm'>{formatDate(entry.createdAt)}</span>
							</div>

							<span
								className={`py-1 px-4 rounded-full text-sm font-medium ml-auto ${
									entry.searchType === "movie"
										? "bg-red-600"
									: entry.searchType === "tv"
									? "bg-blue-600"
									: "bg-green-600"
								}`}
							>
								{entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
							</span>
							<button
								className='ml-6 p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all'
								onClick={() => handleDelete(entry)}
							>
								<Trash className='size-5' />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default SearchHistoryPage;