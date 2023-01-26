const GiftersFilter = ({ setPetShopData, defaultData }: any) => {
    const giftersFromDefaultData = defaultData.map((data:any) => {
        return data.gifter;
    });
    const uniqueGifters = new Set([...giftersFromDefaultData]);
    
    const gifters = Array.from(uniqueGifters);

    function selectGifters(event:any){
        const inputValue = event.currentTarget.value;
        if (inputValue === '') {
            setPetShopData(defaultData);
        } else {
            setPetShopData(defaultData.filter((data: any) => {
                return inputValue === '' || data.gifter.toUpperCase().includes(inputValue);
            }));
        }
    }

    return (
        <div>
            <p>Gifters </p>
            <select onChange={selectGifters}>
                <option value="">Choose One</option>
                {gifters.map((gifter) => {
                    return <option value={gifter.toUpperCase()}>{gifter}</option>
                })}
            </select>
        </div>
    );
};

export default GiftersFilter;