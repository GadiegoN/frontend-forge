import { Button } from "@/components/ui/button"
import { auth, db } from "@/services/firebase-connection"
import { signOut } from "firebase/auth"
import { LogOut } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useEffect, useState } from "react"
import { Profile } from "./profile"
import { Contact } from "./contact"
import { collection, getDocs, query } from "firebase/firestore"
interface PagesProps {
    id: string,
    name: string,
    title: string
}

export function Dashboard() {
    const [page, setPage] = useState<PagesProps[]>([])
    const [selectedPage, setSelectedPage] = useState<string>("profile")

    async function handleLogout() {
        await signOut(auth)
    }

    useEffect(() => {
        function loadPages() {
            const pagesRef = collection(db, "pages")

            const queryRef = query(pagesRef)

            getDocs(queryRef)
                .then((snapshot) => {
                    const list = [] as PagesProps[]

                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            name: doc.data().name,
                            title: doc.data().title
                        })
                    })

                    setPage(list)
                })
        }

        loadPages()
    }, [])

    return (
        <div className="w-full max-w-7xl mx-auto gap-16">
            <NavigationMenu className="min-w-full">
                <NavigationMenuList className="gap-4 justify-center mx-auto">
                    {page.map((item) => (
                        <NavigationMenuItem asChild key={item.id}>
                            <Button
                                variant={selectedPage === item.name ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedPage(item.name)}
                            >
                                <NavigationMenuLink>
                                    {item.title}
                                </NavigationMenuLink>
                            </Button>
                        </NavigationMenuItem>
                    ))}
                    <Button size="sm" variant="link" onClick={handleLogout}><LogOut /></Button>
                </NavigationMenuList>
            </NavigationMenu>

            {selectedPage === "profile" && (
                <Profile />
            )}

            {selectedPage === "contact" && (
                <Contact />
            )}
        </div>
    )
}