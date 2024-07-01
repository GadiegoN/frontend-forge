import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/auth-context";
import { storage } from "@/services/firebase-connection";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Camera } from "lucide-react";
import { ChangeEvent, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

interface AvatarProps {
    name: string,
    uid: string,
    previewUrl: string,
    url: string
}

export function Profile() {
    const { user } = useContext(AuthContext)
    const [avatar, setAvatar] = useState<AvatarProps>()

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

                setAvatar(imageItem)
            })
        })
    }

    return (
        <div className="w-full flex flex-col justify-center items-center mt-4">
            <form>
                <div className="relative">
                    {
                        avatar?.previewUrl ? (
                            <img src={avatar?.previewUrl} className="size-40 rounded-full object-cover border shadow-md" />
                        ) : (
                            <img src="/avatar.png" className="size-40 rounded-full object-cover border shadow-md" />
                        )
                    }
                    <Button className="absolute bottom-0 right-0 size-10">
                        <Camera className="absolute cursor-pointer" />
                        <Input
                            type="file"
                            accept="image/*"
                            className="absolute opacity-0 cursor-pointer"
                            onChange={handleFile}
                        />
                    </Button>
                </div>
                <p className="text-xl font-semibold">Gadiego Nogueira</p>


            </form>
        </div>
    )
}