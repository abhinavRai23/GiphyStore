export function debounce(delay=150){
	let timer = 0; 
	return (fn, ...args) => {
		if(timer !== 0){
			clearTimeout(timer)
		}
		timer = setTimeout(()=>{
            fn(...args)
        },delay);
	}
}