import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { db } from "@/services/firebase-connection";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { Star, Trash } from "lucide-react";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";

interface ReviewsProps {
    id: string;
    name: string;
    rating: number;
    comment: string;
    created: Date;
}

export function Recommendation() {
    const { user } = useContext(AuthContext)
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [reviews, setReviews] = useState<ReviewsProps[]>([])

    function handleRatingChange(e: ChangeEvent<HTMLInputElement>) {
        setRating(parseInt(e.target.value, 10))
    }

    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    function handleCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setComment(e.target.value)
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        addDoc(collection(db, "reviews"), {
            uid: user?.uid,
            name,
            email: user?.email,
            rating,
            comment,
            created: new Date()
        })
            .then(() => {
                setRating(0)
                setComment('')
                alert("Avaliação enviada com sucesso!")
            })
            .catch((err) => {
                console.error(err)
            })

    }

    useEffect(() => {
        async function loadReviews() {
            if (!user?.uid) {
                return
            }

            const reviewsRef = collection(db, "reviews")
            const queryRef = query(reviewsRef, where("uid", "==", user.uid))

            getDocs(queryRef)
                .then((snapshot) => {
                    const listReviews = [] as ReviewsProps[]

                    snapshot.forEach((doc) => {
                        listReviews.push({
                            id: doc.id,
                            name: doc.data().name,
                            rating: doc.data().rating,
                            comment: doc.data().comment,
                            created: doc.data().created,
                        })
                    })

                    setReviews(listReviews)
                })
        }

        loadReviews()
    }, [user])

    async function handleDeleteReview(review: ReviewsProps) {
        const itemReview = review

        const docRef = doc(db, "reviews", itemReview.id)
        await deleteDoc(docRef)

        alert("Avaliação deletada com sucesso!")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="" className="block mb-1 font-semibold">Avalie:</label>
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="ml-1">
                            <input
                                type="radio"
                                name="rating"
                                value={value}
                                checked={rating === value}
                                onChange={handleRatingChange}
                                className="sr-only"
                            />
                            <span className="cursor-pointer text-xl">{value <= rating ? "⭐" : <Star className="mt-1" />}</span>
                        </label>
                    ))}
                </div>
                <div>
                    <label htmlFor="name" className="block mb-1 font-semibold">Nome:</label>
                    <input
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Deixe seu nome"
                    />
                </div>
                <div>
                    <label htmlFor="comment" className="block mb-1 font-semibold">Comentário:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={handleCommentChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        rows={4}
                        placeholder="Deixe seu comentário..."
                    />
                </div>
                <div>
                    <Button type="submit">Enviar avaliação</Button>
                </div>
            </form>

            <div className="flex flex-wrap gap-4">
                {reviews.map((item) => (
                    <div key={item.id} className="shadow-lg border p-4 rounded-lg">
                        <p>{item.name}</p>
                        <p>{item.comment}</p>
                        <p>{item.rating}</p>
                        <Trash className="size-6 text-red-500" onClick={() => handleDeleteReview(item)} />
                    </div>
                ))}
            </div>
        </div>
    )
}