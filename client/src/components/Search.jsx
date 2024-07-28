import localhost from "../config";
import { useEffect, useState } from "react";

export default function Search() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('All Categories');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${localhost}/api/search`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
        }

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.product && data.product.length > 0) {
            setProduct(data.product);
            setCategories(data.category)
          } else {
            setError(new Error("Product not found"));
          }
        } else {
          setError(new Error("Failed to fetch product"));
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchProduct();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    sortResults();

    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };


  const sortResults = () => {
    // Handle Logic //
    // setIsSearching(false);
    let list = [];
    if (categoryName === 'All Categories' && productName === '') {
      product.map((elem) => {
        list.push(elem)
      })
    } else {
      product.map((elem) => {
        const productNameLower = productName.toLocaleLowerCase();
        const elemNameLower = elem.name.toLocaleLowerCase();
        const elemCategoryName = elem.category.name;

        const startWith = elemNameLower.includes(productNameLower) || elemNameLower.includes(productNameLower.toString());
        if(startWith && (categoryName === 'All Categories') || elemCategoryName === categoryName) {
          list.push(elem);
        }
      })
    }
    setSearchResults(list);
  }
  
  // Gestion d'erreurs //
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );


  return (
    <>
      <div className="p-5 bg-gray-100 rounded-lg shadow-md">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-center gap-2 mb-5">
          <div className="flex p-3 w-full md:w-auto">

            <input
              type="text"
              placeholder="Search by terms or categories"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full md:w-80 p-2 border border-gold rounded-md font-primary mr-4"
            />

            <button type="submit"
              className="p-3 md:px-4 bg-light-purple border border-black text-black rounded-md hover:bg-gold transition duration-300">
              Search
            </button>
            {isSearching && (
                <div className="text-center flex font-primary py-4">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-dark-purple"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="#CD92F2"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Searching ...
                </div>
              )}
              {error && <div className="text-center text-red-500 py-4">{error}</div>}    
            {!product && !isSearching && <div className="text-center py-4 font-primary text-black">No product found</div>}

        </div>

        <select
          value={categoryName}
          className="w-full md:w-auto p-2 font-primary border border-gold rounded-md"
          onChange={(e) => setCategoryName(e.target.value)}
        >
          <option value="All Categories" className="text-gold font-primary bg-light-purple bg-opacity-20 hover:bg-light-purple">All Categories</option>

          {categories.length > 0 && categories.map((elem) => (
            <option key={elem.id} value={elem.name} className="text-gold font-primary">{elem.name}</option>
          ))}

        </select>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      
          {/* <div className="flex lg:flex-wrap flex-row lg:grid-cols-3 gap-5">: */}
          {searchResults.length > 0 && (
            searchResults.map((result) => (
              <div key={result.id} className="flex flex-col justify-between h-full bg-white border border-gold rounded-lg p-5 shadow-lg">

              <img src={result.images} alt={result.name} className="w-full h-48 object-cover rounded-t-lg" />             
              <h3 className="font-primary text-gold text-2xl mt-4">{result.name}</h3>
                <p className="font-primary text-black text-lg">{result.description}</p>
                <p className="font-bold font-primary text-black">${result.price}</p>
                <button className="mt-4 w-full bg-light-purple text-black border border-black py-2 rounded-lg hover:bg-gold transition duration-300">
                  Add to cart
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

