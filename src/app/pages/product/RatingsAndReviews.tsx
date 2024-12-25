import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CiStar } from 'react-icons/ci';

type Review = {
    user: string;
    email: string;
    rating: number;
    date: string;
    reviewText: string;
};

type ProductReviewsProps = {
    averageRating: number;
    totalRatings: number;
    totalReviews: number;
    reviews: Review[];
    onSubmitReview: (newReview: Review) => void;
};

const RatingsAndReviews = ({ averageRating, totalRatings, totalReviews, reviews, onSubmitReview }: ProductReviewsProps) => {
    const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (userName && reviewText && rating > 0) {
            const newReview: Review = {
                user: userName,
                email: userEmail,
                rating,
                date: new Date().toLocaleDateString(),
                reviewText,
            };

            onSubmitReview(newReview);
            setUserName('');
            setReviewText('');
            setRating(0);
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row">
                <ul
                    className="flex lg:flex-col  lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-200 space-x-4 lg:space-x-0 lg:space-y-4"
                    // className="flex lg:flex-col space-y-4 lg:w-1/4 lg:border-r border-gray-200 space-x-4 lg:space-x-0 lg:space-y-4" 
                    role="tablist">
                    <li
                        className={`description_tab ${activeTab === "description" ? "active font-bold text-black" : "text-gray-500"}`}
                        id="tab-title-description"
                        role="tab"
                        aria-controls="tab-description"
                        aria-selected={activeTab === "description"}
                    >
                        <h1
                            className="py-2 w-full text-left text-sm lg:text-[16px] cursor-pointer"
                            onClick={() => setActiveTab("description")}
                        >
                            Description
                        </h1>
                    </li>
                    <li
                        className={`reviews_tab ${activeTab === "reviews" ? "active font-bold text-black" : "text-gray-500"}`}
                        id="tab-title-reviews"
                        role="tab"
                        aria-controls="tab-reviews"
                        aria-selected={activeTab === "reviews"}
                    >
                        <h1
                            className="py-2 w-full text-left text-sm lg:text-[16px] cursor-pointer"
                            onClick={() => setActiveTab("reviews")}
                        >
                            Reviews ({reviews.length})
                        </h1>
                    </li>
                </ul>

                <div className="flex-grow pl-6">
                    {activeTab === "description" && (
                        <div
                            id="tab-description"
                            className="woocommerce-Tabs-panel woocommerce-Tabs-panel--description panel entry-content wc-tab"
                            role="tabpanel"
                            aria-labelledby="tab-title-description"
                        >
                            <p className=" text-xs lg:text-sm p-4 lg:p-0">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                ex ea commodo consequat.
                            </p>
                        </div>
                    )}
                    {activeTab === "reviews" && (
                        <div
                            id="tab-reviews"
                            className="woocommerce-Tabs-panel woocommerce-Tabs-panel--reviews panel entry-content wc-tab"
                            role="tabpanel"
                            aria-labelledby="tab-title-reviews"
                        >
                            <div id="reviews" className="p-2 lg:p-0">
                                <h2 className="text-lg font-bold mb-4">Reviews</h2>
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, index) => (
                                            <CiStar
                                                key={index}
                                                className={`h-6 w-6 ${index < Math.floor(averageRating)
                                                    ? 'text-yellow-500'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm lg:text-lg font-semibold">{averageRating} ({totalRatings} ratings)</span>
                                    <span className="ml-4 text-xs lg:text-sm text-gray-600">({totalReviews} Reviews)</span>
                                </div>

                                <div>
                                    {reviews.length > 0 ? (
                                        reviews.map((review, index) => (
                                            <div key={index} className="border-b pb-4 mb-4">
                                                {/* <div className="flex items-center mb-2"> */}
                                                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                                                    <span className="font-medium text-[16px] lg:text-lg">{review.user}</span>
                                                    <div className="flex items-center ml-4">
                                                        {[...Array(5)].map((_, starIndex) => (
                                                            <CiStar
                                                                key={starIndex}
                                                                className={`h-5 w-5 ${starIndex < Math.floor(review.rating)
                                                                    ? 'text-yellow-500'
                                                                    : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-500">{review.date}</p>
                                                <p className="mt-1 text-gray-700 text-xs lg:text-sm">{review.reviewText}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No reviews yet.</p>
                                    )}
                                </div>
                            </div>

                            <div id="review_form_wrapper" className="mt-4">
                                <div id="review_form">
                                    <form className="space-y-4" onSubmit={handleReviewSubmit}>
                                        <div className="flex items-center mb-4">
                                            <Label htmlFor="comment" className="block font-medium">
                                                Your Rating  <span className="text-red-500">*</span>
                                            </Label>
                                            <div className="flex items-center space-x-2">
                                                {[...Array(5)].map((_, index) => (
                                                    <CiStar
                                                        key={index}
                                                        onClick={() => setRating(index + 1)}
                                                        className={`h-6 w-6 cursor-pointer ${index < rating ? "text-yellow-500" : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="comment" className="block font-medium">
                                                Your Review <span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                id="comment"
                                                name="comment"
                                                rows={4}
                                                className="mt-2 border border-gray-300 rounded px-2 py-1 w-full"
                                                required
                                                value={reviewText}
                                                onChange={(e) => setReviewText(e.target.value)}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                            <div>
                                                <Label htmlFor="author" className="block font-medium">
                                                    Name <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="author"
                                                    name="author"
                                                    type="text"
                                                    value={userName}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                    className="mt-2 border border-gray-300 rounded px-2 py-1 w-full"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="email" className="block font-medium">
                                                    Email <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={userEmail}
                                                    onChange={(e) => setUserEmail(e.target.value)}
                                                    className="mt-2 border border-gray-300 rounded px-2 py-1 w-full"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-start gap-2">
                                            <Input id="savedata" name="savedata" type="checkbox" className="w-5 h-5" />
                                            <Label htmlFor="savedata" className="text-xs lg:text-sm">
                                                Save my name, email, and website in this browser for the next time I comment.
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                                        >
                                            Submit
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RatingsAndReviews;
