
const SearchInput = () => {
    return (
        <div className="flex-1 mx-4">
            <input
                type="search"
                placeholder="Search products..."
                className="w-full max-w-md mx-auto px-4 py-2 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
            />
        </div>
    )
}

export default SearchInput