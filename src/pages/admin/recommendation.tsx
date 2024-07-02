import { TextInput } from "@/components/text-input";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { db } from "@/services/firebase-connection";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    recommendation: z.string(),
    rating: z.string().max(1, "A nota precisa ser de 0 a 5")
});

type RecommendationFormData = z.infer<typeof schema>;

interface AvatarProps {
    name: string;
    uid: string;
    previewUrl: string;
    url: string;
}

interface ProfileProps {
    id: string;
    uid: string;
    name: string;
    about: string;
    avatar: AvatarProps[];
}

export function Recommendation() {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<RecommendationFormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const [profile, setProfile] = useState<ProfileProps | null>(null); // Mudança para um único perfil

    useEffect(() => {
        async function loadProfile() {
            if (!user?.uid) {
                return;
            }

            const profileRef = collection(db, "profile");
            const queryRef = query(profileRef, where("uid", "==", user.uid));

            getDocs(queryRef)
                .then((snapshot) => {
                    if (!snapshot.empty) {
                        const doc = snapshot.docs[0];
                        setProfile({
                            id: doc.id,
                            uid: doc.data().uid,
                            name: doc.data().name,
                            about: doc.data().about,
                            avatar: doc.data().avatar
                        });
                    } else {
                        setProfile(null);
                    }
                });
        }

        loadProfile();
    }, [user]);

    async function onSubmit(data: RecommendationFormData) {
        if (!user || !profile) {
            alert("Precisa ter um perfil criado!");
            return;
        }

        try {
            await addDoc(collection(db, "recommendations"), {
                recommendation: data.recommendation,
                rating: data.rating,
                user: {
                    uid: user.uid,
                    email: user.email,
                    name: profile.name,
                    avatar: profile.avatar
                }
            });

            alert("Recomendação enviada com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao enviar a recomendação!");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    textarea
                    register={register}
                    name="recommendation"
                    label="Recomendação"
                    erro={errors.recommendation?.message}
                    placeholder="Digite sua recomendação..."
                />
                <div>
                    <label>
                        Nota:
                        <input
                            type="number"
                            {...register("rating")}
                            placeholder="Digite sua nota..."
                            min="0"
                            max="5"
                            className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </label>
                    {errors.rating && <p>{errors.rating.message}</p>}
                </div>

                <Button className="w-full mt-4" type="submit">Salvar</Button>
            </form>
        </div>
    );
}