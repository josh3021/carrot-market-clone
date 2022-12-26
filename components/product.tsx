import Link from "next/link";

interface IProductProps {
  id: number;
  title: string;
  category: string;
  price: number;
  hearts: number;
  comments: number;
  // avatar: string -> link;
}

export const Product: React.FC<IProductProps> = ({
  id,
  title,
  category,
  price,
  hearts,
  comments,
}) => {
  return (
    <Link className="item-container" href={`products/${id}`}>
      <div className="flex space-x-4 items-center">
        <div className="item-picture" />
        <div className="item-header">
          <h3 className="item-title">{title}</h3>
          <span className="item-description">{category}</span>
          <span className="item-price">${price}</span>
        </div>
      </div>
      <div className="item-footer">
        <div className="hearts-container">
          <svg
            className="w-4 h-4 fill-pink-500 stroke-pink-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <span className="ml-1 text-gray-600 text-sm">{hearts}</span>
        </div>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 stroke-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <span className="ml-1 text-gray-600 text-sm">{comments}</span>
        </div>
      </div>
    </Link>
  );
};
