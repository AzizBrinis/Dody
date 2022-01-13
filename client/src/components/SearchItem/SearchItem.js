import "./SearchItem.css";

const SearchItem = (props) => {
    return (
        <div>
            <div>
            <div className="houseInfoSearch">
                        <img src={__dirname + props.details.photos[0]} alt="house" className="housePhotoSearch" />
                        <div className="InfoContainer">
                            <h2 className="tripTitleSearch">{props.details.title}</h2>
                            <h2 className="startposition">{props.details.address}</h2>
                        </div>
                        <div className="datesSearch">
                            <div className="addingPadding">
                                <h1 className="datesTitleSearch">{`${props.details.price} TND`}</h1>
                                <h2 className="startposition">Per Night</h2>
                                <button className="TakeTheActionSearch">Book</button>
                            </div>
                        </div>
                    </div>
            </div>
            <div>
                
            </div>
            <div>
                
            </div>
        </div>
    )
}
export default SearchItem;