import {Rating} from "@mui/material";

const ReviewCard = () => {

  return (
    <div className="flex justify-center p-3 min-h-80 border-t border-solid border-gray-300">
      <div className="w-1/4">
        <div className="flex">
          <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt={`Avatar of `} />
          <div className="text-sm">
            <p>Ovett Mora</p>
            <div>
              <span className="text-gray-600 flex items-center">
                Rating:
                <Rating
                  name="read-only ml-1"
                  size="small"
                  value={1}
                  readOnly
                  precision={0.5}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 pt-2">
        <div className="flex justify-center">
          <span className="text-md italic text-gray-400">2 days ago</span>
        </div>
      </div>
      <div className="relative w-full m-4 border-2 min-h-44 bg-white">
        <div className="p-2">
          <p className="text-gray-700 text-xl font-bold " style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
            Great Product
          </p>
          <p className="text-sm overflow-hidden" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 6 }}>
            I love this product. It's really great. I would recommend it to anyone.
          </p>
          <p className="absolute right-3 bottom-1">
            <span>
              <button className="text-sm text-blue-500 hover:text-blue-700">Read More</button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;