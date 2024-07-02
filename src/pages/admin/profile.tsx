import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/auth-context";
import { db, storage } from "@/services/firebase-connection";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Camera, User } from "lucide-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TextInput } from "@/components/text-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";

const schema = z.object({
    name: z.string().min(3, "Nome é obrigatorio ter pelo menos 3 caracteres!"),
    about: z.string()
})

type ProfileFormData = z.infer<typeof schema>

interface AvatarProps {
    name: string,
    uid: string,
    previewUrl: string,
    url: string
}

interface ProfileProps {
    id: string
    uid: string
    name: string
    about: string
    avatar: AvatarProps[]
}

export function Profile() {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    const [avatar, setAvatar] = useState<AvatarProps[]>([])
    const [profile, setProfile] = useState<ProfileProps[]>([])

    async function onSubmit(data: ProfileFormData) {
        if (avatar.length === 0) {
            alert("Envie pelo menos uma imagem.")
            return
        }

        const avatarList = avatar.map(photo => {
            return {
                uid: photo.uid,
                name: photo.name,
                url: photo.url
            }
        })

        try {
            const profileQuery = query(collection(db, "profile"), where("uid", "==", user?.uid));
            const profileSnapshot = await getDocs(profileQuery);

            if (!profileSnapshot.empty) {
                const profileDoc = profileSnapshot.docs[0]; // Assumindo que há apenas um perfil por usuário
                await updateDoc(profileDoc.ref, {
                    name: data.name.toUpperCase(),
                    email: user?.email,
                    about: data.about,
                    avatar: avatarList,
                });
                alert("Perfil alterado com sucesso!");
            } else {
                await addDoc(collection(db, "profile"), {
                    name: data.name.toUpperCase(),
                    email: user?.email,
                    about: data.about,
                    avatar: avatarList,
                    uid: user?.uid,
                });
                alert("Perfil criado com sucesso!");
            }

            reset();
            setAvatar([]);
        } catch (err) {
            alert("Erro ao atualizar ou criar perfil!");
            console.log(err);
        }
    }

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                await handleUpload(image)
            }
        } else {
            alert("O arquivo precisa ser JPEG ou PNG")
            return
        }
    }

    async function handleUpload(image: File) {
        if (!user?.uid) {
            return
        }

        const currentUid = user?.uid
        const uidImage = uuidv4()

        const uploadRef = ref(storage, `avatar/${currentUid}/${uidImage}`)
        uploadBytes(uploadRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((dowloadUrl) => {
                const imageItem = {
                    name: uidImage,
                    uid: currentUid,
                    previewUrl: URL.createObjectURL(image),
                    url: dowloadUrl
                }

                setAvatar((images) => [...images, imageItem])
            })
        })
    }

    async function handleDeleteImage(item: AvatarProps) {
        const imagePath = `avatar/${item.uid}/${item.name}`

        const imageRef = ref(storage, imagePath)

        try {
            await deleteObject(imageRef)
            setAvatar(avatar.filter((photo) => photo.url !== item.url))
        } catch (error) {
            console.log(error)
        }
    }

    function capitalizeEachWord(name: string) {
        return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }

    useEffect(() => {
        async function loadProfile() {
            if (!user?.uid) {
                return
            }

            const profileRef = collection(db, "profile")
            const queryRef = query(profileRef, where("uid", "==", user.uid))

            getDocs(queryRef)
                .then((snapshot) => {
                    const listProfile = [] as ProfileProps[]

                    snapshot.forEach((doc) => {
                        listProfile.push({
                            id: doc.id,
                            uid: doc.data().uid,
                            name: doc.data().name,
                            about: doc.data().about,
                            avatar: doc.data().avatar
                        })
                    })

                    setProfile(listProfile)
                })
        }

        loadProfile()
    }, [user])

    return (
        <div className="w-full flex flex-col justify-center items-center mt-4">
            {
                profile.length > 0 ? (
                    <>
                        {
                            profile.map((person) => (
                                <div className="flex flex-col items-center w-11/12">
                                    <img src={person.avatar[0].url} className="size-40 rounded-full object-cover border shadow-md" />
                                    <p className="text-xl font-semibold">{capitalizeEachWord(person.name)}</p>
                                    <p className="text-base font-normal text-justify">{person.about}</p>
                                </div>
                            ))
                        }
                    </>
                ) : (
                    <div>
                        <div className="flex flex-col justify-center items-center relative bg-slate-500 rounded-full size-32 mx-auto mb-4">
                            <User className="text-white size-24" />
                        </div>
                        <p className="text-xl font-semibold">{user?.email}</p>
                    </div>
                )
            }
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary">{profile.length > 0 ? "Editar dados" : "Criar perfil"}</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edite suas informações</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {avatar.length > 0 ? (
                                    <div>
                                        {avatar.map((item) => (
                                            <div key={item.name} className="w-full h-32 flex items-center justify-center relative">
                                                <img src={item.previewUrl} className="rounded-full size-32 object-cover" alt="" />
                                                <Button type="button" onClick={() => handleDeleteImage(item)}>Excluir</Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col justify-center items-center relative bg-slate-500 rounded-full size-32 mx-auto mb-4">
                                        <User className="text-white size-24" />
                                        <Camera className="absolute bottom-0 right-0 cursor-pointer bg-primary rounded-full p-2 size-12" />
                                        <Input type="file" onChange={handleFile} className="absolute bottom-0 right-0 cursor-pointer bg-primary rounded-full p-2 size-12 opacity-0" />
                                    </div>
                                )}
                                <TextInput
                                    name="name"
                                    placeholder="Digite seu nome"
                                    label="Nome"
                                    register={register}
                                    erro={errors.name?.message}
                                />
                                <TextInput
                                    textarea
                                    name="about"
                                    placeholder="Digite sobre voce..."
                                    label="Sobre você"
                                    register={register}
                                    erro={errors.about?.message}
                                />
                                <Button className="w-full" type="submit">Salvar</Button>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}