import './SearchSection.css';

export default function SearchSection({
    query,
    handleChange
}){
    return (
        <div className="search-panel">
            <input type="text" value={query} placeholder="Search" onChange={handleChange}/>
        </div>
    )
}