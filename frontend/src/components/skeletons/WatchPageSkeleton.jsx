const WatchPageSkeleton = () => {
	return (
		<div className='animate-pulse space-y-6 px-6 py-10'>
			{/* Title Placeholder */}
			<div className='bg-gray-700 rounded-lg w-60 h-8 shimmer'></div>

			{/* Video Player Placeholder */}
			<div className='bg-gray-800 rounded-md w-full h-[500px] shimmer'></div>

			{/* Description Placeholder */}
			<div className='space-y-4'>
				<div className='bg-gray-700 rounded-md w-3/5 h-6 shimmer'></div>
				<div className='bg-gray-700 rounded-md w-2/5 h-6 shimmer'></div>
			</div>

			{/* Action Buttons Placeholder */}
			<div className='flex space-x-4'>
				<div className='bg-gray-700 rounded-full w-12 h-12 shimmer'></div>
				<div className='bg-gray-700 rounded-full w-12 h-12 shimmer'></div>
				<div className='bg-gray-700 rounded-full w-12 h-12 shimmer'></div>
			</div>

			{/* Suggested Videos Placeholder */}
			<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
				{Array(8).fill(0).map((_, i) => (
					<div key={i} className='bg-gray-800 rounded-md w-full h-44 shimmer'></div>
				))}
			</div>
		</div>
	);
};

export default WatchPageSkeleton;

